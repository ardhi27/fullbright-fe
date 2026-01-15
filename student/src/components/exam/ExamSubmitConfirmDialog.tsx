/**
 * ExamSubmitConfirmDialog Component
 * Modal konfirmasi sebelum submit ujian
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock, FileQuestion } from "lucide-react";

interface ExamSubmitConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  examType: "TOEFL" | "IELTS";
  totalQuestions: number;
  answeredQuestions: number;
  timeRemaining?: string;
  isLoading?: boolean;
}

const ExamSubmitConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  examType,
  totalQuestions,
  answeredQuestions,
  timeRemaining,
  isLoading = false,
}: ExamSubmitConfirmDialogProps) => {
  const unansweredQuestions = totalQuestions - answeredQuestions;
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  const hasUnanswered = unansweredQuestions > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-600" />
          </div>
          <DialogTitle className="text-xl">Konfirmasi Submit Ujian</DialogTitle>
          <DialogDescription className="text-center">
            Apakah Anda yakin ingin menyelesaikan ujian {examType}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Progress Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Soal Terjawab
              </div>
              <span className="font-semibold text-green-600">
                {answeredQuestions}/{totalQuestions}
              </span>
            </div>

            {hasUnanswered && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileQuestion className="w-4 h-4 text-amber-500" />
                  Soal Belum Dijawab
                </div>
                <span className="font-semibold text-amber-600">
                  {unansweredQuestions} soal
                </span>
              </div>
            )}

            {timeRemaining && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Sisa Waktu
                </div>
                <span className="font-mono font-semibold text-blue-600">
                  {timeRemaining}
                </span>
              </div>
            )}

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    progressPercentage === 100 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Warning if unanswered */}
          {hasUnanswered && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Perhatian!</p>
                <p className="text-amber-700">
                  Masih ada {unansweredQuestions} soal yang belum dijawab. Soal yang tidak dijawab akan dianggap salah.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Kembali ke Ujian
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </span>
            ) : (
              "Ya, Submit Ujian"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamSubmitConfirmDialog;
