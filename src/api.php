<?php
// Configuración de cabeceras para permitir peticiones desde React (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Responder con éxito a las peticiones de verificación de CORS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Carga automática de dependencias manejada por el servicio en la nube
require 'vendor/autoload.php';

// Cadena de conexión a MongoDB Atlas
$uri = "mongodb+srv://<acarbonell@mail.colsam.edu.co>:<1043681433>@bio-sayegh.g2oifj2.mongodb.net/?retryWrites=true&w=majority";

try {
    $client = new MongoDB\Client($uri);
    $db = $client->bio_sayegh_db;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión con MongoDB: " . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// -------------------------------------------------------------
// RUTA 1: Obtener todos los salones (GET api.php?action=salones)
// -------------------------------------------------------------
if ($method === 'GET' && $action === 'salones') {
    $collection = $db->salones;
    $cursor = $collection->find([], ['sort' => ['codigo' => 1]]);
    
    $salones = [];
    foreach ($cursor as $doc) {
        $doc['_id'] = (string)$doc['_id'];
        $salones[] = $doc;
    }
    
    echo json_encode($salones);
    exit();
}

// -------------------------------------------------------------
// RUTA 2: Obtener las categorías (GET api.php?action=categorias)
// -------------------------------------------------------------
if ($method === 'GET' && $action === 'categorias') {
    $collection = $db->categorias;
    $cursor = $collection->find([], ['sort' => ['codigo' => 1]]);
    
    $categorias = [];
    foreach ($cursor as $doc) {
        $doc['_id'] = (string)$doc['_id'];
        $categorias[] = $doc;
    }
    
    echo json_encode($categorias);
    exit();
}

// ----------------------------------------------------------------------
// RUTA 3: Sumar Eco-Puntos a un salón (POST api.php?action=sumar-puntos)
// ----------------------------------------------------------------------
if ($method === 'POST' && $action === 'sumar-puntos') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $codigo = $data['codigo'] ?? null;
    $puntos = (int)($data['puntos'] ?? 0);

    if (!$codigo) {
        http_response_code(400);
        echo json_encode(["error" => "Se requiere el código del salón (ej. '10-1')"]);
        exit();
    }

    $collection = $db->salones;
    $resultado = $collection->updateOne(
        ['codigo' => $codigo],
        ['$inc' => ['ecoPuntosTotales' => $puntos]]
    );

    echo json_encode([
        "success" => true,
        "mensaje" => "Se sumaron {$puntos} puntos al salón {$codigo}",
        "modificados" => $resultado->getModifiedCount()
    ]);
    exit();
}

// Si la acción no coincide con ninguna ruta
http_response_code(404);
echo json_encode(["error" => "Ruta o acción no encontrada"]);
?>