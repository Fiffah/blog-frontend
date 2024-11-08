# Blog Frontend

## Deskripsi
Frontend aplikasi Single Page Application (SPA) untuk platform blog, dibangun menggunakan React dan terhubung ke backend Laravel. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, melihat daftar posting, membuat posting baru, serta mengedit dan menghapus posting.

## Fitur
- Register dan Login pengguna menggunakan Laravel Sanctum.
- Membuat, membaca, mengedit, dan menghapus posting.
- Terhubung dengan API Laravel di backend.
- Penyimpanan token menggunakan `localStorage`.

## Framework yang Digunakan
- **React** (Frontend)
- **Axios** (HTTP Requests)
- **React Router** (Navigasi)
- **Tailwind CSS** (Styling)

## Persyaratan
Pastikan Anda sudah menginstal:
- Node.js
- NPM atau Yarn

## Cara Menjalankan Frontend

1. **Clone Repository**
    ```bash
    git clone https://github.com/Fiffah/blog-frontend.git
    ```

2. **Instal Dependencies**
    ```bash
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. **Konfigurasi API URL**
   Buka file `api.js` dan pastikan `API_URL` sudah disesuaikan dengan URL backend Anda:
   ```javascript
   const API_URL = 'http://127.0.0.1:8000/api';
