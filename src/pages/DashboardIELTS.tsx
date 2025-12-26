/**
 * DashboardIELTS Page
 * Halaman dashboard untuk ujian IELTS
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { BookOpen } from "lucide-react";
import { useExamResults, type ExamResult } from "@/hooks/useExamResults";

// Dashboard Components
import {
  DashboardAppHeader,
  PackageInfoCard,
  StatsSummaryCards,
  ExamModeCard,
  ExamHistorySection,
  ExamSectionsGrid,
} from "@/features/dashboard/components";
import ExamResultDetail from "@/features/dashboard/components/ExamResultDetail";

// Utils
import { getPackageInfo, getExamModes, type PackageLevel } from "@/features/dashboard/utils/examData";
import { calculateExamStats } from "@/features/dashboard/utils/scoreUtils";

const DashboardIELTS = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [packageLevel, setPackageLevel] = useState<PackageLevel>("STARTER");
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const { results, loading: loadingResults } = useExamResults("ielts");

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
    const savedPackage = localStorage.getItem("user_package") || "IELTS_STARTER";
    const level = savedPackage.replace("IELTS_", "").toUpperCase() as PackageLevel;
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

  const currentPackage = getPackageInfo(packageLevel, "ielts");
  const examModes = getExamModes();
  const { total: totalExams, avg: avgScore, best: bestScore } = calculateExamStats(results);

  // Detail View
  if (selectedResult) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardAppHeader userEmail={user?.email} onLogout={handleLogout} />
        <main className="container mx-auto px-4 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <ExamResultDetail
              result={selectedResult}
              examType="ielts"
              onBack={() => setSelectedResult(null)}
            />
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-background">
      <DashboardAppHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Package Info */}
          <PackageInfoCard packageInfo={currentPackage} examType="ielts" />

          {/* Stats */}
          {totalExams > 0 && (
            <StatsSummaryCards
              totalExams={totalExams}
              avgScore={avgScore}
              bestScore={bestScore}
              examType="ielts"
            />
          )}

          {/* Exam Modes */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Pilih Mode Ujian
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {examModes.map((mode) => (
                <ExamModeCard
                  key={mode.id}
                  mode={mode}
                  onClick={() => navigate(`/exam/ielts/${mode.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Exam History */}
          <ExamHistorySection
            results={results}
            loading={loadingResults}
            examType="ielts"
            onViewDetail={setSelectedResult}
          />

          {/* Exam Sections Info */}
          <ExamSectionsGrid examType="ielts" />
        </div>
      </main>
    </div>
  );
};

export default DashboardIELTS;
