# Fix Vercel Deployment

## Masalah
Build gagal karena workspace dependencies tidak terinstall dengan benar.

## Solusi

File `vercel.json` sudah diperbaiki. Sekarang ikuti langkah ini:

### 1. Commit dan Push Perubahan

```bash
cd /Users/agungardhiyanda/Documents/GitHub/fullbright-project-preview-student

# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Fix vercel build configuration"

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/YOUR_USERNAME/fullbright-student-preview.git

# Push
git branch -M main
git push -u origin main
```

### 2. Redeploy di Vercel

Setelah push, Vercel akan otomatis redeploy dengan konfigurasi yang benar.

Atau manual trigger deploy:
1. Buka project di Vercel dashboard
2. Klik tab **Deployments**
3. Klik tombol **Redeploy** pada deployment terakhir

### 3. Verifikasi Konfigurasi di Vercel Dashboard

Pastikan setting di Vercel:

**Build & Development Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `.` (root, BUKAN student)
- **Build Command**: `npm run build`
- **Output Directory**: `student/dist`
- **Install Command**: `npm install`

### 4. Atau Gunakan Manual Override di Vercel

Jika `vercel.json` tidak work, override manual di dashboard:

1. Buka project → **Settings** → **General**
2. Scroll ke **Build & Development Settings**
3. Override:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `student/dist`

## Penjelasan Perubahan

**Sebelum (Salah):**
```json
{
  "buildCommand": "cd student && npm run build"
}
```
❌ Ini salah karena workspace belum terinstall

**Sesudah (Benar):**
```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build"
}
```
✅ Ini benar karena:
1. `npm install` di root akan install semua workspace (student + packages)
2. `npm run build` di root akan menjalankan build script yang sudah benar

## Expected Result

Build seharusnya sukses dengan output seperti ini:

```
✓ Installing dependencies
✓ Building student app
✓ Build completed
✓ Deploying to production
```

## Troubleshooting

### Jika masih error "cannot find module @fullbright/..."

Tambahkan di `package.json` root:

```json
{
  "scripts": {
    "postinstall": "npm install --workspaces"
  }
}
```

### Jika build timeout

Vercel free tier punya limit 45 detik untuk install. Jika terlalu lama:

1. Hapus `node_modules` dan `package-lock.json` di local
2. Run `npm install` untuk generate lockfile yang lebih efisien
3. Commit dan push

## Alternative: Deploy Tanpa Workspaces

Jika workspace tetap bermasalah, kita bisa flatten dependencies. Tapi coba solusi di atas dulu!
