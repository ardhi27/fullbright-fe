/**
 * DashboardTOEFL Page - Fullbright Theme (Putih-Hitam-Merah)
 * Halaman dashboard untuk ujian TOEFL
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { BookOpen, Sparkles } from "lucide-react";
import { useExamResults, type ExamResult } from "@/hooks/useExamResults";

// Dashboard Components
import {
  DashboardAppHeader,
  PackageInfoCard,
  StatsSummaryCards,
  ExamModeCard,
  ExamHistorySection,
  ExamSectionsGrid,
  SimulationTopicHistorySection,
} from "@/features/dashboard/components";
import ExamResultDetail from "@/features/dashboard/components/ExamResultDetail";

// Utils
import { getPackageInfo, getExamModes, type PackageLevel } from "@/features/dashboard/utils/examData";
import { calculateExamStats } from "@/features/dashboard/utils/scoreUtils";

const DashboardTOEFL = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [packageLevel, setPackageLevel] = useState<PackageLevel>("STARTER");
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const { results, loading: loadingResults } = useExamResults("toefl");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Get package from localStorage
    const savedPackage = localStorage.getItem("user_package") || "TOEFL_STARTER";
    const level = savedPackage.replace("TOEFL_", "").toUpperCase() as PackageLevel;
    if (["STARTER", "INTERMEDIATE", "ADVANCE"].includes(level)) {
      setPackageLevel(level);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user_package");
    await supabase.auth.signOut();
    navigate("/");
  };

  const currentPackage = getPackageInfo(packageLevel, "toefl");
  const examModes = getExamModes();
  const { total: totalExams, avg: avgScore, best: bestScore } = calculateExamStats(results);

  // Detail View
  if (selectedResult) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardAppHeader userEmail={user?.email} onLogout={handleLogout} />
        <main className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="max-w-5xl mx-auto">
            <ExamResultDetail
              result={selectedResult}
              examType="toefl"
              onBack={() => setSelectedResult(null)}
            />
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <DashboardAppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="relative container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 lg:py-10">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Package Info - Hero Card */}
          <PackageInfoCard packageInfo={currentPackage} examType="toefl" />

          {/* Stats Summary */}
          {totalExams > 0 && (
            <StatsSummaryCards
              totalExams={totalExams}
              avgScore={avgScore}
              bestScore={bestScore}
              examType="toefl"
            />
          )}

          {/* Exam Modes Section */}
          <div className="space-y-4 sm:space-y-6 animate-fade-up animation-delay-300">
            {/* Section Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-red-100 border border-red-200">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  Pilih Mode Ujian
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Latihan atau ujian resmi dengan timer
                </p>
              </div>
            </div>

            {/* Mode Cards - Both navigate to /exams/toefl for new flow */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {examModes.map((mode) => (
                <ExamModeCard
                  key={mode.id}
                  mode={mode}
                  onClick={() => navigate("/exams/toefl")}
                />
              ))}
            </div>
          </div>

          {/* Exam History */}
          <ExamHistorySection
            results={results}
            loading={loadingResults}
            examType="toefl"
            onViewDetail={setSelectedResult}
          />

          {/* Simulation Topic History */}
          <SimulationTopicHistorySection examType="toefl" />

          {/* Exam Sections Info */}
          <ExamSectionsGrid examType="toefl" />

          {/* Bottom CTA */}
          {totalExams === 0 && (
            <div className="text-center py-4 sm:py-8 animate-fade-up animation-delay-700">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/25">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-semibold">Mulai perjalanan TOEFL Anda hari ini!</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardTOEFL;
