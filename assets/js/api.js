// API Service for Gleam Admin
const API_BASE = '/api';

const api = {
    // Auth
    async login(email, password) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return res.json();
    },

    async verifyToken() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.json();
    },

    async logout() {
        const token = localStorage.getItem('token');
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        localStorage.removeItem('token');
    },

    // Products
    async getProducts(filters = {}) {
        const params = new URLSearchParams(filters);
        const res = await fetch(`${API_BASE}/products?${params}`);
        return res.json();
    },

    async getProduct(id) {
        const res = await fetch(`${API_BASE}/products/${id}`);
        return res.json();
    },

    async createProduct(data) {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async updateProduct(id, data) {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async deleteProduct(id) {
        const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
        return res.json();
    },

    // Orders
    async getOrders(filters = {}) {
        const params = new URLSearchParams(filters);
        const res = await fetch(`${API_BASE}/orders?${params}`);
        return res.json();
    },

    async updateOrder(id, data) {
        const res = await fetch(`${API_BASE}/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    // Dashboard
    async getDashboard(period = '7') {
        const res = await fetch(`${API_BASE}/dashboard?period=${period}`);
        return res.json();
    },

    // Upload
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
        });
        return res.json();
    }
};