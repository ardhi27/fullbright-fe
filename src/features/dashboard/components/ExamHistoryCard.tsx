/**
 * ExamHistoryCard Component - Fullbright Theme (Putih-Hitam-Merah)
 * Card untuk setiap item riwayat ujian
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, 
  GraduationCap, 
  Calendar, 
  Clock, 
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { ExamResult } from "@/hooks/useExamResults";
import type { ExamType } from "../utils/scoreUtils";
import { formatScore } from "../utils/scoreUtils";

interface ExamHistoryCardProps {
  result: ExamResult;
  examType: ExamType;
  onViewDetail: (result: ExamResult) => void;
  previousScore?: number;
}

const ExamHistoryCard = ({ 
  result, 
  examType, 
  onViewDetail,
  previousScore 
}: ExamHistoryCardProps) => {
  const isSimulasi = result.exam_mode === "simulasi";
  const Icon = isSimulasi ? FlaskConical : GraduationCap;
  
  const getScoreColor = (score: number) => {
    if (examType === "ielts") {
      if (score >= 7) return "text-green-600";
      if (score >= 5.5) return "text-gray-700";
      if (score >= 4) return "text-orange-500";
      return "text-red-500";
    } else {
      if (score >= 550) return "text-green-600";
      if (score >= 450) return "text-gray-700";
      if (score >= 400) return "text-orange-500";
      return "text-red-500";
    }
  };

  const getScoreBgColor = (score: number) => {
    if (examType === "ielts") {
      if (score >= 7) return "from-green-100 to-green-50 border-green-200";
      if (score >= 5.5) return "from-gray-100 to-gray-50 border-gray-200";
      if (score >= 4) return "from-orange-100 to-orange-50 border-orange-200";
      return "from-red-100 to-red-50 border-red-200";
    } else {
      if (score >= 550) return "from-green-100 to-green-50 border-green-200";
      if (score >= 450) return "from-gray-100 to-gray-50 border-gray-200";
      if (score >= 400) return "from-orange-100 to-orange-50 border-orange-200";
      return "from-red-100 to-red-50 border-red-200";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} menit`;
  };

  // Calculate trend if previous score exists
  const getTrend = () => {
    if (!previousScore) return null;
    const diff = (result.total_score || 0) - previousScore;
    if (diff > 0) return { icon: TrendingUp, color: "text-green-500", label: `+${diff.toFixed(1)}` };
    if (diff < 0) return { icon: TrendingDown, color: "text-red-500", label: diff.toFixed(1) };
    return { icon: Minus, color: "text-muted-foreground", label: "0" };
  };

  const trend = getTrend();

  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-card hover:shadow-xl hover:border-border transition-all duration-300">
      {/* Left Accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        isSimulasi 
          ? "bg-gradient-to-b from-gray-400 to-gray-600" 
          : "bg-gradient-to-b from-red-400 to-red-600"
      }`} />

      <div className="p-3 sm:p-4 lg:p-5 pl-4 sm:pl-5 lg:pl-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
            isSimulasi 
              ? "bg-gray-100 border border-gray-200" 
              : "bg-red-100 border border-red-200"
          }`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${
              isSimulasi ? "text-gray-600" : "text-red-600"
            }`} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                {isSimulasi ? "Mode Simulasi" : "Mode Final"}
              </h4>
              <Badge variant="outline" className={`shrink-0 text-[10px] sm:text-xs ${
                isSimulasi
                  ? "border-gray-300 text-gray-600 bg-gray-50"
                  : "border-red-300 text-red-600 bg-red-50"
              }`}>
                {examType.toUpperCase()}
              </Badge>
              {/* Status badge for exams - show Selesai for all since full exams are processed */}
              {/* In a real implementation, this could check if writing sections need AI processing */}
              <Badge variant="secondary" className="shrink-0 text-[10px] sm:text-xs bg-green-100 text-green-800 border-green-200">
                Selesai
              </Badge>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">{format(new Date(result.completed_at), "d MMM yyyy", { locale: id })}</span>
                <span className="sm:hidden">{format(new Date(result.completed_at), "d/M/yy")}</span>
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {formatTime(result.time_spent || 0)}
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-3">
            <div className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br border ${getScoreBgColor(result.total_score || 0)}`}>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className={`text-lg sm:text-xl lg:text-3xl font-bold ${getScoreColor(result.total_score || 0)}`}>
                  {formatScore(result.total_score || 0, examType)}
                </span>
                {trend && (
                  <div className={`hidden sm:flex items-center gap-0.5 ${trend.color}`}>
                    <trend.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium">{trend.label}</span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetail(result)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExamHistoryCard;
