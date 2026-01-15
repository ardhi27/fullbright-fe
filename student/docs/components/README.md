# Dashboard Components

Dokumentasi komponen-komponen Dashboard yang telah dipisahkan menjadi modul-modul reusable.

## Daftar Komponen

| Komponen | Deskripsi | Dokumentasi |
|----------|-----------|-------------|
| [DashboardHeader](./DashboardHeader.md) | Header navigasi dengan logo, tombol kembali & logout | [Lihat](./DashboardHeader.md) |
| [UserInfoHeader](./UserInfoHeader.md) | Info user dengan background gradient | [Lihat](./UserInfoHeader.md) |
| [ExamFilters](./ExamFilters.md) | Filter tipe ujian, tanggal, dan pencarian | [Lihat](./ExamFilters.md) |
| [StatsCards](./StatsCards.md) | Kartu ringkasan statistik | [Lihat](./StatsCards.md) |
| [ExamListItem](./ExamListItem.md) | Item dalam daftar ujian | [Lihat](./ExamListItem.md) |
| [SectionResults](./SectionResults.md) | Hasil section dengan pertanyaan | [Lihat](./SectionResults.md) |
| [ToeflScoreCard](./ToeflScoreCard.md) | Kartu skor TOEFL per section | [Lihat](./ToeflScoreCard.md) |

## Struktur Folder

```
src/
├── components/
│   └── dashboard/
│       ├── index.ts              # Export barrel
│       ├── DashboardHeader.tsx
│       ├── UserInfoHeader.tsx
│       ├── ExamFilters.tsx
│       ├── StatsCards.tsx
│       ├── ExamListItem.tsx
│       ├── SectionResults.tsx
│       └── ToeflScoreCard.tsx
├── types/
│   └── dashboard.ts              # Type definitions
├── data/
│   └── mockExamSessions.ts       # Mock data
└── pages/
    └── Dashboard.tsx             # Main page
```

## Import

Semua komponen bisa diimport dari barrel file:

```tsx
import {
  DashboardHeader,
  UserInfoHeader,
  ExamFilters,
  StatsCards,
  ExamListItem,
  SectionResults,
  ToeflScoreCard,
} from "@/components/dashboard";
```

## Types

Import types dari:

```tsx
import type {
  ExamSession,
  ExamType,
  ExamStatus,
  ToeflSectionData,
  IELTSSections,
  SectionResults,
  // ... dll
} from "@/types/dashboard";
```

## Contoh Penggunaan

### List View

```tsx
const ExamListView = () => {
  const [examMode, setExamMode] = useState<ExamType>("ielts");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <DashboardHeader onBack={() => navigate(-1)} onLogout={handleLogout} />
      <UserInfoHeader
        userInitials="AR"
        userName="Ahmad Rizki"
        subtitle="Riwayat Ujian"
      />
      <ExamFilters
        examMode={examMode}
        onExamModeChange={setExamMode}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <StatsCards
        totalExams={12}
        inReviewCount={3}
        doneCount={9}
        averageScore="6.5"
        examType={examMode}
      />
      {exams.map((exam) => (
        <ExamListItem key={exam.id} exam={exam} onClick={() => {}} />
      ))}
    </>
  );
};
```

### Detail View (IELTS)

```tsx
const IELTSDetailView = ({ exam }) => (
  <>
    <SectionResults
      title="Listening Comprehension"
      duration={exam.sections.listening?.duration}
      score={exam.sections.listening?.score}
      maxScore={exam.sections.listening?.max}
      results={exam.sections.listening?.results}
    />
  </>
);
```

### Detail View (TOEFL)

```tsx
const TOEFLDetailView = ({ exam }) => (
  <div className="grid grid-cols-3 gap-4">
    {["listening", "structure", "reading"].map((section) => (
      <ToeflScoreCard
        key={section}
        section={section}
        score={exam.sections[section].score}
        maxScore={exam.sections[section].max}
        label={exam.sections[section].label}
        description={exam.sections[section].description}
      />
    ))}
  </div>
);
```
