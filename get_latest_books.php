<?php
include 'db.php';

$sql = "SELECT * FROM books ORDER BY id DESC LIMIT 5";  // Giới hạn 5 sách mới nhất
$stmt = $pdo->query($sql);
$latestBooks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($latestBooks);
?>
