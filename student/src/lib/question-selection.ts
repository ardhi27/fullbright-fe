/**
 * Question Selection Logic for Student
 * Sistem untuk menyesuaikan soal berdasarkan paket siswa
 */

import { PackageLevel } from "@/features/dashboard/utils/examData";

/**
 * Fungsi untuk menentukan tingkat kesulitan soal yang sesuai berdasarkan paket siswa
 */
export const getAvailableDifficultyLevels = (studentPackageLevel: PackageLevel): PackageLevel[] => {
  if (studentPackageLevel === 'STARTER') {
    return ['STARTER'];
  } else if (studentPackageLevel === 'INTERMEDIATE') {
    return ['STARTER', 'INTERMEDIATE'];
  } else { // ADVANCE
    return ['STARTER', 'INTERMEDIATE', 'ADVANCE'];
  }
};

/**
 * Fungsi untuk menentukan apakah soal tertentu cocok untuk siswa
 */
export const isQuestionSuitableForStudent = (
  questionDifficulty: PackageLevel,
  studentPackageLevel: PackageLevel
): boolean => {
  if (studentPackageLevel === 'STARTER') {
    return questionDifficulty === 'STARTER';
  } else if (studentPackageLevel === 'INTERMEDIATE') {
    return questionDifficulty === 'STARTER' || questionDifficulty === 'INTERMEDIATE';
  } else { // ADVANCE
    return true;
  }
};

/**
 * Fungsi untuk mendapatkan soal yang sesuai berdasarkan paket siswa
 * Ini akan digunakan ketika mengambil soal dari API
 */
export const getQuestionsForStudentPackage = (
  allQuestions: any[], // Array of questions with difficulty property
  studentPackageLevel: PackageLevel,
  section: string
): any[] => {
  return allQuestions.filter(question => {
    // Filter berdasarkan bagian
    if (question.section && question.section !== section) return false;

    // Filter berdasarkan kesulitan
    if (!question.difficulty) return true; // Jika tidak ada tingkat kesulitan, tampilkan

    return isQuestionSuitableForStudent(question.difficulty as PackageLevel, studentPackageLevel);
  });
};