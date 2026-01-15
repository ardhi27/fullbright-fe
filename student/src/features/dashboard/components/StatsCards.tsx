/**
 * StatsCards
 * Kartu statistik ringkasan ujian
 *
 * @param totalExams - Total jumlah ujian
 * @param inReviewCount - Jumlah ujian dalam review
 * @param doneCount - Jumlah ujian selesai
 * @param averageScore - Rata-rata skor
 * @param examType - Tipe ujian untuk label
 */

import type { ExamType } from "@/types/dashboard";

interface StatsCardsProps {
  totalExams: number;
  inReviewCount: number;
  doneCount: number;
  averageScore: string | number;
  examType: ExamType;
}

const StatsCards = ({
  totalExams,
  inReviewCount,
  doneCount,
  averageScore,
  examType,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">Total {examType.toUpperCase()}</p>
        <p className="text-2xl font-bold">{totalExams}</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">In Review</p>
        <p className="text-2xl font-bold text-amber-500">{inReviewCount}</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">Selesai</p>
        <p className="text-2xl font-bold text-emerald-500">{doneCount}</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-muted-foreground">Rata-rata Score</p>
        <p className="text-2xl font-bold text-primary">{averageScore}</p>
      </div>
    </div>
  );
};

export default StatsCards;
