
## 🚀 Cara Menjalankan Project
### 1. Prasyarat
 * Sudah menginstal Node.js dan NPM.
 * Sudah menginstal MariaDB (di Termux: pkg install mariadb).
 * MariaDB service sudah berjalan dan database sudah dibuat.
### 2. Instalasi
```bash
# Clone project atau masuk ke direktori
npm install

```
### 3. Konfigurasi Environment
Buat file .env di root folder dan sesuaikan kredensial database Anda:
```env
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/nama_database"
NODE_ENV="development"

```
### 4. Setup Database
```bash
# Generate file migrasi
npm run db:generate

# Push skema ke MariaDB
npm run db:push

# (Opsional) Jalankan seeder untuk mengisi 50 data dummy
npm run db:seed

```
### 5. Menjalankan Server
```bash
npm run dev

```
## 📡 API Endpoints
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | /ping | Cek status server |
| GET | /api/commissions | Ambil semua daftar komisi |
| POST | /api/commissions | Tambah komisi baru (Validated by Zod) |
| GET | /api/commissions/stats | Rekapitulasi pendapatan bulanan |

**Developed with on Termux by M. Febrian Syah (Rian)**

