import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wordmark.png";
import { LogOut, BookOpen, Clock, FileText, Headphones, PenTool, LayoutDashboard, ChevronRight } from "lucide-react";
import { User } from "@supabase/supabase-js";

const examTypes = [
  {
    id: "ielts",
    name: "IELTS",
    subtitle: "Academic & General Training",
    description: "Simulasi ujian IELTS dengan format Computer-delivered resmi",
    color: "primary",
    sections: [
      { name: "Listening", duration: "30 min", icon: Headphones },
      { name: "Reading", duration: "60 min", icon: BookOpen },
      { name: "Writing", duration: "60 min", icon: PenTool },
    ],
    href: "/exams/ielts",
  },
  {
    id: "toefl-itp",
    name: "TOEFL ITP",
    subtitle: "Institutional Testing Program",
    description: "Simulasi ujian TOEFL ITP dengan format paper-based resmi",
    color: "accent",
    sections: [
      { name: "Listening", duration: "35 min", icon: Headphones },
      { name: "Structure", duration: "25 min", icon: FileText },
      { name: "Reading", duration: "55 min", icon: BookOpen },
    ],
    href: "/exams/toefl-itp",
  },
];

const Exams = () => {
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
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Pilih Jenis Ujian</h1>
            <p className="text-muted-foreground">
              Mulai latihan dengan memilih tipe ujian yang ingin Anda simulasikan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {examTypes.map((exam) => (
              <button
                key={exam.id}
                onClick={() => navigate(exam.href)}
                className={`relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl text-left group ${
                  exam.color === "primary"
                    ? "border-primary/20 hover:border-primary/50"
                    : "border-accent/20 hover:border-accent/50"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                    exam.color === "primary" ? "bg-primary" : "bg-accent"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2
                        className={`text-2xl font-bold mb-1 ${
                          exam.color === "primary" ? "text-primary" : "text-accent"
                        }`}
                      >
                        {exam.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">{exam.subtitle}</p>
                    </div>
                    <div className={`p-2 rounded-full transition-transform group-hover:translate-x-1 ${
                      exam.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      <ChevronRight className={`w-5 h-5 ${
                        exam.color === "primary" ? "text-primary" : "text-accent"
                      }`} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6">{exam.description}</p>

                  {/* Sections */}
                  <div className="space-y-2">
                    {exam.sections.map((section) => (
                      <div
                        key={section.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-3">
                          <section.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{section.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {section.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Exams;
