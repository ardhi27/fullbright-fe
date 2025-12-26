/**
 * ExamHistorySection Component
 * Section untuk menampilkan riwayat ujian
 */

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History, FileText } from "lucide-react";
import type { ExamResult } from "@/hooks/useExamResults";
import type { ExamType } from "../utils/scoreUtils";
import ExamHistoryCard from "./ExamHistoryCard";

interface ExamHistorySectionProps {
  results: ExamResult[];
  loading: boolean;
  examType: ExamType;
  maxDisplay?: number;
  onViewDetail: (result: ExamResult) => void;
}

const ExamHistorySection = ({
  results,
  loading,
  examType,
  maxDisplay = 5,
  onViewDetail,
}: ExamHistorySectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-primary" />
        Riwayat Ujian
      </h2>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
          {results.slice(0, maxDisplay).map((result) => (
            <ExamHistoryCard
              key={result.id}
              result={result}
              examType={examType}
              onViewDetail={onViewDetail}
            />
          ))}
          {results.length > maxDisplay && (
            <p className="text-center text-sm text-muted-foreground py-2">
              +{results.length - maxDisplay} ujian lainnya
            </p>
          )}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Belum ada riwayat ujian</p>
          <p className="text-sm text-muted-foreground mt-1">
            Mulai ujian pertama Anda untuk melihat riwayat di sini
          </p>
        </Card>
      )}
    </div>
  );
};

export default ExamHistorySection;
