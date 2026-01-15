# Panduan Deploy ke fullbright-student-preview.online

## Quick Start

### 1. Build Aplikasi

```bash
# Di folder fullbright-project-preview-student
npm install
npm run build
```

File hasil build ada di: `student/dist/`

### 2. Deploy ke Vercel (Recommended - Gratis)

#### A. Persiapan
```bash
# Push ke GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### B. Deploy
1. Login ke [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Import dari GitHub
4. Konfigurasi:
   - **Root Directory**: `student`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Klik **Deploy**

#### C. Setup Custom Domain
1. Setelah deploy, buka project di Vercel
2. Klik **Settings** → **Domains**
3. Tambahkan domain: `fullbright-student-preview.online`
4. Vercel akan memberikan instruksi DNS

#### D. Setup DNS di Hostinger
1. Login ke Hostinger Panel
2. Pilih domain `fullbright-student-preview.online`
3. Buka **DNS/Nameservers**
4. Tambahkan record sesuai instruksi Vercel:
   - Type: `A`
   - Name: `@`
   - Points to: `76.76.21.21` (IP Vercel)

   atau

   - Type: `CNAME`
   - Name: `www`
   - Points to: `cname.vercel-dns.com`

5. Tunggu propagasi DNS (5-30 menit)

### 3. Deploy ke Netlify (Alternative - Gratis)

#### Cara 1: Drag & Drop
1. Build dulu: `npm run build`
2. Login ke [netlify.com](https://netlify.com)
3. Drag & drop folder `student/dist` ke Netlify
4. Setup custom domain di Settings → Domain Management

#### Cara 2: Git Deploy
1. Login ke Netlify
2. Import dari GitHub
3. Konfigurasi:
   - **Base directory**: `student`
   - **Build command**: `npm run build`
   - **Publish directory**: `student/dist`
4. Deploy

### 4. Deploy ke Cloudflare Pages (Alternative - Gratis)

1. Login ke [dash.cloudflare.com](https://dash.cloudflare.com)
2. Pilih **Workers & Pages**
3. Create a project → Connect to Git
4. Konfigurasi:
   - **Build command**: `cd student && npm run build`
   - **Build output directory**: `student/dist`
5. Deploy
6. Setup custom domain di Settings

## Update Website

Untuk Vercel/Netlify/Cloudflare dengan Git:
```bash
# Setelah ada perubahan code
git add .
git commit -m "Update website"
git push
```

Website akan auto-deploy!

## Troubleshooting

### Build Error
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Domain tidak bisa diakses
- Cek DNS sudah propagasi: `nslookup fullbright-student-preview.online`
- Tunggu hingga 24 jam untuk propagasi DNS global
- Clear browser cache (Ctrl+F5)

### 404 Error saat refresh
- Pastikan platform (Vercel/Netlify/Cloudflare) sudah setup SPA routing
- Vercel/Netlify/Cloudflare otomatis handle ini

## Environment Variables

Jika butuh API URL atau env variables:

### Vercel
1. Buka project di Vercel
2. Settings → Environment Variables
3. Tambahkan:
   - Key: `VITE_API_URL`
   - Value: `https://your-api-url.com`

### Netlify
1. Site Settings → Environment Variables
2. Tambahkan variabel yang dibutuhkan

### Build dengan Env Vars
```bash
# Local
VITE_API_URL=https://api.example.com npm run build
```

## Monitoring

- **Vercel**: Dashboard → Analytics
- **Netlify**: Site → Analytics
- **Cloudflare**: Analytics & Logs

## Biaya

Semua platform di atas **GRATIS** untuk:
- Unlimited deployments
- Custom domain
- SSL certificate otomatis
- CDN global

Tidak perlu bayar hosting!
