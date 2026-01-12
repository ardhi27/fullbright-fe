/**
 * ExamHistorySection Component - Fullbright Theme (Putih-Hitam-Merah)
 * Section untuk menampilkan riwayat ujian
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History, FileText, TrendingUp, ArrowRight, ChevronUp } from "lucide-react";
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
  const [showAll, setShowAll] = useState(false);

  const displayResults = showAll ? results : results.slice(0, maxDisplay);
  const hasMore = results.length > maxDisplay;

  return (
    <div className="animate-fade-up animation-delay-400">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-100 border border-gray-200">
            <History className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
              Riwayat Ujian
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {results.length > 0 
                ? `${results.length} ujian selesai` 
                : "Belum ada riwayat"
              }
            </p>
          </div>
        </div>

        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            <span className="hidden sm:inline">Lihat Semua</span>
            <span className="sm:hidden">Semua</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        {showAll && hasMore && (
          <button
            onClick={() => setShowAll(false)}
            className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
          >
            <span className="hidden sm:inline">Tampilkan Sedikit</span>
            <span className="sm:hidden">Sedikit</span>
            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 sm:p-6 border border-border/50">
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 sm:h-5 w-1/3" />
                  <Skeleton className="h-3 sm:h-4 w-1/2" />
                </div>
                <Skeleton className="w-16 sm:w-20 h-8 sm:h-10 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {displayResults.map((result, index) => (
            <div
              key={result.id}
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <ExamHistoryCard
                result={result}
                examType={examType}
                onViewDetail={onViewDetail}
              />
            </div>
          ))}

          {hasMore && !showAll && (
            <div className="text-center pt-2 sm:pt-4">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-100 hover:bg-red-200 border border-red-200 text-xs sm:text-sm font-medium text-red-700 hover:text-red-900 transition-all duration-300"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Lihat {results.length - maxDisplay} ujian lainnya
              </button>
            </div>
          )}

          {showAll && hasMore && (
            <div className="text-center pt-2 sm:pt-4">
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
              >
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Tampilkan lebih sedikit
              </button>
            </div>
          )}
        </div>
      ) : (
        <Card className="relative overflow-hidden border border-dashed border-gray-300 bg-gray-50/50">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-gray-50/30" />
          
          <div className="relative p-8 sm:p-12 text-center">
            <div className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-sm mb-3 sm:mb-4">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Belum Ada Riwayat Ujian
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto mb-4 sm:mb-6">
              Mulai ujian pertama Anda untuk melacak progress dan melihat riwayat di sini
            </p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
              Siap untuk memulai?
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExamHistorySection;
