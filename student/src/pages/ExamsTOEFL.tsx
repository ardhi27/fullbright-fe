/**
 * ExamsTOEFL Page - Fullbright Theme (Putih-Hitam-Merah)
 * Updated based on Meeting Notes 30 Dec 2025
 * 
 * Features:
 * - Simulasi per-section (Listening/Structure/Reading)
 * - Simulasi per-paket (semua section)
 * - Biodata form sebelum Final
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo-wordmark.png";
import { 
  LogOut, 
  BookOpen, 
  Clock, 
  Headphones, 
  FileText, 
  LayoutDashboard, 
  GraduationCap, 
  FlaskConical, 
  ArrowLeft,
  Sparkles,
  Check,
  Shield,
  ChevronRight,
  Package,
  Layers
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import BiodataForm, { BiodataFormData } from "@/components/exam/BiodataForm";

// Section data
const toeflSections = [
  { 
    id: "listening", 
    name: "Listening", 
    duration: "35 min", 
    icon: Headphones, 
    description: "Memahami percakapan dan kuliah",
    questionCount: 50
  },
  { 
    id: "structure", 
    name: "Structure", 
    duration: "25 min", 
    icon: FileText, 
    description: "Tata bahasa dan ekspresi tertulis",
    questionCount: 40
  },
  { 
    id: "reading", 
    name: "Reading", 
    duration: "55 min", 
    icon: BookOpen, 
    description: "Memahami bacaan akademik",
    questionCount: 50
  },
];

// Simulation progress type
interface SimulationProgress {
  listening: boolean;
  structure: boolean;
  reading: boolean;
  fullPackage: boolean;
}

const ExamsTOEFL = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showBiodataForm, setShowBiodataForm] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState<SimulationProgress>({
    listening: false,
    structure: false,
    reading: false,
    fullPackage: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    // Load simulation progress from localStorage
    const savedProgress = localStorage.getItem("toefl_simulation_progress");
    if (savedProgress) {
      setSimulationProgress(JSON.parse(savedProgress));
    }

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Calculate progress percentage
  const completedCount = Object.values(simulationProgress).filter(Boolean).length;
  const progressPercentage = (completedCount / 4) * 100; // 4 = 3 sections + 1 full package

  const handleStartSimulation = (sectionId: string) => {
    // Navigate to topics list page for the selected section
    navigate(`/exam/toefl/${sectionId}/topics`);
  };

  const handleStartFullSimulation = () => {
    navigate(`/exam/toefl-itp/simulasi?section=all`);
  };

  const handleStartFinal = () => {
    setShowBiodataForm(true);
  };

  const handleBiodataSubmit = (data: BiodataFormData) => {
    // Save biodata and proceed to exam
    localStorage.setItem("exam_biodata", JSON.stringify(data));
    navigate(`/exam/toefl-itp/final`);
  };

  // Show biodata form if triggered
  if (showBiodataForm) {
    return (
      <BiodataForm 
        examType="toefl"
        onSubmit={handleBiodataSubmit}
        onCancel={() => setShowBiodataForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard/toefl")} 
                className="px-2 sm:px-3 hover:bg-red-50 hover:text-red-600"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
              <img src={logo} alt="Fullbright Indonesia" className="h-8 sm:h-10 hidden sm:block" />
            </div>
            <div className="flex items-center gap-1 sm:gap-4">
              <span className="text-sm text-muted-foreground hidden md:block max-w-[150px] truncate">
                {user?.email}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/dashboard/toefl")} 
                className="px-2 sm:px-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LayoutDashboard className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Riwayat</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="px-2 sm:px-4 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Exam Header */}
          <div className="mb-8 sm:mb-10 animate-fade-up">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-red-600">TOEFL</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">TOEFL ITP</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Institutional Testing Program</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6 p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress Simulasi</span>
                <span className="text-sm text-muted-foreground">{completedCount}/4 selesai</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>

          {/* Simulasi Per-Section */}
          <div className="mb-8 sm:mb-10 animate-fade-up animation-delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                <Layers className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Simulasi Per-Materi</h2>
                <p className="text-sm text-muted-foreground">Latihan berdasarkan section yang dipilih</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {toeflSections.map((section, index) => {
                const isCompleted = simulationProgress[section.id as keyof SimulationProgress];
                const SectionIcon = section.icon;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleStartSimulation(section.id)}
                    className="group relative p-5 rounded-xl bg-card border-2 border-border hover:border-gray-400 hover:shadow-lg transition-all duration-300 text-left animate-fade-up"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    {/* Completed checkmark */}
                    {isCompleted && (
                      <div className="absolute top-3 left-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-3 mt-2">
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isCompleted 
                          ? "bg-green-100 border-green-200" 
                          : "bg-gray-100 group-hover:bg-red-100 border-gray-200 group-hover:border-red-200"
                      }`}>
                        <SectionIcon className={`w-5 h-5 ${
                          isCompleted ? "text-green-600" : "text-gray-600 group-hover:text-red-600"
                        } transition-colors`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{section.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {section.duration}
                          <span className="text-gray-300">•</span>
                          {section.questionCount} soal
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{section.description}</p>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isCompleted ? "text-green-600" : "text-muted-foreground"}`}>
                        {isCompleted ? "Selesai ✓" : "Belum dikerjakan"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulasi Full Package */}
          <div className="mb-8 sm:mb-10 animate-fade-up animation-delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                <Package className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Simulasi Per-Paket</h2>
                <p className="text-sm text-muted-foreground">Latihan semua section dalam satu sesi</p>
              </div>
            </div>

            <button
              onClick={handleStartFullSimulation}
              className="group relative w-full p-6 rounded-xl bg-card border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  Opsional
                </span>
              </div>

              {/* Completed checkmark */}
              {simulationProgress.fullPackage && (
                <div className="absolute top-4 left-4">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl border transition-colors ${
                  simulationProgress.fullPackage 
                    ? "bg-green-100 border-green-200" 
                    : "bg-gray-100 group-hover:bg-red-100 border-gray-200 group-hover:border-red-200"
                }`}>
                  <FlaskConical className={`w-6 h-6 ${
                    simulationProgress.fullPackage ? "text-green-600" : "text-gray-700 group-hover:text-red-600"
                  } transition-colors`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Full Package Simulation</h3>
                  <p className="text-sm text-muted-foreground">
                    Listening + Structure + Reading • 115 menit • 140 soal
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium group-hover:shadow-lg transition-shadow">
                  Mulai
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>

          {/* Final Exam */}
          <div className="animate-fade-up animation-delay-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100 border border-red-200">
                <GraduationCap className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Final Exam</h2>
                <p className="text-sm text-muted-foreground">Ujian resmi dengan timer dan penilaian</p>
              </div>
            </div>

            <button
              onClick={handleStartFinal}
              className="group relative w-full p-6 sm:p-8 rounded-2xl border-2 border-red-200 hover:border-red-400 hover:shadow-xl bg-card cursor-pointer transition-all duration-300 text-left"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-red-100 border border-red-200 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Mode Final</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
                      Official
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Ujian dengan timer sesuai waktu resmi. Simulasi kondisi ujian TOEFL ITP sebenarnya.
                  Anda akan diminta mengisi biodata sebelum memulai.
                </p>

                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Timer 115 menit
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Auto-submit saat waktu habis
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Kondisi ujian nyata
                  </li>
                </ul>

                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold group-hover:shadow-lg transition-shadow">
                    Mulai Final
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Info Footer */}
          <div className="mt-8 text-center animate-fade-up animation-delay-400">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Hasil ujian akan tersedia setelah selesai mengerjakan</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamsTOEFL;
