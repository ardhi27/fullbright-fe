import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo-wordmark.png";
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Play, Pause, Volume2, AlertCircle, Trophy, Target, BookOpen, Headphones, PenTool, RotateCcw, Check, Timer, FlaskConical, GraduationCap } from "lucide-react";
import { useExamResults } from "@/hooks/useExamResults";

const readingPassage = `The Rise of Artificial Intelligence in Modern Healthcare

Artificial intelligence (AI) has emerged as a transformative force in healthcare, revolutionizing the way medical professionals diagnose, treat, and monitor patients. From early detection of diseases to personalized treatment plans, AI applications are increasingly becoming integral to modern medical practice.

One of the most significant applications of AI in healthcare is in medical imaging. Machine learning algorithms can analyze X-rays, MRIs, and CT scans with remarkable accuracy, often detecting abnormalities that might be missed by human eyes. Studies have shown that AI systems can identify certain types of cancer, such as breast cancer and lung cancer, with accuracy rates comparable to or even exceeding those of experienced radiologists.

Beyond diagnostics, AI is also transforming drug discovery. Traditional drug development is a lengthy and expensive process, often taking over a decade and costing billions of dollars. AI algorithms can analyze vast databases of molecular structures and biological data to identify potential drug candidates much faster. This acceleration could lead to more rapid development of treatments for various diseases, including rare conditions that might otherwise be neglected due to limited commercial viability.

However, the integration of AI in healthcare is not without challenges. Privacy concerns, the need for regulatory frameworks, and the importance of maintaining the human touch in patient care are all significant considerations. As AI continues to evolve, healthcare systems must balance the benefits of technological advancement with ethical considerations and patient welfare.`;

const readingQuestions = [
  {
    id: 1,
    question: "According to the passage, what is one of the most significant applications of AI in healthcare?",
    options: ["A) Administrative tasks", "B) Medical imaging", "C) Patient scheduling", "D) Insurance processing"],
    answer: "B",
  },
  {
    id: 2,
    question: "What can AI algorithms do in drug discovery?",
    options: ["A) Replace human researchers entirely", "B) Analyze molecular structures and biological data", "C) Conduct clinical trials automatically", "D) Approve new medications for use"],
    answer: "B",
  },
  {
    id: 3,
    question: "According to the passage, traditional drug development typically takes:",
    options: ["A) A few months", "B) One to two years", "C) Over a decade", "D) Exactly five years"],
    answer: "C",
  },
];

const listeningQuestions = [
  {
    id: 1,
    question: "What is the main topic of the conversation?",
    options: ["A) Booking a hotel room", "B) Registering for a library card", "C) Enrolling in a university course", "D) Applying for a job"],
    answer: "B",
  },
  {
    id: 2,
    question: "What does the woman need to provide?",
    options: ["A) A passport photo", "B) Proof of address", "C) A reference letter", "D) An employment contract"],
    answer: "B",
  },
  {
    id: 3,
    question: "How long is the library card valid?",
    options: ["A) 6 months", "B) 1 year", "C) 2 years", "D) 3 years"],
    answer: "B",
  },
  {
    id: 4,
    question: "What time does the library close on weekends?",
    options: ["A) 5 PM", "B) 6 PM", "C) 8 PM", "D) 9 PM"],
    answer: "A",
  },
];

const listeningTranscript = `[Audio Transcript - For Reference]

Woman: Good morning. I'd like to register for a library card, please.

Librarian: Of course. Have you been a member here before?

Woman: No, this is my first time. I just moved to the area last month.

Librarian: Welcome to the neighborhood! To register, I'll need some proof of your current address - a utility bill or bank statement will do.

Woman: I have my electricity bill here. Will that work?

Librarian: Perfect. The library card is valid for one year from today, and you can renew it online or in person. We're open from 9 AM to 9 PM on weekdays, and 10 AM to 5 PM on weekends.

Woman: That's very convenient. Thank you for your help.`;

const writingTask1 = {
  title: "Academic Writing Task 1",
  instruction: "You should spend about 20 minutes on this task. Write at least 150 words.",
  prompt: `The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
  imageDescription: `[Chart Data]
Year | Owned (%) | Rented (%)
1918 | 23 | 77
1939 | 32 | 68
1953 | 32 | 68
1961 | 44 | 56
1971 | 51 | 49
1981 | 57 | 43
1991 | 66 | 34
2001 | 69 | 31
2011 | 64 | 36`,
  minWords: 150,
};

const writingTask2 = {
  title: "Academic Writing Task 2",
  instruction: "You should spend about 40 minutes on this task. Write at least 250 words.",
  prompt: `Some people believe that technological advancements in healthcare will eventually replace human doctors. Others argue that the human element in medicine is irreplaceable.

Discuss both views and give your own opinion.`,
  minWords: 250,
};

// IELTS Band Score calculation based on Band Descriptors
const calculateIELTSBandScore = (
  listeningCorrect: number,
  readingCorrect: number,
  writingTask1Words: number,
  writingTask2Words: number
) => {
  const listeningTotal = listeningQuestions.length;
  const readingTotal = readingQuestions.length;
  
  // Convert raw scores to band scores (1-9)
  const listeningBand = Math.min(9, Math.max(1, Math.round((listeningCorrect / listeningTotal) * 9)));
  const readingBand = Math.min(9, Math.max(1, Math.round((readingCorrect / readingTotal) * 9)));
  
  // Writing band estimation based on word count and completion
  const task1Completion = Math.min(1, writingTask1Words / writingTask1.minWords);
  const task2Completion = Math.min(1, writingTask2Words / writingTask2.minWords);
  const writingCompletion = (task1Completion * 0.33 + task2Completion * 0.67); // Task 2 weighs more
  const writingBand = Math.min(9, Math.max(1, Math.round(writingCompletion * 7 + 2))); // Minimum 3 if attempted
  
  // Overall band score (average, rounded to nearest 0.5)
  const rawAverage = (listeningBand + readingBand + writingBand) / 3;
  const overallBand = Math.round(rawAverage * 2) / 2;
  
  return {
    listening: { correct: listeningCorrect, total: listeningTotal, band: listeningBand },
    reading: { correct: readingCorrect, total: readingTotal, band: readingBand },
    writing: { 
      task1Words: writingTask1Words, 
      task2Words: writingTask2Words, 
      band: writingBand,
      criteria: {
        taskAchievement: Math.min(9, Math.max(1, Math.round(writingCompletion * 8 + 1))),
        coherenceCohesion: Math.min(9, Math.max(1, Math.round(writingCompletion * 7 + 2))),
        lexicalResource: Math.min(9, Math.max(1, Math.round(writingCompletion * 7 + 2))),
        grammaticalRange: Math.min(9, Math.max(1, Math.round(writingCompletion * 7 + 2))),
      }
    },
    overallBand,
  };
};

const getBandLevel = (band: number) => {
  if (band >= 8) return { level: "Expert User", color: "text-green-600", description: "Sangat mahir dalam bahasa Inggris" };
  if (band >= 7) return { level: "Good User", color: "text-primary", description: "Pengguna bahasa Inggris yang baik" };
  if (band >= 6) return { level: "Competent User", color: "text-accent", description: "Pengguna yang kompeten" };
  if (band >= 5) return { level: "Modest User", color: "text-yellow-600", description: "Pengguna sedang" };
  if (band >= 4) return { level: "Limited User", color: "text-orange-600", description: "Pengguna terbatas" };
  return { level: "Basic User", color: "text-red-600", description: "Perlu peningkatan signifikan" };
};

const IELTSExam = () => {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: string }>();
  const isSimulasi = mode === "simulasi";
  const isFinal = mode === "final";
  const { saveResult } = useExamResults();
  
  const [currentSection, setCurrentSection] = useState<"listening" | "reading" | "writing">("listening");
  const [currentWritingTask, setCurrentWritingTask] = useState<1 | 2>(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<number, string>>>({
    listening: {},
    reading: {},
  });
  const [writingTask1Answer, setWritingTask1Answer] = useState("");
  const [writingTask2Answer, setWritingTask2Answer] = useState("");
  const [timeLeft, setTimeLeft] = useState(150 * 60); // 150 minutes total for IELTS (30+60+60)
  const [showResults, setShowResults] = useState(false);
  const [examResults, setExamResults] = useState<ReturnType<typeof calculateIELTSBandScore> | null>(null);
  const [resultsSaved, setResultsSaved] = useState(false);

  // Timer effect for Final mode
  useEffect(() => {
    if (!isFinal || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
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

  const task1WordCount = writingTask1Answer.trim().split(/\s+/).filter(Boolean).length;
  const task2WordCount = writingTask2Answer.trim().split(/\s+/).filter(Boolean).length;

  const currentTask = currentWritingTask === 1 ? writingTask1 : writingTask2;
  const currentAnswer = currentWritingTask === 1 ? writingTask1Answer : writingTask2Answer;
  const setCurrentAnswer = currentWritingTask === 1 ? setWritingTask1Answer : setWritingTask2Answer;
  const currentWordCount = currentWritingTask === 1 ? task1WordCount : task2WordCount;
  const minWords = currentWritingTask === 1 ? writingTask1.minWords : writingTask2.minWords;

  const currentQuestions = currentSection === "listening" ? listeningQuestions : readingQuestions;

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

  const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const handleSubmitExam = async () => {
    let listeningCorrect = 0;
    let readingCorrect = 0;

    listeningQuestions.forEach((q, idx) => {
      if (answers.listening[idx] === q.answer) listeningCorrect++;
    });

    readingQuestions.forEach((q, idx) => {
      if (answers.reading[idx] === q.answer) readingCorrect++;
    });

    const results = calculateIELTSBandScore(
      listeningCorrect,
      readingCorrect,
      task1WordCount,
      task2WordCount
    );
    setExamResults(results);
    setShowResults(true);

    // Save results to database
    if (!resultsSaved) {
      const saved = await saveResult({
        exam_type: "ielts",
        exam_mode: mode as "simulasi" | "final",
        total_score: results.overallBand,
        section_scores: {
          Listening: results.listening.band,
          Reading: results.reading.band,
          Writing: results.writing.band,
        },
        answers: {
          listening: answers.listening,
          reading: answers.reading,
          writingTask1: writingTask1Answer,
          writingTask2: writingTask2Answer,
        },
        time_spent: 150 * 60 - timeLeft,
      });
      if (saved) setResultsSaved(true);
    }
  };

  const handleRetakeExam = () => {
    setAnswers({ listening: {}, reading: {} });
    setWritingTask1Answer("");
    setWritingTask2Answer("");
    setCurrentSection("listening");
    setCurrentQuestion(0);
    setCurrentWritingTask(1);
    setShowResults(false);
    setExamResults(null);
    setHasPlayed(false);
    setAudioEnded(false);
    setCurrentTime(0);
  };

  const getTotalAnswered = () => {
    const mcAnswered = Object.keys(answers.listening).length + Object.keys(answers.reading).length;
    const writingAttempted = (task1WordCount > 0 ? 1 : 0) + (task2WordCount > 0 ? 1 : 0);
    return mcAnswered + writingAttempted;
  };

  const getTotalQuestions = () => {
    return listeningQuestions.length + readingQuestions.length + 2; // +2 for writing tasks
  };

  // Results View
  if (showResults && examResults) {
    const bandLevel = getBandLevel(examResults.overallBand);
    
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Fullbright Indonesia" className="h-8" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">IELTS Academic - Hasil Ujian</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                    isSimulasi 
                      ? "bg-blue-500/10 text-blue-600" 
                      : "bg-orange-500/10 text-orange-600"
                  }`}>
                    {isSimulasi ? <FlaskConical className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                    {isSimulasi ? "Simulasi" : "Final"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Score Overview */}
            <div className="bg-card rounded-2xl border border-border p-8 mb-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Hasil Ujian IELTS Academic</h1>
                <p className="text-muted-foreground">
                  Berikut adalah hasil {isSimulasi ? "simulasi" : "ujian final"} Anda berdasarkan IELTS Band Descriptors
                </p>
              </div>

              {/* Overall Band Score */}
              <div className="text-center mb-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Overall Band Score</p>
                <p className="text-6xl font-bold text-primary mb-2">{examResults.overallBand}</p>
                <p className={`text-lg font-semibold ${bandLevel.color}`}>{bandLevel.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{bandLevel.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Band Score: 1 - 9</p>
              </div>

              {/* Section Scores */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Listening</p>
                      <p className="text-2xl font-bold">Band {examResults.listening.band}</p>
                    </div>
                  </div>
                  <Progress value={(examResults.listening.correct / examResults.listening.total) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {examResults.listening.correct}/{examResults.listening.total} jawaban benar
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reading</p>
                      <p className="text-2xl font-bold">Band {examResults.reading.band}</p>
                    </div>
                  </div>
                  <Progress value={(examResults.reading.correct / examResults.reading.total) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {examResults.reading.correct}/{examResults.reading.total} jawaban benar
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <PenTool className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Writing</p>
                      <p className="text-2xl font-bold">Band {examResults.writing.band}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Task 1: {examResults.writing.task1Words} kata</p>
                    <p>Task 2: {examResults.writing.task2Words} kata</p>
                  </div>
                </div>
              </div>

              {/* Writing Criteria Breakdown */}
              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-primary" />
                  Writing Band Descriptors Breakdown
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                      <span className="text-sm">Task Achievement</span>
                      <span className="font-semibold text-primary">Band {examResults.writing.criteria.taskAchievement}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                      <span className="text-sm">Coherence & Cohesion</span>
                      <span className="font-semibold text-primary">Band {examResults.writing.criteria.coherenceCohesion}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                      <span className="text-sm">Lexical Resource</span>
                      <span className="font-semibold text-primary">Band {examResults.writing.criteria.lexicalResource}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                      <span className="text-sm">Grammatical Range</span>
                      <span className="font-semibold text-primary">Band {examResults.writing.criteria.grammaticalRange}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Interpretation */}
              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Interpretasi IELTS Band Score
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded bg-green-500/10">
                      <span>Band 8-9 (Expert)</span>
                      <span className="text-green-600 font-medium">Sangat Mahir</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-primary/10">
                      <span>Band 7-7.5 (Good)</span>
                      <span className="text-primary font-medium">Baik</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-accent/10">
                      <span>Band 6-6.5 (Competent)</span>
                      <span className="text-accent font-medium">Kompeten</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 rounded bg-yellow-500/10">
                      <span>Band 5-5.5 (Modest)</span>
                      <span className="text-yellow-600 font-medium">Sedang</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-orange-500/10">
                      <span>Band 4-4.5 (Limited)</span>
                      <span className="text-orange-600 font-medium">Terbatas</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-red-500/10">
                      <span>Band 1-3.5 (Basic)</span>
                      <span className="text-red-600 font-medium">Dasar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/dashboard/ielts")} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Menu
                </Button>
                <Button onClick={handleRetakeExam} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Ujian
                </Button>
              </div>
            </div>

            {/* Answer Review */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4">Review Jawaban</h3>
              
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
                      <div key={idx} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
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
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Reading Section
                </h4>
                <div className="space-y-2">
                  {readingQuestions.map((q, idx) => {
                    const userAnswer = answers.reading[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
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

              {/* Writing Review */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <PenTool className="w-4 h-4" /> Writing Section
                </h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-secondary/30">
                    <p className="text-sm font-medium mb-2">Task 1 ({task1WordCount} kata)</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {writingTask1Answer || "(Tidak dijawab)"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/30">
                    <p className="text-sm font-medium mb-2">Task 2 ({task2WordCount} kata)</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {writingTask2Answer || "(Tidak dijawab)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={sampleAudioUrl}
        onEnded={handleAudioEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/ielts")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <img src={logo} alt="Fullbright Indonesia" className="h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">IELTS Academic</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                  isSimulasi 
                    ? "bg-blue-500/10 text-blue-600" 
                    : "bg-orange-500/10 text-orange-600"
                }`}>
                  {isSimulasi ? <FlaskConical className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                  {isSimulasi ? "Simulasi" : "Final"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setCurrentSection("listening"); setCurrentQuestion(0); }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currentSection === "listening"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Listening
                </button>
                <button
                  onClick={() => { setCurrentSection("reading"); setCurrentQuestion(0); }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currentSection === "reading"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Reading
                </button>
                <button
                  onClick={() => setCurrentSection("writing")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    currentSection === "writing"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Writing
                </button>
              </div>
              {isFinal && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Timer className="w-4 h-4 text-orange-600" />
                  <span className="font-mono font-semibold text-orange-600">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {currentSection === "listening" && (
          <div className="max-w-4xl mx-auto">
            {!audioEnded ? (
              /* Audio Player Section */
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Volume2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">IELTS Listening Test</h2>
                  <p className="text-muted-foreground">Section 1: Library Registration</p>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-8">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Audio hanya dapat diputar satu kali</p>
                    <p className="text-sm text-muted-foreground">
                      Sesuai dengan format ujian IELTS resmi, audio hanya akan diputar sekali. Pastikan Anda siap sebelum memulai.
                    </p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  {!hasPlayed ? (
                    <div className="text-center">
                      <Button size="lg" onClick={handlePlayAudio} className="gap-3">
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
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-primary-foreground" />
                          ) : (
                            <Play className="w-6 h-6 text-primary-foreground" />
                          )}
                        </div>
                        <div className="text-lg font-medium">
                          {isPlaying ? "Audio sedang diputar..." : "Audio selesai"}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
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

                {/* Transcript Preview (hidden during actual test) */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Lihat Transkrip (untuk demo)
                  </summary>
                  <pre className="mt-4 p-4 bg-secondary/30 rounded-lg text-sm whitespace-pre-wrap">
                    {listeningTranscript}
                  </pre>
                </details>
              </div>
            ) : (
              /* Questions Section */
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Listening Section 1</span>
                    <h2 className="text-lg font-semibold text-primary">
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
                            ? "bg-primary text-primary-foreground"
                            : answers.listening[idx] !== undefined
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-medium mb-4 text-lg">{listeningQuestions[currentQuestion].question}</p>
                  <div className="space-y-3">
                    {listeningQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            listening: { ...answers.listening, [currentQuestion]: option.charAt(0) },
                          })
                        }
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          answers.listening[currentQuestion] === option.charAt(0)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              answers.listening[currentQuestion] === option.charAt(0)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
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

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQuestion(Math.min(listeningQuestions.length - 1, currentQuestion + 1))
                    }
                    disabled={currentQuestion === listeningQuestions.length - 1}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentSection === "reading" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Reading Passage */}
              <div className="bg-card rounded-xl border border-border p-6 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto">
                <h3 className="font-semibold text-primary mb-4">Reading Passage</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{readingPassage}</p>
                </div>
              </div>

              {/* Questions */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Reading Comprehension</span>
                    <h2 className="text-lg font-semibold text-primary">
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
                            ? "bg-primary text-primary-foreground"
                            : answers.reading[idx] !== undefined
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
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
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              answers.reading[currentQuestion] === option.charAt(0)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
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

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentQuestion(Math.min(readingQuestions.length - 1, currentQuestion + 1))
                    }
                    disabled={currentQuestion === readingQuestions.length - 1}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === "writing" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-6">
              {/* Task Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setCurrentWritingTask(1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentWritingTask === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  Task 1
                  {task1WordCount > 0 && (
                    <span className="ml-2 text-xs opacity-75">({task1WordCount} words)</span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentWritingTask(2)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentWritingTask === 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  Task 2
                  {task2WordCount > 0 && (
                    <span className="ml-2 text-xs opacity-75">({task2WordCount} words)</span>
                  )}
                </button>
              </div>

              {/* Task Content */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{currentTask.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{currentTask.instruction}</p>
                <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                  <p className="text-sm">{currentTask.prompt}</p>
                  {currentWritingTask === 1 && (
                    <pre className="mt-4 text-xs text-muted-foreground whitespace-pre-wrap">
                      {writingTask1.imageDescription}
                    </pre>
                  )}
                </div>
              </div>

              {/* Writing Area */}
              <div className="space-y-2">
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Tulis jawaban Anda di sini..."
                  className="min-h-[300px] resize-none"
                />
                <div className="flex justify-between text-sm">
                  <span className={`${currentWordCount >= minWords ? "text-green-600" : "text-muted-foreground"}`}>
                    Word count: {currentWordCount} / {minWords} minimum
                  </span>
                  {currentWordCount < minWords && (
                    <span className="text-destructive">
                      {minWords - currentWordCount} kata lagi untuk mencapai minimum
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Progress Ujian</p>
                <p className="text-sm text-muted-foreground">
                  {getTotalAnswered()} dari {getTotalQuestions()} bagian terjawab
                </p>
              </div>
              <Button size="lg" onClick={handleSubmitExam}>
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

export default IELTSExam;
