import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, BookOpen, History, FileText } from "lucide-react";
import logo from "@/assets/logo-wordmark.png";
import { useExamResults, type ExamResult } from "@/hooks/useExamResults";
import ExamHistoryCard from "@/features/dashboard/components/ExamHistoryCard";
import ExamResultDetail from "@/features/dashboard/components/ExamResultDetail";
import PackageInfoCard from "@/features/dashboard/components/PackageInfoCard";
import ExamModesCard from "@/features/dashboard/components/ExamModesCard";
import ExamSectionsInfo from "@/features/dashboard/components/ExamSectionsInfo";
import ScoreRangeInfo from "@/features/dashboard/components/ScoreRangeInfo";

type PackageLevel = "STARTER" | "INTERMEDIATE" | "ADVANCE";

interface PackageInfo {
  name: string;
  level: PackageLevel;
  description: string;
  features: string[];
  targetScore: string;
  color: string;
}

interface ExamDashboardProps {
  examType: "ielts" | "toefl";
  packageData: Record<PackageLevel, PackageInfo>;
  examModes: {
    simulasi: {
      path: string;
      title: string;
      description: string;
      icon: React.ReactNode;
      timerInfo: string;
      additionalInfo: string;
    };
    final: {
      path: string;
      title: string;
      description: string;
      icon: React.ReactNode;
      timerInfo: string;
      additionalInfo: string;
    };
  };
  examSections: Array<{
    name: string;
    duration: string;
    questions: number;
    icon: string;
  }>;
  scoreRanges?: Array<{
    score: string;
    level: string;
    color?: string;
  }>;
  localStorageKey: string;
}

const ExamDashboard = ({ 
  examType, 
  packageData, 
  examModes,
  examSections,
  scoreRanges,
  localStorageKey
}: ExamDashboardProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [packageLevel, setPackageLevel] = useState<PackageLevel>("STARTER");
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const { results, loading: loadingResults } = useExamResults(examType);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Get package from localStorage
    const savedPackage = localStorage.getItem("user_package") || `${examType.toUpperCase()}_STARTER`;
    const level = savedPackage
      .replace(`${examType.toUpperCase()}_`, "")
      .replace(`${examType.toUpperCase()} ITP_`, "")
      .toUpperCase() as PackageLevel;
    if (packageData[level]) {
      setPackageLevel(level);
    }

    return () => subscription.unsubscribe();
  }, [examType]);

  const handleLogout = async () => {
    localStorage.removeItem("user_package");
    await supabase.auth.signOut();
    navigate("/");
  };

  const currentPackage = packageData[packageLevel];

  // Calculate stats
  const totalExams = results.length;
  const avgScore = totalExams > 0
    ? results.reduce((sum, r) => sum + (r.total_score || 0), 0) / totalExams
    : 0;
  const bestScore = totalExams > 0
    ? Math.max(...results.map(r => r.total_score || 0))
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img src={logo} alt="Fullbright Indonesia" className="h-10" />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Detail View */}
          {selectedResult ? (
            <ExamResultDetail
              result={selectedResult}
              examType={examType}
              onBack={() => setSelectedResult(null)}
            />
          ) : (
            <>
              {/* Package Info Card */}
              <PackageInfoCard packageInfo={currentPackage} examType={examType} />

              {/* Stats Cards */}
              {totalExams > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{totalExams}</p>
                    <p className="text-xs text-muted-foreground">Total Ujian</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-500">
                      {examType === 'toefl' ? Math.round(avgScore) : avgScore.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {examType === 'toefl' ? Math.round(bestScore) : bestScore.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Skor Terbaik</p>
                  </Card>
                </div>
              )}

              {/* Exam Modes */}
              <ExamModesCard 
                examModes={[
                  {
                    title: examModes.simulasi.title,
                    description: examModes.simulasi.description,
                    icon: examModes.simulasi.icon,
                    timerInfo: examModes.simulasi.timerInfo,
                    additionalInfo: examModes.simulasi.additionalInfo,
                    onClick: () => navigate(examModes.simulasi.path)
                  },
                  {
                    title: examModes.final.title,
                    description: examModes.final.description,
                    icon: examModes.final.icon,
                    timerInfo: examModes.final.timerInfo,
                    additionalInfo: examModes.final.additionalInfo,
                    onClick: () => navigate(examModes.final.path)
                  }
                ]}
              />

              {/* Exam History */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Riwayat Ujian
                </h2>

                {loadingResults ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-3">
                    {results.slice(0, 5).map((result) => (
                      <ExamHistoryCard
                        key={result.id}
                        result={result}
                        examType={examType}
                        onViewDetail={(r) => setSelectedResult(r)}
                      />
                    ))}
                    {results.length > 5 && (
                      <p className="text-center text-sm text-muted-foreground py-2">
                        +{results.length - 5} ujian lainnya
                      </p>
                    )}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">Belum ada riwayat ujian</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mulai ujian pertama Anda untuk melihat riwayat di sini
                    </p>
                  </Card>
                )}
              </div>

              {/* Exam Sections Info */}
              <ExamSectionsInfo 
                title={`Bagian Ujian ${examType.toUpperCase()}`}
                sections={examSections}
                columns={examType === 'toefl' ? 3 : 4}
              />

              {/* Score Range Info (only for TOEFL) */}
              {scoreRanges && (
                <ScoreRangeInfo 
                  title="Rentang Skor TOEFL ITP"
                  ranges={scoreRanges}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamDashboard;