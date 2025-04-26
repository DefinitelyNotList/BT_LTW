CREATE DATABASE library_management;
USE library_management;

-- Tạo bảng books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT DEFAULT 1
);

-- Tạo bảng loans
CREATE TABLE loans (
    id VARCHAR(10) PRIMARY KEY,
    user_name VARCHAR(100),
    phone VARCHAR(20),
    cccd VARCHAR(20),
    book_id INT NOT NULL,   books
    loan_date DATE NOT NULL,
    return_date DATE,
    returned BOOLEAN DEFAULT 0,  
    FOREIGN KEY (book_id) REFERENCES books(id)
);
