<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$title = $data['title'];
$author = $data['author'];
$category = $data['category'];
$quantity = $data['quantity'];

$sql = "UPDATE books SET title = :title, author = :author, category = :category, quantity = :quantity WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $id);
$stmt->bindParam(':title', $title);
$stmt->bindParam(':author', $author);
$stmt->bindParam(':category', $category);
$stmt->bindParam(':quantity', $quantity);

if ($stmt->execute()) {
    echo json_encode(['status' => 'updated']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
