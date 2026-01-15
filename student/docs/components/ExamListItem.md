# ExamListItem

Item dalam daftar ujian.

## Import

```tsx
import { ExamListItem } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `exam` | `ExamSession` | Ya | - | Data ujian |
| `onClick` | `() => void` | Ya | - | Callback saat item diklik |

## Contoh Penggunaan

```tsx
import { ExamListItem } from "@/components/dashboard";
import type { ExamSession } from "@/types/dashboard";

const ExamList = ({ exams }: { exams: ExamSession[] }) => {
  const [selectedExam, setSelectedExam] = useState<ExamSession | null>(null);

  return (
    <div className="divide-y divide-border">
      {exams.map((exam) => (
        <ExamListItem
          key={exam.id}
          exam={exam}
          onClick={() => setSelectedExam(exam)}
        />
      ))}
    </div>
  );
};
```

## Struktur Komponen

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌────┐  IELTS Academic  [IELTS]                                    │
│  │ 📄 │  📅 Dec 21, 2025  🕐 09:00  2h 45min     Overall    [Done] >│
│  └────┘  L: 7.0  R: 6.5  W1: 6.5  W2: 6.0        6.5/9             │
└─────────────────────────────────────────────────────────────────────┘
```

## Fitur

1. **Icon Tipe Ujian**: Warna berbeda untuk IELTS (primary) dan TOEFL (blue)
2. **Info Ujian**: Tanggal, waktu, durasi
3. **Section Scores Preview**: Skor per section dalam badge kecil
4. **Overall Score**: Skor keseluruhan dengan warna berdasarkan persentase
5. **Status Badge**: In Review (amber) atau Done (emerald)
6. **Hover Effect**: Background berubah saat hover

## Warna Skor

| Persentase | Warna |
|------------|-------|
| ≥ 75% | `text-emerald-500` |
| ≥ 50% | `text-primary` |
| < 50% | `text-amber-500` |

## Tipe ExamSession

```typescript
interface ExamSession {
  id: number;
  examType: "ielts" | "toefl";
  date: string;
  time: string;
  totalDuration: string;
  status: "in_review" | "done";
  userName: string;
  userInitials: string;
  overallBand?: number;      // IELTS
  totalScore?: number;       // TOEFL
  maxTotalScore?: number;    // TOEFL
  sections: IELTSSections | TOEFLSections;
}
```
