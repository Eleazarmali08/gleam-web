<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Get single product
            $product = supabaseRequest("products?id=eq.$id&select=*,product_images(*)");
            response($product);
        } else {
            // Get all products
            $products = supabaseRequest("products?select=*,product_images(*),categories(name)&order=created_at.desc");
            response($products);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $product = supabaseRequest('products', 'POST', $input);
        response($product, 201);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $product = supabaseRequest("products?id=eq.$id", 'PATCH', $input);
        response($product);
        break;
        
    case 'DELETE':
        supabaseRequest("products?id=eq.$id", 'DELETE');
        response(['message' => 'Product deleted']);
        break;
}
?>