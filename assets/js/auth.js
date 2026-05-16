// Auth Service for Gleam Admin
const auth = {
    async init() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token || !user) {
            this.redirectToLogin();
            return null;
        }

        // Verify token
        try {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                this.clear();
                this.redirectToLogin();
                return null;
            }
            return data.session.user;
        } catch (e) {
            this.clear();
            this.redirectToLogin();
            return null;
        }
    },

    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw new Error(error.message);

        // Check admin role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (profile?.role !== 'admin') {
            await supabase.auth.signOut();
            throw new Error('Akses ditolak. Bukan admin.');
        }

        // Save to localStorage
        localStorage.setItem('token', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data.user;
    },

    async logout() {
        await supabase.auth.signOut();
        this.clear();
        this.redirectToLogin();
    },

    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    redirectToLogin() {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user') || 'null');
    },

    isAdmin() {
        const user = this.getUser();
        return user?.role === 'admin';
    }
};