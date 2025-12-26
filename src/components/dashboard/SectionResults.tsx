/**
 * SectionResults
 * Menampilkan hasil section listening/reading dengan statistik dan daftar pertanyaan
 *
 * @param title - Judul section (e.g., "Listening Comprehension")
 * @param duration - Durasi section
 * @param score - Skor yang didapat
 * @param maxScore - Skor maksimal
 * @param results - Data hasil (correct, incorrect, unanswered, questions)
 */

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import type { SectionResults as SectionResultsType } from "@/types/dashboard";

interface SectionResultsProps {
  title: string;
  duration?: string;
  score?: number;
  maxScore?: number;
  results?: SectionResultsType;
}

const SectionResults = ({
  title,
  duration,
  score,
  maxScore,
  results,
}: SectionResultsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {duration && <p className="text-muted-foreground">Duration: {duration}</p>}
        </div>
        {score !== undefined && maxScore !== undefined && (
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Band Score</p>
            <p className="text-4xl font-bold text-primary">
              {score}
              <span className="text-lg text-muted-foreground">/{maxScore}</span>
            </p>
          </div>
        )}
      </div>

      {/* Results Stats & Questions */}
      {results && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-500">{results.correct}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 text-center">
              <XCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{results.incorrect}</p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <MinusCircle className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-muted-foreground">{results.unanswered}</p>
              <p className="text-sm text-muted-foreground">Unanswered</p>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {results.questions.map((q, idx) => {
              const isCorrect = q.userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className="bg-card rounded-xl p-5 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-600"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <p className="font-medium">{q.question}</p>
                    </div>
                    <Badge className={isCorrect ? "bg-emerald-500" : "bg-primary"}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                  <div className="space-y-2 pl-10">
                    {q.options.map((option, optIdx) => {
                      const optionLetter = option.charAt(0);
                      const isSelected = q.userAnswer === optionLetter;
                      const isCorrectOption = q.correctAnswer === optionLetter;
                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            isCorrectOption
                              ? "bg-emerald-500/10 text-emerald-600"
                              : isSelected && !isCorrect
                              ? "bg-primary/10"
                              : ""
                          }`}
                        >
                          {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          <span className={isCorrectOption ? "font-medium text-emerald-600" : ""}>
                            {option}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SectionResults;
