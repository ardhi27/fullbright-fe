import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  FlaskConical, 
  GraduationCap, 
  ChevronRight,
  Trophy
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { ExamResult } from "@/hooks/useExamResults";

interface ExamHistoryCardProps {
  result: ExamResult;
  examType: "ielts" | "toefl";
  onViewDetail?: (result: ExamResult) => void;
}

const ExamHistoryCard = ({ result, examType, onViewDetail }: ExamHistoryCardProps) => {
  const isSimulasi = result.exam_mode === "simulasi";
  
  const getScoreDisplay = () => {
    if (examType === "ielts") {
      return {
        label: "Band Score",
        value: result.total_score?.toFixed(1) || "0",
        max: "9.0",
      };
    } else {
      return {
        label: "Total Score",
        value: Math.round(result.total_score || 0).toString(),
        max: "677",
      };
    }
  };

  const getScoreColor = () => {
    if (examType === "ielts") {
      const score = result.total_score || 0;
      if (score >= 7) return "text-green-500";
      if (score >= 5.5) return "text-blue-500";
      if (score >= 4) return "text-amber-500";
      return "text-red-500";
    } else {
      const score = result.total_score || 0;
      if (score >= 550) return "text-green-500";
      if (score >= 450) return "text-blue-500";
      if (score >= 400) return "text-amber-500";
      return "text-red-500";
    }
  };

  const scoreInfo = getScoreDisplay();

  return (
    <Card className="group hover:border-primary/30 transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mode & Date */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isSimulasi ? "bg-amber-500/10" : "bg-red-500/10"
            }`}>
              {isSimulasi ? (
                <FlaskConical className="w-5 h-5 text-amber-500" />
              ) : (
                <GraduationCap className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">
                  {isSimulasi ? "Simulasi" : "Final"}
                </span>
                <Badge variant="outline" className="text-xs">
                  {examType.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(result.completed_at), "d MMM yyyy", { locale: id })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(result.completed_at), "HH:mm")}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Score & Action */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Trophy className={`w-4 h-4 ${getScoreColor()}`} />
                <span className={`text-xl font-bold ${getScoreColor()}`}>
                  {scoreInfo.value}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {scoreInfo.label}
              </p>
            </div>
            {onViewDetail && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onViewDetail(result)}
                className="shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Section Scores Preview */}
        {result.section_scores && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {Object.entries(result.section_scores).map(([section, score]) => (
                <Badge key={section} variant="secondary" className="text-xs">
                  {section}: {typeof score === 'number' ? (examType === 'ielts' ? score.toFixed(1) : Math.round(score)) : score}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamHistoryCard;
