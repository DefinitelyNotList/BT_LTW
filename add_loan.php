<?php
$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysqli("localhost", "root", "", "library_management");

$stmt = $conn->prepare("INSERT INTO loans (id, user_name, phone, cccd, book_title, loan_date, returned)
                        VALUES (?, ?, ?, ?, ?, ?, FALSE)");
$stmt->bind_param("ssssss", $data['id'], $data['user'], $data['phone'], $data['cccd'], $data['book'], $data['date']);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
