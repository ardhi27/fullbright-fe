/**
 * SimulationTopicResultDetail Component - Fullbright Theme
 * Detail view untuk hasil latihan simulasi per topik
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Trophy,
  Target,
  Headphones,
  BookOpen,
  PenTool,
  FileText,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { TopicHistoryEntry } from "./SimulationTopicHistorySection";

interface SimulationTopicResultDetailProps {
  entry: TopicHistoryEntry;
  examType: "ielts" | "toefl";
  onBack: () => void;
  onRetake: () => void;
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

const SimulationTopicResultDetail = ({
  entry,
  examType,
  onBack,
  onRetake,
}: SimulationTopicResultDetailProps) => {
  const SectionIcon = sectionIcons[entry.section] || FileText;
  const colors = sectionColors[entry.section] || sectionColors.reading;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (percentage: number) => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 80) return "Very Good!";
    if (percentage >= 70) return "Good";
    if (percentage >= 60) return "Fair";
    return "Needs Improvement";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isWritingSection = entry.section === "writing";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} ${colors.border} border`}>
            <SectionIcon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <h2 className="font-semibold">{entry.topicTitle}</h2>
            <p className="text-xs text-muted-foreground capitalize">
              {examType.toUpperCase()} - {entry.section}
            </p>
          </div>
        </div>
      </div>

      {/* Score Overview Card */}
      <Card className="overflow-hidden">
        <div className={`h-2 ${
          colors.text === "text-blue-600" ? "bg-gradient-to-r from-blue-400 to-blue-600" :
          colors.text === "text-green-600" ? "bg-gradient-to-r from-green-400 to-green-600" :
          colors.text === "text-purple-600" ? "bg-gradient-to-r from-purple-400 to-purple-600" :
          "bg-gradient-to-r from-orange-400 to-orange-600"
        }`} />
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6">
            {/* Score Display */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>

              {isWritingSection ? (
                <>
                  <p className="text-sm text-muted-foreground mb-2">Tulisan Anda</p>
                  <div className="flex items-center justify-center gap-2">
                    {entry.score > 0 ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600" />
                    )}
                    <span className={`text-xl font-bold ${entry.score > 0 ? "text-green-600" : "text-red-600"}`}>
                      {entry.score > 0 ? "Selesai" : "Belum Selesai"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-2">Skor Anda</p>
                  <p className={`text-5xl font-bold ${getScoreColor(entry.percentage || 0)} mb-2`}>
                    {entry.score}/{entry.totalQuestions}
                  </p>
                  <Badge variant="secondary" className={getScoreColor(entry.percentage || 0)}>
                    {getScoreLabel(entry.percentage || 0)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(entry.percentage || 0).toFixed(0)}% benar
                  </p>
                </>
              )}
            </div>

            {/* Progress Bar */}
            {!isWritingSection && (
              <div className="w-full max-w-md">
                <Progress value={entry.percentage || 0} className="h-3" />
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">Tanggal & Waktu</p>
                <p className="text-xs font-medium">
                  {format(new Date(entry.completedAt), "d MMM yyyy, HH:mm", { locale: id })}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">Durasi</p>
                <p className="text-xs font-medium">{formatTime(entry.timeSpent || 0)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer Review */}
      {!isWritingSection && entry.questions && entry.answers && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Review Jawaban
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(entry.questions as any[]).map((q: any, idx: number) => {
              const userAnswer = (entry.answers as Record<number, string>)[idx];
              const isCorrect = userAnswer === q.answer;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2">
                        {idx + 1}. {q.question}
                      </p>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {q.options.map((option: string, optIdx: number) => {
                          const optionLetter = option.charAt(0);
                          const isUserChoice = userAnswer === optionLetter;
                          const isCorrectAnswer = q.answer === optionLetter;

                          let optionClass = "p-2 rounded-lg border text-xs flex items-start gap-2 ";
                          if (isCorrectAnswer) {
                            optionClass += "bg-green-500/10 border-green-500/50 ";
                          } else if (isUserChoice && !isCorrect) {
                            optionClass += "bg-red-500/10 border-red-500/50 ";
                          } else {
                            optionClass += "bg-muted/30 border-border/50 ";
                          }

                          return (
                            <div key={optIdx} className={optionClass}>
                              <span
                                className={`font-bold shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                                  isCorrectAnswer
                                    ? "bg-green-500 text-white"
                                    : isUserChoice && !isCorrect
                                    ? "bg-red-500 text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {optionLetter}
                              </span>
                              <span className={isCorrectAnswer ? "text-green-700 font-medium" : ""}>
                                {option.substring(3)}
                                {isCorrectAnswer && (
                                  <span className="ml-1 text-green-600">✓</span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Writing Review */}
      {isWritingSection && entry.answers && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PenTool className="w-5 h-5 text-purple-600" />
              Tulisan Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <p className="text-sm whitespace-pre-wrap">
                {(entry.answers as any)?.writing || "(Tidak ada tulisan)"}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total kata: {((entry.answers as any)?.writing || "").trim().split(/\s+/).filter(Boolean).length}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Riwayat
        </Button>
        <Button onClick={onRetake} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Latihan Ulang
        </Button>
      </div>
    </div>
  );
};

export default SimulationTopicResultDetail;
