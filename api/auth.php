<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verify JWT Token
function verifyToken() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        response(['error' => 'Unauthorized - No token provided'], 401);
    }
    
    $token = $matches[1];
    
    // Verify with Supabase
    $url = SUPABASE_URL . '/auth/v1/user';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . $token,
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        response(['error' => 'Unauthorized - Invalid token'], 401);
    }
    
    return json_decode($response, true);
}

// Check if user is admin
function isAdmin($userId) {
    $profile = supabaseRequest("profiles?id=eq.$userId&select=role", 'GET');
    
    if (empty($profile) || $profile[0]['role'] !== 'admin') {
        response(['error' => 'Forbidden - Admin access required'], 403);
    }
    
    return true;
}

// Login endpoint
if ($_SERVER['REQUEST_URI'] === '/api/auth/login') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $url = SUPABASE_URL . '/auth/v1/token?grant_type=password';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'email' => $input['email'],
        'password' => $input['password'],
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Content-Type: application/json',
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        
        // Check admin role
        $profile = supabaseRequest("profiles?id=eq.{$data['user']['id']}&select=role", 'GET');
        
        if (empty($profile) || $profile[0]['role'] !== 'admin') {
            response(['error' => 'Akses ditolak. Bukan admin.'], 403);
        }
        
        response($data);
    } else {
        response(json_decode($response, true), $httpCode);
    }
}

// Verify token endpoint
if ($_SERVER['REQUEST_URI'] === '/api/auth/verify') {
    $user = verifyToken();
    isAdmin($user['id']);
    response(['user' => $user]);
}

// Logout endpoint
if ($_SERVER['REQUEST_URI'] === '/api/auth/logout') {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    $url = SUPABASE_URL . '/auth/v1/logout';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . $token,
    ]);
    
    curl_exec($ch);
    curl_close($ch);
    
    response(['message' => 'Logged out successfully']);
}
?>