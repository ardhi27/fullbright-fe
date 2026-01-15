# ToeflScoreCard

Kartu skor untuk section TOEFL ITP.

## Import

```tsx
import { ToeflScoreCard } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `section` | `string` | Ya | - | Nama section (listening, structure, reading) |
| `score` | `number` | Ya | - | Skor yang didapat |
| `maxScore` | `number` | Ya | - | Skor maksimal |
| `label` | `string` | Ya | - | Label performa (Good, Excellent, Fair) |
| `description` | `string` | Tidak | - | Deskripsi section |

## Contoh Penggunaan

```tsx
<ToeflScoreCard
  section="listening"
  score={54}
  maxScore={68}
  label="Good"
  description="Kemampuan memahami percakapan & kuliah"
/>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <ToeflScoreCard
    section="listening"
    score={54}
    maxScore={68}
    label="Good"
    description="Kemampuan memahami percakapan & kuliah"
  />
  <ToeflScoreCard
    section="structure"
    score={56}
    maxScore={68}
    label="Excellent"
    description="Tata bahasa & struktur kalimat"
  />
  <ToeflScoreCard
    section="reading"
    score={52}
    maxScore={67}
    label="Good"
    description="Kemampuan memahami teks akademik"
  />
</div>
```

## Struktur Komponen

```
┌─────────────────────────────────────────┐
│  Listening Comprehension         54/68  │
│  ████████████████░░░░░░░░░░░░░░░  79%   │
│  [Good]   Kemampuan memahami...         │
└─────────────────────────────────────────┘
```

## Section Titles

| Section | Title |
|---------|-------|
| `listening` | Listening Comprehension |
| `reading` | Reading Comprehension |
| `structure` | Structure & Written Expression |

## Label Colors

| Label | Warna |
|-------|-------|
| Excellent | `text-emerald-500` |
| Good | `text-primary` |
| Fair/Lainnya | `text-amber-500` |

## Dependensi

- `@/components/ui/badge`
- `@/components/ui/progress`
