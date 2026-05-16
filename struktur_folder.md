STRUKTUR PROYEK:

gleam-web/
├── index.html              # Landing Page
├── admin/
│   ├── login.html          # Admin Login
│   ├── dashboard.html      # Admin Dashboard
│   ├── products.html       # Product Management
│   ├── orders.html         # Order Management
│   ├── customers.html      # Customer Management
│   ├── analytics.html      # Analytics & Charts
│   └── settings.html       # Settings
├── api/
│   ├── config.php          # Supabase Connection
│   ├── auth.php            # JWT Authentication
│   ├── products.php        # Product CRUD API
│   ├── orders.php          # Order API
│   ├── dashboard.php       # Dashboard Stats API
│   └── upload.php          # Image Upload
├── assets/
│   ├── js/
│   │   ├── api.js          # API Service
│   │   ├── auth.js         # Auth Service
│   │   └── charts.js       # Chart.js Config
│   └── img/
│       └── logo.svg
├── .htaccess               # Rewrite Rules
└── README.md