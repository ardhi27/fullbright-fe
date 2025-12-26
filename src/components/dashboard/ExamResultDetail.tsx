import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Calendar, 
  Clock, 
  FlaskConical, 
  GraduationCap, 
  Trophy,
  Target,
  Headphones,
  BookOpen,
  PenTool,
  FileText,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { ExamResult } from "@/hooks/useExamResults";
import WritingCriteriaBreakdown from "./WritingCriteriaBreakdown";
import WritingAnswerFeedback from "@/components/WritingAnswerFeedback";

interface ExamResultDetailProps {
  result: ExamResult;
  examType: "ielts" | "toefl";
  onBack: () => void;
}

// Question data with full details
interface QuestionData {
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
}

const ieltsListeningQuestions: QuestionData[] = [
  {
    question: "What is the main topic of the lecture?",
    options: [
      { label: "A", text: "Environmental conservation" },
      { label: "B", text: "Climate change effects" },
      { label: "C", text: "Wildlife protection" },
      { label: "D", text: "Ocean pollution" },
    ],
    correctAnswer: "B",
  },
  {
    question: "According to the speaker, what is the primary cause?",
    options: [
      { label: "A", text: "Industrial emissions" },
      { label: "B", text: "Deforestation" },
      { label: "C", text: "Agricultural practices" },
      { label: "D", text: "Urban development" },
    ],
    correctAnswer: "B",
  },
  {
    question: "What solution does the speaker propose?",
    options: [
      { label: "A", text: "Government regulations" },
      { label: "B", text: "Renewable energy adoption" },
      { label: "C", text: "Public awareness campaigns" },
      { label: "D", text: "International cooperation" },
    ],
    correctAnswer: "B",
  },
  {
    question: "When will the next conference take place?",
    options: [
      { label: "A", text: "Next month" },
      { label: "B", text: "Next year" },
      { label: "C", text: "In six months" },
      { label: "D", text: "Next week" },
    ],
    correctAnswer: "A",
  },
];

const ieltsReadingQuestions: QuestionData[] = [
  {
    question: "What is the author's main argument in the passage?",
    options: [
      { label: "A", text: "Technology has negative effects on society" },
      { label: "B", text: "Digital literacy is essential for modern education" },
      { label: "C", text: "Traditional teaching methods are superior" },
      { label: "D", text: "Students should avoid using computers" },
    ],
    correctAnswer: "B",
  },
  {
    question: "The word 'unprecedented' in paragraph 2 is closest in meaning to:",
    options: [
      { label: "A", text: "Expected" },
      { label: "B", text: "Unparalleled" },
      { label: "C", text: "Common" },
      { label: "D", text: "Traditional" },
    ],
    correctAnswer: "B",
  },
  {
    question: "According to the passage, what percentage of schools have adopted digital tools?",
    options: [
      { label: "A", text: "50%" },
      { label: "B", text: "65%" },
      { label: "C", text: "78%" },
      { label: "D", text: "90%" },
    ],
    correctAnswer: "C",
  },
];

const toeflListeningQuestions: QuestionData[] = [
  {
    question: "What is the professor mainly discussing?",
    options: [
      { label: "A", text: "Ancient history" },
      { label: "B", text: "Archaeological discoveries" },
      { label: "C", text: "Modern architecture" },
      { label: "D", text: "Art restoration" },
    ],
    correctAnswer: "B",
  },
  {
    question: "Why does the professor mention the excavation site?",
    options: [
      { label: "A", text: "To give an example" },
      { label: "B", text: "To contradict a theory" },
      { label: "C", text: "To illustrate the discovery process" },
      { label: "D", text: "To criticize methodology" },
    ],
    correctAnswer: "C",
  },
  {
    question: "What can be inferred about the artifacts?",
    options: [
      { label: "A", text: "They are well preserved" },
      { label: "B", text: "They date back to ancient times" },
      { label: "C", text: "They are commonly found" },
      { label: "D", text: "They require special handling" },
    ],
    correctAnswer: "B",
  },
];

const toeflStructureQuestions: QuestionData[] = [
  {
    question: "The committee _____ their decision yesterday.",
    options: [
      { label: "A", text: "announce" },
      { label: "B", text: "announced" },
      { label: "C", text: "announcing" },
      { label: "D", text: "announces" },
    ],
    correctAnswer: "B",
  },
  {
    question: "Neither the students nor the teacher _____ aware of the changes.",
    options: [
      { label: "A", text: "are" },
      { label: "B", text: "was" },
      { label: "C", text: "were" },
      { label: "D", text: "been" },
    ],
    correctAnswer: "B",
  },
  {
    question: "The book, _____ was published last year, became a bestseller.",
    options: [
      { label: "A", text: "that" },
      { label: "B", text: "who" },
      { label: "C", text: "which" },
      { label: "D", text: "whom" },
    ],
    correctAnswer: "C",
  },
  {
    question: "Had I known about the meeting, I _____ attended.",
    options: [
      { label: "A", text: "will have" },
      { label: "B", text: "would" },
      { label: "C", text: "would have" },
      { label: "D", text: "had" },
    ],
    correctAnswer: "C",
  },
  {
    question: "The research _____ conducted over a period of five years.",
    options: [
      { label: "A", text: "was" },
      { label: "B", text: "were" },
      { label: "C", text: "has" },
      { label: "D", text: "have" },
    ],
    correctAnswer: "A",
  },
];

const toeflReadingQuestions: QuestionData[] = [
  {
    question: "What is the main purpose of the passage?",
    options: [
      { label: "A", text: "To describe a phenomenon" },
      { label: "B", text: "To argue for a policy change" },
      { label: "C", text: "To explain a scientific concept" },
      { label: "D", text: "To compare two theories" },
    ],
    correctAnswer: "B",
  },
  {
    question: "The word 'integral' in the passage is closest in meaning to:",
    options: [
      { label: "A", text: "Optional" },
      { label: "B", text: "Separate" },
      { label: "C", text: "Essential" },
      { label: "D", text: "Additional" },
    ],
    correctAnswer: "C",
  },
  {
    question: "According to paragraph 3, what conclusion can be drawn?",
    options: [
      { label: "A", text: "The hypothesis was incorrect" },
      { label: "B", text: "More research is needed" },
      { label: "C", text: "The results support the theory" },
      { label: "D", text: "The experiment failed" },
    ],
    correctAnswer: "C",
  },
];

const ExamResultDetail = ({ result, examType, onBack }: ExamResultDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeWritingTask, setActiveWritingTask] = useState<"task1" | "task2">("task1");
  const isSimulasi = result.exam_mode === "simulasi";

  const getScoreColor = (score: number, type: "ielts" | "toefl") => {
    if (type === "ielts") {
      if (score >= 7) return "text-green-500";
      if (score >= 5.5) return "text-blue-500";
      if (score >= 4) return "text-amber-500";
      return "text-red-500";
    } else {
      if (score >= 550) return "text-green-500";
      if (score >= 450) return "text-blue-500";
      if (score >= 400) return "text-amber-500";
      return "text-red-500";
    }
  };

  const getScoreLevel = (score: number, type: "ielts" | "toefl") => {
    if (type === "ielts") {
      if (score >= 8) return "Expert User";
      if (score >= 7) return "Good User";
      if (score >= 6) return "Competent User";
      if (score >= 5) return "Modest User";
      if (score >= 4) return "Limited User";
      return "Basic User";
    } else {
      if (score >= 550) return "Advanced";
      if (score >= 450) return "Intermediate";
      if (score >= 400) return "Elementary";
      return "Beginning";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  const renderDetailedAnswerReview = (
    sectionName: string, 
    userAnswers: Record<string, string> | undefined, 
    questions: QuestionData[]
  ) => {
    if (!userAnswers) return null;
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-base flex items-center gap-2">
          {sectionName === "Listening" || sectionName === "Listening Comprehension" ? (
            <Headphones className="w-5 h-5 text-blue-500" />
          ) : sectionName === "Reading" || sectionName === "Reading Comprehension" ? (
            <BookOpen className="w-5 h-5 text-green-500" />
          ) : (
            <FileText className="w-5 h-5 text-amber-500" />
          )}
          {sectionName}
        </h4>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx.toString()];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div 
                key={idx}
                className={`p-4 rounded-lg border ${
                  isCorrect 
                    ? "bg-green-500/5 border-green-500/30" 
                    : "bg-red-500/5 border-red-500/30"
                }`}
              >
                {/* Question header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="shrink-0">
                      Soal {idx + 1}
                    </Badge>
                    <p className="text-sm font-medium">{q.question}</p>
                  </div>
                  {isCorrect ? (
                    <Badge className="bg-green-500 shrink-0">
                      <Check className="w-3 h-3 mr-1" />
                      Benar
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="shrink-0">
                      <X className="w-3 h-3 mr-1" />
                      Salah
                    </Badge>
                  )}
                </div>
                
                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option) => {
                    const isUserChoice = userAnswer === option.label;
                    const isCorrectAnswer = q.correctAnswer === option.label;
                    
                    let optionClass = "p-3 rounded-lg border text-sm flex items-start gap-2 transition-colors ";
                    
                    if (isCorrectAnswer) {
                      optionClass += "bg-green-500/10 border-green-500/50 ";
                    } else if (isUserChoice && !isCorrect) {
                      optionClass += "bg-red-500/10 border-red-500/50 ";
                    } else {
                      optionClass += "bg-muted/30 border-border/50 ";
                    }
                    
                    return (
                      <div key={option.label} className={optionClass}>
                        <span className={`font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isCorrectAnswer 
                            ? "bg-green-500 text-white" 
                            : isUserChoice && !isCorrect 
                              ? "bg-red-500 text-white" 
                              : "bg-muted text-muted-foreground"
                        }`}>
                          {option.label}
                        </span>
                        <span className={`${isCorrectAnswer ? "text-green-700 dark:text-green-400 font-medium" : ""}`}>
                          {option.text}
                          {isCorrectAnswer && (
                            <span className="ml-2 text-xs text-green-600">✓ Jawaban Benar</span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="ml-2 text-xs text-red-600">← Pilihan Anda</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  interface WritingAnswerData {
    userAnswer?: string;
    feedbackItems?: Array<{
      id: number;
      text: string;
      category: "taskAchievement" | "coherence" | "vocabulary" | "grammar";
      feedback: string;
      tag: string;
    }>;
    vocabularyData?: {
      words: Array<{ word: string; level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" }>;
      distribution: Array<{ level: string; percentage: number }>;
      errors: Array<{
        id: number;
        sentence: string;
        original: string;
        suggestion: string;
        explanation: string;
      }>;
    };
  }

  interface AnswersData {
    listening?: Record<string, string>;
    reading?: Record<string, string>;
    structure?: Record<string, string>;
    writing?: WritingAnswerData;
    writingTask1?: WritingAnswerData;
    writingTask2?: WritingAnswerData;
  }

  const answers = result.answers as AnswersData | null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isSimulasi ? "bg-amber-500/10" : "bg-red-500/10"
          }`}>
            {isSimulasi ? (
              <FlaskConical className="w-4 h-4 text-amber-500" />
            ) : (
              <GraduationCap className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div>
            <h2 className="font-semibold">
              Detail {isSimulasi ? "Simulasi" : "Final"} - {examType.toUpperCase()}
            </h2>
            <p className="text-xs text-muted-foreground">
              {format(new Date(result.completed_at), "EEEE, d MMMM yyyy 'pukul' HH:mm", { locale: id })}
            </p>
          </div>
        </div>
      </div>

      {/* Score Overview Card */}
      <Card className="overflow-hidden">
        <div className={`h-2 ${examType === "ielts" ? "bg-primary" : "bg-accent"}`} />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-1">Total Skor</p>
              <div className="flex items-center gap-3">
                <Trophy className={`w-8 h-8 ${getScoreColor(result.total_score || 0, examType)}`} />
                <span className={`text-5xl font-bold ${getScoreColor(result.total_score || 0, examType)}`}>
                  {examType === "ielts" 
                    ? (result.total_score || 0).toFixed(1) 
                    : Math.round(result.total_score || 0)}
                </span>
              </div>
              <Badge className="mt-2" variant="secondary">
                {getScoreLevel(result.total_score || 0, examType)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {result.section_scores && Object.entries(result.section_scores).map(([section, score]) => (
                <div key={section} className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">{section}</p>
                  <p className={`text-2xl font-bold ${getScoreColor(score as number, examType)}`}>
                    {examType === "ielts" 
                      ? (score as number).toFixed(1) 
                      : Math.round(score as number)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(result.completed_at), "d MMM yyyy", { locale: id })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(result.time_spent || 0)}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {result.package_level?.replace("_", " ")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${examType === "ielts" ? "grid-cols-3" : "grid-cols-2"}`}>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          {examType === "ielts" && <TabsTrigger value="writing">Writing Feedback</TabsTrigger>}
          <TabsTrigger value="answers">Review Jawaban</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          {/* IELTS Criteria Breakdown with Accordion */}
          {examType === "ielts" && (
            <Card>
              <CardContent className="pt-6">
                <WritingCriteriaBreakdown sectionScores={result.section_scores || {}} />
              </CardContent>
            </Card>
          )}

          {/* Section Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Breakdown Per Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examType === "ielts" ? (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-blue-500" />
                      <span>Listening</span>
                    </div>
                    <span className="font-bold">
                      Band {(result.section_scores?.Listening as number || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span>Reading</span>
                    </div>
                    <span className="font-bold">
                      Band {(result.section_scores?.Reading as number || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <PenTool className="w-5 h-5 text-purple-500" />
                      <span>Writing</span>
                    </div>
                    <span className="font-bold">
                      Band {(result.section_scores?.Writing as number || 0).toFixed(1)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-blue-500" />
                      <span>Listening Comprehension</span>
                    </div>
                    <span className="font-bold">
                      {Math.round(result.section_scores?.Listening as number || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-amber-500" />
                      <span>Structure & Written Expression</span>
                    </div>
                    <span className="font-bold">
                      {Math.round(result.section_scores?.Structure as number || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span>Reading Comprehension</span>
                    </div>
                    <span className="font-bold">
                      {Math.round(result.section_scores?.Reading as number || 0)}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Multiple Choice Review - IELTS */}
          {examType === "ielts" && answers && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Multiple Choice Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderDetailedAnswerReview(
                  "Listening", 
                  answers?.listening, 
                  ieltsListeningQuestions
                )}
                {renderDetailedAnswerReview(
                  "Reading", 
                  answers?.reading, 
                  ieltsReadingQuestions
                )}
              </CardContent>
            </Card>
          )}

          {/* Multiple Choice Review - TOEFL */}
          {examType === "toefl" && answers && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Multiple Choice Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderDetailedAnswerReview(
                  "Listening Comprehension", 
                  answers?.listening, 
                  toeflListeningQuestions
                )}
                {renderDetailedAnswerReview(
                  "Structure & Written Expression", 
                  answers?.structure, 
                  toeflStructureQuestions
                )}
                {renderDetailedAnswerReview(
                  "Reading Comprehension", 
                  answers?.reading, 
                  toeflReadingQuestions
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Writing Feedback Tab - IELTS Only */}
        {examType === "ielts" && (
          <TabsContent value="writing" className="mt-4 space-y-6">
            {/* Task Selector */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Pilih Task:</span>
              <div className="flex gap-2">
                <Button
                  variant={activeWritingTask === "task1" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveWritingTask("task1")}
                  className="min-w-[140px]"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Writing Task 1
                </Button>
                <Button
                  variant={activeWritingTask === "task2" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveWritingTask("task2")}
                  className="min-w-[140px]"
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Writing Task 2
                </Button>
              </div>
            </div>

            {/* Task Description */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium text-sm mb-1">
                {activeWritingTask === "task1" 
                  ? "Academic Writing Task 1" 
                  : "Writing Task 2 (Essay)"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {activeWritingTask === "task1"
                  ? "Describe visual information (graph, chart, table, or diagram) in at least 150 words."
                  : "Write an essay in response to a point of view, argument or problem in at least 250 words."}
              </p>
            </div>

            {/* Writing Feedback Content */}
            {(() => {
              const currentTask = activeWritingTask === "task1" 
                ? (answers?.writingTask1 || answers?.writing)
                : answers?.writingTask2;
              
              if (currentTask) {
                return (
                  <WritingAnswerFeedback
                    userAnswer={currentTask.userAnswer || ""}
                    feedbackItems={currentTask.feedbackItems || []}
                    vocabularyData={currentTask.vocabularyData}
                  />
                );
              }
              
              return (
                <Card>
                  <CardContent className="py-12 text-center">
                    <PenTool className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">
                      {activeWritingTask === "task1" 
                        ? "Writing Task 1 feedback tidak tersedia untuk ujian ini."
                        : "Writing Task 2 feedback tidak tersedia untuk ujian ini."}
                    </p>
                  </CardContent>
                </Card>
              );
            })()}
          </TabsContent>
        )}

        <TabsContent value="answers" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Jawaban</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {examType === "ielts" ? (
                <>
                  {renderDetailedAnswerReview(
                    "Listening", 
                    answers?.listening, 
                    ieltsListeningQuestions
                  )}
                  {renderDetailedAnswerReview(
                    "Reading", 
                    answers?.reading, 
                    ieltsReadingQuestions
                  )}
                </>
              ) : (
                <>
                  {renderDetailedAnswerReview(
                    "Listening Comprehension", 
                    answers?.listening, 
                    toeflListeningQuestions
                  )}
                  {renderDetailedAnswerReview(
                    "Structure & Written Expression", 
                    answers?.structure, 
                    toeflStructureQuestions
                  )}
                  {renderDetailedAnswerReview(
                    "Reading Comprehension", 
                    answers?.reading, 
                    toeflReadingQuestions
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamResultDetail;
