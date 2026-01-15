/**
 * ExamListItem
 * Item dalam daftar ujian
 *
 * @param exam - Data ujian
 * @param onClick - Callback saat item diklik
 */

import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, ChevronRight } from "lucide-react";
import type { ExamSession, ExamStatus } from "@/types/dashboard";

interface ExamListItemProps {
  exam: ExamSession;
  onClick: () => void;
}

const getStatusBadge = (status: ExamStatus) => {
  if (status === "in_review") {
    return <Badge className="bg-amber-500 hover:bg-amber-600 text-primary-foreground">In Review</Badge>;
  }
  return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground">Done</Badge>;
};

const getScoreColor = (score: number, max: number) => {
  const percentage = (score / max) * 100;
  if (percentage >= 75) return "text-emerald-500";
  if (percentage >= 50) return "text-primary";
  return "text-amber-500";
};

const ExamListItem = ({ exam, onClick }: ExamListItemProps) => {
  const isIELTS = exam.examType === "ielts";
  const score = isIELTS ? exam.overallBand : exam.totalScore;
  const maxScore = isIELTS ? 9 : exam.maxTotalScore;

  return (
    <div
      className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isIELTS ? "bg-primary/10" : "bg-blue-500/10"
          }`}
        >
          <FileText className={`w-6 h-6 ${isIELTS ? "text-primary" : "text-blue-500"}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{isIELTS ? "IELTS Academic" : "TOEFL ITP"}</h3>
            <Badge variant="outline">{exam.examType.toUpperCase()}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {exam.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {exam.time}
            </span>
            <span>{exam.totalDuration}</span>
          </div>
          {/* Section scores preview */}
          <div className="flex items-center gap-3 mt-2">
            {isIELTS ? (
              <>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  L: {exam.sections.listening?.score}
                </span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  R: {exam.sections.reading?.score}
                </span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  W1: {exam.sections.writingTask1?.score}
                </span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  W2: {exam.sections.writingTask2?.score}
                </span>
              </>
            ) : (
              <>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  L: {exam.sections.listening?.score}
                </span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  S: {exam.sections.structure?.score}
                </span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  R: {exam.sections.reading?.score}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Score & Status */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall</p>
            <p className={`text-xl font-bold ${getScoreColor(score || 0, maxScore || 1)}`}>
              {score}
              <span className="text-sm text-muted-foreground font-normal">/{maxScore}</span>
            </p>
          </div>
          {getStatusBadge(exam.status)}
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ExamListItem;
