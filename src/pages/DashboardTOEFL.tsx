import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LogOut, 
  BookOpen, 
  FlaskConical, 
  GraduationCap,
  Award,
  Target,
  Clock,
  ChevronRight,
  History,
  FileText
} from "lucide-react";
import logo from "@/assets/logo-wordmark.png";
import { useExamResults, type ExamResult } from "@/hooks/useExamResults";
import ExamHistoryCard from "@/features/dashboard/components/ExamHistoryCard";
import ExamResultDetail from "@/features/dashboard/components/ExamResultDetail";

type PackageLevel = "STARTER" | "INTERMEDIATE" | "ADVANCE";

interface PackageInfo {
  name: string;
  level: PackageLevel;
  description: string;
  features: string[];
  targetScore: string;
  color: string;
}

const packageData: Record<PackageLevel, PackageInfo> = {
  STARTER: {
    name: "TOEFL ITP LEVEL STARTER",
    level: "STARTER",
    description: "Cocok untuk pemula yang baru memulai persiapan TOEFL ITP",
    features: ["Materi dasar TOEFL", "Latihan soal tingkat mudah", "Simulasi ujian pemula"],
    targetScore: "400 - 450",
    color: "bg-teal-500"
  },
  INTERMEDIATE: {
    name: "TOEFL ITP LEVEL INTERMEDIATE",
    level: "INTERMEDIATE",
    description: "Untuk peserta dengan kemampuan bahasa Inggris menengah",
    features: ["Materi tingkat menengah", "Strategi menjawab soal", "Simulasi ujian lengkap"],
    targetScore: "450 - 550",
    color: "bg-orange-500"
  },
  ADVANCE: {
    name: "TOEFL ITP LEVEL ADVANCE",
    level: "ADVANCE",
    description: "Persiapan intensif untuk skor tinggi TOEFL ITP",
    features: ["Materi tingkat lanjut", "Teknik advanced", "Simulasi ujian full"],
    targetScore: "550 - 677",
    color: "bg-rose-500"
  }
};

const DashboardTOEFL = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [packageLevel, setPackageLevel] = useState<PackageLevel>("STARTER");
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const { results, loading: loadingResults } = useExamResults("toefl");

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
    const savedPackage = localStorage.getItem("user_package") || "TOEFL_STARTER";
    const level = savedPackage.replace("TOEFL_", "").replace("TOEFL ITP_", "").toUpperCase() as PackageLevel;
    if (packageData[level]) {
      setPackageLevel(level);
    }

    return () => subscription.unsubscribe();
  }, []);

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
              examType="toefl" 
              onBack={() => setSelectedResult(null)} 
            />
          ) : (
          <>
          {/* Package Info Card */}
          <Card className="overflow-hidden">
            <div className={`h-2 ${currentPackage.color}`} />
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${currentPackage.color}/20 flex items-center justify-center`}>
                    <Award className={`w-7 h-7 ${currentPackage.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentPackage.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">{currentPackage.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Target className="w-3 h-3 mr-1" />
                  Target: {currentPackage.targetScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentPackage.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          {totalExams > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{totalExams}</p>
                <p className="text-xs text-muted-foreground">Total Ujian</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{Math.round(avgScore)}</p>
                <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{Math.round(bestScore)}</p>
                <p className="text-xs text-muted-foreground">Skor Terbaik</p>
              </Card>
            </div>
          )}

          {/* Exam Modes */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Pilih Mode Ujian
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Simulasi Mode */}
              <Card 
                className="group cursor-pointer hover:border-accent/50 transition-all hover:shadow-lg"
                onClick={() => navigate("/exam/toefl-itp/simulasi")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <FlaskConical className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                        Mode Simulasi
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Latihan tanpa batas waktu. Cocok untuk belajar dan memahami format soal.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Tanpa Timer
                        </span>
                        <span>•</span>
                        <span>Bisa diulang</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </CardContent>
              </Card>

              {/* Final Mode */}
              <Card 
                className="group cursor-pointer hover:border-accent/50 transition-all hover:shadow-lg"
                onClick={() => navigate("/exam/toefl-itp/final")}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                        Mode Final
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Simulasi ujian sebenarnya dengan batas waktu seperti ujian asli.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Dengan Timer
                        </span>
                        <span>•</span>
                        <span>Kondisi ujian nyata</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Exam History */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-accent" />
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
                    examType="toefl"
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

          {/* TOEFL Sections Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Bagian Ujian TOEFL ITP</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Listening Comprehension", duration: "30-35 menit", questions: 50, icon: "🎧" },
                { name: "Structure & Written Expression", duration: "25 menit", questions: 40, icon: "📝" },
                { name: "Reading Comprehension", duration: "55 menit", questions: 50, icon: "📖" },
              ].map((section) => (
                <Card key={section.name} className="p-4">
                  <div className="text-2xl mb-2">{section.icon}</div>
                  <h3 className="font-medium text-sm">{section.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.duration} • {section.questions} soal
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Score Range Info */}
          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Rentang Skor TOEFL ITP</h3>
            <div className="grid sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-2xl font-bold text-muted-foreground">310-399</p>
                <p className="text-xs text-muted-foreground">Beginning</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-2xl font-bold text-amber-500">400-449</p>
                <p className="text-xs text-muted-foreground">Elementary</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-2xl font-bold text-blue-500">450-549</p>
                <p className="text-xs text-muted-foreground">Intermediate</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-2xl font-bold text-green-500">550-677</p>
                <p className="text-xs text-muted-foreground">Advanced</p>
              </div>
            </div>
          </Card>
          </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardTOEFL;
