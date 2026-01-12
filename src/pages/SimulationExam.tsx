/**
 * SimulationExam Page - Fullbright Theme
 * Halaman untuk mengerjakan soal simulasi per topik
 * Setiap topik memiliki 10 soal
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo-wordmark.png";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Trophy,
  Target,
  RotateCcw,
  FileText,
  Headphones,
  BookOpen,
  PenTool,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import {
  getQuestionsByTopicId,
  SimulationQuestion,
  WritingPrompt,
} from "@/data/simulationQuestions";

// Topic titles mapping
const topicTitles: Record<string, string> = {
  // TOEFL Listening
  "campus-conversation": "Campus Conversations",
  "student-services": "Student Services",
  "office-hours": "Office Hours",
  "long-conversation": "Long Conversations",
  "lecture-biology": "Lecture: Biology",
  "lecture-history": "Lecture: History",
  "lecture-arts": "Lecture: Arts",
  "lecture-science": "Lecture: Physical Science",
  // TOEFL Structure
  "subject-verb": "Subject-Verb Agreement",
  "tenses": "Verb Tenses",
  "conditionals": "Conditionals",
  "relative-clauses": "Relative Clauses",
  "passive-voice": "Passive Voice",
  "word-order": "Word Order",
  "parallel-structure": "Parallel Structure",
  "modifiers": "Modifiers & Comparisons",
  // TOEFL Reading
  "passage-1": "The Industrial Revolution",
  "passage-2": "Marine Ecosystems",
  "passage-3": "Ancient Civilizations",
  "passage-4": "Climate Change",
  "passage-5": "Psychology of Learning",
  "passage-6": "Space Exploration",
  "passage-7": "Art History",
  "passage-8": "Economic Systems",
  // IELTS Listening
  "social-needs": "Social Needs",
  "accommodation": "Accommodation & Housing",
  "travel-tourism": "Travel & Tourism",
  "health-fitness": "Health & Fitness",
  "education-training": "Education & Training",
  "environment": "Environment & Nature",
  "academic-discussion": "Academic Discussion",
  // IELTS Reading
  "science-tech": "Science & Technology",
  "history-archaeology": "History & Archaeology",
  "biology-nature": "Biology & Nature",
  "psychology": "Psychology & Behavior",
  "economics": "Economics & Business",
  "arts-culture": "Arts & Culture",
  "health-medicine": "Health & Medicine",
  "education": "Education Systems",
  "environment-climate": "Environment & Climate",
  "sociology": "Sociology & Society",
  // IELTS Writing
  "task1-line": "Task 1: Line Graph",
  "task1-bar": "Task 1: Bar Chart",
  "task1-pie": "Task 1: Pie Chart",
  "task1-table": "Task 1: Table",
  "task1-process": "Task 1: Process Diagram",
  "task1-map": "Task 1: Map",
  "task2-opinion": "Task 2: Opinion Essay",
  "task2-discussion": "Task 2: Discussion Essay",
  "task2-problem": "Task 2: Problem-Solution",
  "task2-advantage": "Task 2: Advantage-Disadvantage",
};

// Section icons
const sectionIcons: Record<string, typeof Headphones> = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  structure: FileText,
};

const sectionColors: Record<string, string> = {
  listening: "text-red-600 bg-red-100 border-red-200",
  reading: "text-green-600 bg-green-100 border-green-200",
  writing: "text-purple-600 bg-purple-100 border-purple-200",
  structure: "text-orange-600 bg-orange-100 border-orange-200",
};

const SimulationExam = () => {
  const navigate = useNavigate();
  const { examType, section, topicId } = useParams<{
    examType: string;
    section: string;
    topicId: string;
  }>();

  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<SimulationQuestion[] | WritingPrompt[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [writingAnswer, setWritingAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);

  // Audio player state for listening section
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [canProceedToQuestions, setCanProceedToQuestions] = useState(false);

  const isWritingSection = section === "writing";
  const isListeningSection = section === "listening";
  const SectionIcon = sectionIcons[section || "reading"] || FileText;

  useEffect(() => {
    // Auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    // Load questions
    if (examType && section && topicId) {
      const loadedQuestions = getQuestionsByTopicId(
        examType as "toefl" | "ielts",
        section,
        topicId
      );
      if (loadedQuestions) {
        setQuestions(loadedQuestions);
      }
    }
  }, [examType, section, topicId, navigate]);

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const elapsed = Math.floor((endTime - startTime) / 1000);
    setTimeSpent(elapsed);
    setShowResults(true);

    // Save progress to localStorage as list (append new entry, don't overwrite)
    if (examType && section && topicId) {
      const historyKey = `${examType}_simulation_history`;
      const savedHistory = localStorage.getItem(historyKey);
      const history: any[] = savedHistory ? JSON.parse(savedHistory) : [];
      const score = calculateScore();

      // Create new history entry with unique ID
      const newEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        topicId,
        topicTitle: topicTitles[topicId] || topicId,
        section,
        score: score.correct,
        totalQuestions: score.total,
        percentage: score.percentage,
        completedAt: new Date().toISOString(),
        timeSpent: elapsed,
        // Save answers for review
        answers: isWritingSection ? { writing: writingAnswer } : answers,
        // Save questions data for review
        questions: questions,
      };

      // Add new entry to the beginning of the array (most recent first)
      history.unshift(newEntry);

      // Optional: Limit history to last 100 entries to prevent localStorage overflow
      if (history.length > 100) {
        history.pop();
      }

      localStorage.setItem(historyKey, JSON.stringify(history));
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setWritingAnswer("");
    setCurrentQuestion(0);
    setShowResults(false);
    setAudioPlayed(false);
    setCanProceedToQuestions(false);
    setAudioProgress(0);
  };

  // Audio player handlers
  const handlePlayAudio = () => {
    setIsAudioPlaying(true);
    setAudioPlayed(true);
    
    // Simulate audio playback (in real app, this would be controlled by actual audio element)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAudioProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsAudioPlaying(false);
        setCanProceedToQuestions(true);
      }
    }, 100); // Simulates 10-second audio
  };

  const handleProceedToQuestions = () => {
    setCanProceedToQuestions(true);
  };

  const calculateScore = () => {
    if (isWritingSection) {
      const wordCount = writingAnswer.trim().split(/\s+/).filter(Boolean).length;
      const prompt = questions[currentQuestion] as WritingPrompt;
      const minWords = prompt?.wordCount || 150;
      return {
        correct: wordCount >= minWords ? 1 : 0,
        total: 1,
        percentage: wordCount >= minWords ? 100 : (wordCount / minWords) * 100,
      };
    }

    let correct = 0;
    const mcQuestions = questions as SimulationQuestion[];
    mcQuestions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correct++;
      }
    });

    return {
      correct,
      total: questions.length,
      percentage: (correct / questions.length) * 100,
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (percentage: number) => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 80) return "Very Good!";
    if (percentage >= 70) return "Good";
    if (percentage >= 60) return "Fair";
    return "Needs Improvement";
  };

  // Results View
  if (showResults) {
    const score = calculateScore();
    const scoreColor = getScoreColor(score.percentage);
    const scoreLabel = getScoreLabel(score.percentage);

    // Writing Section - Show Processing Message
    if (isWritingSection) {
      return (
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="sticky top-0 z-50 glass-card border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-4">
                  <img src={logo} alt="Fullbright Indonesia" className="h-8" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {examType?.toUpperCase()} Simulation - Writing
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="text-center">
                  {/* Success Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-2xl font-bold mb-3">Terima Kasih!</h1>
                  <p className="text-muted-foreground mb-2">
                    {topicTitles[topicId || ""] || topicId}
                  </p>
                  
                  {/* Processing Message */}
                  <div className="my-8 p-6 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="text-lg text-blue-700 font-medium">
                      Hasil simulasi Anda akan segera diproses
                    </p>
                  </div>

                  {/* Word Count Info */}
                  <p className="text-sm text-muted-foreground mb-8">
                    Total kata yang ditulis: {writingAnswer.trim().split(/\s+/).filter(Boolean).length} kata
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/exam/${examType}/${section}/topics`)}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Kembali ke Daftar Topik
                    </Button>
                    <Button onClick={handleRetake} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Coba Topik Lain
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }

    // Multiple Choice Results (non-writing)
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Fullbright Indonesia" className="h-8" />
                <span className="text-sm font-medium text-muted-foreground">
                  {examType?.toUpperCase()} Simulation - Results
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Score Card */}
            <div className="bg-card rounded-2xl border border-border p-8 mb-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Hasil Latihan</h1>
                <p className="text-muted-foreground">
                  {topicTitles[topicId || ""] || topicId}
                </p>
              </div>

              {/* Score Display */}
              <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Skor Anda</p>
                <p className={`text-5xl font-bold ${scoreColor} mb-2`}>
                  {score.correct}/{score.total}
                </p>
                <p className={`text-lg font-semibold ${scoreColor}`}>
                  {scoreLabel}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {score.percentage.toFixed(0)}% benar
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Waktu</p>
                  <p className="text-lg font-semibold">{formatTime(timeSpent)}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Soal</p>
                  <p className="text-lg font-semibold">{questions.length}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/exam/${examType}/${section}/topics`)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Daftar Topik
                </Button>
                <Button onClick={handleRetake} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Latihan
                </Button>
              </div>
            </div>

            {/* Answer Review (for MC questions) */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Review Jawaban
              </h3>
              <div className="space-y-3">
                {(questions as SimulationQuestion[]).map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        isCorrect
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-2">
                            {idx + 1}. {q.question}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <span
                              className={
                                isCorrect ? "text-green-600" : "text-red-600"
                              }
                            >
                              Jawaban Anda: {userAnswer || "-"}
                            </span>
                            {!isCorrect && (
                              <span className="text-green-600">
                                Jawaban Benar: {q.answer}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Loading state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Memuat soal...</p>
        </div>
      </div>
    );
  }

  // Audio Player View (for listening section only)
  if (isListeningSection && !canProceedToQuestions) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/exam/${examType}/${section}/topics`)}
                  className="px-2 sm:px-3"
                >
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Kembali</span>
                </Button>
                <img
                  src={logo}
                  alt="Fullbright Indonesia"
                  className="h-6 hidden md:block"
                />
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${sectionColors[section || "listening"]}`}
                >
                  <SectionIcon className="w-3 h-3" />
                  <span className="capitalize">{section}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground hidden sm:block">
                {topicTitles[topicId || ""] || topicId}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            {/* Audio Player Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-red-200 shadow-lg overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm">
                    <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-2xl font-bold">Listening Practice</h2>
                    <p className="text-red-100 text-xs sm:text-sm truncate">
                      {topicTitles[topicId || ""] || topicId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-8">
                {/* Instructions */}
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 text-sm sm:text-base mb-0.5 sm:mb-1">Instruksi:</p>
                      <p className="text-xs sm:text-sm text-red-700">
                        Dengarkan audio terlebih dahulu sebelum menjawab pertanyaan. 
                        Pastikan volume perangkat Anda sudah sesuai.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audio Player Controls */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Play Button */}
                  {!audioPlayed ? (
                    <div className="text-center">
                      <Button
                        onClick={handlePlayAudio}
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-8 py-4 sm:py-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                      >
                        <Headphones className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                        <span className="text-sm sm:text-lg font-semibold">Mulai Mendengarkan Audio</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">
                            {isAudioPlaying ? "Sedang memutar..." : "Audio selesai"}
                          </span>
                          <span className="font-medium text-red-600">
                            {audioProgress}%
                          </span>
                        </div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 rounded-full"
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      {isAudioPlaying && (
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">Memutar audio...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info Box */}
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Topik ini berisi {questions.length} pertanyaan
                      </span>
                    </div>
                  </div>

                  {/* Proceed Button - only show when audio is complete or can skip */}
                  {(audioProgress === 100 || audioPlayed) && (
                    <div className="pt-2 sm:pt-4">
                      <Button
                        onClick={handleProceedToQuestions}
                        disabled={!audioPlayed}
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 sm:py-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-lg font-semibold">Mulai Menjawab Pertanyaan</span>
                      </Button>
                    </div>
                  )}

                  {/* Skip option (for development/testing) */}
                  {audioPlayed && audioProgress < 100 && (
                    <div className="text-center">
                      <Button
                        onClick={handleProceedToQuestions}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                      >
                        Lewati dan mulai menjawab
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-2">
              💡 Tip: Anda dapat membuat catatan sambil mendengarkan audio
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Writing Section View
  if (isWritingSection) {
    const prompt = questions[currentQuestion] as WritingPrompt;
    const wordCount = writingAnswer.trim().split(/\s+/).filter(Boolean).length;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/exam/${examType}/${section}/topics`)}
                  className="px-2 sm:px-3"
                >
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Kembali</span>
                </Button>
                <img
                  src={logo}
                  alt="Fullbright Indonesia"
                  className="h-6 hidden md:block"
                />
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${sectionColors[section || "reading"]}`}
                >
                  <SectionIcon className="w-3 h-3" />
                  <span className="capitalize">{section}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Prompt {currentQuestion + 1} / {questions.length}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">
                {topicTitles[topicId || ""] || prompt.taskType}
              </h2>
              <div className="p-4 rounded-lg bg-secondary/50 mb-6">
                <p className="text-sm">{prompt.prompt}</p>
              </div>

              {/* Tips */}
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Tips:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {prompt.tips.map((tip, idx) => (
                    <li key={idx}>- {tip}</li>
                  ))}
                </ul>
              </div>

              {/* Writing Area */}
              <Textarea
                value={writingAnswer}
                onChange={(e) => setWritingAnswer(e.target.value)}
                placeholder="Tulis jawaban Anda di sini..."
                className="min-h-[300px] resize-none mb-4"
              />

              <div className="flex items-center justify-between text-sm">
                <span
                  className={
                    wordCount >= prompt.wordCount
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }
                >
                  Jumlah kata: {wordCount} / {prompt.wordCount} minimum
                </span>
                {wordCount < prompt.wordCount && (
                  <span className="text-red-600 text-xs">
                    {prompt.wordCount - wordCount} kata lagi
                  </span>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit}>Selesai & Lihat Hasil</Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Selanjutnya
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Multiple Choice View
  const currentQ = questions[currentQuestion] as SimulationQuestion;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/exam/${examType}/${section}/topics`)}
                className="px-2 sm:px-3"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
              <img
                src={logo}
                alt="Fullbright Indonesia"
                className="h-6 hidden md:block"
              />
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${sectionColors[section || "reading"]}`}
              >
                <SectionIcon className="w-3 h-3" />
                <span className="capitalize">{section}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              {topicTitles[topicId || ""] || topicId}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                Soal {currentQuestion + 1} dari {questions.length}
              </span>
              <span className="text-muted-foreground">
                {answeredCount} terjawab
              </span>
            </div>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="h-2"
            />
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            {/* Question Number Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    idx === currentQuestion
                      ? "bg-primary text-primary-foreground"
                      : answers[idx] !== undefined
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Question */}
            <div className="mb-6">
              <p className="text-lg font-medium mb-6">{currentQ.question}</p>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const optionLetter = option.charAt(0);
                  const isSelected = answers[currentQuestion] === optionLetter;

                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleSelectAnswer(currentQuestion, optionLetter)
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            optionLetter
                          )}
                        </span>
                        <span className="text-sm">{option.substring(3)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </Button>

            <div className="flex gap-2">
              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleSubmit} className="gap-2">
                  Selesai & Lihat Hasil
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="gap-2">
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Submit Button (always visible) */}
          {answeredCount === questions.length && currentQuestion !== questions.length - 1 && (
            <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-sm text-green-600 mb-3">
                Semua soal sudah dijawab!
              </p>
              <Button onClick={handleSubmit} variant="default">
                Selesai & Lihat Hasil
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SimulationExam;
