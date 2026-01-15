/**
 * Dashboard Types
 * Tipe data untuk komponen Dashboard
 */

/** Status ujian */
export type ExamStatus = "in_review" | "done";

/** Tipe ujian */
export type ExamType = "ielts" | "toefl";

/** Level CEFR */
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Kategori feedback */
export type FeedbackCategory = "taskAchievement" | "coherence" | "grammar" | "vocabulary";

/** Opsi pertanyaan */
export interface QuestionOption {
  id: number;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
}

/** Hasil section (listening/reading) */
export interface SectionResults {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  questions: QuestionOption[];
}

/** Sub-kriteria writing */
export interface SubCriteria {
  name: string;
  score: number;
}

/** Kriteria writing */
export interface WritingCriteria {
  score: number;
  max: number;
  label: string;
  description: string;
  explanation: string;
  scoreSummary: string;
  examinerPerspective: string;
  subCriteria: SubCriteria[];
}

/** Breakdown kriteria writing */
export interface CriteriaBreakdown {
  taskAchievement: WritingCriteria;
  coherence: WritingCriteria;
  lexicalResource: WritingCriteria;
  grammaticalRange: WritingCriteria;
}

/** Item feedback */
export interface FeedbackItem {
  id: number;
  text: string;
  category: FeedbackCategory;
  feedback: string;
  tag: string;
}

/** Kata vocabulary */
export interface VocabularyWord {
  word: string;
  level: CEFRLevel;
}

/** Distribusi level vocabulary */
export interface VocabularyDistribution {
  level: string;
  percentage: number;
}

/** Error vocabulary */
export interface VocabularyError {
  id: number;
  sentence: string;
  original: string;
  suggestion: string;
  explanation: string;
}

/** Data vocabulary */
export interface VocabularyData {
  words: VocabularyWord[];
  distribution: VocabularyDistribution[];
  errors: VocabularyError[];
}

/** Section IELTS Listening/Reading */
export interface IELTSSection {
  score: number;
  max: number;
  label: string;
  duration: string;
  results?: SectionResults;
}

/** Section IELTS Writing */
export interface IELTSWritingSection {
  score: number;
  max: number;
  label: string;
  duration: string;
  cefrLevel?: string;
  criteriaBreakdown?: CriteriaBreakdown;
  userAnswer?: string;
  feedbackItems?: FeedbackItem[];
  vocabularyData?: VocabularyData;
}

/** Section TOEFL ITP */
export interface ToeflSectionData {
  score: number;
  max: number;
  label: string;
  description: string;
  duration: string;
}

/** Sections IELTS */
export interface IELTSSections {
  listening?: IELTSSection;
  reading?: IELTSSection;
  writingTask1?: IELTSWritingSection;
  writingTask2?: IELTSWritingSection;
  structure?: never;
}

/** Sections TOEFL */
export interface TOEFLSections {
  listening?: ToeflSectionData;
  reading?: ToeflSectionData;
  structure?: ToeflSectionData;
  writingTask1?: never;
  writingTask2?: never;
}

/** Exam Session */
export interface ExamSession {
  id: number;
  examType: ExamType;
  date: string;
  time: string;
  totalDuration: string;
  status: ExamStatus;
  userName: string;
  userInitials: string;
  overallBand?: number;
  totalScore?: number;
  maxTotalScore?: number;
  sections: IELTSSections | TOEFLSections;
}
