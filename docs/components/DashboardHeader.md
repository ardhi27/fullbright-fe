# DashboardHeader

Header navigasi dengan logo, tombol kembali, dan logout.

## Import

```tsx
import { DashboardHeader } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `onBack` | `() => void` | Ya | - | Callback saat tombol kembali diklik |
| `onLogout` | `() => void` | Ya | - | Callback saat tombol logout diklik |
| `backLabel` | `string` | Tidak | `"Kembali"` | Label tombol kembali |

## Contoh Penggunaan

```tsx
import { DashboardHeader } from "@/components/dashboard";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <DashboardHeader
      onBack={() => navigate(-1)}
      onLogout={handleLogout}
      backLabel="Kembali ke Beranda"
    />
  );
};
```

## Struktur Komponen

```
┌─────────────────────────────────────────────────────────┐
│  [← Kembali]  [Logo]                          [Logout]  │
└─────────────────────────────────────────────────────────┘
```

## Dependensi

- `@/components/ui/button`
- `lucide-react` (ArrowLeft icon)
- `@/assets/logo.png`
