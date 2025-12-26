import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wordmark.png";
import { LogOut, BookOpen, Clock, Headphones, FileText, LayoutDashboard, GraduationCap, FlaskConical, ArrowLeft } from "lucide-react";
import { User } from "@supabase/supabase-js";

const toeflExam = {
  id: "toefl-itp",
  name: "TOEFL ITP",
  subtitle: "Institutional Testing Program",
  description: "Simulasi ujian TOEFL ITP dengan format paper-based resmi. Ujian ini mengukur kemampuan bahasa Inggris akademik Anda.",
  sections: [
    { name: "Listening", duration: "35 min", icon: Headphones, description: "Memahami percakapan dan kuliah" },
    { name: "Structure", duration: "25 min", icon: FileText, description: "Tata bahasa dan ekspresi tertulis" },
    { name: "Reading", duration: "55 min", icon: BookOpen, description: "Memahami bacaan akademik" },
  ],
};

const ExamsTOEFL = () => {
  const [user, setUser] = useState<User | null>(null);
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

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleStartExam = (mode: "simulasi" | "final") => {
    navigate(`/exam/toefl-itp/${mode}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/exams")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <img src={logo} alt="Fullbright Indonesia" className="h-10" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Riwayat Ujian
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Exam Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">TOEFL</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-accent">{toeflExam.name}</h1>
                <p className="text-muted-foreground">{toeflExam.subtitle}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {toeflExam.description}
            </p>
          </div>

          {/* Sections Overview */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Bagian Ujian</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {toeflExam.sections.map((section) => (
                <div
                  key={section.name}
                  className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <section.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="font-semibold block">{section.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {section.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mode Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pilih Mode Ujian</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <button
                onClick={() => handleStartExam("simulasi")}
                className="group relative overflow-hidden p-8 rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-300 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 bg-accent" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <FlaskConical className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl">Mode Simulasi</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Latihan tanpa batasan waktu. Cocok untuk belajar dan memahami format soal TOEFL ITP.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Tanpa timer
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Bisa pause kapan saja
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Ideal untuk latihan
                    </li>
                  </ul>
                </div>
              </button>

              <button
                onClick={() => handleStartExam("final")}
                className="group relative overflow-hidden p-8 rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-300 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 bg-accent" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10">
                      <GraduationCap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-xl">Mode Final</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Ujian dengan timer sesuai waktu resmi. Simulasi kondisi ujian TOEFL ITP sebenarnya.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Timer 115 menit
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Auto-submit saat waktu habis
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Kondisi ujian nyata
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamsTOEFL;