<?php
$conn = new mysqli("localhost", "root", "", "library_management");
$result = $conn->query("SELECT * FROM loans");
$loans = [];

while ($row = $result->fetch_assoc()) {
    $loans[] = $row;
}
echo json_encode($loans);
?>
