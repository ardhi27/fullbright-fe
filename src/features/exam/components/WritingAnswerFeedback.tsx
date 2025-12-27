/**
 * @fileoverview WritingAnswerFeedback Component
 *
 * Komponen ini menampilkan feedback untuk jawaban writing test pengguna.
 * Desain mengikuti referensi Cathoven IELTS dengan layout dua kolom.
 */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

interface WritingFeedback {
  id: number;
  text: string;
  category: "taskAchievement" | "coherence" | "vocabulary" | "grammar";
  feedback: string;
  tag: string;
  original?: string;
  suggestion?: string;
}

interface VocabularyWord {
  word: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

interface VocabularyError {
  id: number;
  sentence: string;
  original: string;
  suggestion: string;
  explanation: string;
}

interface VocabularyData {
  words: VocabularyWord[];
  distribution: { level: string; percentage: number }[];
  errors: VocabularyError[];
}

interface WritingAnswerFeedbackProps {
  userAnswer: string;
  feedbackItems: WritingFeedback[];
  vocabularyData?: VocabularyData;
  minimumWords?: number;
  overallFeedback?: string;
  vocabularyList?: Array<{ word: string; meaning: string; example: string }>;
}

const categoryNames = {
  taskAchievement: "Task Achievement",
  coherence: "Coherence",
  vocabulary: "Vocabulary",
  grammar: "Grammar",
};

const categoryTitles = {
  taskAchievement: "Task Achievement Errors",
  coherence: "Coherence Errors",
  vocabulary: "Vocabulary Distribution",
  grammar: "Errors and Corrections",
};

const cefrColors = {
  A1: { bg: "bg-gray-400", text: "text-gray-600", dot: "bg-gray-400" },
  A2: { bg: "bg-green-500", text: "text-green-600", dot: "bg-green-500" },
  B1: { bg: "bg-blue-500", text: "text-blue-600", dot: "bg-blue-500" },
  B2: { bg: "bg-purple-500", text: "text-purple-600", dot: "bg-purple-500" },
  C1: { bg: "bg-yellow-500", text: "text-yellow-600", dot: "bg-yellow-500" },
  C2: { bg: "bg-red-500", text: "text-red-600", dot: "bg-red-500" },
};

const cefrBarColors = {
  A1: "bg-gray-400",
  A2: "bg-green-500",
  B1: "bg-blue-500",
  B2: "bg-purple-500",
  C1: "bg-yellow-500",
  C2: "bg-red-500",
};

const WritingAnswerFeedback = ({
  userAnswer,
  feedbackItems,
  vocabularyData,
  minimumWords = 150,
  overallFeedback,
  vocabularyList,
}: WritingAnswerFeedbackProps) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryNames>("taskAchievement");
  const [vocabSubTab, setVocabSubTab] = useState<"distribution" | "errors">("distribution");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const categories = Object.keys(categoryNames) as Array<keyof typeof categoryNames>;

  // Calculate word count
  const wordCount = userAnswer.trim().split(/\s+/).filter((word) => word.length > 0).length;
  const hasReachedMinimum = wordCount >= minimumWords;

  // Filter feedback items by category
  const filteredFeedback = feedbackItems.filter((item) => item.category === activeCategory);

  const toggleExpanded = (id: number) => {
    const newSet = new Set(expandedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedItems(newSet);
  };

  // Highlight text with superscript numbers
  const highlightText = (text: string) => {
    let result = text;
    filteredFeedback.forEach((item, index) => {
      if (item.text) {
        const regex = new RegExp(`(${item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        result = result.replace(
          regex,
          `<mark class="bg-pink-200 dark:bg-pink-900/50 px-0.5 rounded font-medium">$1<sup class="text-[10px] font-bold text-pink-600 dark:text-pink-400 ml-0.5">${index + 1}</sup></mark>`
        );
      }
    });
    return result;
  };

  // Highlight vocabulary words by CEFR level
  const highlightVocabulary = (text: string) => {
    if (!vocabularyData?.words) return text;

    let result = text;
    vocabularyData.words.forEach((item) => {
      const regex = new RegExp(`\\b(${item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "gi");
      result = result.replace(regex, `<span class="${cefrColors[item.level].text} font-medium">$1</span>`);
    });
    return result;
  };

  const renderVocabularyContent = () => {
    return (
      <div>
        {/* Sub-tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setVocabSubTab("distribution")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              vocabSubTab === "distribution"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            vocabulary distribution
          </button>
          <button
            onClick={() => setVocabSubTab("errors")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              vocabSubTab === "errors"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            errors
          </button>
        </div>

        {vocabSubTab === "distribution" ? (
          <div>
            <h4 className="font-semibold mb-4">Vocabulary Distribution</h4>
            {vocabularyData?.distribution && vocabularyData.distribution.length > 0 ? (
              <div className="space-y-3">
                {vocabularyData.distribution.map((item) => (
                  <div key={item.level} className="flex items-center gap-3">
                    <span
                      className={`${cefrBarColors[item.level as keyof typeof cefrBarColors]} text-white text-xs font-bold px-2 py-1 rounded w-10 text-center`}
                    >
                      {item.level}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`${cefrBarColors[item.level as keyof typeof cefrBarColors]} h-full rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : vocabularyList && vocabularyList.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {vocabularyList.map((vocab, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-primary">{vocab.word}</span>
                      <span className="text-sm text-muted-foreground">- {vocab.meaning}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">"{vocab.example}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada data distribusi vocabulary.</p>
            )}

            {/* Vocabulary Errors section below distribution */}
            {vocabularyData?.errors && vocabularyData.errors.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h4 className="font-semibold">Vocabulary Errors</h4>
                </div>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {vocabularyData.errors.map((error, index) => (
                    <div key={error.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-sm text-muted-foreground flex-1">"{error.sentence}"</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3 pl-9">
                        <span className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                          {error.original}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">
                          {error.suggestion}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-9">{error.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold">Vocabulary Errors</h4>
            </div>
            {vocabularyData?.errors && vocabularyData.errors.length > 0 ? (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {vocabularyData.errors.map((error, index) => (
                  <div key={error.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-muted-foreground flex-1">"{error.sentence}"</p>
                    </div>
                    <div className="flex items-center gap-2 mb-3 pl-9">
                      <span className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {error.original}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">
                        {error.suggestion}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-9">{error.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada vocabulary errors.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFeedbackContent = () => {
    if (activeCategory === "vocabulary") {
      return renderVocabularyContent();
    }

    return (
      <div>
        <h4 className="font-semibold mb-4">{categoryTitles[activeCategory]}</h4>
        {filteredFeedback.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">Tidak ada feedback untuk kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {filteredFeedback.map((item, index) => {
              const isExpanded = expandedItems.has(item.id);
              const truncatedText = item.text.length > 80 ? item.text.substring(0, 80) + "..." : item.text;

              return (
                <div key={item.id} className="space-y-3">
                  {/* Error quote with number */}
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        "{isExpanded ? item.text : truncatedText}"
                        {item.text.length > 80 && (
                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="text-blue-500 hover:underline ml-1 text-sm font-medium"
                          >
                            {isExpanded ? "see less" : "see more"}
                          </button>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Correction suggestion for grammar */}
                  {activeCategory === "grammar" && item.original && item.suggestion && (
                    <div className="flex items-center gap-2 pl-9">
                      <span className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                        {item.original}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">
                        {item.suggestion}
                      </span>
                    </div>
                  )}

                  {/* Feedback explanation */}
                  <p className="text-sm text-foreground pl-9">{item.feedback}</p>

                  {/* Tags */}
                  <div className="flex gap-2 pl-9">
                    <Badge variant="secondary" className="text-xs">
                      {item.tag}
                    </Badge>
                    {activeCategory === "grammar" && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        Fix this to score 6+
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Word Count Alert */}
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border ${
          hasReachedMinimum
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
            : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
        }`}
      >
        <AlertCircle
          className={`w-5 h-5 ${hasReachedMinimum ? "text-emerald-600" : "text-amber-600"}`}
        />
        <div className="flex-1">
          <span className={`font-bold text-lg ${hasReachedMinimum ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
            {wordCount} words
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            {hasReachedMinimum
              ? `Great! You've reached the minimum of ${minimumWords} words.`
              : `You need ${minimumWords - wordCount} more words to reach the minimum of ${minimumWords} words.`}
          </span>
        </div>
      </div>

      {/* Overall Feedback */}
      {overallFeedback && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-primary">Overall Feedback</h4>
          <p className="text-sm text-foreground">{overallFeedback}</p>
        </div>
      )}

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Your Answer */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Your Answer</h3>

          {/* Vocabulary CEFR Legend - show when vocabulary tab is active */}
          {activeCategory === "vocabulary" && vocabularyData?.words && (
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-border">
              {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((level) => (
                <div key={level} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full ${cefrColors[level].dot}`} />
                  <span className="text-xs font-medium text-muted-foreground">{level}</span>
                </div>
              ))}
            </div>
          )}

          {/* Answer text with highlights */}
          <div
            className="prose prose-sm max-w-none text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: activeCategory === "vocabulary" && vocabularyData?.words
                ? highlightVocabulary(userAnswer)
                : highlightText(userAnswer),
            }}
          />
        </div>

        {/* Right: Feedback Panel */}
        <div className="bg-card rounded-xl border border-border p-6">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/20"
                }`}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>

          {/* Feedback content */}
          {renderFeedbackContent()}
        </div>
      </div>
    </div>
  );
};

export default WritingAnswerFeedback;
