/**
 * Exam Data Utilities
 * Data dan helper functions untuk informasi ujian
 */

import type { ExamType } from "./scoreUtils";

export interface ExamSectionInfo {
  name: string;
  duration: string;
  questions: number;
  icon: string;
  questionLabel?: string;
}

/**
 * Get exam sections berdasarkan exam type
 */
export const getExamSections = (examType: ExamType): ExamSectionInfo[] => {
  if (examType === "ielts") {
    return [
      { name: "Listening", duration: "30 menit", questions: 40, icon: "🎧" },
      { name: "Reading", duration: "60 menit", questions: 40, icon: "📖" },
      { name: "Writing", duration: "60 menit", questions: 2, icon: "✍️", questionLabel: "bagian" },
      { name: "Speaking", duration: "11-14 menit", questions: 3, icon: "🗣️", questionLabel: "bagian" },
    ];
  } else {
    return [
      { name: "Listening", duration: "30-40 menit", questions: 50, icon: "🎧" },
      { name: "Structure", duration: "25 menit", questions: 40, icon: "📝" },
      { name: "Reading", duration: "55 menit", questions: 50, icon: "📖" },
    ];
  }
};

export type PackageLevel = "STARTER" | "INTERMEDIATE" | "ADVANCE";

export interface PackageInfo {
  name: string;
  level: PackageLevel;
  color: string;
  features: string[];
  targetScore: string;
}

/**
 * Get package info berdasarkan level dan exam type
 */
export const getPackageInfo = (
  level: PackageLevel,
  examType: ExamType
): PackageInfo => {
  const packages: Record<PackageLevel, PackageInfo> = {
    STARTER: {
      name: "Starter Package",
      level: "STARTER",
      color: "bg-blue-500",
      features: ["Basic Practice", "Score Report"],
      targetScore: examType === "ielts" ? "5.0-5.5" : "400-450",
    },
    INTERMEDIATE: {
      name: "Intermediate Package",
      level: "INTERMEDIATE",
      color: "bg-purple-500",
      features: ["Full Practice", "Detailed Analysis", "Tips & Strategies"],
      targetScore: examType === "ielts" ? "6.0-6.5" : "450-500",
    },
    ADVANCE: {
      name: "Advance Package",
      level: "ADVANCE",
      color: "bg-amber-500",
      features: ["Complete Practice", "AI Feedback", "1-on-1 Review", "Unlimited Access"],
      targetScore: examType === "ielts" ? "7.0+" : "550+",
    },
  };

  return packages[level];
};

export interface ExamModeInfo {
  id: "simulasi" | "final";
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  iconColor: string;
  iconBgColor: string;
}

/**
 * Get exam mode info
 */
export const getExamModes = (): ExamModeInfo[] => [
  {
    id: "simulasi",
    title: "Mode Simulasi",
    description: "Latihan tanpa batas waktu dengan feedback langsung",
    features: ["Tanpa timer", "Feedback instan", "Bisa diulang"],
    buttonText: "Mulai Simulasi",
    iconColor: "text-amber-500",
    iconBgColor: "bg-amber-500/10",
  },
  {
    id: "final",
    title: "Mode Final",
    description: "Simulasi ujian seperti kondisi sesungguhnya",
    features: ["Dengan timer", "Kondisi real", "Skor akhir"],
    buttonText: "Mulai Ujian Final",
    iconColor: "text-primary",
    iconBgColor: "bg-primary/10",
  },
];

/**
 * TOEFL Score Range Info
 */
export interface ToeflScoreRange {
  range: string;
  level: string;
  color: string;
}

export const getToeflScoreRanges = (): ToeflScoreRange[] => [
  { range: "550-677", level: "Advanced", color: "bg-green-500/10 text-green-500" },
  { range: "450-549", level: "High Intermediate", color: "bg-blue-500/10 text-blue-500" },
  { range: "350-449", level: "Low Intermediate", color: "bg-amber-500/10 text-amber-500" },
  { range: "310-349", level: "Beginning", color: "bg-red-500/10 text-red-500" },
];
