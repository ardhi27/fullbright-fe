import { FlaskConical, GraduationCap } from "lucide-react";
import { ExamDashboard } from "@/components/dashboard";

// Define IELTS-specific data
const packageData = {
  STARTER: {
    name: "IELTS LEVEL STARTER",
    level: "STARTER",
    description: "Cocok untuk pemula yang baru memulai persiapan IELTS",
    features: ["Materi dasar IELTS", "Latihan soal tingkat mudah", "Simulasi ujian pemula"],
    targetScore: "4.0 - 5.0",
    color: "bg-emerald-500"
  },
  INTERMEDIATE: {
    name: "IELTS LEVEL INTERMEDIATE",
    level: "INTERMEDIATE",
    description: "Untuk peserta dengan kemampuan bahasa Inggris menengah",
    features: ["Materi tingkat menengah", "Strategi menjawab soal", "Simulasi ujian lengkap"],
    targetScore: "5.5 - 6.5",
    color: "bg-blue-500"
  },
  ADVANCE: {
    name: "IELTS LEVEL ADVANCE",
    level: "ADVANCE",
    description: "Persiapan intensif untuk skor tinggi IELTS",
    features: ["Materi tingkat lanjut", "Teknik advanced", "Simulasi ujian full"],
    targetScore: "7.0 - 9.0",
    color: "bg-purple-500"
  }
};

const examModes = {
  simulasi: {
    path: "/exam/ielts/simulasi",
    title: "Mode Simulasi",
    description: "Latihan tanpa batas waktu. Cocok untuk belajar dan memahami format soal.",
    icon: <FlaskConical className="w-6 h-6 text-amber-500" />,
    timerInfo: "Tanpa Timer",
    additionalInfo: "Bisa diulang"
  },
  final: {
    path: "/exam/ielts/final",
    title: "Mode Final",
    description: "Simulasi ujian sebenarnya dengan batas waktu seperti ujian asli.",
    icon: <GraduationCap className="w-6 h-6 text-red-500" />,
    timerInfo: "Dengan Timer",
    additionalInfo: "Kondisi ujian nyata"
  }
};

const examSections = [
  { name: "Listening", duration: "30 menit", questions: 40, icon: "🎧" },
  { name: "Reading", duration: "60 menit", questions: 40, icon: "📖" },
  { name: "Writing", duration: "60 menit", questions: 2, icon: "✍️" },
  { name: "Speaking", duration: "11-14 menit", questions: 3, icon: "🗣️" },
];

const DashboardIELTS = () => {
  return (
    <ExamDashboard
      examType="ielts"
      packageData={packageData}
      examModes={examModes}
      examSections={examSections}
      localStorageKey="IELTS_STARTER"
    />
  );
};

export default DashboardIELTS;
