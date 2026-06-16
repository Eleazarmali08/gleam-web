// ============================================
// GLEAM THEME SERVICE - WHITE GOLD + DARK MODE
// ============================================

const GleamTheme = {
    // Default: White Gold (light)
    isDark: localStorage.getItem('gleam-theme') === 'dark',

    // ============================================
    // COLORS
    // ============================================
    colors: {
        light: {
            bg: '#F8F9FA',
            card: 'rgba(255, 255, 255, 0.7)',
            sidebar: 'rgba(255, 255, 255, 0.75)',
            text: '#1F1F1F',
            textSecondary: '#6B6B6B',
            gold: '#D4AF37',
            goldDark: '#B8960C',
            border: 'rgba(0, 0, 0, 0.06)',
            shadow: '0 4px 20px rgba(0,0,0,0.04)',
            inputBg: '#F8F9FA',
            hoverBg: 'rgba(212,175,55,0.06)',
        },
        dark: {
            bg: '#0f1115',
            card: 'rgba(255, 255, 255, 0.04)',
            sidebar: 'rgba(26, 26, 26, 0.45)',
            text: '#F5F5F5',
            textSecondary: 'rgba(255,255,255,0.5)',
            gold: '#D4AF37',
            goldDark: '#B8960C',
            border: 'rgba(255, 255, 255, 0.08)',
            shadow: '0 8px 32px 0 rgba(0,0,0,0.2)',
            inputBg: 'rgba(255,255,255,0.05)',
            hoverBg: 'rgba(255,255,255,0.06)',
        }
    },

    get current() {
        return this.colors[this.isDark ? 'dark' : 'light'];
    },

    // ============================================
    // INIT
    // ============================================
    init() {
        this.applyTheme();
        this.setupToggle();
        this.injectStyles();
    },

    // ============================================
    // APPLY THEME
    // ============================================
    applyTheme() {
        const c = this.current;
        const root = document.documentElement;

        root.style.setProperty('--bg', c.bg);
        root.style.setProperty('--card-bg', c.card);
        root.style.setProperty('--sidebar-bg', c.sidebar);
        root.style.setProperty('--text', c.text);
        root.style.setProperty('--text-secondary', c.textSecondary);
        root.style.setProperty('--gold', c.gold);
        root.style.setProperty('--gold-dark', c.goldDark);
        root.style.setProperty('--border', c.border);
        root.style.setProperty('--shadow', c.shadow);
        root.style.setProperty('--input-bg', c.inputBg);
        root.style.setProperty('--hover-bg', c.hoverBg);

        document.body.style.backgroundColor = c.bg;
        document.body.style.color = c.text;

        if (this.isDark) {
            document.body.style.backgroundImage = `
                radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(244, 63, 94, 0.15) 0px, transparent 50%)
            `;
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundAttachment = 'scroll';
        }

        this.updateCharts();
    },

    // ============================================
    // TOGGLE
    // ============================================
    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('gleam-theme', this.isDark ? 'dark' : 'light');
        this.applyTheme();
        this.setupToggle();
    },

    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        const thumb = document.getElementById('toggleThumb');
        if (!toggle || !thumb) return;

        if (this.isDark) {
            toggle.style.background = '#D4AF37';
            thumb.style.right = '2px';
            thumb.style.left = 'auto';
        } else {
            toggle.style.background = '#D1D5DB';
            thumb.style.left = '2px';
            thumb.style.right = 'auto';
        }

        toggle.onclick = () => this.toggle();
    },

    // ============================================
    // INJECT GLOBAL STYLES
    // ============================================
    injectStyles() {
        if (document.getElementById('gleam-theme-styles')) return;

        const style = document.createElement('style');
        style.id = 'gleam-theme-styles';
        style.textContent = `
            * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }

            .glass-sidebar {
                background: var(--sidebar-bg);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-right: 1px solid var(--border);
            }

            .glass-card {
                background: var(--card-bg);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid var(--border);
                box-shadow: var(--shadow);
                border-radius: 16px;
            }

            .glass-stat-card {
                background: var(--card-bg);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid var(--border);
                border-left: 4px solid var(--gold);
                box-shadow: var(--shadow);
                border-radius: 16px;
                padding: 24px;
            }

            .glass-nav-active {
                background: linear-gradient(135deg, var(--gold), var(--gold-dark));
                box-shadow: 0 4px 15px rgba(214, 175, 55, 0.3);
                color: white !important;
            }

            .glass-nav-hover:hover {
                background: var(--hover-bg);
                border: 1px solid var(--border);
            }

            .btn-gold {
                background: linear-gradient(135deg, var(--gold), var(--gold-dark));
                color: white;
                box-shadow: 0 4px 15px rgba(214, 175, 55, 0.25);
                transition: all 0.3s ease;
            }

            .btn-gold:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(214, 175, 55, 0.4);
            }

            input, select, textarea {
                background: var(--input-bg);
                border: 1px solid var(--border);
                color: var(--text);
                border-radius: 12px;
                padding: 12px 16px;
                font-size: 14px;
            }

            input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: var(--gold);
                box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
            }

            table th {
                color: var(--text-secondary) !important;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 11px;
            }

            table td {
                color: var(--text);
                border-bottom: 1px solid var(--border);
                word-break: break-word;
                overflow-wrap: break-word;
            }

            table tr:hover td {
                background: var(--hover-bg);
            }

            table {
                border-collapse: collapse;
            }

            .glass-card.overflow-x-auto {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
        `;
        document.head.appendChild(style);
    },

    // ============================================
    // CHART HELPERS
    // ============================================
    updateCharts() {
        if (typeof Chart === 'undefined') return;
        Chart.defaults.color = this.current.textSecondary;
        Chart.defaults.borderColor = this.current.border;
        if (this.chartInstances) {
            Object.values(this.chartInstances).forEach(c => {
                if (c && typeof c.update === 'function') c.update();
            });
        }
    },

    lineChart(canvasId, labels, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy old chart if exists
        if (this.chartInstances && this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }
        
        if (!this.chartInstances) this.chartInstances = {};
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Revenue',
                    data,
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212,175,55,0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#D4AF37',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 800 },
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        grid: { color: this.current.border },
                        beginAtZero: true
                    },
                    x: { grid: { display: false } }
                }
            }
        });
        
        this.chartInstances[canvasId] = chart;
        return chart;
    },

    doughnutChart(canvasId, labels, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy old chart if exists
        if (this.chartInstances && this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }
        
        if (!this.chartInstances) this.chartInstances = {};
        
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#FBBF24', '#3B82F6', '#8B5CF6', '#10B981', '#EF4444'],
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 800 },
                plugins: {
                    legend: { 
                        position: 'right', 
                        labels: { 
                            boxWidth: 12, 
                            padding: 15,
                            color: this.current.textSecondary
                        } 
                    }
                }
            }
        });
        
        this.chartInstances[canvasId] = chart;
        return chart;
    },

    destroyCharts() {
        if (this.chartInstances) {
            Object.values(this.chartInstances).forEach(c => {
                if (c && typeof c.destroy === 'function') c.destroy();
            });
            this.chartInstances = {};
        }
    },

    // ============================================
    // HELPERS
    // ============================================
    formatPrice(price) {
        return 'Rp ' + (price || 0).toLocaleString('id-ID');
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    },

    statusBadge(status) {
        const badges = {
            pending: { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24', label: 'Pending' },
            paid: { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6', label: 'Dibayar' },
            processing: { bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6', label: 'Diproses' },
            shipped: { bg: 'rgba(20,184,166,0.15)', color: '#14B8A6', label: 'Dikirim' },
            completed: { bg: 'rgba(16,185,129,0.15)', color: '#10B981', label: 'Selesai' },
            cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#EF4444', label: 'Dibatalkan' },
        };
        const b = badges[status] || badges.pending;
        return `<span style="background:${b.bg};color:${b.color};padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid ${b.color}30">${b.label}</span>`;
    },

    // ============================================
    // SIDEBAR HTML
    // ============================================
    renderSidebar(activePage) {
        const pages = [
            { id: 'dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Dashboard', href: 'dashboard.html' },
            { id: 'products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Produk', href: 'products.html' },
            { id: 'orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', label: 'Pesanan', href: 'orders.html' },
            { id: 'customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Pelanggan', href: 'customers.html' },
            { id: 'analytics', icon: 'M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z', label: 'Analitik', href: 'analytics.html' },
            { id: 'settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', label: 'Pengaturan', href: 'settings.html' },
        ];

        return `
            <aside class="glass-sidebar w-64 text-white p-6 flex flex-col min-h-screen" role="navigation">
                <div class="text-2xl font-bold text-gold-500 mb-8 tracking-wider">GLEAM</div>
                <nav class="flex-1 space-y-2">
                    ${pages.map(p => `
                        <a href="${p.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${p.id === activePage ? 'glass-nav-active text-white' : 'text-gray-300 glass-nav-hover border border-transparent'}">
                            <svg class="w-5 h-5 ${p.id === activePage ? 'text-white' : 'text-gray-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${p.icon}"></path></svg>
                            ${p.label}
                        </a>
                    `).join('')}
                </nav>
                <div style="border-top: 1px solid var(--border); margin-top: 16px; padding-top: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; margin-bottom: 8px;">
                        <span style="font-size: 13px; color: var(--text-secondary);">${this.isDark ? '🌙' : '☀️'} Dark Mode</span>
                        <div id="themeToggle" style="width: 44px; height: 24px; background: ${this.isDark ? '#D4AF37' : '#D1D5DB'}; border-radius: 12px; cursor: pointer; position: relative; transition: all 0.3s;">
                            <div id="toggleThumb" style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; ${this.isDark ? 'right: 2px;' : 'left: 2px;'} transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
                        </div>
                    </div>
                    <button onclick="GleamTheme.logout()" class="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl w-full transition-colors font-medium">
                        <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </aside>
        `;
    },

    // ============================================
    // AUTH
    // ============================================
    async checkAuth() {
        if (typeof supabaseClient === 'undefined') return null;
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) window.location.href = 'login.html';
        return session;
    },

    async logout() {
        if (typeof supabaseClient !== 'undefined') {
            await supabaseClient.auth.signOut();
        }
        window.location.href = 'login.html';
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => GleamTheme.init());