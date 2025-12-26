import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wordmark.png";
import { LogOut, BookOpen, Clock, Headphones, PenTool, LayoutDashboard, GraduationCap, FlaskConical, ArrowLeft } from "lucide-react";
import { User } from "@supabase/supabase-js";

const ieltsExam = {
  id: "ielts",
  name: "IELTS",
  subtitle: "Academic & General Training",
  description: "Simulasi ujian IELTS dengan format Computer-delivered resmi. Ujian ini menguji kemampuan bahasa Inggris Anda melalui empat keterampilan utama.",
  sections: [
    { name: "Listening", duration: "30 min", icon: Headphones, description: "Mendengarkan percakapan dan monolog" },
    { name: "Reading", duration: "60 min", icon: BookOpen, description: "Membaca dan memahami teks akademik" },
    { name: "Writing", duration: "60 min", icon: PenTool, description: "Menulis Task 1 & Task 2" },
  ],
};

const ExamsIELTS = () => {
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
    navigate(`/exam/ielts/${mode}`);
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
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">IELTS</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">{ieltsExam.name}</h1>
                <p className="text-muted-foreground">{ieltsExam.subtitle}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {ieltsExam.description}
            </p>
          </div>

          {/* Sections Overview */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Bagian Ujian</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {ieltsExam.sections.map((section) => (
                <div
                  key={section.name}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <section.icon className="w-5 h-5 text-primary" />
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
                className="group relative overflow-hidden p-8 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 bg-primary" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <FlaskConical className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl">Mode Simulasi</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Latihan tanpa batasan waktu. Cocok untuk belajar dan memahami format soal IELTS.
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
                className="group relative overflow-hidden p-8 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 bg-primary" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10">
                      <GraduationCap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-xl">Mode Final</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Ujian dengan timer sesuai waktu resmi. Simulasi kondisi ujian IELTS sebenarnya.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Timer 150 menit
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

export default ExamsIELTS;