# Fullbright Student Preview

Student application untuk prototype/preview deployment.

## Struktur Project

```
fullbright-project-preview-student/
├── student/                 # Student app (dari apps/student)
├── packages/
│   ├── ui/                 # UI components
│   ├── lib/                # Shared libraries
│   ├── types/              # TypeScript types
│   └── permission/         # Permission utilities
├── package.json            # Root package.json
└── README.md
```

## Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

Server akan berjalan di `http://localhost:3000`

## Build for Deployment

```bash
# Build aplikasi
npm run build
```

File hasil build akan ada di folder `student/dist/`

## Deploy ke Hostinger

1. Build aplikasi dengan `npm run build`
2. Upload semua isi folder `student/dist/` ke hosting Anda
3. Pastikan file `.htaccess` sudah diupload untuk SPA routing

Lihat file `DEPLOYMENT_GUIDE.md` untuk panduan lengkap.

## Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Domain

Domain target: `fullbright-student-preview.online`
