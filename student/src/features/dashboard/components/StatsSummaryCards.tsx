/**
 * StatsSummaryCards Component - Fullbright Theme (Putih-Hitam-Merah)
 * Menampilkan ringkasan statistik dengan tema Fullbright
 */

import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Target, Sparkles } from "lucide-react";
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
  const stats = [
    {
      label: "Total Ujian",
      value: totalExams.toString(),
      icon: Target,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      iconBg: "bg-gray-100",
      borderColor: "border-gray-200",
      delay: "animation-delay-100",
    },
    {
      label: "Rata-rata Skor",
      value: formatScore(avgScore, examType),
      icon: TrendingUp,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      iconBg: "bg-gray-100",
      borderColor: "border-gray-200",
      delay: "animation-delay-200",
    },
    {
      label: "Skor Terbaik",
      value: formatScore(bestScore, examType),
      icon: Trophy,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      borderColor: "border-red-200",
      delay: "animation-delay-300",
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className={`stat-card relative overflow-hidden border ${stat.borderColor} ${stat.bgColor} p-3 sm:p-5 lg:p-6 animate-fade-up ${stat.delay}`}
          >
            {/* Highlight Glow for Best Score */}
            {stat.highlight && (
              <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-red-500/10 rounded-full blur-3xl" />
            )}

            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
              <div className="space-y-1 sm:space-y-3">
                {/* Label */}
                <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                
                {/* Value */}
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl sm:text-2xl lg:text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                  {stat.highlight && (
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500 animate-pulse" />
                  )}
                </div>

                {/* Progress indicator - Hidden on mobile */}
                <div className="hidden sm:block h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      stat.highlight ? "bg-red-500" : "bg-gray-400"
                    }`}
                    style={{ 
                      width: stat.label === "Total Ujian" 
                        ? `${Math.min(totalExams * 10, 100)}%` 
                        : stat.label === "Rata-rata Skor"
                        ? `${examType === "ielts" ? (avgScore / 9) * 100 : (avgScore / 677) * 100}%`
                        : `${examType === "ielts" ? (bestScore / 9) * 100 : (bestScore / 677) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Icon - Hidden on mobile, visible on sm+ */}
              <div className={`hidden sm:flex ${stat.iconBg} p-2 sm:p-3 rounded-lg sm:rounded-xl`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsSummaryCards;
