/**
 * StatsSummaryCards Component
 * Menampilkan ringkasan statistik ujian
 */

import { Card } from "@/components/ui/card";
import type { ExamType } from "../utils/scoreUtils";
import { formatScore } from "../utils/scoreUtils";

interface StatsSummaryCardsProps {
  totalExams: number;
  avgScore: number;
  bestScore: number;
  examType: ExamType;
}

const StatsSummaryCards = ({
  totalExams,
  avgScore,
  bestScore,
  examType,
}: StatsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 text-center">
        <p className="text-2xl font-bold text-primary">{totalExams}</p>
        <p className="text-xs text-muted-foreground">Total Ujian</p>
      </Card>
      <Card className="p-4 text-center">
        <p className="text-2xl font-bold text-blue-500">
          {formatScore(avgScore, examType)}
        </p>
        <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
      </Card>
      <Card className="p-4 text-center">
        <p className="text-2xl font-bold text-green-500">
          {formatScore(bestScore, examType)}
        </p>
        <p className="text-xs text-muted-foreground">Skor Terbaik</p>
      </Card>
    </div>
  );
};

export default StatsSummaryCards;
