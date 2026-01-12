/**
 * SimulationTopics Page - Fullbright Theme
 * Menampilkan list topik soal berdasarkan section yang dipilih
 * Inspirasi dari Cathoven AI tapi dengan UI Fullbright
 * 
 * Setiap topik dibatasi 10 soal
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo-wordmark.png";
import { 
  ArrowLeft, 
  LogOut,
  Headphones,
  BookOpen,
  PenTool,
  FileText,
  Play,
  Check,
  Clock,
  Search,
  Sparkles
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";

// Topic data per section - IELTS
// isMandatory: true = Wajib, false = Opsional
const ieltsTopics = {
  listening: [
    { id: "social-needs", title: "Social Needs", category: "Section 1", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "accommodation", title: "Accommodation & Housing", category: "Section 1", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "travel-tourism", title: "Travel & Tourism", category: "Section 1", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "health-fitness", title: "Health & Fitness", category: "Section 2", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "education-training", title: "Education & Training", category: "Section 2", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "environment", title: "Environment & Nature", category: "Section 3", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "academic-discussion", title: "Academic Discussion", category: "Section 3", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "lecture-science", title: "Lecture: Science", category: "Section 4", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "lecture-history", title: "Lecture: History", category: "Section 4", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "lecture-business", title: "Lecture: Business", category: "Section 4", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
  reading: [
    { id: "science-tech", title: "Science & Technology", category: "Academic", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "history-archaeology", title: "History & Archaeology", category: "Academic", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "biology-nature", title: "Biology & Nature", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "psychology", title: "Psychology & Behavior", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "economics", title: "Economics & Business", category: "Academic", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "arts-culture", title: "Arts & Culture", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "health-medicine", title: "Health & Medicine", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "education", title: "Education Systems", category: "Academic", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "environment-climate", title: "Environment & Climate", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "sociology", title: "Sociology & Society", category: "Academic", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
  writing: [
    { id: "task1-line", title: "Task 1: Line Graph", category: "Task 1", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "task1-bar", title: "Task 1: Bar Chart", category: "Task 1", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "task1-pie", title: "Task 1: Pie Chart", category: "Task 1", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "task1-table", title: "Task 1: Table", category: "Task 1", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "task1-process", title: "Task 1: Process Diagram", category: "Task 1", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "task1-map", title: "Task 1: Map", category: "Task 1", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "task2-opinion", title: "Task 2: Opinion Essay", category: "Task 2", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "task2-discussion", title: "Task 2: Discussion Essay", category: "Task 2", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "task2-problem", title: "Task 2: Problem-Solution", category: "Task 2", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "task2-advantage", title: "Task 2: Advantage-Disadvantage", category: "Task 2", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
};

// Topic data per section - TOEFL
const toeflTopics = {
  listening: [
    { id: "campus-conversation", title: "Campus Conversations", category: "Part A", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "student-services", title: "Student Services", category: "Part A", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "office-hours", title: "Office Hours", category: "Part A", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "long-conversation", title: "Long Conversations", category: "Part B", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "lecture-biology", title: "Lecture: Biology", category: "Part C", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "lecture-history", title: "Lecture: History", category: "Part C", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "lecture-arts", title: "Lecture: Arts", category: "Part C", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "lecture-science", title: "Lecture: Physical Science", category: "Part C", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
  structure: [
    { id: "subject-verb", title: "Subject-Verb Agreement", category: "Structure", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "tenses", title: "Verb Tenses", category: "Structure", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "conditionals", title: "Conditionals", category: "Structure", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "relative-clauses", title: "Relative Clauses", category: "Structure", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "passive-voice", title: "Passive Voice", category: "Structure", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "word-order", title: "Word Order", category: "Written Expression", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "parallel-structure", title: "Parallel Structure", category: "Written Expression", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "modifiers", title: "Modifiers & Comparisons", category: "Written Expression", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
  reading: [
    { id: "passage-1", title: "Passage 1: The Industrial Revolution", category: "Passage", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "passage-2", title: "Passage 2: Marine Ecosystems", category: "Passage", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "passage-3", title: "Passage 3: Ancient Civilizations", category: "Passage", questionCount: 10, isMandatory: true, completed: false, attempts: 0 },
    { id: "passage-4", title: "Passage 4: Climate Change", category: "Passage", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "passage-5", title: "Passage 5: Psychology of Learning", category: "Passage", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "passage-6", title: "Passage 6: Space Exploration", category: "Passage", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "passage-7", title: "Passage 7: Art History", category: "Passage", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
    { id: "passage-8", title: "Passage 8: Economic Systems", category: "Passage", questionCount: 10, isMandatory: false, completed: false, attempts: 0 },
  ],
};

// Section info
const sectionInfo: Record<string, { icon: typeof Headphones; color: string; bgColor: string; borderColor: string }> = {
  listening: { icon: Headphones, color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-200" },
  reading: { icon: BookOpen, color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-200" },
  writing: { icon: PenTool, color: "text-purple-600", bgColor: "bg-purple-100", borderColor: "border-purple-200" },
  structure: { icon: FileText, color: "text-orange-600", bgColor: "bg-orange-100", borderColor: "border-orange-200" },
};

interface Topic {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  isMandatory: boolean;
  completed: boolean;
  attempts: number;
}

const SimulationTopics = () => {
  const navigate = useNavigate();
  const { examType, section } = useParams<{ examType: string; section: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    // Auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    // Load topics based on exam type and section
    if (examType && section) {
      const topicData = examType === "ielts" 
        ? ieltsTopics[section as keyof typeof ieltsTopics]
        : toeflTopics[section as keyof typeof toeflTopics];
      
      if (topicData) {
        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`${examType}_${section}_progress`);
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setTopics(topicData.map(topic => ({
            ...topic,
            completed: progress[topic.id]?.completed || false,
            attempts: progress[topic.id]?.attempts || 0,
          })));
        } else {
          setTopics(topicData);
        }
      }
    }
  }, [examType, section, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleStartTopic = (topicId: string) => {
    // TODO: Navigate to actual quiz page
    navigate(`/exam/${examType}/${section}/topic/${topicId}`);
  };

  // Get section info
  const currentSection = sectionInfo[section || "listening"];
  const SectionIcon = currentSection?.icon || Headphones;

  // Filter topics
  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || topic.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["all", ...new Set(topics.map(t => t.category))];

  // Calculate progress
  const completedCount = topics.filter(t => t.completed).length;
  const progressPercentage = topics.length > 0 ? (completedCount / topics.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(`/exams/${examType}`)} 
                className="px-2 sm:px-3 hover:bg-red-50 hover:text-red-600"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Kembali</span>
              </Button>
              <img src={logo} alt="Fullbright Indonesia" className="h-8 sm:h-10 hidden sm:block" />
              <div className="h-6 w-px bg-border hidden sm:block" />
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {examType?.toUpperCase()} • {section?.charAt(0).toUpperCase()}{section?.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm text-muted-foreground hidden md:block max-w-[150px] truncate">
                {user?.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="px-2 sm:px-4 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-4 rounded-2xl ${currentSection?.bgColor} border ${currentSection?.borderColor}`}>
                <SectionIcon className={`w-8 h-8 ${currentSection?.color}`} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground capitalize">
                  {section} Practice
                </h1>
                <p className="text-sm text-muted-foreground">
                  {examType?.toUpperCase()} • {topics.length} topik tersedia
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress Latihan</span>
                <span className="text-sm text-muted-foreground">{completedCount}/{topics.length} selesai</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-up animation-delay-100">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(cat)}
                  className={filterCategory === cat 
                    ? "bg-red-600 hover:bg-red-700 text-white whitespace-nowrap" 
                    : "whitespace-nowrap hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  }
                >
                  {cat === "all" ? "Semua" : cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up animation-delay-200">
            {filteredTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="group relative p-5 rounded-xl bg-card border-2 border-border hover:border-red-300 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Wajib/Opsional badge - top right */}
                <div className="absolute top-3 right-3">
                  {topic.isMandatory ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-600 border border-red-200">
                      Wajib
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                      Opsional
                    </span>
                  )}
                </div>

                {/* Completed badge - top left */}
                {topic.completed && (
                  <div className="absolute top-3 left-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Category badge */}
                <div className="mb-3 mt-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                    {topic.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground mb-2">{topic.title}</h3>

                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {topic.questionCount} soal
                  </span>
                </div>

                {/* Attempts info */}
                {topic.attempts > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" />
                    {topic.attempts}x dikerjakan
                  </div>
                )}

                {/* Start button */}
                <Button
                  onClick={() => handleStartTopic(topic.id)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white group-hover:bg-red-600 group-hover:hover:bg-red-700 transition-colors"
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {topic.completed ? "Ulangi" : "Mulai"}
                </Button>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tidak ada topik ditemukan</h3>
              <p className="text-muted-foreground text-sm">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}

          {/* AI Info */}
          {section === "writing" && (
            <div className="mt-8 text-center animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Writing dinilai dengan AI Checker (hasil muncul 2 jam setelah submit untuk mode Final)</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SimulationTopics;
