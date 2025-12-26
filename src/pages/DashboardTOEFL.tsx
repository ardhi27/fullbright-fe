import { FlaskConical, GraduationCap } from "lucide-react";
import { ExamDashboard } from "@/components/dashboard";

// Define TOEFL-specific data
const packageData = {
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

const examModes = {
  simulasi: {
    path: "/exam/toefl-itp/simulasi",
    title: "Mode Simulasi",
    description: "Latihan tanpa batas waktu. Cocok untuk belajar dan memahami format soal.",
    icon: <FlaskConical className="w-6 h-6 text-amber-500" />,
    timerInfo: "Tanpa Timer",
    additionalInfo: "Bisa diulang"
  },
  final: {
    path: "/exam/toefl-itp/final",
    title: "Mode Final",
    description: "Simulasi ujian sebenarnya dengan batas waktu seperti ujian asli.",
    icon: <GraduationCap className="w-6 h-6 text-red-500" />,
    timerInfo: "Dengan Timer",
    additionalInfo: "Kondisi ujian nyata"
  }
};

const examSections = [
  { name: "Listening Comprehension", duration: "30-35 menit", questions: 50, icon: "🎧" },
  { name: "Structure & Written Expression", duration: "25 menit", questions: 40, icon: "📝" },
  { name: "Reading Comprehension", duration: "55 menit", questions: 50, icon: "📖" },
];

const scoreRanges = [
  { score: "310-399", level: "Beginning", color: "text-muted-foreground" },
  { score: "400-449", level: "Elementary", color: "text-amber-500" },
  { score: "450-549", level: "Intermediate", color: "text-blue-500" },
  { score: "550-677", level: "Advanced", color: "text-green-500" },
];

const DashboardTOEFL = () => {
  return (
    <ExamDashboard
      examType="toefl"
      packageData={packageData}
      examModes={examModes}
      examSections={examSections}
      scoreRanges={scoreRanges}
      localStorageKey="TOEFL_STARTER"
    />
  );
};

export default DashboardTOEFL;
