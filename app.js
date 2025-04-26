// js/app.js

// Gọi API lấy danh sách sách
async function fetchBooks() {
  try {
    const res = await fetch('php/get_books.php');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Lỗi khi lấy sách:', err);
    return [];
  }
}

// Gọi API lấy danh sách phiếu mượn
async function fetchLoans() {
  try {
    const res = await fetch('php/get_loans.php');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Lỗi khi lấy phiếu mượn:', err);
    return [];
  }
}

// Ví dụ dùng: load danh sách sách khi trang load
document.addEventListener('DOMContentLoaded', async () => {
  const books = await fetchBooks();
  console.log('Danh sách sách:', books);
});
