<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Supabase Configuration
define('SUPABASE_URL', 'https://ztrdiuvfczylzqsrrkhe.supabase.co');
define('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cmRpdXZmY3p5bHpxc3Jya2hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzkyNTg5NCwiZXhwIjoyMDkzNTAxODk0fQ.ci4ETmM2ONqbIHtyBcKdsWTQy5-pHjq8k7LqFR8OC_k'); // Gunakan service_role key untuk API
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0cmRpdXZmY3p5bHpxc3Jya2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjU4OTQsImV4cCI6MjA5MzUwMTg5NH0.0roGvDQaWONGkPV1s-uRen2seoLdXkckHq03F6cQTyw');

// JWT Secret
define('JWT_SECRET', 'your-secret-key');

function supabaseRequest($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;
    
    $headers = [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
        'Content-Type: application/json',
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

function response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}
?>
