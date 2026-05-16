<?php
require_once 'config.php';
require_once 'auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verify admin
$user = verifyToken();
isAdmin($user['id']);

// Get dashboard stats
$period = $_GET['period'] ?? '7'; // days

// Total Revenue
$orders = supabaseRequest('orders?select=total_price,status,created_at', 'GET');
$totalRevenue = array_sum(array_column($orders, 'total_price'));

// Orders by status
$statusCounts = ['pending' => 0, 'paid' => 0, 'processing' => 0, 'shipped' => 0, 'completed' => 0, 'cancelled' => 0];
foreach ($orders as $order) {
    $statusCounts[$order['status']] = ($statusCounts[$order['status']] ?? 0) + 1;
}

// Total products
$products = supabaseRequest('products?select=id,stock&is_active=eq.true', 'GET');
$totalProducts = count($products);
$lowStock = count(array_filter($products, fn($p) => $p['stock'] <= 5));

// Total customers
$customers = supabaseRequest('profiles?select=id&role=eq.customer', 'GET');
$totalCustomers = count($customers);

// Revenue this month
$monthStart = date('Y-m-01');
$monthOrders = array_filter($orders, fn($o) => $o['created_at'] >= $monthStart);
$monthRevenue = array_sum(array_column($monthOrders, 'total_price'));

// Daily revenue for chart
$since = date('Y-m-d', strtotime("-{$period} days"));
$dailyRevenue = [];
$dailyOrders = [];

foreach ($orders as $order) {
    if ($order['created_at'] >= $since) {
        $day = date('Y-m-d', strtotime($order['created_at']));
        $dailyRevenue[$day] = ($dailyRevenue[$day] ?? 0) + $order['total_price'];
        $dailyOrders[$day] = ($dailyOrders[$day] ?? 0) + 1;
    }
}

// Top products
$orderItems = supabaseRequest('order_items?select=product_name,quantity', 'GET');
$productSales = [];
foreach ($orderItems as $item) {
    $name = $item['product_name'];
    $productSales[$name] = ($productSales[$name] ?? 0) + $item['quantity'];
}
arsort($productSales);
$topProducts = array_slice($productSales, 0, 5);

// Response
response([
    'total_revenue' => $totalRevenue,
    'month_revenue' => $monthRevenue,
    'total_orders' => count($orders),
    'total_products' => $totalProducts,
    'low_stock' => $lowStock,
    'total_customers' => $totalCustomers,
    'status_counts' => $statusCounts,
    'daily_revenue' => $dailyRevenue,
    'daily_orders' => $dailyOrders,
    'top_products' => $topProducts,
    'pending_count' => $statusCounts['pending'],
    'avg_order_value' => count($orders) > 0 ? $totalRevenue / count($orders) : 0,
]);
?>