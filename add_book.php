<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['title'];
$author = $data['author'];
$category = $data['category'];
$quantity = $data['quantity'];

$sql = "INSERT INTO books (title, author, category, quantity) VALUES (:title, :author, :category, :quantity)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':title', $title);
$stmt->bindParam(':author', $author);
$stmt->bindParam(':category', $category);
$stmt->bindParam(':quantity', $quantity);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
