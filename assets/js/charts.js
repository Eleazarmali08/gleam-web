// Chart Configurations for Gleam Admin
class GleamCharts {
    constructor() {
        this.charts = {};
        this.colors = {
            gold: '#D4AF37',
            goldDark: '#B8960C',
            goldLight: '#F4E4C1',
            blue: '#3B82F6',
            purple: '#8B5CF6',
            green: '#10B981',
            red: '#EF4444',
            orange: '#F59E0B',
            teal: '#14B8A6',
        };
    }

    destroyAll() {
        Object.values(this.charts).forEach(c => c.destroy());
        this.charts = {};
    }

    revenueChart(ctx, labels, data) {
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: data,
                    borderColor: this.colors.gold,
                    backgroundColor: this.hexToRgba(this.colors.gold, 0.1),
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: this.colors.gold,
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => 'Rp ' + ctx.parsed.y.toLocaleString('id-ID')
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => 'Rp ' + (value / 1000000).toFixed(0) + 'M'
                        }
                    }
                }
            }
        });
    }

    ordersChart(ctx, labels, data) {
        this.charts.orders = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Pesanan',
                    data: data,
                    backgroundColor: this.colors.gold,
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    }
                }
            }
        });
    }

    statusPieChart(ctx, labels, data, colors) {
        this.charts.status = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors || [
                        this.colors.orange,
                        this.colors.blue,
                        this.colors.purple,
                        this.colors.green,
                        this.colors.red,
                    ],
                    borderWidth: 2,
                    borderColor: '#fff',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    }
                }
            }
        });
    }

    topProductsChart(ctx, labels, data) {
        this.charts.products = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Terjual',
                    data: data,
                    backgroundColor: [
                        this.colors.gold,
                        this.colors.goldDark,
                        this.colors.goldLight,
                        '#E5C100',
                        '#C9A800',
                    ],
                    borderRadius: 6,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    }
                }
            }
        });
    }

    categoryChart(ctx, labels, data) {
        this.charts.category = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        this.hexToRgba(this.colors.gold, 0.7),
                        this.hexToRgba(this.colors.goldDark, 0.7),
                        this.hexToRgba(this.colors.goldLight, 0.7),
                        this.hexToRgba('#E5C100', 0.7),
                        this.hexToRgba('#C9A800', 0.7),
                    ],
                    borderWidth: 2,
                    borderColor: '#fff',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    }
                }
            }
        });
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Global instance
const gleamCharts = new GleamCharts();