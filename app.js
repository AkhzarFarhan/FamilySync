// FamilySync - Enterprise Family Chore Management App

// Optional Firebase configuration - replace with your project values.
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase if SDK is present. This is optional - app works with sample data when Firebase is not configured.
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        // ignore: already initialized or init error
        console.warn('Firebase init error:', e);
    }
}
var db = (typeof firebase !== 'undefined') ? firebase.database() : null;

class FamilySyncApp {
    constructor() {
        this.currentUser = null;
        this.currentFamily = null;
        this.currentPage = 'dashboard';
        this.appData = this.getSampleData(); // fallback
        this.init();
    }

    // Sample data fallback so the app runs without Firebase.
    getSampleData() {
        return {
            sampleFamily: {
                familyCode: 'SMITH2025',
                familyName: 'The Smith Family',
                familyHead: { id: 'user1', name: 'Sarah Smith', role: 'Family Head', avatar: '👩‍💼', points: 890, joinDate: '2025-01-01', email: 'sarah.smith@email.com' },
                familyMembers: [
                    { id: 'user2', name: 'Mike Smith', role: 'Parent', avatar: '👨‍💻', points: 750, age: 35, joinDate: '2025-01-01' },
                    { id: 'user3', name: 'Emma Smith', role: 'Child', avatar: '👧', points: 420, age: 12, joinDate: '2025-01-02' },
                    { id: 'user4', name: 'Alex Smith', role: 'Child', avatar: '👦', points: 385, age: 9, joinDate: '2025-01-02' },
                    { id: 'user5', name: 'Grandma Betty', role: 'Elder', avatar: '👵', points: 320, age: 68, joinDate: '2025-01-15' }
                ]
            },
            sampleChores: [
                { id: 'chore1', title: 'Take out the trash', description: 'Empty all trash bins and take bags to the curb', assignedTo: 'user3', assignedBy: 'user1', category: 'Cleaning', points: 25, penalty: 5, dueDate: '2025-08-23', status: 'pending', priority: 'medium', recurring: 'weekly', estimatedTime: '15 minutes' },
                { id: 'chore2', title: 'Load dishwasher', description: 'Load dirty dishes and start the dishwasher cycle', assignedTo: 'user4', assignedBy: 'user2', category: 'Kitchen', points: 20, penalty: 3, dueDate: '2025-08-22', status: 'completed', priority: 'high', completedDate: '2025-08-22', estimatedTime: '10 minutes' }
            ],
            samplePosts: [
                { id: 'post1', author: 'user1', content: "Great job everyone on completing this week's chores! Emma and Alex are really stepping up! 🌟", timestamp: '2025-08-22T14:30:00Z', likes: ['user2','user3','user4'], mediaType: 'text', comments: [ { id: 'comment1', author: 'user3', content: 'Thanks Mom! Can I get extra points for doing it early? 😊', timestamp: '2025-08-22T14:35:00Z' } ] }
            ],
            choreCategories: ['Cleaning','Kitchen','Laundry','Pet Care','Outdoor','Organization','Maintenance','Shopping','Other'],
            achievements: [
                { id: 'early_bird', name: 'Early Bird', description: 'Complete 5 chores before deadline', icon: '🐦', points: 50 }
            ],
            notifications: [
                { id: 'notif1', type: 'chore_due', message: "Reminder: 'Take out the trash' is due in 2 hours", timestamp: '2025-08-22T20:00:00Z', userId: 'user1', read: false }
            ]
        };
    }

    init() {
        this.showLoading();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                setTimeout(() => {
                    this.hideLoading();
                    this.showLogin();
                }, 300);
            });
        } else {
            this.setupEventListeners();
            setTimeout(() => {
                this.hideLoading();
                this.showLogin();
            }, 100);
        }
    }

    // Load family members from Firebase if available, otherwise use fallback.
    loadFamilyFromDB(callback) {
        if (db && db.ref) {
            db.ref('family').once('value').then(snapshot => {
                const val = snapshot.val();
                if (val) {
                    // Expecting structure: { familyCode, familyName, familyHead: {...}, members: {id: {...}, ...} }
                    const family = {
                        familyCode: val.familyCode || this.appData.sampleFamily.familyCode,
                        familyName: val.familyName || this.appData.sampleFamily.familyName,
                        familyHead: val.familyHead || this.appData.sampleFamily.familyHead,
                        familyMembers: []
                    };

                    if (val.members) {
                        // convert object map to array
                        family.familyMembers = Object.keys(val.members).map(k => Object.assign({ id: k }, val.members[k]));
                    }

                    callback(null, family);
                    return;
                }
                callback(new Error('No data')); // fallback handled by caller
            }).catch(err => callback(err));
        } else {
            // No Firebase - use fallback
            callback(new Error('No Firebase'), null);
        }
    }

    // Renders currently selected page
    renderCurrentPage() {
        switch (this.currentPage) {
            case 'dashboard': this.renderDashboard(); break;
            case 'chores': this.renderChores(); break;
            case 'posts': this.renderPosts(); break;
            case 'family': this.renderFamily(); break;
            case 'profile': this.renderProfile(); break;
            default: this.renderDashboard();
        }
    }

    setupEventListeners() {
        // Wire up the main UI interactions that exist in the template.
        const signinForm = document.getElementById('signin-form');
        const signupForm = document.getElementById('signup-form');
        const joinForm = document.getElementById('join-form');

        if (signinForm) signinForm.addEventListener('submit', (e) => this.handleSignIn(e));
        if (signupForm) signupForm.addEventListener('submit', (e) => this.handleSignUp(e));
        if (joinForm) joinForm.addEventListener('submit', (e) => this.handleJoinFamily(e));

        document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', (e) => this.switchTab(e)));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.addEventListener('click', (e) => this.navigateTo(e)));
        document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', (e) => this.closeModal(e)));

        const createChoreBtn = document.getElementById('create-chore-btn');
        const createPostBtn = document.getElementById('create-post-btn');
        const addMemberBtn = document.getElementById('add-member-btn');
        if (createChoreBtn) createChoreBtn.addEventListener('click', () => this.openCreateChoreModal());
        if (createPostBtn) createPostBtn.addEventListener('click', () => this.openCreatePostModal());
        if (addMemberBtn) addMemberBtn.addEventListener('click', () => this.openAddMemberModal());

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());

        document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) this.closeModal(e); }));

        // Navigation buttons by id/data-page
        document.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                if (page) {
                    this.currentPage = page;
                    this.renderCurrentPage();
                }
            });
        });
    }

    // UI helpers (show/hide pages, loading, login)
    showLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.classList.remove('hidden');
    }
    hideLoading() {
        const loading = document.getElementById('loading-screen');
        if (loading) loading.classList.add('hidden');
    }
    showLogin() {
        const login = document.getElementById('login-page');
        const appEl = document.getElementById('app');
        if (login) login.classList.remove('hidden');
        if (appEl) appEl.classList.add('hidden');
    }
    showApp() {
        const login = document.getElementById('login-page');
        const appEl = document.getElementById('app');
        if (login) login.classList.add('hidden');
        if (appEl) appEl.classList.remove('hidden');
    }

    // Simple sign-in simulation; in a real app you'd authenticate and then load Firebase-backed family data
    handleSignIn(e) {
        e.preventDefault();
        // Accept any sign-in for demo. Use first member as current user.
        const fallbackFamily = this.appData.sampleFamily;
        this.currentFamily = fallbackFamily;
        this.currentUser = fallbackFamily.familyHead;
        this.showApp();
        this.updateHeader();
        this.renderCurrentPage();

        // Try to replace fallback with DB data if available
        this.loadFamilyFromDB((err, family) => {
            if (!err && family) {
                this.currentFamily = family;
                // set currentUser to family head if not present
                if (!this.currentUser || !family.familyHead) this.currentUser = family.familyHead || family.familyMembers[0];
                this.updateHeader();
                this.renderCurrentPage();
            }
        });
    }

    handleSignUp(e) { e.preventDefault(); alert('Sign up flow is not implemented in this demo.'); }
    handleJoinFamily(e) { e.preventDefault(); alert('Join family flow is not implemented in this demo.'); }

    // Basic page rendering implementations using currentFamily/currentUser
    updateHeader() {
        if (!this.currentFamily || !this.currentUser) return;
        const familyNameEl = document.getElementById('current-family-name');
        const userAvatarEl = document.getElementById('current-user-avatar');
        const userPointsEl = document.getElementById('current-user-points');
        if (familyNameEl) familyNameEl.textContent = this.currentFamily.familyName || '';
        if (userAvatarEl) userAvatarEl.textContent = this.currentUser.avatar || '';
        if (userPointsEl) userPointsEl.textContent = (this.currentUser.points || 0) + ' pts';

        // notification count
        const notificationCount = document.getElementById('notification-count');
        const unreadCount = (this.appData.notifications || []).filter(n => !n.read && n.userId === this.currentUser.id).length;
        if (notificationCount) {
            if (unreadCount > 0) {
                notificationCount.textContent = unreadCount;
                notificationCount.style.display = 'block';
            } else {
                notificationCount.style.display = 'none';
            }
        }
    }

    renderDashboard() {
        if (!this.currentFamily) return;
        const allMembers = [this.currentFamily.familyHead].concat(this.currentFamily.familyMembers || []);
        const totalMembersEl = document.getElementById('total-members'); if (totalMembersEl) totalMembersEl.textContent = allMembers.length;
        const pendingChoresEl = document.getElementById('pending-chores'); if (pendingChoresEl) pendingChoresEl.textContent = (this.appData.sampleChores || []).filter(c => c.status === 'pending').length;

        // leaderboard
        const leaderboardEl = document.getElementById('leaderboard');
        if (leaderboardEl) {
            const sorted = allMembers.slice().sort((a,b) => (b.points||0)-(a.points||0));
            leaderboardEl.innerHTML = sorted.map((m, i) => `<div class="leaderboard-item"><div class="leaderboard-rank">#${i+1}</div><div class="leaderboard-avatar">${m.avatar||''}</div><div class="leaderboard-info"><div class="leaderboard-name">${m.name}</div><div class="leaderboard-role">${m.role||''}</div></div><div class="leaderboard-points">${m.points||0} pts</div></div>`).join('');
        }
    }

    renderChores() {
        // Implemented lightly; relies on sampleChores until DB chores implemented
        const choresGridEl = document.getElementById('chores-grid');
        if (choresGridEl) {
            choresGridEl.innerHTML = (this.appData.sampleChores || []).map(c => `<div class="chore-card"><h4>${c.title}</h4><p>${c.description}</p></div>`).join('');
        }
    }

    renderPosts() {
        const postsEl = document.getElementById('posts-feed');
        if (postsEl) postsEl.innerHTML = (this.appData.samplePosts || []).map(p => `<div class="post-card"><p>${p.content}</p></div>`).join('');
    }

    renderFamily() {
        if (!this.currentFamily) return;
        const allMembers = [this.currentFamily.familyHead].concat(this.currentFamily.familyMembers || []);
        const familyMembersGrid = document.getElementById('family-members-grid');
        if (familyMembersGrid) {
            familyMembersGrid.innerHTML = allMembers.map(m => `<div class="family-member-card"><div class="member-avatar">${m.avatar||''}</div><h4>${m.name}</h4><p>${m.role||''}</p><div class="member-stats"><div>${m.points||0} pts</div></div></div>`).join('');
        }

        const familyDisplayName = document.getElementById('family-display-name'); if (familyDisplayName) familyDisplayName.textContent = this.currentFamily.familyName || '';
        const familyDisplayCode = document.getElementById('family-display-code'); if (familyDisplayCode) familyDisplayCode.textContent = this.currentFamily.familyCode || '';
    }

    renderProfile() {
        if (!this.currentUser) return;
        const profileName = document.getElementById('profile-name'); if (profileName) profileName.textContent = this.currentUser.name || '';
        const profileAvatar = document.getElementById('profile-avatar'); if (profileAvatar) profileAvatar.textContent = this.currentUser.avatar || '';
    }

    // Simple helpers used by UI code elsewhere in the original app
    formatDate(d) { if (!d) return ''; const dt = new Date(d); return dt.toLocaleDateString(); }

    calculateDaysActive() { return 1; }

    // Modal and basic actions
    openCreateChoreModal() { const m = document.getElementById('create-chore-modal'); if (m) m.classList.remove('hidden'); }
    openCreatePostModal() { const m = document.getElementById('create-post-modal'); if (m) m.classList.remove('hidden'); }
    openAddMemberModal() { const m = document.getElementById('add-member-modal'); if (m) m.classList.remove('hidden'); }
    closeModal(e) { const modalId = e.target.dataset.modal || e.target.closest('.modal')?.id; const modal = document.getElementById(modalId); if (modal) modal.classList.add('hidden'); }

    showNotification(message) { const n = document.createElement('div'); n.textContent = message; n.style.position='fixed'; n.style.top='20px'; n.style.right='20px'; n.style.background='green'; n.style.color='white'; n.style.padding='10px'; n.style.zIndex='10000'; document.body.appendChild(n); setTimeout(()=>{ if(n.parentNode) n.parentNode.removeChild(n); }, 3000); }

    // For demo: getAllMembers
    getAllMembers() { if (!this.currentFamily) return []; return [this.currentFamily.familyHead].concat(this.currentFamily.familyMembers || []); }

    // Action placeholders
    completeChore(choreId) { /* ... */ }
    editChore(choreId) { /* ... */ }
    toggleLike(postId) { /* ... */ }
    toggleComments(postId) { /* ... */ }
    removeMember(memberId) { /* ... */ }
    viewMemberProfile(memberId) { /* ... */ }
    logout() { this.currentUser = null; this.currentFamily = null; this.showLogin(); }
}

// Initialize app when DOM is ready
var app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { app = new FamilySyncApp(); });
} else {
    app = new FamilySyncApp();
}