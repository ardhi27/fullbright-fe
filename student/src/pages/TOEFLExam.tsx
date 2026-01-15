/**
 * TOEFLExam Page - Fullbright Theme (Putih-Hitam-Merah)
 * Halaman ujian TOEFL ITP dengan tema Fullbright
 * 
 * Updated: Added confirmation dialog before submit
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo-wordmark.png";
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Check, Play, Pause, Volume2, AlertCircle, Trophy, Target, BookOpen, Headphones, FileText, RotateCcw, Timer, FlaskConical, GraduationCap, ChevronDown, Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useExamResults } from "@/hooks/useExamResults";
import { ExamTermsDialog } from "@/components/ExamTermsDialog";
import ExamSubmitConfirmDialog from "@/components/exam/ExamSubmitConfirmDialog";

const listeningQuestions = [
  {
    id: 1,
    question: "What is the woman planning to do this weekend?",
    options: ["A) Visit her parents", "B) Go to a concert", "C) Study for exams", "D) Travel abroad"],
    answer: "B",
  },
  {
    id: 2,
    question: "Where will the event take place?",
    options: ["A) At the university", "B) At the city hall", "C) At the downtown theater", "D) At a private venue"],
    answer: "C",
  },
  {
    id: 3,
    question: "How much do the tickets cost?",
    options: ["A) $25", "B) $35", "C) $45", "D) $55"],
    answer: "B",
  },
];

const listeningTranscript = `[Audio Transcript - For Reference]

Man: Hey Sarah, do you have any plans for this weekend?

Woman: Actually, yes! I'm going to a classical music concert on Saturday night. The city orchestra is performing Beethoven's Fifth Symphony.

Man: That sounds wonderful! Where is it being held?

Woman: At the downtown theater. You know, the renovated one on Main Street. Tickets were only $35, which I thought was reasonable for such a great performance.

Man: That's a good price. I might look into getting tickets myself.`;

const structureQuestions = [
  {
    id: 1,
    type: "structure",
    question: "The committee _______ to meet every Friday afternoon.",
    options: ["A) decide", "B) decides", "C) deciding", "D) decided"],
    answer: "B",
  },
  {
    id: 2,
    type: "structure",
    question: "Neither the students nor the teacher _______ aware of the schedule change.",
    options: ["A) were", "B) was", "C) are", "D) have been"],
    answer: "B",
  },
  {
    id: 3,
    type: "structure",
    question: "The research paper, along with its appendices, _______ submitted yesterday.",
    options: ["A) were", "B) have been", "C) was", "D) are"],
    answer: "C",
  },
  {
    id: 4,
    type: "written-expression",
    question: "Select the underlined part that is incorrect: \"The professor asked that each student brings their own calculator to the exam.\"",
    options: ["A) asked that", "B) each student", "C) brings", "D) to the exam"],
    answer: "C",
  },
  {
    id: 5,
    type: "written-expression",
    question: "Select the underlined part that is incorrect: \"Despite of the heavy rain, the outdoor concert continued as planned.\"",
    options: ["A) Despite of", "B) the heavy rain", "C) continued", "D) as planned"],
    answer: "A",
  },
];

const readingPassage = `Coral Reef Ecosystems

Coral reefs are among the most biologically diverse ecosystems on Earth, often referred to as the "rainforests of the sea." These underwater structures are formed by colonies of tiny animals called coral polyps, which secrete calcium carbonate to form a hard, protective skeleton. Over thousands of years, these skeletons accumulate to create the complex three-dimensional structures that we recognize as coral reefs.

The importance of coral reefs extends far beyond their biological diversity. They provide essential services to both marine life and human communities. Approximately 25% of all marine species depend on coral reefs at some point in their life cycle, despite reefs covering less than 1% of the ocean floor. For coastal communities, reefs serve as natural barriers against storms and erosion, protecting shorelines and the people who live near them.

Economically, coral reefs contribute billions of dollars annually through tourism, fishing, and pharmaceutical research. Many reef organisms produce compounds that have medical applications, and scientists continue to discover new potential treatments from reef species. The fishing industry, particularly in developing nations, relies heavily on the abundance of fish that reefs support.

Unfortunately, coral reefs face unprecedented threats from climate change, ocean acidification, pollution, and overfishing. Rising sea temperatures cause coral bleaching, a phenomenon where stressed corals expel the algae living in their tissues, turning white and often dying. Scientists estimate that we have already lost approximately 50% of the world's coral reefs, and without significant intervention, we could lose up to 90% by 2050.`;

const readingQuestions = [
  {
    id: 6,
    question: "According to the passage, coral reefs are formed by:",
    options: ["A) Large marine animals", "B) Colonies of coral polyps", "C) Underwater volcanic activity", "D) Ocean currents"],
    answer: "B",
  },
  {
    id: 7,
    question: "What percentage of the ocean floor do coral reefs cover?",
    options: ["A) 25%", "B) 50%", "C) Less than 1%", "D) 10%"],
    answer: "C",
  },
  {
    id: 8,
    question: "What is coral bleaching caused by?",
    options: ["A) Pollution", "B) Overfishing", "C) Rising sea temperatures", "D) Ocean currents"],
    answer: "C",
  },
];

// TOEFL ITP Scoring
const calculateTOEFLScore = (
  listeningCorrect: number,
  structureCorrect: number,
  readingCorrect: number
) => {
  const listeningTotal = listeningQuestions.length;
  const structureTotal = structureQuestions.length;
  const readingTotal = readingQuestions.length;
  
  const listeningScaled = Math.round(31 + (listeningCorrect / listeningTotal) * 37);
  const structureScaled = Math.round(31 + (structureCorrect / structureTotal) * 37);
  const readingScaled = Math.round(31 + (readingCorrect / readingTotal) * 37);
  
  const totalScore = Math.round((listeningScaled + structureScaled + readingScaled) * 10 / 3);
  
  return {
    listening: { correct: listeningCorrect, total: listeningTotal, scaled: listeningScaled },
    structure: { correct: structureCorrect, total: structureTotal, scaled: structureScaled },
    reading: { correct: readingCorrect, total: readingTotal, scaled: readingScaled },
    totalScore,
  };
};

const getScoreLevel = (score: number) => {
  if (score >= 600) return { level: "Advanced", color: "text-green-600", description: "Kemampuan bahasa Inggris sangat baik" };
  if (score >= 500) return { level: "Intermediate", color: "text-red-600", description: "Kemampuan bahasa Inggris menengah" };
  if (score >= 400) return { level: "Elementary", color: "text-amber-600", description: "Kemampuan bahasa Inggris dasar" };
  return { level: "Beginning", color: "text-red-500", description: "Perlu peningkatan kemampuan bahasa Inggris" };
};

const TOEFLExam = () => {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: string }>();
  const isSimulasi = mode === "simulasi";
  const isFinal = mode === "final";
  const { saveResult } = useExamResults();
  
  // Terms agreement state - show dialog on load
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(true);
  
  // Submit confirmation dialog state
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [currentSection, setCurrentSection] = useState<"listening" | "structure" | "reading">("listening");
  const [sectionMenuOpen, setSectionMenuOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<number, string>>>({
    listening: {},
    structure: {},
    reading: {},
  });
  const [timeLeft, setTimeLeft] = useState(115 * 60);
  const [showResults, setShowResults] = useState(false);
  const [examResults, setExamResults] = useState<ReturnType<typeof calculateTOEFLScore> | null>(null);
  const [resultsSaved, setResultsSaved] = useState(false);

  // Handle terms acceptance
  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    setShowTermsDialog(false);
  };

  const handleDeclineTerms = () => {
    navigate("/dashboard/toefl");
  };

  // Timer effect for Final mode
  useEffect(() => {
    if (!isFinal || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time is up
          processExamSubmission();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isFinal, showResults]);

  // Listening state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayAudio = () => {
    if (audioRef.current && !hasPlayed) {
      audioRef.current.play();
      setIsPlaying(true);
      setHasPlayed(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioEnded(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case "listening":
        return listeningQuestions;
      case "structure":
        return structureQuestions;
      case "reading":
        return readingQuestions;
      default:
        return [];
    }
  };

  const currentQuestions = getCurrentQuestions();

  const getTotalAnswered = () => {
    return (
      Object.keys(answers.listening).length +
      Object.keys(answers.structure).length +
      Object.keys(answers.reading).length
    );
  };

  const getTotalQuestions = () => {
    return listeningQuestions.length + structureQuestions.length + readingQuestions.length;
  };

  // Handle click on submit button - show confirmation dialog
  const handleSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  // Process the actual exam submission
  const processExamSubmission = async () => {
    setIsSubmitting(true);
    
    let listeningCorrect = 0;
    let structureCorrect = 0;
    let readingCorrect = 0;

    listeningQuestions.forEach((q, idx) => {
      if (answers.listening[idx] === q.answer) listeningCorrect++;
    });

    structureQuestions.forEach((q, idx) => {
      if (answers.structure[idx] === q.answer) structureCorrect++;
    });

    readingQuestions.forEach((q, idx) => {
      if (answers.reading[idx] === q.answer) readingCorrect++;
    });

    const results = calculateTOEFLScore(listeningCorrect, structureCorrect, readingCorrect);
    setExamResults(results);

    if (!resultsSaved) {
      const saved = await saveResult({
        exam_type: "toefl",
        exam_mode: mode as "simulasi" | "final",
        total_score: results.totalScore,
        section_scores: {
          Listening: results.listening.scaled,
          Structure: results.structure.scaled,
          Reading: results.reading.scaled,
        },
        answers: answers,
        time_spent: 115 * 60 - timeLeft,
      });
      if (saved) setResultsSaved(true);
    }

    setIsSubmitting(false);
    setShowSubmitConfirm(false);

    // For Final mode, redirect to thank you page
    if (isFinal) {
      navigate("/exam/thank-you", {
        state: {
          examType: "toefl",
          examMode: mode,
          totalQuestions: getTotalQuestions(),
          answeredQuestions: getTotalAnswered(),
          submittedAt: new Date().toISOString(),
        },
      });
    } else {
      // For Simulasi, show results directly
      setShowResults(true);
    }
  };

  // Legacy handler for backward compatibility
  const handleSubmitExam = () => {
    handleSubmitClick();
  };

  const handleRetakeExam = () => {
    setAnswers({ listening: {}, structure: {}, reading: {} });
    setCurrentSection("listening");
    setCurrentQuestion(0);
    setShowResults(false);
    setExamResults(null);
    setHasPlayed(false);
    setAudioEnded(false);
    setCurrentTime(0);
    setTimeLeft(115 * 60);
    setResultsSaved(false);
  };

  // Results View (only for Simulasi mode)
  if (showResults && examResults) {
    const scoreLevel = getScoreLevel(examResults.totalScore);
    
    return (
      <div className="min-h-screen bg-background flex flex-col relative">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 glass-card border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Fullbright Indonesia" className="h-8" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">TOEFL ITP - Hasil Ujian</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                    isSimulasi 
                      ? "bg-gray-100 text-gray-700 border-gray-200" 
                      : "bg-red-100 text-red-600 border-red-200"
                  }`}>
                    {isSimulasi ? <FlaskConical className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                    {isSimulasi ? "Simulasi" : "Final"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 relative">
          <div className="max-w-4xl mx-auto">
            {/* Score Overview */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6 sm:p-8 mb-8 animate-fade-up">
              <div className="text-center mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hasil Ujian TOEFL ITP</h1>
                <p className="text-muted-foreground">
                  Berikut adalah hasil {isSimulasi ? "simulasi" : "ujian final"} Anda
                </p>
              </div>

              {/* Total Score */}
              <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200">
                <p className="text-sm text-muted-foreground mb-2">Total Score</p>
                <p className="text-5xl sm:text-6xl font-bold text-red-600 mb-2">{examResults.totalScore}</p>
                <p className={`text-lg font-semibold ${scoreLevel.color}`}>{scoreLevel.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{scoreLevel.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Rentang skor: 310 - 677</p>
              </div>

              {/* Section Scores */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Listening</p>
                      <p className="text-2xl font-bold">{examResults.listening.scaled}</p>
                    </div>
                  </div>
                  <Progress value={(examResults.listening.correct / examResults.listening.total) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {examResults.listening.correct}/{examResults.listening.total} jawaban benar
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Structure</p>
                      <p className="text-2xl font-bold">{examResults.structure.scaled}</p>
                    </div>
                  </div>
                  <Progress value={(examResults.structure.correct / examResults.structure.total) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {examResults.structure.correct}/{examResults.structure.total} jawaban benar
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reading</p>
                      <p className="text-2xl font-bold text-red-600">{examResults.reading.scaled}</p>
                    </div>
                  </div>
                  <Progress value={(examResults.reading.correct / examResults.reading.total) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {examResults.reading.correct}/{examResults.reading.total} jawaban benar
                  </p>
                </div>
              </div>

              {/* Score Interpretation */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-600" />
                  Interpretasi Skor TOEFL ITP
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded bg-green-50 border border-green-200">
                      <span>600-677 (Advanced)</span>
                      <span className="text-green-600 font-medium">Sangat Baik</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-red-50 border border-red-200">
                      <span>500-599 (Intermediate)</span>
                      <span className="text-red-600 font-medium">Baik</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded bg-amber-50 border border-amber-200">
                      <span>400-499 (Elementary)</span>
                      <span className="text-amber-600 font-medium">Cukup</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-gray-100 border border-gray-200">
                      <span>310-399 (Beginning)</span>
                      <span className="text-gray-600 font-medium">Perlu Latihan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/dashboard/toefl")} className="gap-2 hover:bg-gray-100">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Menu
                </Button>
                <Button onClick={handleRetakeExam} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Ujian
                </Button>
              </div>
            </div>

            {/* Answer Review */}
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6 animate-fade-up animation-delay-200">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                Review Jawaban
              </h3>
              
              {/* Listening Review */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Headphones className="w-4 h-4" /> Listening Section
                </h4>
                <div className="space-y-2">
                  {listeningQuestions.map((q, idx) => {
                    const userAnswer = answers.listening[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm font-medium mb-1">Q{idx + 1}: {q.question}</p>
                        <div className="flex gap-4 text-xs">
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            Jawaban Anda: {userAnswer || '-'}
                          </span>
                          {!isCorrect && (
                            <span className="text-green-600">Jawaban Benar: {q.answer}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Structure Review */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Structure & Written Expression Section
                </h4>
                <div className="space-y-2">
                  {structureQuestions.map((q, idx) => {
                    const userAnswer = answers.structure[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm font-medium mb-1">Q{idx + 1}: {q.question}</p>
                        <div className="flex gap-4 text-xs">
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            Jawaban Anda: {userAnswer || '-'}
                          </span>
                          {!isCorrect && (
                            <span className="text-green-600">Jawaban Benar: {q.answer}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reading Review */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Reading Section
                </h4>
                <div className="space-y-2">
                  {readingQuestions.map((q, idx) => {
                    const userAnswer = answers.reading[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm font-medium mb-1">Q{idx + 1}: {q.question}</p>
                        <div className="flex gap-4 text-xs">
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            Jawaban Anda: {userAnswer || '-'}
                          </span>
                          {!isCorrect && (
                            <span className="text-green-600">Jawaban Benar: {q.answer}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Exam View
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Terms Dialog - shows before exam starts */}
      <ExamTermsDialog
        isOpen={showTermsDialog}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
        examType="TOEFL"
      />

      {/* Submit Confirmation Dialog */}
      <ExamSubmitConfirmDialog
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        onConfirm={processExamSubmission}
        examType="TOEFL"
        totalQuestions={getTotalQuestions()}
        answeredQuestions={getTotalAnswered()}
        timeRemaining={isFinal ? formatTime(timeLeft) : undefined}
        isLoading={isSubmitting}
      />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={sampleAudioUrl}
        onEnded={handleAudioEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/toefl")} className="px-2 sm:px-3 hover:bg-red-50 hover:text-red-600">
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
              <img src={logo} alt="Fullbright Indonesia" className="h-6 hidden md:block" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">TOEFL ITP</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                  isSimulasi
                    ? "bg-gray-100 text-gray-700 border-gray-200"
                    : "bg-red-100 text-red-600 border-red-200"
                }`}>
                  {isSimulasi ? <FlaskConical className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                  {isSimulasi ? "Simulasi" : "Final"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              {/* Mobile Section Dropdown */}
              <div className="md:hidden">
                <Popover open={sectionMenuOpen} onOpenChange={setSectionMenuOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 px-3">
                      {currentSection === "listening" && <Headphones className="w-4 h-4" />}
                      {currentSection === "structure" && <FileText className="w-4 h-4" />}
                      {currentSection === "reading" && <BookOpen className="w-4 h-4" />}
                      <span className="capitalize">{currentSection}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="end">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => { setCurrentSection("listening"); setCurrentQuestion(0); setSectionMenuOpen(false); }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentSection === "listening"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Headphones className="w-4 h-4" />
                        Listening
                      </button>
                      <button
                        onClick={() => { setCurrentSection("structure"); setCurrentQuestion(0); setSectionMenuOpen(false); }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentSection === "structure"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        Structure
                      </button>
                      <button
                        onClick={() => { setCurrentSection("reading"); setCurrentQuestion(0); setSectionMenuOpen(false); }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentSection === "reading"
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        Reading
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Desktop Section Tabs */}
              <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => { setCurrentSection("listening"); setCurrentQuestion(0); }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentSection === "listening"
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Listening
                </button>
                <button
                  onClick={() => { setCurrentSection("structure"); setCurrentQuestion(0); }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentSection === "structure"
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Structure
                </button>
                <button
                  onClick={() => { setCurrentSection("reading"); setCurrentQuestion(0); }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentSection === "reading"
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Reading
                </button>
              </div>

              {isFinal && (
                <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-red-100 border border-red-200">
                  <Timer className="w-4 h-4 text-red-600" />
                  <span className="font-mono font-semibold text-red-600 text-sm">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 relative">
        {currentSection === "listening" && (
          <div className="max-w-4xl mx-auto">
            {!audioEnded ? (
              /* Audio Player Section */
              <div className="bg-card rounded-xl border border-border shadow-lg p-6 sm:p-8 animate-fade-up">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
                    <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">TOEFL ITP Listening Test</h2>
                  <p className="text-muted-foreground">Part A: Short Conversations</p>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 mb-8">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-600">Audio hanya dapat diputar satu kali</p>
                    <p className="text-sm text-muted-foreground">
                      Sesuai dengan format ujian TOEFL ITP resmi, audio hanya akan diputar sekali. Pastikan Anda siap sebelum memulai.
                    </p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  {!hasPlayed ? (
                    <div className="text-center">
                      <Button size="lg" onClick={handlePlayAudio} className="gap-3 bg-red-600 hover:bg-red-700 text-white">
                        <Play className="w-6 h-6" />
                        Mulai Audio
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">
                        Klik untuk memulai listening test
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="text-lg font-medium">
                          {isPlaying ? "Audio sedang diputar..." : "Audio selesai"}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 transition-all duration-300"
                            style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{formatTime(Math.floor(currentTime))}</span>
                          <span>{formatTime(Math.floor(duration))}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Transcript Preview */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Lihat Transkrip (untuk demo)
                  </summary>
                  <pre className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm whitespace-pre-wrap">
                    {listeningTranscript}
                  </pre>
                </details>
              </div>
            ) : (
              /* Questions Section */
              <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-fade-up">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Listening Part A</span>
                    <h2 className="text-lg font-semibold text-red-600">
                      Question {currentQuestion + 1} of {listeningQuestions.length}
                    </h2>
                  </div>
                  <div className="flex gap-1">
                    {listeningQuestions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          idx === currentQuestion
                            ? "bg-red-600 text-white"
                            : answers.listening[idx] !== undefined
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-medium mb-4 text-lg">{listeningQuestions[currentQuestion].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {listeningQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            listening: { ...answers.listening, [currentQuestion]: option.charAt(0) },
                          })
                        }
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          answers.listening[currentQuestion] === option.charAt(0)
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-200"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              answers.listening[currentQuestion] === option.charAt(0)
                                ? "bg-red-600 text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            {answers.listening[currentQuestion] === option.charAt(0) ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              option.charAt(0)
                            )}
                          </span>
                          {option.substring(3)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="flex-1 sm:flex-none"
                  >
                    <ChevronLeft className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQuestion(Math.min(listeningQuestions.length - 1, currentQuestion + 1))
                    }
                    disabled={currentQuestion === listeningQuestions.length - 1}
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4 sm:ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentSection === "structure" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {structureQuestions[currentQuestion].type === "structure"
                      ? "Structure"
                      : "Written Expression"}
                  </span>
                  <h2 className="text-lg font-semibold text-red-600">
                    Question {currentQuestion + 1} of {structureQuestions.length}
                  </h2>
                </div>
                <div className="flex gap-1">
                  {structureQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        idx === currentQuestion
                          ? "bg-red-600 text-white"
                          : answers.structure[idx] !== undefined
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-muted-foreground"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-medium mb-4 text-lg">{structureQuestions[currentQuestion].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {structureQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setAnswers({
                          ...answers,
                          structure: { ...answers.structure, [currentQuestion]: option.charAt(0) },
                        })
                      }
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        answers.structure[currentQuestion] === option.charAt(0)
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-200"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            answers.structure[currentQuestion] === option.charAt(0)
                              ? "bg-red-600 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {answers.structure[currentQuestion] === option.charAt(0) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            option.charAt(0)
                          )}
                        </span>
                        {option.substring(3)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex-1 sm:flex-none"
                >
                  <ChevronLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </Button>
                <Button
                  onClick={() =>
                    setCurrentQuestion(Math.min(structureQuestions.length - 1, currentQuestion + 1))
                  }
                  disabled={currentQuestion === structureQuestions.length - 1}
                  className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4 sm:ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentSection === "reading" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Reading Passage */}
              <div className="bg-card rounded-xl border border-border shadow-lg p-6 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto animate-fade-up">
                <h3 className="font-semibold text-red-600 mb-4">Reading Passage</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{readingPassage}</p>
                </div>
              </div>

              {/* Questions */}
              <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-fade-up animation-delay-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Reading Comprehension</span>
                    <h2 className="text-lg font-semibold text-red-600">
                      Question {currentQuestion + 1} of {readingQuestions.length}
                    </h2>
                  </div>
                  <div className="flex gap-1">
                    {readingQuestions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestion(idx)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          idx === currentQuestion
                            ? "bg-red-600 text-white"
                            : answers.reading[idx] !== undefined
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-medium mb-4 text-lg">{readingQuestions[currentQuestion].question}</p>
                  <div className="space-y-3">
                    {readingQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            reading: { ...answers.reading, [currentQuestion]: option.charAt(0) },
                          })
                        }
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          answers.reading[currentQuestion] === option.charAt(0)
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-200"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              answers.reading[currentQuestion] === option.charAt(0)
                                ? "bg-red-600 text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            {answers.reading[currentQuestion] === option.charAt(0) ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              option.charAt(0)
                            )}
                          </span>
                          {option.substring(3)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="flex-1 sm:flex-none"
                  >
                    <ChevronLeft className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQuestion(Math.min(readingQuestions.length - 1, currentQuestion + 1))
                    }
                    disabled={currentQuestion === readingQuestions.length - 1}
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4 sm:ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-fade-up animation-delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Progress Ujian</p>
                <p className="text-sm text-muted-foreground">
                  {getTotalAnswered()} dari {getTotalQuestions()} soal terjawab
                </p>
              </div>
              <Button size="lg" onClick={handleSubmitClick} className="bg-red-600 hover:bg-red-700 text-white">
                Selesai & Lihat Hasil
              </Button>
            </div>
            <Progress value={(getTotalAnswered() / getTotalQuestions()) * 100} className="mt-4 h-2" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TOEFLExam;
