/**
 * SimulationTopicHistoryCard Component - Fullbright Theme
 * Card untuk setiap item riwayat latihan simulasi per topik
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Headphones,
  BookOpen,
  PenTool,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  Target,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { TopicHistoryEntry } from "./SimulationTopicHistorySection";

interface SimulationTopicHistoryCardProps {
  entry: TopicHistoryEntry;
  examType: "ielts" | "toefl";
  onViewDetail: () => void;
}

const sectionIcons: Record<string, typeof Headphones> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  structure: FileText,
};

const sectionColors: Record<string, { bg: string; text: string; border: string }> = {
  listening: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
  reading: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
  writing: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
  structure: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
};

const SimulationTopicHistoryCard = ({
  entry,
  examType,
  onViewDetail,
}: SimulationTopicHistoryCardProps) => {
  const SectionIcon = sectionIcons[entry.section] || FileText;
  const colors = sectionColors[entry.section] || sectionColors.reading;

  const scorePercentage = entry.totalQuestions > 0
    ? (entry.score / entry.totalQuestions) * 100
    : 0;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "from-green-100 to-green-50 border-green-200";
    if (percentage >= 60) return "from-yellow-100 to-yellow-50 border-yellow-200";
    return "from-red-100 to-red-50 border-red-200";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isWritingSection = entry.section === "writing";

  // Determine status for all sections
  // Writing materials need AI processing, so they show "Proses" initially if no score
  // Reading/Listening/Multiple choice materials show "Selesai" since answers are definitive
  const showStatusBadge = true; // Show status badge for all sections
  const statusText = isWritingSection ?
    (entry.score > 0 ? "Selesai" : "Proses") :
    "Selesai";
  const statusColor = isWritingSection && entry.score === 0 ?
    "bg-yellow-100 text-yellow-800 border-yellow-200" :
    "bg-green-100 text-green-800 border-green-200";

  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300 cursor-pointer" onClick={onViewDetail}>
      {/* Left Accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        colors.text === "text-blue-600" ? "bg-gradient-to-b from-blue-400 to-blue-600" :
        colors.text === "text-green-600" ? "bg-gradient-to-b from-green-400 to-green-600" :
        colors.text === "text-purple-600" ? "bg-gradient-to-b from-purple-400 to-purple-600" :
        "bg-gradient-to-b from-orange-400 to-orange-600"
      }`} />

      <div className="p-3 sm:p-4 pl-4 sm:pl-5">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border ${colors.bg} ${colors.border}`}>
            <SectionIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                {entry.topicTitle}
              </h4>
              <Badge variant="outline" className={`shrink-0 text-[10px] sm:text-xs capitalize ${colors.border} ${colors.text} ${colors.bg}`}>
                {entry.section}
              </Badge>
              {showStatusBadge && (
                <Badge variant="secondary" className={`shrink-0 text-[10px] sm:text-xs ${statusColor}`}>
                  {statusText}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {format(new Date(entry.completedAt), "d MMM yyyy, HH:mm", { locale: id })}
                </span>
                <span className="sm:hidden">
                  {format(new Date(entry.completedAt), "d/M/yy HH:mm")}
                </span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(entry.timeSpent)}
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="shrink-0 flex items-center gap-2">
            <div className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-br border ${getScoreBg(scorePercentage)}`}>
              <div className="flex items-center gap-1">
                {isWritingSection ? (
                  <span className={`text-sm sm:text-lg font-bold ${getScoreColor(scorePercentage)}`}>
                    {entry.score > 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Target className="w-5 h-5 text-muted-foreground" />
                    )}
                  </span>
                ) : (
                  <span className={`text-sm sm:text-lg font-bold ${getScoreColor(scorePercentage)}`}>
                    {entry.score}/{entry.totalQuestions}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SimulationTopicHistoryCard;
