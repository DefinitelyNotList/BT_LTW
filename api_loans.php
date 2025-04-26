// api_loans.php
<?php
header('Content-Type: application/json');
include_once 'database.php';

// Lấy danh sách các đơn cho thuê/mượn
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/loans') {
    $query = "SELECT * FROM loans";
    $result = mysqli_query($conn, $query);
    $loans = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($loans);
}

// Thêm đơn cho thuê/mượn mới
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/loans') {
    $data = json_decode(file_get_contents('php://input'), true);
    $book_id = $data['book_id'];
    $user_id = $data['user_id'];
    $loan_date = $data['loan_date'];

    $query = "INSERT INTO loans (book_id, user_id, loan_date) VALUES ($book_id, $user_id, '$loan_date')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Loan added successfully']);
    } else {
        echo json_encode(['error' => 'Error adding loan']);
    }
}

// Cập nhật trạng thái trả sách
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && preg_match('/\/api\/loans\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $loanId = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    $returned = $data['returned'];

    $query = "UPDATE loans SET returned = $returned WHERE id = $loanId";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Loan updated successfully']);
    } else {
        echo json_encode(['error' => 'Error updating loan']);
    }
}

// Xóa đơn cho thuê/mượn
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && preg_match('/\/api\/loans\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $loanId = $matches[1];
    $query = "DELETE FROM loans WHERE id = $loanId";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Loan deleted successfully']);
    } else {
        echo json_encode(['error' => 'Error deleting loan']);
    }
}
?>
