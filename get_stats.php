<?php
include 'db.php';

// Thống kê
$sql = "SELECT COUNT(*) AS total_books FROM books";
$stmt = $pdo->query($sql);
$totalBooks = $stmt->fetch(PDO::FETCH_ASSOC)['total_books'];

$sql = "SELECT COUNT(*) AS borrowed_books FROM loans WHERE returned = 0";
$stmt = $pdo->query($sql);
$borrowedBooks = $stmt->fetch(PDO::FETCH_ASSOC)['borrowed_books'];

$sql = "SELECT COUNT(*) AS returned_books FROM loans WHERE returned = 1";
$stmt = $pdo->query($sql);
$returnedBooks = $stmt->fetch(PDO::FETCH_ASSOC)['returned_books'];

// Danh sách sách mới nhất
$sql = "SELECT * FROM books ORDER BY id DESC LIMIT 5";
$stmt = $pdo->query($sql);
$latestBooks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Trả dữ liệu JSON
echo json_encode([
    'stats' => [
        'total_books' => (int)$totalBooks,
        'borrowed_books' => (int)$borrowedBooks,
        'returned_books' => (int)$returnedBooks
    ],
    'latest_books' => $latestBooks
]);
?>
