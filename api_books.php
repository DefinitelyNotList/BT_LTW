// api_books.php
<?php
header('Content-Type: application/json');
include_once 'database.php';

// Lấy danh sách sách
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/books') {
    $query = "SELECT * FROM books";
    $result = mysqli_query($conn, $query);
    $books = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($books);
}

// Thêm sách mới
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/books') {
    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $author = $data['author'];
    $category = $data['category'];
    $quantity = $data['quantity'];

    $query = "INSERT INTO books (title, author, category, quantity) VALUES ('$title', '$author', '$category', $quantity)";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Book added successfully']);
    } else {
        echo json_encode(['error' => 'Error adding book']);
    }
}

// Cập nhật thông tin sách
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && preg_match('/\/api\/books\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $bookId = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $author = $data['author'];
    $category = $data['category'];
    $quantity = $data['quantity'];

    $query = "UPDATE books SET title = '$title', author = '$author', category = '$category', quantity = $quantity WHERE id = $bookId";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Book updated successfully']);
    } else {
        echo json_encode(['error' => 'Error updating book']);
    }
}

// Xóa sách
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && preg_match('/\/api\/books\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $bookId = $matches[1];
    $query = "DELETE FROM books WHERE id = $bookId";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Book deleted successfully']);
    } else {
        echo json_encode(['error' => 'Error deleting book']);
    }
}
?>
