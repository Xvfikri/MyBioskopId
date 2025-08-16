# 🎬 MyBioskopId - Katalog Film & Acara TV

Aplikasi web yang responsif dan kaya fitur untuk menjelajahi katalog film dan acara TV, dibangun menggunakan Vue 3, TypeScript, dan The Movie Database (TMDB) API. Proyek ini dibuat sebagai bagian dari tes seleksi Frontend Developer.

**[➡️ Lihat Live Demo](https://my-bioskop-id-b3z1.vercel.app/)**

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: Vue 3 (Composition API)
- **Bahasa**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Code Quality**: ESLint & Prettier


## 🚀 Instalasi dan Penggunaan

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

#### 1. Clone Repositori
```bash
git clone [https://github.com/Xvfikri/MyBioskopId.git](https://github.com/Xvfikri/MyBioskopId.git)

cd MyBioskopId
```

#### 2. Install Dependensi
```bash
npm install
```

#### 3. Siapkan Environment Variable
Anda memerlukan API Key dari The Movie Database (TMDB) agar aplikasi dapat mengambil data.

1.  Buat file baru di direktori utama proyek bernama `.env.local`
2.  Salin dan tempel baris berikut ke dalam file tersebut:
    ```
    VITE_TMDB_API_KEY=kunci_api_tmdb_anda_di_sini
    ```
3.  Ganti `kunci_api_tmdb_anda_di_sini` dengan API Key v3 Anda. Anda bisa mendapatkannya secara gratis di [situs TMDB](https://www.themoviedb.org/settings/api).

#### 4. Jalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`.

## 📜 Skrip yang Tersedia

- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Membuat *build* aplikasi untuk produksi.
- `npm run preview`: Menjalankan server lokal untuk pratinjau hasil *build* produksi.
- `npm run format`: Merapikan format kode menggunakan Prettier.
- `npm run lint`: Menganalisis kode untuk menemukan potensi error dengan ESLint.
