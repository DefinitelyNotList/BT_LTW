<?php
require_once 'vendor/autoload.php'; // Nếu sử dụng Composer

// Tải các biến môi trường từ file .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Lấy thông tin kết nối từ biến môi trường
$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');

try {
    // Tạo kết nối PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Thiết lập chế độ xử lý lỗi cho PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Kết nối đến cơ sở dữ liệu thành công!";
} catch (PDOException $e) {
    // Xử lý lỗi kết nối
    echo "Kết nối không thành công: " . $e->getMessage();
    exit;
}
?>
