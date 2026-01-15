/**
 * @fileoverview WritingAnswerFeedback Component
 *
 * Komponen ini menampilkan feedback untuk jawaban writing test pengguna.
 * Desain mengikuti referensi admin WritingFeedbackAnalysis.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, ArrowRight } from "lucide-react";

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
  userAnswer?: string;
  feedbackItems?: WritingFeedback[];
  vocabularyData?: VocabularyData;
  minimumWords?: number;
  overallFeedback?: string;
  vocabularyList?: Array<{ word: string; meaning: string; example: string }>;

  useSampleData?: boolean;
}

// ============================================================================
// SAMPLE DATA - Sama seperti admin untuk konsistensi dan demo
// ============================================================================

const sampleWritingText = `The line graph shows how much milk people in the US drink per person from 1970 to 2015, comparing whole milk and the low fat one. Overall it is clear that people prefer low fat milk more and more and whole milk go down a lot. I think the biggest change is people switch to healthy milk.

In 1970 Americans drank about 25 gallons of whole milk but only around 6 of low fat. By 1980 the figure for whole milk drop to roughly 20 while low fat increased to about 10 liters. This is a very big increase, maybe fifty percent. In the 1990s they are almost the same, near 15 each, so the gap is closed. After that whole milk keeps decreasing to 10 in 2000 and about 6 in 2010, then close to 5 percent in 2015.

On the other hand, low fat went up to around 14 and then it stayed almost stable for many years before a small fall at the end.

To conclude, people changed their habit and moved from full fat to low fat because of health reasons and advertisements etc. The total amount of milk together looks about similar over time, but low fat already overtake the other one around 2000 which shows a strong preference of modern peoples. The chart is easy to understand so the trends are obvious.`;

const sampleFeedbackItems: WritingFeedback[] = [
  // Task Achievement Errors
  {
    id: 1,
    text: "Overall it is clear that people prefer low fat milk more and more and whole milk go down a lot. I think the biggest change is people switch to healthy milk.",
    original:
      "Overall it is clear that people prefer low fat milk more and more and whole milk go down a lot.",
    suggestion:
      "Overall, whole milk consumption steadily decreased, while low-fat milk consumption rose and then remained higher than whole milk from the early 1990s onwards.",
    feedback:
      "The overview is not fully accurate or sufficiently developed. It should clearly state that whole milk consumption steadily declined, low-fat milk consumption increased and then plateaued, and that low-fat milk overtook whole milk in the early 1990s and remained higher.",
    tag: "overview",
    category: "taskAchievement",
  },
  {
    id: 2,
    text: "By 1980 the figure for whole milk drop to roughly 20 while low fat increased to about 10 liters. This is a very big increase, maybe fifty percent.",
    original:
      "about 10 liters. This is a very big increase, maybe fifty percent.",
    suggestion: "low-fat milk had increased significantly.",
    feedback:
      "The use of 'liters' is incorrect, as the graph uses gallons. Also, the mention of 'fifty percent' is unnecessary and not required for task response. Instead, focus on the trend and comparison.",
    tag: "accuracy",
    category: "taskAchievement",
  },
  // Coherence Errors
  {
    id: 3,
    text: "Overall it is clear that people prefer low fat milk more and more and whole milk go down a lot. I think the biggest change is people switch to healthy milk.",
    original: "I think the biggest change is people switch to healthy milk.",
    suggestion:
      "The most significant shift was the transition to low-fat milk.",
    feedback:
      "The introduction includes personal opinion and speculation, which interrupts the logical flow and is not appropriate for an objective summary. Remove subjective comments and focus on summarizing the main trends.",
    tag: "flow of ideas",
    category: "coherence",
  },
  {
    id: 4,
    text: "In 1970 Americans drank about 25 gallons of whole milk but only around 6 of low fat. By 1980 the figure for whole milk drop to roughly 20",
    original: "In 1970 Americans drank about 25 gallons... By 1980 the figure",
    suggestion: "In 1970..., and by 1980...",
    feedback:
      "The transition between these two sentences is abrupt. Use a linking phrase to show the progression over time.",
    tag: "transition",
    category: "coherence",
  },
  // Vocabulary Errors
  {
    id: 5,
    text: "the low fat one",
    original: "the low fat one",
    suggestion: "low fat milk",
    feedback:
      "The phrase 'the low fat one' is imprecise and informal. In academic writing, it is better to use 'low fat milk' for clarity and formality. 'The low fat one' is a vague reference and not suitable for IELTS Task 1.",
    tag: "description",
    category: "vocabulary",
  },
  {
    id: 6,
    text: "go down a lot",
    original: "go down a lot",
    suggestion: "decreased significantly",
    feedback:
      "The phrase 'go down a lot' is too informal for academic writing. Use more formal vocabulary like 'decreased significantly' or 'declined substantially'.",
    tag: "formality",
    category: "vocabulary",
  },
  // Grammar Errors
  {
    id: 7,
    text: "whole milk go down a lot",
    original: "whole milk go down a lot",
    suggestion: "whole milk goes down a lot",
    feedback:
      "The verb 'go' should be in the third person singular form 'goes' to agree with the singular subject 'whole milk'. In English, present simple verbs must agree with their subjects in number and person.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 8,
    text: "people switch to",
    original: "people switch to",
    suggestion: "people have switched to",
    feedback:
      "The verb tense 'switch' should be in the present perfect ('have switched') or past simple ('switched') to match the historical context being described.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 9,
    text: "drop",
    original: "drop",
    suggestion: "dropped",
    feedback:
      "The verb should be in past tense 'dropped' to maintain consistency with the historical timeline being described.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 10,
    text: "they are almost the same",
    original: "they are almost the same",
    suggestion: "they were almost the same",
    feedback:
      "Use past tense 'were' when describing historical data from the 1990s.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 11,
    text: "the gap is closed",
    original: "the gap is closed",
    suggestion: "the gap was closed",
    feedback:
      "Use past tense 'was' to maintain consistency with the historical narrative.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 12,
    text: "keeps decreasing",
    original: "keeps decreasing",
    suggestion: "kept decreasing",
    feedback:
      "Use past tense 'kept' when describing trends that occurred in the past.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 13,
    text: "changed their habit",
    original: "changed their habit",
    suggestion: "changed their habits",
    feedback:
      "'Habit' should be plural 'habits' when referring to multiple people's behaviors.",
    tag: "grammar",
    category: "grammar",
  },
  {
    id: 14,
    text: "low fat already overtake the other one",
    original: "low fat already overtake the other one",
    suggestion: "low fat had already overtaken the other one",
    feedback:
      "Use past perfect 'had overtaken' to indicate an action completed before another past action.",
    tag: "grammar",
    category: "grammar",
  },
];

// Vocabulary words by CEFR level
const sampleVocabularyWords: Record<string, string[]> = {
  A1: [
    "the",
    "a",
    "is",
    "are",
    "was",
    "were",
    "in",
    "to",
    "and",
    "of",
    "for",
    "from",
    "but",
    "so",
    "it",
    "they",
    "this",
    "that",
    "about",
    "by",
    "on",
    "at",
    "with",
    "more",
    "much",
    "how",
    "very",
    "big",
    "go",
    "up",
    "down",
    "end",
    "same",
    "near",
    "each",
    "one",
    "time",
    "years",
    "people",
    "think",
    "change",
    "milk",
    "whole",
    "fat",
    "low",
    "drink",
    "per",
    "person",
    "around",
    "only",
  ],
  A2: [
    "shows",
    "comparing",
    "clear",
    "prefer",
    "biggest",
    "switch",
    "healthy",
    "drank",
    "gallons",
    "figure",
    "roughly",
    "while",
    "increased",
    "liters",
    "increase",
    "maybe",
    "fifty",
    "percent",
    "almost",
    "gap",
    "closed",
    "keeps",
    "decreasing",
    "close",
    "hand",
    "went",
    "stayed",
    "stable",
    "before",
    "small",
    "fall",
    "conclude",
    "changed",
    "habit",
    "moved",
    "full",
    "because",
    "health",
    "reasons",
    "advertisements",
    "total",
    "amount",
    "together",
    "looks",
    "similar",
    "already",
    "overtake",
    "strong",
    "preference",
    "modern",
    "peoples",
    "chart",
    "easy",
    "understand",
    "trends",
    "obvious",
  ],
  B1: [
    "graph",
    "line",
    "overall",
    "drop",
    "percent",
    "decreasing",
    "stable",
    "conclude",
    "preference",
  ],
  B2: [
    "comparing",
    "consumption",
    "steadily",
    "plateaued",
    "significantly",
    "substantially",
  ],
  C1: ["advertisements", "overtake"],
  C2: ["consumption"],
};

const sampleVocabularyDistribution = [
  { level: "A1", percentage: 56 },
  { level: "A2", percentage: 21 },
  { level: "B1", percentage: 11 },
  { level: "B2", percentage: 8 },
  { level: "C1", percentage: 2 },
  { level: "C2", percentage: 1 },
];

// Map internal category to tab value
const categoryToTab: Record<string, string> = {
  taskAchievement: "task-achievement",
  coherence: "coherence",
  vocabulary: "vocabulary",
  grammar: "grammar",
};

const tabToCategory: Record<string, string> = {
  "task-achievement": "taskAchievement",
  coherence: "coherence",
  vocabulary: "vocabulary",
  grammar: "grammar",
};

// CEFR Colors
const cefrBadgeColors: Record<string, string> = {
  A1: "bg-gray-100 text-gray-700",
  A2: "bg-green-100 text-green-700",
  B1: "bg-blue-100 text-blue-700",
  B2: "bg-indigo-100 text-indigo-700",
  C1: "bg-yellow-100 text-yellow-700",
  C2: "bg-red-100 text-red-700",
};

const cefrBarColors: Record<string, string> = {
  A1: "bg-gray-400",
  A2: "bg-green-500",
  B1: "bg-blue-500",
  B2: "bg-indigo-500",
  C1: "bg-yellow-500",
  C2: "bg-red-500",
};

const cefrWordColors: Record<string, string> = {
  A1: "text-gray-600",
  A2: "text-green-600 underline decoration-green-400",
  B1: "text-blue-600 underline decoration-blue-400",
  B2: "text-indigo-600 underline decoration-indigo-400",
  C1: "text-yellow-600 underline decoration-yellow-500",
  C2: "text-red-600 underline decoration-red-400",
};

const criteriaConfig = {
  "task-achievement": {
    label: "Task Achievement",
    title: "Task Achievement Errors",
    highlightColor: "bg-blue-200 dark:bg-blue-900/60",
    hoverColor: "hover:bg-blue-300 dark:hover:bg-blue-800/80",
    borderColor: "border-blue-400",
  },
  coherence: {
    label: "Coherence",
    title: "Coherence Errors",
    highlightColor: "bg-teal-200 dark:bg-teal-900/60",
    hoverColor: "hover:bg-teal-300 dark:hover:bg-teal-800/80",
    borderColor: "border-teal-400",
  },
  vocabulary: {
    label: "Vocabulary",
    title: "Vocabulary Errors",
    highlightColor: "bg-purple-200 dark:bg-purple-900/60",
    hoverColor: "hover:bg-purple-300 dark:hover:bg-purple-800/80",
    borderColor: "border-purple-400",
  },
  grammar: {
    label: "Grammar",
    title: "Errors and Corrections",
    highlightColor: "bg-red-200 dark:bg-red-900/60",
    hoverColor: "hover:bg-red-300 dark:hover:bg-red-800/80",
    borderColor: "border-red-400",
  },
};

const WritingAnswerFeedback = ({
  userAnswer,
  feedbackItems,
  vocabularyData,
  minimumWords = 150,
  overallFeedback,
  vocabularyList,
  summaryFeedback,
  useSampleData = false,
}: WritingAnswerFeedbackProps) => {
  const [activeTab, setActiveTab] = useState<
    "task-achievement" | "coherence" | "vocabulary" | "grammar"
  >("task-achievement");

  // Use sample data if no real data provided or useSampleData is true
  const shouldUseSample =
    useSampleData ||
    (!userAnswer && (!feedbackItems || feedbackItems.length === 0));
  const effectiveUserAnswer = shouldUseSample
    ? sampleWritingText
    : userAnswer || "";
  const effectiveFeedbackItems = shouldUseSample
    ? sampleFeedbackItems
    : feedbackItems || [];
  const [selectedErrorText, setSelectedErrorText] = useState<string | null>(
    null
  );
  const [highlightedErrorId, setHighlightedErrorId] = useState<number | null>(
    null
  );

  // Calculate word count
  const wordCount = effectiveUserAnswer
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const hasReachedMinimum = wordCount >= minimumWords;

  // Get current category from tab
  const currentCategory = tabToCategory[activeTab] as
    | "taskAchievement"
    | "coherence"
    | "vocabulary"
    | "grammar";
  const currentErrors = effectiveFeedbackItems.filter(
    (item) => item.category === currentCategory
  );
  const config = criteriaConfig[activeTab];

  // Get CEFR level of a word
  const getWordCEFRLevel = (word: string): string | null => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");

    // Use sample vocabulary words if in sample mode
    if (shouldUseSample) {
      for (const level of ["C2", "C1", "B2", "B1", "A2", "A1"] as const) {
        if (sampleVocabularyWords[level]?.includes(cleanWord)) {
          return level;
        }
      }
      return null;
    }

    // Use provided vocabulary data
    if (!vocabularyData?.words) return null;
    const found = vocabularyData.words.find(
      (w) => w.word.toLowerCase() === cleanWord
    );
    return found?.level || null;
  };

  // Render text with CEFR word highlighting (for vocabulary tab)
  const renderVocabularyHighlightedText = () => {
    // Show CEFR highlighting when we have vocabulary data or are using sample data
    const hasVocabData =
      shouldUseSample ||
      (vocabularyData?.words && vocabularyData.words.length > 0);

    if (!hasVocabData) {
      return (
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {effectiveUserAnswer}
        </p>
      );
    }

    const words = effectiveUserAnswer.split(/(\s+)/);
    return (
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
        {words.map((word, idx) => {
          const level = getWordCEFRLevel(word);
          if (level) {
            return (
              <span
                key={idx}
                className={`${cefrWordColors[level]} cursor-pointer`}
                title={`${level} level`}
              >
                {word}
              </span>
            );
          }
          return <span key={idx}>{word}</span>;
        })}
      </p>
    );
  };

  // Handle clicking on a highlighted error
  const handleHighlightClick = (errorId: number) => {
    setHighlightedErrorId(errorId);
    // Scroll to the error in the right panel
    const errorElement = document.getElementById(`error-item-${errorId}`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Clear highlight after 2 seconds
    setTimeout(() => setHighlightedErrorId(null), 2000);
  };

  // Render text with error highlighting
  const renderHighlightedText = () => {
    if (activeTab === "vocabulary") {
      return renderVocabularyHighlightedText();
    }

    const highlights: { text: string; index: number; errorId: number }[] = [];
    const result = effectiveUserAnswer;

    currentErrors.forEach((error) => {
      if (error.text && error.text.trim()) {
        const index = result.indexOf(error.text);
        if (index !== -1) {
          highlights.push({ text: error.text, index, errorId: error.id });
        }
      }
    });

    // Sort by index
    highlights.sort((a, b) => a.index - b.index);

    if (highlights.length === 0) {
      return (
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {effectiveUserAnswer}
        </p>
      );
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    highlights.forEach((highlight, idx) => {
      if (highlight.index > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>
            {result.substring(lastIndex, highlight.index)}
          </span>
        );
      }

      const errorIndex =
        currentErrors.findIndex((e) => e.text === highlight.text) + 1;
      parts.push(
        <span
          key={`highlight-${idx}`}
          onClick={() => handleHighlightClick(highlight.errorId)}
          className={`${config.highlightColor} ${config.hoverColor} px-0.5 py-0.5 rounded cursor-pointer transition-colors border-b-2 ${config.borderColor}`}
          title={`Click to see error #${errorIndex} details`}
        >
          {highlight.text}
          <sup className="text-[10px] font-bold text-red-600 dark:text-red-400 ml-0.5 select-none">
            {errorIndex}
          </sup>
        </span>
      );

      lastIndex = highlight.index + highlight.text.length;
    });

    if (lastIndex < result.length) {
      parts.push(<span key="text-end">{result.substring(lastIndex)}</span>);
    }

    return (
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
        {parts}
      </p>
    );
  };

  // Get vocabulary distribution
  const getVocabularyDistribution = () => {
    // Use sample distribution when in sample mode
    if (shouldUseSample) {
      return sampleVocabularyDistribution;
    }

    if (
      vocabularyData?.distribution &&
      vocabularyData.distribution.length > 0
    ) {
      return vocabularyData.distribution;
    }

    if (vocabularyData?.words && vocabularyData.words.length > 0) {
      const levelCounts: Record<string, number> = {
        A1: 0,
        A2: 0,
        B1: 0,
        B2: 0,
        C1: 0,
        C2: 0,
      };
      vocabularyData.words.forEach((word) => {
        if (levelCounts[word.level] !== undefined) {
          levelCounts[word.level]++;
        }
      });
      const total = vocabularyData.words.length;
      return Object.entries(levelCounts)
        .filter(([_, count]) => count > 0)
        .map(([level, count]) => ({
          level,
          percentage: Math.round((count / total) * 100),
        }));
    }

    // Default distribution (fallback)
    return sampleVocabularyDistribution;
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <p className="text-xl font-semibold text-foreground">
          Writing Feedback
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Word Count Alert */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border ${
            hasReachedMinimum
              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}
        >
          <AlertCircle
            className={`w-5 h-5 shrink-0 ${
              hasReachedMinimum ? "text-emerald-600" : "text-amber-600"
            }`}
          />
          <div className="flex-1">
            <span
              className={`font-bold text-base sm:text-lg ${
                hasReachedMinimum
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-amber-700 dark:text-amber-400"
              }`}
            >
              {wordCount} words
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground ml-2">
              {hasReachedMinimum
                ? `Great! You've reached the minimum of ${minimumWords} words.`
                : `You need ${
                    minimumWords - wordCount
                  } more words to reach the minimum of ${minimumWords} words.`}
            </span>
          </div>
        </div>



        {/* Overall Feedback */}
        {overallFeedback && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-primary">
              Overall Feedback
            </h4>
            <p className="text-sm text-foreground">{overallFeedback}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Essay Text */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Your Answer
            </h3>

            {/* CEFR Legend - only show for vocabulary tab */}
            {activeTab === "vocabulary" &&
              (shouldUseSample || vocabularyData?.words) && (
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-gray-500">●</span>
                  <span className="text-muted-foreground">A1</span>
                  <span className="text-green-500">●</span>
                  <span className="text-muted-foreground">A2</span>
                  <span className="text-blue-500">●</span>
                  <span className="text-muted-foreground">B1</span>
                  <span className="text-indigo-500">●</span>
                  <span className="text-muted-foreground">B2</span>
                  <span className="text-yellow-500">●</span>
                  <span className="text-muted-foreground">C1</span>
                  <span className="text-red-500">●</span>
                  <span className="text-muted-foreground">C2</span>
                </div>
              )}

            <div className="text-sm text-muted-foreground leading-7">
              {renderHighlightedText()}
            </div>

            {/* Hint text */}
            {currentErrors.some((e) => e.text && e.text.trim()) && (
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Klik teks yang di-highlight untuk melihat detail feedback
              </p>
            )}
          </div>

          {/* Right Column - Criteria Tabs and Errors */}
          <div className="space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as typeof activeTab)}
            >
              <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0">
                <TabsTrigger
                  value="task-achievement"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm"
                >
                  Task Achievement
                </TabsTrigger>
                <TabsTrigger
                  value="coherence"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm"
                >
                  Coherence
                </TabsTrigger>
                <TabsTrigger
                  value="vocabulary"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm"
                >
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger
                  value="grammar"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm"
                >
                  Grammar
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6 space-y-6">
                {/* Vocabulary Distribution - only show for vocabulary tab */}
                {activeTab === "vocabulary" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Vocabulary Distribution
                    </h3>
                    <div className="space-y-3">
                      {getVocabularyDistribution().map((item) => (
                        <div
                          key={item.level}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`w-10 h-7 rounded-md flex items-center justify-center text-xs font-semibold ${
                              cefrBadgeColors[item.level]
                            }`}
                          >
                            {item.level}
                          </span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                cefrBarColors[item.level]
                              } rounded-full transition-all duration-500`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-10 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Vocabulary List */}
                    {vocabularyList && vocabularyList.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <h5 className="font-medium text-sm mb-3">
                          Vocabulary Highlights
                        </h5>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {vocabularyList.map((vocab, index) => (
                            <div
                              key={index}
                              className="p-3 bg-muted/50 rounded-lg border border-border"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-primary">
                                  {vocab.word}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  - {vocab.meaning}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground italic">
                                "{vocab.example}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Errors Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    {config.title}
                  </h3>

                  {currentErrors.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm">
                        Tidak ada feedback untuk kategori ini.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                      {currentErrors.map((error, index) => {
                        const hasText =
                          error.text && error.text.trim().length > 0;
                        const displayText = hasText
                          ? error.text
                          : error.feedback;
                        const truncatedText =
                          displayText.length > 100
                            ? displayText.substring(0, 100) + "..."
                            : displayText;
                        const isHighlighted = highlightedErrorId === error.id;

                        return (
                          <div
                            key={error.id}
                            id={`error-item-${error.id}`}
                            className={`space-y-3 p-3 rounded-lg transition-all duration-300 ${
                              isHighlighted
                                ? "bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-500 ring-offset-2"
                                : ""
                            }`}
                          >
                            {/* Error Header */}
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </span>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                "{truncatedText}"
                                {displayText.length > 100 && (
                                  <button
                                    onClick={() =>
                                      setSelectedErrorText(displayText)
                                    }
                                    className="text-primary text-xs ml-1 underline hover:text-primary/80 cursor-pointer transition-colors"
                                  >
                                    see more
                                  </button>
                                )}
                              </p>
                            </div>

                            {/* Correction Display for Grammar */}
                            {activeTab === "grammar" &&
                              error.original &&
                              error.suggestion && (
                                <div className="ml-10 flex items-center gap-3 flex-wrap">
                                  <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    {error.original.length > 30
                                      ? error.original.substring(0, 30) + "..."
                                      : error.original}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    {error.suggestion.length > 30
                                      ? error.suggestion.substring(0, 30) +
                                        "..."
                                      : error.suggestion}
                                  </span>
                                </div>
                              )}

                            {/* Correction Display for Vocabulary */}
                            {activeTab === "vocabulary" &&
                              hasText &&
                              error.suggestion && (
                                <div className="ml-10 flex items-center gap-3 flex-wrap">
                                  <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    {error.text}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                    {error.suggestion}
                                  </span>
                                </div>
                              )}

                            {/* Explanation/Feedback */}
                            {hasText && error.feedback && (
                              <p className="ml-10 text-sm text-muted-foreground leading-relaxed">
                                {error.feedback}
                              </p>
                            )}

                            {/* Category Badge */}
                            <div className="ml-10 flex items-center gap-2 flex-wrap">
                              {error.tag && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  {error.tag}
                                </Badge>
                              )}
                              {activeTab === "grammar" && (
                                <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>

      {/* See More Dialog */}
      <Dialog
        open={!!selectedErrorText}
        onOpenChange={() => setSelectedErrorText(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Full Text</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            "{selectedErrorText}"
          </p>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WritingAnswerFeedback;
