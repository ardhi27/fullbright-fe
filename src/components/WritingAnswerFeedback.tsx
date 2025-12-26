/**
 * @fileoverview WritingAnswerFeedback Component
 *
 * Komponen ini menampilkan feedback untuk jawaban writing test pengguna.
 * Menampilkan jawaban pengguna dengan highlight berdasarkan kategori feedback
 * dan memberikan analisis vocabulary berdasarkan CEFR level.
 *
 * @module WritingAnswerFeedback
 *
 * @description
 * Fitur utama:
 * - Highlight teks berdasarkan 4 kategori: Task Achievement, Coherence, Vocabulary, Grammar
 * - Analisis vocabulary berdasarkan CEFR level (A1-C2)
 * - Menampilkan distribusi vocabulary dan error vocabulary
 * - Tab navigasi untuk beralih antar kategori feedback
 *
 * @example
 * ```tsx
 * <WritingAnswerFeedback
 *   userAnswer="Your essay text here..."
 *   feedbackItems={[
 *     {
 *       id: 1,
 *       text: "highlighted phrase",
 *       category: "grammar",
 *       feedback: "This should be corrected",
 *       tag: "Subject-Verb Agreement"
 *     }
 *   ]}
 *   vocabularyData={{
 *     words: [{ word: "example", level: "B1" }],
 *     distribution: [{ level: "B1", percentage: 45 }],
 *     errors: []
 *   }}
 * />
 * ```
 */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight } from "lucide-react";

/**
 * Interface untuk item feedback writing
 * @interface WritingFeedback
 * @property {number} id - ID unik untuk feedback
 * @property {string} text - Teks yang di-highlight dalam jawaban
 * @property {"taskAchievement" | "coherence" | "vocabulary" | "grammar"} category - Kategori feedback
 * @property {string} feedback - Penjelasan feedback
 * @property {string} tag - Label/tag untuk jenis error (contoh: "Run-on Sentence")
 */
interface WritingFeedback {
  id: number;
  text: string;
  category: "taskAchievement" | "coherence" | "vocabulary" | "grammar";
  feedback: string;
  tag: string;
}

/**
 * Interface untuk kata vocabulary dengan level CEFR
 * @interface VocabularyWord
 * @property {string} word - Kata yang dianalisis
 * @property {"A1" | "A2" | "B1" | "B2" | "C1" | "C2"} level - Level CEFR kata tersebut
 */
interface VocabularyWord {
  word: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

/**
 * Interface untuk error vocabulary
 * @interface VocabularyError
 * @property {number} id - ID unik untuk error
 * @property {string} sentence - Kalimat yang mengandung error
 * @property {string} original - Kata/frasa original yang salah
 * @property {string} suggestion - Saran perbaikan
 * @property {string} explanation - Penjelasan mengapa perlu diperbaiki
 */
interface VocabularyError {
  id: number;
  sentence: string;
  original: string;
  suggestion: string;
  explanation: string;
}

/**
 * Interface untuk data vocabulary lengkap
 * @interface VocabularyData
 * @property {VocabularyWord[]} words - Array kata-kata dengan level CEFR
 * @property {{ level: string; percentage: number }[]} distribution - Distribusi persentase per level CEFR
 * @property {VocabularyError[]} errors - Array error vocabulary yang ditemukan
 */
interface VocabularyData {
  words: VocabularyWord[];
  distribution: { level: string; percentage: number }[];
  errors: VocabularyError[];
}

/**
 * Props untuk komponen WritingAnswerFeedback
 * @interface WritingAnswerFeedbackProps
 * @property {string} userAnswer - Jawaban essay pengguna yang akan ditampilkan
 * @property {WritingFeedback[]} feedbackItems - Array feedback untuk di-highlight dalam jawaban
 * @property {VocabularyData} [vocabularyData] - Data vocabulary opsional untuk analisis CEFR
 */
interface WritingAnswerFeedbackProps {
  userAnswer: string;
  feedbackItems: WritingFeedback[];
  vocabularyData?: VocabularyData;
}

const categoryNames = {
  taskAchievement: "Task Achievement",
  coherence: "Coherence",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
};

const categoryColors = {
  taskAchievement: "bg-purple-100 text-purple-700 border-purple-200",
  coherence: "bg-emerald-100 text-emerald-700 border-emerald-200",
  vocabulary: "bg-orange-100 text-orange-700 border-orange-200",
  grammar: "bg-primary/10 text-primary border-primary/20",
};

const highlightColors = {
  taskAchievement: "bg-purple-200/50",
  coherence: "bg-emerald-200/50",
  vocabulary: "bg-orange-200/50",
  grammar: "bg-primary/20",
};

const cefrColors = {
  A1: { bg: "bg-gray-400", text: "text-white" },
  A2: { bg: "bg-green-500", text: "text-white" },
  B1: { bg: "bg-blue-500", text: "text-white" },
  B2: { bg: "bg-yellow-500", text: "text-white" },
  C1: { bg: "bg-orange-500", text: "text-white" },
  C2: { bg: "bg-red-500", text: "text-white" },
};

const cefrTextColors = {
  A1: "text-gray-600",
  A2: "text-green-600",
  B1: "text-blue-600",
  B2: "text-yellow-600",
  C1: "text-orange-600",
  C2: "text-red-600",
};

const cefrBarColors = {
  A1: "bg-gray-400",
  A2: "bg-green-500",
  B1: "bg-blue-500",
  B2: "bg-yellow-500",
  C1: "bg-orange-500",
  C2: "bg-red-500",
};

const WritingAnswerFeedback = ({ userAnswer, feedbackItems, vocabularyData }: WritingAnswerFeedbackProps) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryNames>("taskAchievement");
  const [vocabSubTab, setVocabSubTab] = useState<"distribution" | "errors">("distribution");

  const categories = Object.keys(categoryNames) as Array<keyof typeof categoryNames>;

  // Filter feedback items by category
  const filteredFeedback = feedbackItems.filter((item) => item.category === activeCategory);

  // Highlight text in the answer for regular feedback
  const highlightText = (text: string) => {
    let result = text;
    filteredFeedback.forEach((item, index) => {
      const regex = new RegExp(`(${item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      result = result.replace(
        regex,
        `<mark class="${highlightColors[activeCategory]} px-1 rounded cursor-pointer" data-index="${index}">$1<sup class="text-xs font-bold ml-0.5">${index + 1}</sup></mark>`
      );
    });
    return result;
  };

  // Highlight vocabulary words by CEFR level
  const highlightVocabulary = (text: string) => {
    if (!vocabularyData?.words) return text;
    
    let result = text;
    vocabularyData.words.forEach((item) => {
      const regex = new RegExp(`\\b(${item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi");
      result = result.replace(
        regex,
        `<span class="${cefrTextColors[item.level]} font-medium underline decoration-2 decoration-current">$1</span>`
      );
    });
    return result;
  };

  const renderVocabularyContent = () => {
    if (!vocabularyData) return null;

    return (
      <div>
        {/* Vocabulary sub-tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setVocabSubTab("distribution")}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              vocabSubTab === "distribution"
                ? "bg-secondary text-foreground border-border"
                : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary/50"
            }`}
          >
            vocabulary distribution
          </button>
          <button
            onClick={() => setVocabSubTab("errors")}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              vocabSubTab === "errors"
                ? "bg-secondary text-foreground border-border"
                : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary/50"
            }`}
          >
            errors
          </button>
        </div>

        {vocabSubTab === "distribution" ? (
          <div>
            <h4 className="font-semibold mb-4">Vocabulary Distribution</h4>
            <div className="space-y-3">
              {vocabularyData.distribution.map((item) => (
                <div key={item.level} className="flex items-center gap-3">
                  <span className={`${cefrBarColors[item.level as keyof typeof cefrBarColors]} text-white text-xs font-bold px-2 py-1 rounded w-10 text-center`}>
                    {item.level}
                  </span>
                  <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                    <div 
                      className={`${cefrBarColors[item.level as keyof typeof cefrBarColors]} h-full rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold">Vocabulary Errors</h4>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {vocabularyData.errors.map((error, index) => (
                <div key={error.id} className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm text-muted-foreground flex-1">{error.sentence}</p>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                      {error.original}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                      {error.suggestion}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">{error.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold mb-6">Your Answer</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Answer with highlights */}
        <div>
          {activeCategory === "vocabulary" && vocabularyData ? (
            <>
              {/* CEFR Legend */}
              <div className="flex flex-wrap gap-3 mb-4">
                {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((level) => (
                  <div key={level} className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${cefrBarColors[level]}`} />
                    <span className="text-xs font-medium text-muted-foreground">{level}</span>
                  </div>
                ))}
              </div>
              <div
                className="prose prose-sm max-w-none text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightVocabulary(userAnswer) }}
              />
            </>
          ) : (
            <div
              className="prose prose-sm max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightText(userAnswer) }}
            />
          )}
        </div>

        {/* Right: Feedback */}
        <div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? categoryColors[cat]
                    : "bg-secondary text-muted-foreground border-border hover:border-foreground/20"
                }`}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>

          {/* Vocabulary special content */}
          {activeCategory === "vocabulary" && vocabularyData ? (
            renderVocabularyContent()
          ) : (
            /* Regular feedback items */
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredFeedback.length === 0 ? (
                <p className="text-muted-foreground text-sm">No feedback for this category.</p>
              ) : (
                filteredFeedback.map((item, index) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          activeCategory === "taskAchievement"
                            ? "bg-purple-500 text-white"
                            : activeCategory === "coherence"
                            ? "bg-emerald-500 text-white"
                            : activeCategory === "vocabulary"
                            ? "bg-orange-500 text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground italic">&quot;{item.text}&quot;</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground pl-8">{item.feedback}</p>
                    <Badge variant="outline" className="ml-8">
                      {item.tag}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingAnswerFeedback;
