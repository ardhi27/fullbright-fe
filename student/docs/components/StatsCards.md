# StatsCards

Kartu statistik ringkasan ujian.

## Import

```tsx
import { StatsCards } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `totalExams` | `number` | Ya | - | Total jumlah ujian |
| `inReviewCount` | `number` | Ya | - | Jumlah ujian dalam review |
| `doneCount` | `number` | Ya | - | Jumlah ujian selesai |
| `averageScore` | `string \| number` | Ya | - | Rata-rata skor |
| `examType` | `"ielts" \| "toefl"` | Ya | - | Tipe ujian untuk label |

## Contoh Penggunaan

```tsx
<StatsCards
  totalExams={12}
  inReviewCount={3}
  doneCount={9}
  averageScore="6.5"
  examType="ielts"
/>
```

## Struktur Komponen

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total IELTS  │ │  In Review   │ │   Selesai    │ │ Rata-rata    │
│     12       │ │      3       │ │      9       │ │    6.5       │
│              │ │   (amber)    │ │  (emerald)   │ │  (primary)   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

## Warna

| Kartu | Warna Nilai |
|-------|-------------|
| Total | Default |
| In Review | `text-amber-500` |
| Selesai | `text-emerald-500` |
| Rata-rata | `text-primary` |

## Responsive

- Desktop: 4 kolom grid (`grid-cols-4`)
- Mobile: 2 kolom grid (`grid-cols-2`)
