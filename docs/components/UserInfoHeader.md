# UserInfoHeader

Header info user dengan gradient background.

## Import

```tsx
import { UserInfoHeader } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `userInitials` | `string` | Ya | - | Inisial nama user (2 huruf) |
| `userName` | `string` | Ya | - | Nama lengkap user |
| `subtitle` | `string` | Ya | - | Teks subtitle di bawah nama |
| `rightContent` | `ReactNode` | Tidak | - | Konten di sisi kanan (opsional) |

## Contoh Penggunaan

### Basic

```tsx
<UserInfoHeader
  userInitials="AR"
  userName="Ahmad Rizki"
  subtitle="Riwayat Ujian"
/>
```

### Dengan Right Content

```tsx
<UserInfoHeader
  userInitials="AR"
  userName="Ahmad Rizki"
  subtitle="IELTS Academic"
  rightContent={
    <div className="text-right text-primary-foreground">
      <p className="text-sm opacity-80">Total Ujian</p>
      <p className="text-3xl font-bold">12</p>
    </div>
  }
/>
```

### Dengan Badge dan Info

```tsx
<UserInfoHeader
  userInitials={selectedExam.userInitials}
  userName={selectedExam.userName}
  subtitle="IELTS Academic"
  rightContent={
    <div className="flex items-center gap-4">
      <Badge className="bg-emerald-500">Done</Badge>
      <div className="flex items-center gap-2 text-primary-foreground/80">
        <Calendar className="w-4 h-4" />
        <span>Dec 21, 2025</span>
      </div>
      <div className="text-right">
        <p className="text-sm text-primary-foreground/70">Overall</p>
        <p className="text-3xl font-bold text-primary-foreground">6.5</p>
      </div>
    </div>
  }
/>
```

## Struktur Komponen

```
┌─────────────────────────────────────────────────────────┐
│  ┌────┐                                                 │
│  │ AR │  Ahmad Rizki                    [rightContent]  │
│  └────┘  Riwayat Ujian                                  │
└─────────────────────────────────────────────────────────┘
          ↑ Gradient Background (primary → primary/80)
```

## Styling

- Background: Gradient dari `primary` ke `primary/80`
- Avatar: Circle dengan background `primary-foreground/20`
- Text: `primary-foreground` untuk kontras
