/**
 * Score Utilities
 * Utility functions untuk formatting dan styling score
 */

export type ExamType = "ielts" | "toefl";

/**
 * Get color class berdasarkan score dan exam type
 */
export const getScoreColor = (score: number, examType: ExamType): string => {
  if (examType === "ielts") {
    if (score >= 7) return "text-green-500";
    if (score >= 5.5) return "text-blue-500";
    if (score >= 4) return "text-amber-500";
    return "text-red-500";
  } else {
    // TOEFL scoring (310-677)
    if (score >= 550) return "text-green-500";
    if (score >= 450) return "text-blue-500";
    if (score >= 350) return "text-amber-500";
    return "text-red-500";
  }
};

/**
 * Get background color class berdasarkan score dan exam type
 */
export const getScoreBgColor = (score: number, examType: ExamType): string => {
  if (examType === "ielts") {
    if (score >= 7) return "bg-green-500";
    if (score >= 5.5) return "bg-blue-500";
    if (score >= 4) return "bg-amber-500";
    return "bg-red-500";
  } else {
    if (score >= 550) return "bg-green-500";
    if (score >= 450) return "bg-blue-500";
    if (score >= 350) return "bg-amber-500";
    return "bg-red-500";
  }
};

/**
 * Get score level label berdasarkan score dan exam type
 */
export const getScoreLevel = (score: number, examType: ExamType): string => {
  if (examType === "ielts") {
    if (score >= 8) return "Expert User";
    if (score >= 7) return "Good User";
    if (score >= 6) return "Competent User";
    if (score >= 5) return "Modest User";
    if (score >= 4) return "Limited User";
    return "Extremely Limited";
  } else {
    if (score >= 550) return "Advanced";
    if (score >= 450) return "High Intermediate";
    if (score >= 350) return "Low Intermediate";
    return "Beginning";
  }
};

/**
 * Format score berdasarkan exam type
 */
export const formatScore = (score: number, examType: ExamType): string => {
  if (examType === "ielts") {
    return score.toFixed(1);
  }
  return Math.round(score).toString();
};

/**
 * Format score dengan max score
 */
export const formatScoreWithMax = (
  score: number,
  max: number,
  examType: ExamType
): string => {
  if (examType === "ielts") {
    return `${score.toFixed(1)}/${max}`;
  }
  return `${Math.round(score)}/${max}`;
};

/**
 * Calculate exam statistics
 */
export const calculateExamStats = (
  results: { total_score: number | null }[]
): { total: number; avg: number; best: number } => {
  const total = results.length;

  if (total === 0) {
    return { total: 0, avg: 0, best: 0 };
  }

  const scores = results
    .map((r) => r.total_score || 0)
    .filter((s) => s > 0);

  if (scores.length === 0) {
    return { total, avg: 0, best: 0 };
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const best = Math.max(...scores);

  return { total, avg, best };
};
