/**
 * ExamThankYou Page - Fullbright Theme
 * Halaman terima kasih setelah menyelesaikan ujian
 */

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wordmark.png";
import { 
  CheckCircle2, 
  Clock, 
  Home, 
  LayoutDashboard,
  Sparkles,
  Mail,
  FileText
} from "lucide-react";

interface ExamData {
  examType: "toefl" | "ielts";
  examMode: "simulasi" | "final";
  totalQuestions: number;
  answeredQuestions: number;
  submittedAt: string;
}

const ExamThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [examData, setExamData] = useState<ExamData | null>(null);

  useEffect(() => {
    // Get exam data from navigation state or localStorage
    const stateData = location.state as ExamData | undefined;
    if (stateData) {
      setExamData(stateData);
      // Save to localStorage for persistence
      localStorage.setItem("last_exam_submission", JSON.stringify(stateData));
    } else {
      // Try to get from localStorage
      const savedData = localStorage.getItem("last_exam_submission");
      if (savedData) {
        setExamData(JSON.parse(savedData));
      }
    }
  }, [location.state]);

  const examTypeLabel = examData?.examType?.toUpperCase() || "TOEFL";
  const dashboardPath = examData?.examType === "ielts" ? "/dashboard/ielts" : "/dashboard/toefl";

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-200" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-300" />
      </div>

      <div className="relative w-full max-w-lg animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Fullbright Indonesia" className="h-10" />
        </div>

        {/* Main Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 text-white text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Ujian Berhasil Dikirim!</h1>
            <p className="text-sm text-white/80">
              {examTypeLabel} {examData?.examMode === "final" ? "Final Exam" : "Simulasi"}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Thank You Message */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Terima Kasih
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Terima kasih telah melakukan ujian
              </h2>
              <p className="text-muted-foreground">
                Ujian Anda akan segera diproses. Hasil ujian akan tersedia di halaman riwayat setelah proses review selesai.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <FileText className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                <p className="text-xs text-muted-foreground">Soal Dijawab</p>
                <p className="text-lg font-bold text-foreground">
                  {examData?.answeredQuestions || 0}/{examData?.totalQuestions || 0}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                <p className="text-xs text-muted-foreground">Waktu Submit</p>
                <p className="text-lg font-bold text-foreground">
                  {examData?.submittedAt ? new Date(examData.submittedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                </p>
              </div>
            </div>

            {/* Process Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900 text-sm">Proses Review</p>
                  <p className="text-xs text-blue-700 mt-1">
                    {examData?.examMode === "final" 
                      ? "Hasil ujian final akan direview oleh pengajar dan tersedia dalam 1-3 hari kerja."
                      : "Hasil simulasi akan langsung tersedia di halaman riwayat."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1 gap-2 hover:bg-gray-50"
              >
                <Home className="w-4 h-4" />
                Ke Beranda
              </Button>
              <Button
                onClick={() => navigate(dashboardPath)}
                className="flex-1 gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                Lihat Riwayat
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Jika ada pertanyaan, silakan hubungi admin Fullbright Indonesia.
        </p>
      </div>
    </div>
  );
};

export default ExamThankYou;
