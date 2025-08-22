// FamilySync - Enterprise Family Chore Management App
class FamilySyncApp {
    constructor() {
        this.currentUser = null;
        this.currentFamily = null;
        this.currentPage = 'dashboard';
        this.appData = null;
        this.init();
    }

    async init() {
        // Initialize app data with sample data
        this.initializeAppData();
        
        // Show loading screen
        this.showLoading();
        
        // Set up event listeners after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                setTimeout(() => {
                    this.hideLoading();
                    this.showLogin();
                }, 1500);
            });
        } else {
            this.setupEventListeners();
            setTimeout(() => {
                this.hideLoading();
                this.showLogin();
            }, 1500);
        }
    }

    initializeAppData() {
        // Initialize with sample data
        this.appData = {
            "sampleFamily": {
                "familyCode": "SMITH2025",
                "familyName": "The Smith Family",
                "familyHead": {
                    "id": "user1",
                    "name": "Sarah Smith",
                    "role": "Family Head",
                    "avatar": "👩‍💼",
                    "points": 890,
                    "joinDate": "2025-01-01",
                    "email": "sarah.smith@email.com"
                },
                "familyMembers": [
                    {
                        "id": "user2",
                        "name": "Mike Smith",
                        "role": "Parent",
                        "avatar": "👨‍💻",
                        "points": 750,
                        "age": 35,
                        "joinDate": "2025-01-01"
                    },
                    {
                        "id": "user3",
                        "name": "Emma Smith",
                        "role": "Child",
                        "avatar": "👧",
                        "points": 420,
                        "age": 12,
                        "joinDate": "2025-01-02"
                    },
                    {
                        "id": "user4",
                        "name": "Alex Smith",
                        "role": "Child",
                        "avatar": "👦",
                        "points": 385,
                        "age": 9,
                        "joinDate": "2025-01-02"
                    },
                    {
                        "id": "user5",
                        "name": "Grandma Betty",
                        "role": "Elder",
                        "avatar": "👵",
                        "points": 320,
                        "age": 68,
                        "joinDate": "2025-01-15"
                    }
                ]
            },
            "sampleChores": [
                {
                    "id": "chore1",
                    "title": "Take out the trash",
                    "description": "Empty all trash bins and take bags to the curb",
                    "assignedTo": "user3",
                    "assignedBy": "user1",
                    "category": "Cleaning",
                    "points": 25,
                    "penalty": 5,
                    "dueDate": "2025-08-23",
                    "status": "pending",
                    "priority": "medium",
                    "recurring": "weekly",
                    "estimatedTime": "15 minutes"
                },
                {
                    "id": "chore2",
                    "title": "Load dishwasher",
                    "description": "Load dirty dishes and start the dishwasher cycle",
                    "assignedTo": "user4",
                    "assignedBy": "user2",
                    "category": "Kitchen",
                    "points": 20,
                    "penalty": 3,
                    "dueDate": "2025-08-22",
                    "status": "completed",
                    "priority": "high",
                    "completedDate": "2025-08-22",
                    "estimatedTime": "10 minutes"
                },
                {
                    "id": "chore3",
                    "title": "Vacuum living room",
                    "description": "Vacuum the entire living room and under furniture",
                    "assignedTo": "user2",
                    "assignedBy": "user1",
                    "category": "Cleaning",
                    "points": 35,
                    "penalty": 8,
                    "dueDate": "2025-08-24",
                    "status": "in-progress",
                    "priority": "medium",
                    "estimatedTime": "25 minutes"
                },
                {
                    "id": "chore4",
                    "title": "Feed the cat",
                    "description": "Give Whiskers breakfast and refill water bowl",
                    "assignedTo": "user3",
                    "assignedBy": "user1",
                    "category": "Pet Care",
                    "points": 15,
                    "penalty": 5,
                    "dueDate": "2025-08-22",
                    "status": "overdue",
                    "priority": "high",
                    "estimatedTime": "5 minutes"
                },
                {
                    "id": "chore5",
                    "title": "Organize bookshelf",
                    "description": "Sort books by size and category in the study",
                    "assignedTo": "user5",
                    "assignedBy": "user1",
                    "category": "Organization",
                    "points": 30,
                    "penalty": 6,
                    "dueDate": "2025-08-25",
                    "status": "pending",
                    "priority": "low",
                    "estimatedTime": "30 minutes"
                }
            ],
            "samplePosts": [
                {
                    "id": "post1",
                    "author": "user1",
                    "content": "Great job everyone on completing this week's chores! Emma and Alex are really stepping up! 🌟",
                    "timestamp": "2025-08-22T14:30:00Z",
                    "likes": ["user2", "user3", "user4"],
                    "mediaType": "text",
                    "comments": [
                        {
                            "id": "comment1",
                            "author": "user3",
                            "content": "Thanks Mom! Can I get extra points for doing it early? 😊",
                            "timestamp": "2025-08-22T14:35:00Z"
                        },
                        {
                            "id": "comment2",
                            "author": "user2",
                            "content": "Proud of our kids! Family teamwork at its best! 💪",
                            "timestamp": "2025-08-22T14:40:00Z"
                        }
                    ]
                },
                {
                    "id": "post2",
                    "author": "user3",
                    "content": "Just finished organizing my room and found my lost book! Double win! 📚✨",
                    "timestamp": "2025-08-22T16:15:00Z",
                    "likes": ["user1", "user2", "user5"],
                    "mediaType": "text",
                    "comments": [
                        {
                            "id": "comment3",
                            "author": "user5",
                            "content": "That's wonderful dear! A tidy room leads to a tidy mind 🧠",
                            "timestamp": "2025-08-22T16:20:00Z"
                        }
                    ]
                },
                {
                    "id": "post3",
                    "author": "user2",
                    "content": "Weekend family movie night this Saturday! Everyone gets to pick one movie. 🍿🎬",
                    "timestamp": "2025-08-22T18:45:00Z",
                    "likes": ["user1", "user3", "user4", "user5"],
                    "mediaType": "text",
                    "comments": [
                        {
                            "id": "comment4",
                            "author": "user4",
                            "content": "Can we watch the new superhero movie?! 🦸‍♂️",
                            "timestamp": "2025-08-22T18:50:00Z"
                        }
                    ]
                }
            ],
            "choreCategories": [
                "Cleaning",
                "Kitchen",
                "Laundry",
                "Pet Care",
                "Outdoor",
                "Organization",
                "Maintenance",
                "Shopping",
                "Other"
            ],
            "achievements": [
                {
                    "id": "early_bird",
                    "name": "Early Bird",
                    "description": "Complete 5 chores before deadline",
                    "icon": "🐦",
                    "points": 50
                },
                {
                    "id": "week_warrior",
                    "name": "Week Warrior",
                    "description": "Complete all assigned chores in a week",
                    "icon": "⚔️",
                    "points": 100
                },
                {
                    "id": "team_player",
                    "name": "Team Player",
                    "description": "Help other family members with their chores",
                    "icon": "🤝",
                    "points": 75
                },
                {
                    "id": "point_collector",
                    "name": "Point Collector",
                    "description": "Earn 1000 points total",
                    "icon": "💎",
                    "points": 200
                }
            ],
            "notifications": [
                {
                    "id": "notif1",
                    "type": "chore_due",
                    "message": "Reminder: 'Take out the trash' is due in 2 hours",
                    "timestamp": "2025-08-22T20:00:00Z",
                    "userId": "user1",
                    "read": false
                },
                {
                    "id": "notif2",
                    "type": "points_earned",
                    "message": "You earned 20 points for completing 'Load dishwasher'!",
                    "timestamp": "2025-08-22T19:30:00Z",
                    "userId": "user1",
                    "read": false
                },
                {
                    "id": "notif3",
                    "type": "new_post",
                    "message": "New family post from Mike Smith",
                    "timestamp": "2025-08-22T14:30:00Z",
                    "userId": "user1",
                    "read": false
                }
            ]
        };
    }

    setupEventListeners() {
        // Login form handlers
        const signinForm = document.getElementById('signin-form');
        const signupForm = document.getElementById('signup-form');
        const joinForm = document.getElementById('join-form');
        
        if (signinForm) {
            signinForm.addEventListener('submit', (e) => this.handleSignIn(e));
        }
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignUp(e));
        }
        if (joinForm) {
            joinForm.addEventListener('submit', (e) => this.handleJoinFamily(e));
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.navigateTo(e));
        });

        // Modal handlers
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e));
        });

        // Button handlers
        const createChoreBtn = document.getElementById('create-chore-btn');
        const createPostBtn = document.getElementById('create-post-btn');
        const addMemberBtn = document.getElementById('add-member-btn');
        
        if (createChoreBtn) {
            createChoreBtn.addEventListener('click', () => this.openCreateChoreModal());
        }
        if (createPostBtn) {
            createPostBtn.addEventListener('click', () => this.openCreatePostModal());
        }
        if (addMemberBtn) {
            addMemberBtn.addEventListener('click', () => this.openAddMemberModal());
        }

        // Form handlers
        const createChoreForm = document.getElementById('create-chore-form');
        const createPostForm = document.getElementById('create-post-form');
        const addMemberForm = document.getElementById('add-member-form');
        
        if (createChoreForm) {
            createChoreForm.addEventListener('submit', (e) => this.handleCreateChore(e));
        }
        if (createPostForm) {
            createPostForm.addEventListener('submit', (e) => this.handleCreatePost(e));
        }
        if (addMemberForm) {
            addMemberForm.addEventListener('submit', (e) => this.handleAddMember(e));
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => this.toggleTheme(e.target.checked));
        }

        // Notifications
        const notificationBell = document.getElementById('notification-bell');
        const notificationsClose = document.getElementById('notifications-close');
        
        if (notificationBell) {
            notificationBell.addEventListener('click', () => this.toggleNotifications());
        }
        if (notificationsClose) {
            notificationsClose.addEventListener('click', () => this.hideNotifications());
        }

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(e);
                }
            });
        });
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    showLogin() {
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('app').classList.add('hidden');
    }

    showApp() {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        this.renderDashboard();
        this.updateHeader();
    }

    switchTab(e) {
        e.preventDefault();
        const tabName = e.target.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Show corresponding form
        document.querySelectorAll('.login-form').forEach(form => form.classList.remove('active'));
        const targetForm = document.getElementById(`${tabName}-form`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
    }

    handleSignIn(e) {
        e.preventDefault();
        
        // Simulate authentication
        this.currentUser = this.appData.sampleFamily.familyHead;
        this.currentFamily = this.appData.sampleFamily;
        this.showApp();
    }

    handleSignUp(e) {
        e.preventDefault();
        // Simulate family creation
        this.currentUser = {
            id: 'new_user',
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            role: 'Family Head',
            avatar: '👨‍💼',
            points: 0,
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        this.currentFamily = {
            familyName: document.getElementById('family-name').value,
            familyCode: this.generateFamilyCode(),
            familyHead: this.currentUser,
            familyMembers: []
        };
        
        this.showApp();
    }

    handleJoinFamily(e) {
        e.preventDefault();
        const familyCode = document.getElementById('join-code').value;
        
        if (familyCode.toUpperCase() === 'SMITH2025') {
            // Simulate joining existing family
            this.currentUser = this.appData.sampleFamily.familyMembers[0];
            this.currentFamily = this.appData.sampleFamily;
            this.showApp();
        } else {
            alert('Family code not found. Please check and try again.');
        }
    }

    generateFamilyCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase() + '2025';
    }

    navigateTo(e) {
        e.preventDefault();
        const page = e.target.closest('.nav-btn').dataset.page;
        
        // Update active nav
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        e.target.closest('.nav-btn').classList.add('active');
        
        // Show page
        document.querySelectorAll('.page-content').forEach(content => content.classList.remove('active'));
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Render page content
        this.currentPage = page;
        this.renderCurrentPage();
    }

    renderCurrentPage() {
        switch(this.currentPage) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'chores':
                this.renderChores();
                break;
            case 'posts':
                this.renderPosts();
                break;
            case 'family':
                this.renderFamily();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    }

    updateHeader() {
        const familyNameEl = document.getElementById('current-family-name');
        const userAvatarEl = document.getElementById('current-user-avatar');
        const userPointsEl = document.getElementById('current-user-points');
        
        if (familyNameEl) familyNameEl.textContent = this.currentFamily.familyName;
        if (userAvatarEl) userAvatarEl.textContent = this.currentUser.avatar;
        if (userPointsEl) userPointsEl.textContent = `${this.currentUser.points} pts`;
        
        // Update notification count
        const unreadCount = this.appData.notifications.filter(n => !n.read && n.userId === this.currentUser.id).length;
        const notificationCount = document.getElementById('notification-count');
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
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        
        // Update stats
        const totalMembersEl = document.getElementById('total-members');
        if (totalMembersEl) totalMembersEl.textContent = allMembers.length;
        
        const pendingChores = this.appData.sampleChores.filter(c => c.status === 'pending').length;
        const pendingChoresEl = document.getElementById('pending-chores');
        if (pendingChoresEl) pendingChoresEl.textContent = pendingChores;
        
        const completedToday = this.appData.sampleChores.filter(c => 
            c.status === 'completed' && c.completedDate === '2025-08-22'
        ).length;
        const completedTodayEl = document.getElementById('completed-today');
        if (completedTodayEl) completedTodayEl.textContent = completedToday;
        
        const totalPoints = allMembers.reduce((sum, member) => sum + member.points, 0);
        const totalPointsEl = document.getElementById('total-points');
        if (totalPointsEl) totalPointsEl.textContent = totalPoints;
        
        // Render leaderboard
        const sortedMembers = allMembers.sort((a, b) => b.points - a.points);
        const leaderboardHtml = sortedMembers.map((member, index) => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">#${index + 1}</div>
                <div class="leaderboard-avatar">${member.avatar}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${member.name}</div>
                    <div class="leaderboard-role">${member.role}</div>
                </div>
                <div class="leaderboard-points">${member.points} pts</div>
            </div>
        `).join('');
        const leaderboardEl = document.getElementById('leaderboard');
        if (leaderboardEl) leaderboardEl.innerHTML = leaderboardHtml;
        
        // Render pending chores
        const pendingChoresList = this.appData.sampleChores
            .filter(c => c.status === 'pending' || c.status === 'overdue')
            .slice(0, 5);
        
        const pendingChoresHtml = pendingChoresList.map(chore => {
            const assignee = allMembers.find(m => m.id === chore.assignedTo);
            const dueDate = new Date(chore.dueDate);
            const isOverdue = chore.status === 'overdue';
            
            return `
                <div class="pending-chore-item">
                    <div class="pending-chore-info">
                        <div class="pending-chore-title">${chore.title}</div>
                        <div class="pending-chore-assignee">Assigned to ${assignee?.name}</div>
                    </div>
                    <div class="pending-chore-due ${isOverdue ? 'text-error' : ''}">
                        ${isOverdue ? 'Overdue' : `Due ${this.formatDate(dueDate)}`}
                    </div>
                </div>
            `;
        }).join('');
        const dashboardPendingChoresEl = document.getElementById('dashboard-pending-chores');
        if (dashboardPendingChoresEl) dashboardPendingChoresEl.innerHTML = pendingChoresHtml;
        
        // Render recent posts preview
        const recentPosts = this.appData.samplePosts.slice(0, 3);
        const postsPreviewHtml = recentPosts.map(post => {
            const author = allMembers.find(m => m.id === post.author);
            return `
                <div class="post-preview-item">
                    <div class="post-preview-header">
                        <div class="post-preview-avatar">${author?.avatar}</div>
                        <div class="post-preview-author">${author?.name}</div>
                    </div>
                    <div class="post-preview-content">${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</div>
                </div>
            `;
        }).join('');
        const dashboardPostsPreviewEl = document.getElementById('dashboard-posts-preview');
        if (dashboardPostsPreviewEl) dashboardPostsPreviewEl.innerHTML = postsPreviewHtml;
    }

    renderChores() {
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        
        // Populate filter dropdowns
        const assigneeFilter = document.getElementById('chore-filter-assignee');
        if (assigneeFilter) {
            assigneeFilter.innerHTML = '<option value="all">All Members</option>' + 
                allMembers.map(member => `<option value="${member.id}">${member.name}</option>`).join('');
        }
        
        const categoryFilter = document.getElementById('chore-filter-category');
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="all">All Categories</option>' + 
                this.appData.choreCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
        
        // Populate create chore assignee dropdown
        const choreAssignee = document.getElementById('chore-assignee');
        if (choreAssignee) {
            choreAssignee.innerHTML = '<option value="">Select member...</option>' + 
                allMembers.map(member => `<option value="${member.id}">${member.name}</option>`).join('');
        }
        
        // Render chores
        this.renderChoresList();
        
        // Set up filters
        const statusFilter = document.getElementById('chore-filter-status');
        const assigneeFilterEl = document.getElementById('chore-filter-assignee');
        const categoryFilterEl = document.getElementById('chore-filter-category');
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.renderChoresList());
        }
        if (assigneeFilterEl) {
            assigneeFilterEl.addEventListener('change', () => this.renderChoresList());
        }
        if (categoryFilterEl) {
            categoryFilterEl.addEventListener('change', () => this.renderChoresList());
        }
    }

    renderChoresList() {
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        let filteredChores = [...this.appData.sampleChores];
        
        // Apply filters
        const statusFilter = document.getElementById('chore-filter-status');
        const assigneeFilter = document.getElementById('chore-filter-assignee');
        const categoryFilter = document.getElementById('chore-filter-category');
        
        if (statusFilter && statusFilter.value !== 'all') {
            filteredChores = filteredChores.filter(c => c.status === statusFilter.value);
        }
        if (assigneeFilter && assigneeFilter.value !== 'all') {
            filteredChores = filteredChores.filter(c => c.assignedTo === assigneeFilter.value);
        }
        if (categoryFilter && categoryFilter.value !== 'all') {
            filteredChores = filteredChores.filter(c => c.category === categoryFilter.value);
        }
        
        const choresHtml = filteredChores.map(chore => {
            const assignee = allMembers.find(m => m.id === chore.assignedTo);
            const assignedBy = allMembers.find(m => m.id === chore.assignedBy);
            const dueDate = new Date(chore.dueDate);
            
            return `
                <div class="chore-card">
                    <div class="chore-card-header">
                        <h4 class="chore-title">${chore.title}</h4>
                        <div class="chore-meta">
                            <span class="chore-category">${chore.category}</span>
                            <span class="chore-priority ${chore.priority}">${chore.priority.toUpperCase()}</span>
                        </div>
                    </div>
                    <div class="chore-card-body">
                        <p class="chore-description">${chore.description}</p>
                        <div class="chore-assignee">
                            <span class="chore-assignee-avatar">${assignee?.avatar}</span>
                            <span class="chore-assignee-name">${assignee?.name}</span>
                        </div>
                        <div class="chore-details">
                            <div class="chore-detail">
                                <span class="chore-detail-label">Due Date</span>
                                <span class="chore-detail-value">${this.formatDate(dueDate)}</span>
                            </div>
                            <div class="chore-detail">
                                <span class="chore-detail-label">Points</span>
                                <span class="chore-detail-value">${chore.points} pts</span>
                            </div>
                            <div class="chore-detail">
                                <span class="chore-detail-label">Time</span>
                                <span class="chore-detail-value">${chore.estimatedTime}</span>
                            </div>
                            <div class="chore-detail">
                                <span class="chore-detail-label">Assigned by</span>
                                <span class="chore-detail-value">${assignedBy?.name}</span>
                            </div>
                        </div>
                    </div>
                    <div class="chore-card-footer">
                        <span class="chore-status ${chore.status}">${chore.status.replace('-', ' ')}</span>
                        <div class="chore-actions">
                            ${chore.status === 'pending' || chore.status === 'in-progress' ? 
                                `<button class="chore-action-btn complete" onclick="app.completeChore('${chore.id}')">Complete</button>` : ''}
                            ${chore.assignedTo === this.currentUser.id || this.currentUser.role === 'Family Head' ? 
                                `<button class="chore-action-btn" onclick="app.editChore('${chore.id}')">Edit</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        const choresGridEl = document.getElementById('chores-grid');
        if (choresGridEl) {
            choresGridEl.innerHTML = choresHtml || '<p class="text-center">No chores match your filters.</p>';
        }
    }

    renderPosts() {
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        const postsHtml = this.appData.samplePosts.map(post => {
            const author = allMembers.find(m => m.id === post.author);
            const timestamp = new Date(post.timestamp);
            
            const commentsHtml = post.comments.map(comment => {
                const commentAuthor = allMembers.find(m => m.id === comment.author);
                const commentTime = new Date(comment.timestamp);
                
                return `
                    <div class="comment">
                        <div class="comment-header">
                            <span class="comment-avatar">${commentAuthor?.avatar}</span>
                            <span class="comment-author">${commentAuthor?.name}</span>
                            <span class="comment-timestamp">${this.formatRelativeTime(commentTime)}</span>
                        </div>
                        <p class="comment-content">${comment.content}</p>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="post-card">
                    <div class="post-header">
                        <div class="post-avatar">${author?.avatar}</div>
                        <div class="post-author-info">
                            <h4 class="post-author">${author?.name}</h4>
                            <p class="post-timestamp">${this.formatRelativeTime(timestamp)}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-footer">
                        <button class="post-action ${post.likes.includes(this.currentUser.id) ? 'liked' : ''}" 
                                onclick="app.toggleLike('${post.id}')">
                            <span>${post.likes.includes(this.currentUser.id) ? '❤️' : '🤍'}</span>
                            <span>${post.likes.length}</span>
                        </button>
                        <button class="post-action" onclick="app.toggleComments('${post.id}')">
                            <span>💬</span>
                            <span>${post.comments.length}</span>
                        </button>
                    </div>
                    ${post.comments.length > 0 ? `
                        <div class="post-comments" id="comments-${post.id}">
                            ${commentsHtml}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        const postsFeedEl = document.getElementById('posts-feed');
        if (postsFeedEl) {
            postsFeedEl.innerHTML = postsHtml;
        }
    }

    renderFamily() {
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        
        // Update family info
        const familyDisplayName = document.getElementById('family-display-name');
        const familyDisplayCode = document.getElementById('family-display-code');
        const familyCreatedDate = document.getElementById('family-created-date');
        
        if (familyDisplayName) familyDisplayName.textContent = this.currentFamily.familyName;
        if (familyDisplayCode) familyDisplayCode.textContent = this.currentFamily.familyCode;
        if (familyCreatedDate) familyCreatedDate.textContent = this.formatDate(new Date(this.currentFamily.familyHead.joinDate));
        
        // Render family members
        const membersHtml = allMembers.map(member => {
            const memberChores = this.appData.sampleChores.filter(c => c.assignedTo === member.id);
            const completedChores = memberChores.filter(c => c.status === 'completed').length;
            
            return `
                <div class="family-member-card">
                    <div class="member-avatar">${member.avatar}</div>
                    <h4 class="member-name">${member.name}</h4>
                    <p class="member-role">${member.role}</p>
                    <div class="member-stats">
                        <div class="member-stat">
                            <span class="member-stat-value">${member.points}</span>
                            <span class="member-stat-label">Points</span>
                        </div>
                        <div class="member-stat">
                            <span class="member-stat-value">${completedChores}</span>
                            <span class="member-stat-label">Completed</span>
                        </div>
                    </div>
                    <div class="member-actions">
                        ${this.currentUser.role === 'Family Head' && member.id !== this.currentUser.id ? 
                            `<button class="btn btn--sm btn--outline" onclick="app.removeMember('${member.id}')">Remove</button>` : ''}
                        <button class="btn btn--sm btn--primary" onclick="app.viewMemberProfile('${member.id}')">View</button>
                    </div>
                </div>
            `;
        }).join('');
        
        const familyMembersGrid = document.getElementById('family-members-grid');
        if (familyMembersGrid) {
            familyMembersGrid.innerHTML = membersHtml;
        }
    }

    renderProfile() {
        // Update profile info
        const profileAvatar = document.getElementById('profile-avatar');
        const profileName = document.getElementById('profile-name');
        const profileRole = document.getElementById('profile-role');
        const profilePoints = document.getElementById('profile-points');
        
        if (profileAvatar) profileAvatar.textContent = this.currentUser.avatar;
        if (profileName) profileName.textContent = this.currentUser.name;
        if (profileRole) profileRole.textContent = this.currentUser.role;
        if (profilePoints) profilePoints.textContent = this.currentUser.points;
        
        // Calculate rank
        const allMembers = [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
        const sortedMembers = allMembers.sort((a, b) => b.points - a.points);
        const rank = sortedMembers.findIndex(m => m.id === this.currentUser.id) + 1;
        const profileRank = document.getElementById('profile-rank');
        if (profileRank) profileRank.textContent = `#${rank}`;
        
        // Render achievements
        const achievementsHtml = this.appData.achievements.map(achievement => `
            <div class="achievement-card">
                <div class="achievement-icon">${achievement.icon}</div>
                <h5 class="achievement-name">${achievement.name}</h5>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-points">+${achievement.points} pts</div>
            </div>
        `).join('');
        const achievementsGrid = document.getElementById('achievements-grid');
        if (achievementsGrid) achievementsGrid.innerHTML = achievementsHtml;
        
        // Update activity stats
        const userChores = this.appData.sampleChores.filter(c => c.assignedTo === this.currentUser.id);
        const completedChores = userChores.filter(c => c.status === 'completed').length;
        const userPosts = this.appData.samplePosts.filter(p => p.author === this.currentUser.id).length;
        
        const choresCompletedEl = document.getElementById('chores-completed');
        const postsCreatedEl = document.getElementById('posts-created');
        const daysActiveEl = document.getElementById('days-active');
        
        if (choresCompletedEl) choresCompletedEl.textContent = completedChores;
        if (postsCreatedEl) postsCreatedEl.textContent = userPosts;
        if (daysActiveEl) daysActiveEl.textContent = this.calculateDaysActive();
    }

    // Modal functions
    openCreateChoreModal() {
        const modal = document.getElementById('create-chore-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const dueDateInput = document.getElementById('chore-due-date');
            if (dueDateInput) {
                dueDateInput.value = new Date().toISOString().split('T')[0];
            }
        }
    }

    openCreatePostModal() {
        const modal = document.getElementById('create-post-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    openAddMemberModal() {
        if (this.currentUser.role !== 'Family Head') {
            alert('Only the family head can add new members.');
            return;
        }
        const modal = document.getElementById('add-member-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(e) {
        const modalId = e.target.dataset.modal || e.target.closest('.modal').id;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    handleCreateChore(e) {
        e.preventDefault();
        
        const newChore = {
            id: 'chore' + (this.appData.sampleChores.length + 1),
            title: document.getElementById('chore-title').value,
            description: document.getElementById('chore-description').value,
            assignedTo: document.getElementById('chore-assignee').value,
            assignedBy: this.currentUser.id,
            category: document.getElementById('chore-category').value,
            points: parseInt(document.getElementById('chore-points').value),
            penalty: parseInt(document.getElementById('chore-penalty').value),
            dueDate: document.getElementById('chore-due-date').value,
            status: 'pending',
            priority: document.getElementById('chore-priority').value,
            recurring: document.getElementById('chore-recurring').checked ? 'weekly' : 'none',
            estimatedTime: document.getElementById('chore-time').value || '15 minutes'
        };
        
        this.appData.sampleChores.unshift(newChore);
        this.closeModal({ target: { dataset: { modal: 'create-chore-modal' } } });
        this.renderChoresList();
        
        // Reset form
        const form = document.getElementById('create-chore-form');
        if (form) form.reset();
        const dueDateInput = document.getElementById('chore-due-date');
        const pointsInput = document.getElementById('chore-points');
        const penaltyInput = document.getElementById('chore-penalty');
        
        if (dueDateInput) dueDateInput.value = new Date().toISOString().split('T')[0];
        if (pointsInput) pointsInput.value = '25';
        if (penaltyInput) penaltyInput.value = '5';
        
        this.showNotification(`Chore "${newChore.title}" created successfully!`);
    }

    handleCreatePost(e) {
        e.preventDefault();
        
        const newPost = {
            id: 'post' + (this.appData.samplePosts.length + 1),
            author: this.currentUser.id,
            content: document.getElementById('post-content').value,
            timestamp: new Date().toISOString(),
            likes: [],
            mediaType: 'text',
            comments: []
        };
        
        this.appData.samplePosts.unshift(newPost);
        this.closeModal({ target: { dataset: { modal: 'create-post-modal' } } });
        this.renderPosts();
        
        // Reset form
        const form = document.getElementById('create-post-form');
        if (form) form.reset();
        
        this.showNotification('Post created successfully!');
    }

    handleAddMember(e) {
        e.preventDefault();
        
        const newMember = {
            id: 'user' + (this.currentFamily.familyMembers.length + 10),
            name: document.getElementById('member-name').value,
            role: document.getElementById('member-role').value,
            avatar: document.getElementById('member-avatar').value,
            points: 0,
            age: parseInt(document.getElementById('member-age').value) || undefined,
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        this.currentFamily.familyMembers.push(newMember);
        this.closeModal({ target: { dataset: { modal: 'add-member-modal' } } });
        this.renderFamily();
        this.updateHeader();
        
        // Reset form
        const form = document.getElementById('add-member-form');
        if (form) form.reset();
        
        this.showNotification(`${newMember.name} added to the family!`);
    }

    // Action functions
    completeChore(choreId) {
        const chore = this.appData.sampleChores.find(c => c.id === choreId);
        if (chore) {
            chore.status = 'completed';
            chore.completedDate = new Date().toISOString().split('T')[0];
            
            // Award points
            const assignee = this.getAllMembers().find(m => m.id === chore.assignedTo);
            if (assignee) {
                assignee.points += chore.points;
                if (assignee.id === this.currentUser.id) {
                    this.currentUser.points = assignee.points;
                }
            }
            
            this.renderChoresList();
            this.updateHeader();
            
            // Show notification
            this.showNotification(`Great job! You earned ${chore.points} points for completing "${chore.title}"`);
        }
    }

    editChore(choreId) {
        alert('Chore editing functionality would be implemented here.');
    }

    toggleLike(postId) {
        const post = this.appData.samplePosts.find(p => p.id === postId);
        if (post) {
            const likeIndex = post.likes.indexOf(this.currentUser.id);
            if (likeIndex > -1) {
                post.likes.splice(likeIndex, 1);
            } else {
                post.likes.push(this.currentUser.id);
            }
            this.renderPosts();
        }
    }

    toggleComments(postId) {
        const commentsElement = document.getElementById(`comments-${postId}`);
        if (commentsElement) {
            commentsElement.style.display = commentsElement.style.display === 'none' ? 'block' : 'none';
        }
    }

    removeMember(memberId) {
        if (confirm('Are you sure you want to remove this family member?')) {
            const memberIndex = this.currentFamily.familyMembers.findIndex(m => m.id === memberId);
            if (memberIndex > -1) {
                const member = this.currentFamily.familyMembers[memberIndex];
                this.currentFamily.familyMembers.splice(memberIndex, 1);
                this.renderFamily();
                this.updateHeader();
                this.showNotification(`${member.name} removed from family.`);
            }
        }
    }

    viewMemberProfile(memberId) {
        alert(`View profile functionality for member ${memberId} would be implemented here.`);
    }

    toggleTheme(forceDark = null) {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        let isDark = forceDark !== null ? forceDark : !body.hasAttribute('data-color-scheme') || body.getAttribute('data-color-scheme') === 'light';
        
        if (isDark) {
            body.setAttribute('data-color-scheme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
            if (darkModeToggle) darkModeToggle.checked = true;
        } else {
            body.setAttribute('data-color-scheme', 'light');
            if (themeToggle) themeToggle.textContent = '🌙';
            if (darkModeToggle) darkModeToggle.checked = false;
        }
    }

    toggleNotifications() {
        const panel = document.getElementById('notifications-panel');
        if (panel) {
            panel.classList.toggle('hidden');
            
            if (!panel.classList.contains('hidden')) {
                this.renderNotifications();
            }
        }
    }

    hideNotifications() {
        const panel = document.getElementById('notifications-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }

    renderNotifications() {
        const userNotifications = this.appData.notifications.filter(n => n.userId === this.currentUser.id);
        const notificationsHtml = userNotifications.map(notification => {
            const timestamp = new Date(notification.timestamp);
            
            return `
                <div class="notification-item ${notification.read ? '' : 'unread'}">
                    <p class="notification-message">${notification.message}</p>
                    <div class="notification-time">${this.formatRelativeTime(timestamp)}</div>
                </div>
            `;
        }).join('');
        
        const notificationsList = document.getElementById('notifications-list');
        if (notificationsList) {
            notificationsList.innerHTML = notificationsHtml || '<p class="text-center">No notifications</p>';
        }
        
        // Mark as read
        userNotifications.forEach(n => n.read = true);
        this.updateHeader();
    }

    showNotification(message) {
        // Simple toast notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-size: 14px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.currentUser = null;
            this.currentFamily = null;
            this.showLogin();
        }
    }

    // Helper functions
    getAllMembers() {
        return [this.currentFamily.familyHead, ...this.currentFamily.familyMembers];
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    formatRelativeTime(date) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return this.formatDate(date);
    }

    calculateDaysActive() {
        const joinDate = new Date(this.currentUser.joinDate);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new FamilySyncApp();
    });
} else {
    app = new FamilySyncApp();
}