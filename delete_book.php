<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$sql = "DELETE FROM books WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'deleted']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
