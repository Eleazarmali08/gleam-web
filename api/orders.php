<?php
require_once 'config.php';
require_once 'auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verify admin
$user = verifyToken();
isAdmin($user['id']);

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Get single order with items
            $order = supabaseRequest("orders?id=eq.$id&select=*,profiles(*),order_items(*)", 'GET');
            response($order[0] ?? null);
        } else {
            // Get all orders with filters
            $status = $_GET['status'] ?? '';
            $search = $_GET['search'] ?? '';
            $limit = $_GET['limit'] ?? '50';
            
            $query = "orders?select=*,profiles(full_name,email)&order=created_at.desc&limit=$limit";
            
            if ($status && $status !== 'all') {
                $query .= "&status=eq.$status";
            }
            
            if ($search) {
                $query .= "&order_number=ilike.*$search*";
            }
            
            $orders = supabaseRequest($query, 'GET');
            
            // Get item counts
            foreach ($orders as &$order) {
                $items = supabaseRequest("order_items?order_id=eq.{$order['id']}&select=id", 'GET');
                $order['item_count'] = count($items);
            }
            
            response($orders);
        }
        break;
        
    case 'PUT':
        if (!$id) {
            response(['error' => 'Order ID required'], 400);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        $updates = [];
        
        if (isset($input['status'])) {
            $updates['status'] = $input['status'];
            
            if ($input['status'] === 'paid') {
                $updates['paid_at'] = date('c');
            }
            if ($input['status'] === 'completed') {
                $updates['completed_at'] = date('c');
            }
        }
        
        if (isset($input['notes'])) {
            $updates['notes'] = $input['notes'];
        }
        
        if (!empty($updates)) {
            $updates['updated_at'] = date('c');
            supabaseRequest("orders?id=eq.$id", 'PATCH', $updates);
        }
        
        response(['message' => 'Order updated']);
        break;
        
    default:
        response(['error' => 'Method not allowed'], 405);
}
?>