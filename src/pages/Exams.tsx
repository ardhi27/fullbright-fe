/**
 * Exams Page - Fullbright Theme (Putih-Hitam-Merah)
 * Halaman pemilihan jenis ujian
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wordmark.png";
import {
  LogOut,
  BookOpen,
  Clock,
  FileText,
  Headphones,
  PenTool,
  LayoutDashboard,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { User } from "@supabase/supabase-js";

const examTypes = [
  {
    id: "ielts",
    name: "IELTS",
    subtitle: "Academic & General Training",
    description: "Simulasi ujian IELTS dengan format Computer-delivered resmi",
    color: "red",
    sections: [
      { name: "Listening", duration: "30 min", icon: Headphones },
      { name: "Reading", duration: "60 min", icon: BookOpen },
      { name: "Writing", duration: "60 min", icon: PenTool },
    ],
    href: "/exams/ielts",
    dashboardHref: "/dashboard/ielts",
  },
  {
    id: "toefl-itp",
    name: "TOEFL ITP",
    subtitle: "Institutional Testing Program",
    description: "Simulasi ujian TOEFL ITP dengan format paper-based resmi",
    color: "gray",
    sections: [
      { name: "Listening", duration: "35 min", icon: Headphones },
      { name: "Structure", duration: "25 min", icon: FileText },
      { name: "Reading", duration: "55 min", icon: BookOpen },
    ],
    href: "/exams/toefl",
    dashboardHref: "/dashboard/toefl",
  },
];

const Exams = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

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
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Fullbright Indonesia"
                className="h-8 sm:h-10"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-muted-foreground hidden md:block max-w-[180px] truncate">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard/ielts")}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LayoutDashboard className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600"
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-10 text-center animate-fade-up">
            <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-red-100 border border-red-200 mb-4">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Pilih Jenis Ujian
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Mulai latihan dengan memilih tipe ujian yang ingin Anda
              simulasikan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {examTypes.map((exam, index) => (
              <button
                key={exam.id}
                onClick={() => navigate(exam.href)}
                className={`relative overflow-hidden rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl text-left group animate-fade-up ${
                  exam.color === "red"
                    ? "border-red-200 hover:border-red-400"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Top Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                    exam.color === "red"
                      ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                      : "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800"
                  }`}
                />

                {/* Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-40 sm:w-48 h-40 sm:h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${
                    exam.color === "red" ? "bg-red-500" : "bg-gray-500"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 sm:p-3 rounded-xl border transition-transform group-hover:scale-110 ${
                          exam.color === "red"
                            ? "bg-red-100 border-red-200"
                            : "bg-gray-100 border-gray-200"
                        }`}
                      >
                        <span
                          className={`text-sm sm:text-base font-bold ${
                            exam.color === "red"
                              ? "text-red-600"
                              : "text-gray-700"
                          }`}
                        >
                          {exam.name.split(" ")[0]}
                        </span>
                      </div>
                      <div>
                        <h2
                          className={`text-lg sm:text-xl font-bold ${
                            exam.color === "red"
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          {exam.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {exam.subtitle}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full transition-transform group-hover:translate-x-1 ${
                        exam.color === "red" ? "bg-red-100" : "bg-gray-100"
                      }`}
                    >
                      <ChevronRight
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          exam.color === "red"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
                    {exam.description}
                  </p>

                  {/* Sections */}
                  <div className="space-y-2">
                    {exam.sections.map((section) => (
                      <div
                        key={section.name}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border transition-colors ${
                          exam.color === "red"
                            ? "bg-red-50/50 border-red-100 group-hover:bg-red-50"
                            : "bg-gray-50/50 border-gray-100 group-hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <section.icon
                            className={`w-4 h-4 ${
                              exam.color === "red"
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-medium">
                            {section.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {section.duration}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(exam.dashboardHref);
                      }}
                      className={`text-xs sm:text-sm hover:underline ${
                        exam.color === "red" ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      Lihat Riwayat Ujian →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-8 sm:mt-12 text-center animate-fade-up animation-delay-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Exams;
