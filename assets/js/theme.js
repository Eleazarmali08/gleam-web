// ============================================
// GLEAM THEME SERVICE
// ============================================

const GleamTheme = {
    // Theme State
    isDark: localStorage.getItem('gleam-theme') === 'dark' || true,
    
    // ============================================
    // COLORS
    // ============================================
    colors: {
        light: {
            bg: '#F8F9FA',
            card: '#FFFFFF',
            sidebar: 'rgba(255,255,255,0.75)',
            text: '#1F1F1F',
            textSecondary: '#6B6B6B',
            gold: '#D4AF37',
            goldDark: '#B8960C',
            goldLight: '#F4E4C1',
            border: '#E5E7EB',
            shadow: '0 1px 3px rgba(0,0,0,0.06)',
            tableHover: 'rgba(0,0,0,0.02)',
            inputBg: '#F8F9FA',
            success: '#10B981',
            warning: '#F59E0B',
            danger: '#EF4444',
            info: '#3B82F6',
        },
        dark: {
            bg: '#1A1A1A',
            card: '#252525',
            sidebar: 'rgba(30,30,30,0.8)',
            text: '#F5F5F5',
            textSecondary: '#B0B0B0',
            gold: '#D4AF37',
            goldDark: '#B8960C',
            goldLight: '#F4E4C1',
            border: '#333333',
            shadow: '0 1px 3px rgba(0,0,0,0.3)',
            tableHover: 'rgba(255,255,255,0.02)',
            inputBg: '#1A1A1A',
            success: '#34D399',
            warning: '#FBBF24',
            danger: '#F87171',
            info: '#60A5FA',
        }
    },
    
    // Get current colors
    get current() {
        return this.colors[this.isDark ? 'dark' : 'light'];
    },
    
    // ============================================
    // ICONS (iOS SF Symbols style)
    // ============================================
    icons: {
        dashboard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
        products: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
        orders: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        customers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        analytics: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    },
    
    // ============================================
    // CHART CONFIG
    // ============================================
    chartDefaults: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#6B6B6B',
                    usePointStyle: true,
                    padding: 16,
                    font: { family: 'Inter, sans-serif', size: 12 }
                }
            }
        },
        scales: {
            x: {
                grid: { color: '#E5E7EB', drawBorder: false },
                ticks: { color: '#6B6B6B', font: { size: 11 } }
            },
            y: {
                grid: { color: '#E5E7EB', drawBorder: false },
                ticks: { color: '#6B6B6B', font: { size: 11 } }
            }
        }
    },
    
    chartColors: {
        gold: '#D4AF37',
        goldLight: 'rgba(212,175,55,0.1)',
        blue: '#3B82F6',
        purple: '#8B5CF6',
        green: '#10B981',
        orange: '#F59E0B',
        red: '#EF4444',
    },
    
    // ============================================
    // METHODS
    // ============================================
    
    // Initialize theme
    init() {
        this.applyTheme();
        this.setupToggle();
        this.watchSystemTheme();
    },
    
    // Apply theme to DOM
    applyTheme() {
        if (this.isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Set CSS variables
        const c = this.current;
        const root = document.documentElement;
        root.style.setProperty('--bg', c.bg);
        root.style.setProperty('--card-bg', c.card);
        root.style.setProperty('--sidebar-bg', c.sidebar);
        root.style.setProperty('--text', c.text);
        root.style.setProperty('--text-secondary', c.textSecondary);
        root.style.setProperty('--gold', c.gold);
        root.style.setProperty('--border', c.border);
        root.style.setProperty('--shadow', c.shadow);
        root.style.setProperty('--input-bg', c.inputBg);
        
        this.updateCharts();
    },
    
    // Toggle theme
    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('gleam-theme', this.isDark ? 'dark' : 'light');
        this.applyTheme();
    },
    
    // Setup toggle button
    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;
        
        if (this.isDark) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
        
        toggle.onclick = () => this.toggle();
    },
    
    // Watch system theme changes
    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('gleam-theme')) {
                this.isDark = e.matches;
                this.applyTheme();
            }
        });
    },
    
    // Update charts when theme changes
    updateCharts() {
        if (typeof Chart === 'undefined') return;
        
        const textColor = this.current.textSecondary;
        const gridColor = this.current.border;
        
        Object.values(Chart.instances).forEach(chart => {
            if (chart.options.scales?.x) {
                chart.options.scales.x.grid.color = gridColor;
                chart.options.scales.x.ticks.color = textColor;
            }
            if (chart.options.scales?.y) {
                chart.options.scales.y.grid.color = gridColor;
                chart.options.scales.y.ticks.color = textColor;
            }
            if (chart.options.plugins?.legend?.labels) {
                chart.options.plugins.legend.labels.color = textColor;
            }
            chart.update();
        });
    },
    
    // Get status badge HTML
    statusBadge(status) {
        const labels = {
            pending: 'Pending',
            paid: 'Dibayar',
            processing: 'Diproses',
            shipped: 'Dikirim',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        const colors = {
            pending: { bg: '#FEF3C7', text: '#92400E' },
            paid: { bg: '#DBEAFE', text: '#1E40AF' },
            processing: { bg: '#EDE9FE', text: '#6B21A8' },
            shipped: { bg: '#CCFBF1', text: '#115E59' },
            completed: { bg: '#D1FAE5', text: '#065F46' },
            cancelled: { bg: '#FEE2E2', text: '#991B1B' }
        };
        const c = colors[status] || colors.pending;
        return `<span style="background:${c.bg};color:${c.text};padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;">${labels[status] || status}</span>`;
    },
    
    // Format price
    formatPrice(price) {
        return 'Rp ' + (price || 0).toLocaleString('id-ID');
    },
    
    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    },
    
    // Render sidebar
    renderSidebar(activePage) {
        const pages = [
            { id: 'dashboard', icon: this.icons.dashboard, label: 'Dashboard', href: 'dashboard.html' },
            { id: 'products', icon: this.icons.products, label: 'Produk', href: 'products.html' },
            { id: 'orders', icon: this.icons.orders, label: 'Pesanan', href: 'orders.html' },
            { id: 'customers', icon: this.icons.customers, label: 'Pelanggan', href: 'customers.html' },
            { id: 'analytics', icon: this.icons.analytics, label: 'Analitik', href: 'analytics.html' },
            { id: 'settings', icon: this.icons.settings, label: 'Pengaturan', href: 'settings.html' },
        ];
        
        return `
            <aside class="sidebar">
                <div class="logo">💎 GLEAM</div>
                <nav class="flex-1">
                    ${pages.map(p => `
                        <a href="${p.href}" class="nav-item ${p.id === activePage ? 'active' : ''}">
                            <span class="nav-icon">${p.icon}</span> ${p.label}
                        </a>
                    `).join('')}
                </nav>
                <div class="sidebar-footer">
                    <div class="theme-toggle-row">
                        <span>🌙 Dark Mode</span>
                        <div class="toggle-track ${this.isDark ? 'active' : ''}" id="themeToggle">
                            <div class="toggle-thumb"></div>
                        </div>
                    </div>
                    <button onclick="GleamTheme.logout()" class="logout-btn">
                        ${this.icons.logout} Logout
                    </button>
                </div>
            </aside>
        `;
    },
    
    // Create chart
    createChart(canvasId, type, data, options = {}) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if (!ctx) return null;
        
        return new Chart(ctx, {
            type,
            data,
            options: { ...this.chartDefaults, ...options }
        });
    },
    
    // Line chart helper
    lineChart(canvasId, labels, data, label = 'Revenue') {
        return this.createChart(canvasId, 'line', {
            labels,
            datasets: [{
                label,
                data,
                borderColor: this.chartColors.gold,
                backgroundColor: this.chartColors.goldLight,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            }]
        }, {
            plugins: { legend: { display: false } }
        });
    },
    
    // Doughnut chart helper
    doughnutChart(canvasId, labels, data, colors) {
        return this.createChart(canvasId, 'doughnut', {
            labels,
            datasets: [{
                data,
                backgroundColor: colors || Object.values(this.chartColors),
                borderWidth: 2,
                borderColor: '#fff',
            }]
        });
    },
    
    // Bar chart helper
    barChart(canvasId, labels, data, label = 'Total') {
        return this.createChart(canvasId, 'bar', {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: this.chartColors.gold,
                borderRadius: 8,
            }]
        }, {
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        });
    },
    
    // Logout
    async logout() {
        if (typeof supabaseClient !== 'undefined') {
            await supabaseClient.auth.signOut();
        }
        window.location.href = 'login.html';
    },
    
    // Check auth
    async checkAuth() {
        if (typeof supabaseClient === 'undefined') return;
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) window.location.href = 'login.html';
        return session;
    }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    GleamTheme.init();
});