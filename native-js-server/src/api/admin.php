<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = 'localhost';
$dbname = 'u82378';
$username = 'u82378';
$password = '5427077';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Функция проверки администратора
function isAdmin($pdo, $login, $password) {
    $stmt = $pdo->prepare("SELECT id, login, password_hash, role FROM users WHERE login = :login");
    $stmt->execute([':login' => $login]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && $user['role'] === 'admin' && password_verify($password, $user['password_hash'])) {
        return $user;
    }
    return false;
}

// Проверка авторизации
function checkAuth($pdo) {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        return true;
    }
    
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (empty($auth) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    if (preg_match('/Basic\s+(.*)$/i', $auth, $matches)) {
        $credentials = base64_decode($matches[1]);
        list($login, $password) = explode(':', $credentials);
        
        $admin_data = isAdmin($pdo, $login, $password);
        if ($admin_data) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin_data['id'];
            $_SESSION['admin_login'] = $admin_data['login'];
            return true;
        }
    }
    
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    return false;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? '';

// GET /api/admin/check-auth
if ($method === 'GET' && $path === 'check-auth') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        echo json_encode(['authenticated' => true, 'login' => $_SESSION['admin_login']]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
    exit;
}

// POST /api/admin/logout
if ($method === 'POST' && $path === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

// Все остальные маршруты требуют авторизации
if (!checkAuth($pdo)) {
    exit;
}

// GET /api/admin/users
if ($method === 'GET' && $path === 'users') {
    $stmt = $pdo->prepare("
        SELECT u.*, 
               GROUP_CONCAT(pl.language_name SEPARATOR ', ') as languages
        FROM users u
        LEFT JOIN user_languages ul ON u.id = ul.user_id
        LEFT JOIN programming_languages pl ON ul.language_id = pl.id
        GROUP BY u.id
        ORDER BY u.created_at DESC
    ");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($users);
    exit;
}

// GET /api/admin/stats
if ($method === 'GET' && $path === 'stats') {
    // Статистика по языкам
    $stmt = $pdo->prepare("
        SELECT pl.language_name, COUNT(ul.user_id) as count 
        FROM programming_languages pl
        LEFT JOIN user_languages ul ON pl.id = ul.language_id
        GROUP BY pl.id
        ORDER BY count DESC
    ");
    $stmt->execute();
    $language_stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Общая статистика
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM users");
    $stmt->execute();
    $total_users = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    $stmt = $pdo->prepare("
        SELECT gender, COUNT(*) as count FROM users WHERE gender IS NOT NULL GROUP BY gender
    ");
    $stmt->execute();
    $gender_stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'total_users' => $total_users,
        'language_stats' => $language_stats,
        'gender_stats' => $gender_stats
    ]);
    exit;
}

// GET /api/admin/user/{id}
if ($method === 'GET' && preg_match('/^user\/(\d+)$/', $path, $matches)) {
    $id = $matches[1];
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        $stmt = $pdo->prepare("
            SELECT pl.language_name 
            FROM user_languages ul 
            JOIN programming_languages pl ON ul.language_id = pl.id 
            WHERE ul.user_id = :user_id
        ");
        $stmt->execute([':user_id' => $id]);
        $user['languages_list'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
    exit;
}

// PUT /api/admin/user/{id}
if ($method === 'PUT' && preg_match('/^user\/(\d+)$/', $path, $matches)) {
    $id = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $pdo->beginTransaction();
        
        $stmt = $pdo->prepare("
            UPDATE users 
            SET full_name = :full_name, phone = :phone, email = :email, 
                birth_date = :birth_date, gender = :gender, bio = :bio
            WHERE id = :id
        ");
        
        $stmt->execute([
            ':full_name' => $data['full_name'],
            ':phone' => $data['phone'],
            ':email' => $data['email'],
            ':birth_date' => $data['birth_date'] ?: null,
            ':gender' => $data['gender'] ?: null,
            ':bio' => $data['bio'] ?: null,
            ':id' => $id
        ]);
        
        // Обновление языков
        $stmt = $pdo->prepare("DELETE FROM user_languages WHERE user_id = :user_id");
        $stmt->execute([':user_id' => $id]);
        
        if (!empty($data['languages'])) {
            $placeholders = implode(',', array_fill(0, count($data['languages']), '?'));
            $stmt = $pdo->prepare("SELECT id FROM programming_languages WHERE language_name IN ($placeholders)");
            $stmt->execute($data['languages']);
            $language_ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            $stmt = $pdo->prepare("INSERT INTO user_languages (user_id, language_id) VALUES (:user_id, :language_id)");
            foreach ($language_ids as $lang_id) {
                $stmt->execute([':user_id' => $id, ':language_id' => $lang_id]);
            }
        }
        
        $pdo->commit();
        echo json_encode(['success' => true, 'message' => 'User updated successfully']);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Update failed: ' . $e->getMessage()]);
    }
    exit;
}

// DELETE /api/admin/user/{id}
if ($method === 'DELETE' && preg_match('/^user\/(\d+)$/', $path, $matches)) {
    $id = $matches[1];
    
    if ($id == $_SESSION['admin_id']) {
        http_response_code(400);
        echo json_encode(['error' => 'Cannot delete yourself']);
        exit;
    }
    
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $stmt->execute([':id' => $id]);
    
    echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
?>