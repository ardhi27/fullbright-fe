# 🚀 Quick Start Guide

Deploy aplikasi student ke `fullbright-student-preview.online` dalam 5 menit!

## Opsi 1: Deploy ke Vercel (Termudah & Gratis) ⭐

### Step 1: Push ke GitHub
```bash
cd /Users/agungardhiyanda/Documents/GitHub/fullbright-project-preview-student

# Initialize Git
git init
git add .
git commit -m "Initial commit - student preview app"

# Push ke GitHub (buat repo baru dulu di github.com)
git remote add origin https://github.com/YOUR-USERNAME/fullbright-student-preview.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) dan login dengan GitHub
2. Klik **"Add New Project"**
3. Pilih repository `fullbright-student-preview`
4. Konfigurasi:
   - Root Directory: `student`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Klik **Deploy**
6. Tunggu 2-3 menit ✅

### Step 3: Setup Domain Custom
1. Di Vercel dashboard, buka project Anda
2. Klik **Settings** → **Domains**
3. Tambahkan: `fullbright-student-preview.online`
4. Vercel akan kasih DNS instructions

### Step 4: Update DNS di Hostinger
1. Login ke [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Pilih domain **fullbright-student-preview.online**
3. Buka **DNS/Nameservers**
4. Tambahkan A Record:
   - Type: `A`
   - Name: `@`
   - Points to: `76.76.21.21`
   - TTL: `3600`
5. Tunggu 5-30 menit untuk propagasi

### ✅ Done!
Website Anda live di: `https://fullbright-student-preview.online`

---

## Opsi 2: Deploy Manual ke Hostinger Hosting

Jika Anda punya shared hosting di Hostinger:

### Step 1: Build
```bash
cd /Users/agungardhiyanda/Documents/GitHub/fullbright-project-preview-student
npm install
npm run build
```

### Step 2: Upload
1. Login ke Hostinger Panel
2. Buka **File Manager**
3. Masuk ke `public_html`
4. Hapus semua file default
5. Upload **semua isi** folder `student/dist/`
   - index.html
   - assets/
   - dll
6. Upload juga file `student/.htaccess`

### Step 3: Test
Buka `https://fullbright-student-preview.online`

---

## Update Website (Setelah Deploy)

### Untuk Vercel (Auto Deploy):
```bash
git add .
git commit -m "Update website"
git push
```
Website otomatis update dalam 2-3 menit! 🎉

### Untuk Manual Hosting:
```bash
npm run build
# Upload ulang isi folder student/dist/ ke hosting
```

---

## Commands

```bash
# Development
npm run dev          # Run di http://localhost:3000

# Production
npm run build        # Build untuk production
npm run preview      # Preview production build

# Linting
npm run lint         # Check code quality
```

---

## Troubleshooting

### ❌ Build error
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ❌ Domain belum bisa diakses
- Tunggu propagasi DNS (hingga 30 menit)
- Clear browser cache (Ctrl + F5)
- Cek DNS: `nslookup fullbright-student-preview.online`

### ❌ 404 saat refresh page
- Vercel: Sudah auto-handle ✅
- Manual hosting: Pastikan `.htaccess` sudah diupload

---

## Support

Butuh bantuan? Lihat file:
- `DEPLOYMENT.md` - Panduan lengkap deployment
- `README.md` - Dokumentasi project

---

**Rekomendasi:** Gunakan **Vercel (Opsi 1)** karena:
- ✅ Gratis selamanya
- ✅ Auto deploy dari Git
- ✅ SSL certificate otomatis
- ✅ CDN global (website cepat)
- ✅ No maintenance required
