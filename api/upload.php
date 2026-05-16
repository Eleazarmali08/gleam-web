<?php
require_once 'config.php';
require_once 'auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verify admin
$user = verifyToken();
isAdmin($user['id']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    response(['error' => 'Method not allowed'], 405);
}

if (!isset($_FILES['image'])) {
    response(['error' => 'No image uploaded'], 400);
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
$maxSize = 5 * 1024 * 1024; // 5MB

// Validate file
if (!in_array($file['type'], $allowedTypes)) {
    response(['error' => 'Invalid file type. Only JPG, PNG, WebP allowed.'], 400);
}

if ($file['size'] > $maxSize) {
    response(['error' => 'File too large. Max 5MB.'], 400);
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = date('YmdHis') . '_' . uniqid() . '.' . $extension;

// Upload to Supabase Storage
$url = SUPABASE_URL . '/storage/v1/object/product-images/' . $filename;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($file['tmp_name']));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . SUPABASE_KEY,
    'Authorization: Bearer ' . SUPABASE_KEY,
    'Content-Type: ' . $file['type'],
    'x-upsert: true',
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 || $httpCode === 201) {
    // Get public URL
    $publicUrl = SUPABASE_URL . '/storage/v1/object/public/product-images/' . $filename;
    
    response([
        'success' => true,
        'url' => $publicUrl,
        'filename' => $filename,
    ]);
} else {
    response([
        'error' => 'Upload failed',
        'details' => json_decode($response, true),
    ], 500);
}
?>