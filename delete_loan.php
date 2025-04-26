<?php
$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli("localhost", "root", "", "library_management");

$stmt = $conn->prepare("DELETE FROM loans WHERE id = ?");
$stmt->bind_param("s", $data['id']);
$stmt->execute();

echo json_encode(["status" => "deleted"]);
?>
