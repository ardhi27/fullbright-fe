# ExamFilters

Komponen filter ujian: tabs tipe ujian, date picker, dan search.

## Import

```tsx
import { ExamFilters } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `examMode` | `"ielts" \| "toefl"` | Ya | - | Mode ujian aktif |
| `onExamModeChange` | `(mode: ExamType) => void` | Ya | - | Callback saat mode berubah |
| `dateFilter` | `Date \| undefined` | Ya | - | Tanggal filter yang dipilih |
| `onDateFilterChange` | `(date: Date \| undefined) => void` | Ya | - | Callback saat tanggal berubah |
| `searchQuery` | `string` | Ya | - | Query pencarian |
| `onSearchChange` | `(query: string) => void` | Ya | - | Callback saat search berubah |

## Contoh Penggunaan

```tsx
import { useState } from "react";
import { ExamFilters } from "@/components/dashboard";
import type { ExamType } from "@/types/dashboard";

const ExamList = () => {
  const [examMode, setExamMode] = useState<ExamType>("ielts");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ExamFilters
      examMode={examMode}
      onExamModeChange={setExamMode}
      dateFilter={dateFilter}
      onDateFilterChange={setDateFilter}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};
```

## Struktur Komponen

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────────┐      ┌──────────────┐ ┌─────────┐  │
│  │ IELTS │ TOEFL   │      │ Filter tgl ▼ │ │ 🔍 Cari │  │
│  └─────────────────┘      └──────────────┘ └─────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Fitur

1. **Tabs Tipe Ujian**: Toggle antara IELTS dan TOEFL ITP
2. **Date Picker**: Filter berdasarkan tanggal dengan kalender popup
3. **Clear Date**: Tombol X untuk menghapus filter tanggal
4. **Search Input**: Input pencarian dengan icon

## Dependensi

- `@/components/ui/button`
- `@/components/ui/input`
- `@/components/ui/calendar`
- `@/components/ui/popover`
- `lucide-react` (CalendarIcon, Search, X)
- `date-fns`
