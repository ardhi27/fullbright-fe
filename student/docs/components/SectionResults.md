# SectionResults

Menampilkan hasil section listening/reading dengan statistik dan daftar pertanyaan.

## Import

```tsx
import { SectionResults } from "@/components/dashboard";
```

## Props

| Prop | Type | Required | Default | Deskripsi |
|------|------|----------|---------|-----------|
| `title` | `string` | Ya | - | Judul section |
| `duration` | `string` | Tidak | - | Durasi section |
| `score` | `number` | Tidak | - | Skor yang didapat |
| `maxScore` | `number` | Tidak | - | Skor maksimal |
| `results` | `SectionResults` | Tidak | - | Data hasil (questions, correct, etc.) |

## Contoh Penggunaan

### Basic (tanpa results)

```tsx
<SectionResults
  title="Listening Comprehension"
  duration="30 min"
  score={7.0}
  maxScore={9}
/>
```

### Dengan Results

```tsx
<SectionResults
  title="Listening Comprehension"
  duration="30 min"
  score={7.0}
  maxScore={9}
  results={{
    correct: 30,
    incorrect: 5,
    unanswered: 5,
    total: 40,
    questions: [
      {
        id: 1,
        question: "What is the main topic?",
        options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
        userAnswer: "B",
        correctAnswer: "B",
      },
      // ... more questions
    ],
  }}
/>
```

## Struktur Komponen

```
┌─────────────────────────────────────────────────────────┐
│  Listening Comprehension              Band Score        │
│  Duration: 30 min                         7.0/9         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌───────────┐                │
│  │ ✓ 30    │  │ ✗ 5     │  │ − 5       │                │
│  │ Correct │  │Incorrect│  │Unanswered │                │
│  └─────────┘  └─────────┘  └───────────┘                │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │ 1  What is the main topic?           [Correct]  │    │
│  │    ○ A) Option 1                                │    │
│  │    ● B) Option 2  ✓                            │    │
│  │    ○ C) Option 3                                │    │
│  │    ○ D) Option 4                                │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 2  Another question?                [Incorrect] │    │
│  │    ...                                          │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Tipe SectionResults

```typescript
interface SectionResults {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  questions: QuestionOption[];
}

interface QuestionOption {
  id: number;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
}
```

## Warna

| Elemen | Warna |
|--------|-------|
| Correct | `emerald-500` |
| Incorrect | `primary` (red) |
| Unanswered | `muted-foreground` |
| Correct Badge | `bg-emerald-500` |
| Incorrect Badge | `bg-primary` |
