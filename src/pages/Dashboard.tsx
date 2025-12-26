/**
 * Dashboard Page
 * Halaman utama untuk melihat riwayat dan detail ujian IELTS/TOEFL
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parse, format } from "date-fns";
import { Calendar, Clock, Headphones, BookOpen, FileText, Pen } from "lucide-react";
import WritingCriteriaBreakdown from "@/components/WritingCriteriaBreakdown";
import WritingAnswerFeedback from "@/components/WritingAnswerFeedback";

// Dashboard Components
import {
  DashboardHeader,
  UserInfoHeader,
  ExamFilters,
  StatsCards,
  ExamListItem,
  SectionResults,
  ToeflScoreCard,
} from "@/components/dashboard";

// Types & Data
import type { ExamSession, ExamType, ExamStatus, ToeflSectionData, IELTSSections } from "@/types/dashboard";
import { mockExamSessions } from "@/data/mockExamSessions";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [examMode, setExamMode] = useState<ExamType>("ielts");
  const [selectedExam, setSelectedExam] = useState<ExamSession | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>("listening");

  // Auth effect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Filter exams
  const filteredExams = mockExamSessions.filter((exam) => {
    const matchesType = exam.examType === examMode;
    const matchesSearch = exam.date.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    if (dateFilter) {
      const examDate = parse(exam.date, "MMM dd, yyyy", new Date());
      matchesDate = format(examDate, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
    }

    return matchesType && matchesSearch && matchesDate;
  });

  // Helper functions
  const getStatusBadge = (status: ExamStatus) => {
    if (status === "in_review") {
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600 text-primary-foreground">
          In Review
        </Badge>
      );
    }
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-primary-foreground">Done</Badge>
    );
  };

  const userName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "User";
  const userInitials = userName.slice(0, 2).toUpperCase();

  // Calculate stats
  const inReviewCount = filteredExams.filter((e) => e.status === "in_review").length;
  const doneCount = filteredExams.filter((e) => e.status === "done").length;
  const averageScore =
    filteredExams.length > 0
      ? examMode === "ielts"
        ? (filteredExams.reduce((acc, e) => acc + (e.overallBand || 0), 0) / filteredExams.length).toFixed(1)
        : Math.round(filteredExams.reduce((acc, e) => acc + (e.totalScore || 0), 0) / filteredExams.length)
      : 0;

  // ==================== DETAIL VIEW ====================
  if (selectedExam) {
    const isIELTS = selectedExam.examType === "ielts";
    const ieltsSection = isIELTS ? (selectedExam.sections as IELTSSections) : null;

    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader
          onBack={() => setSelectedExam(null)}
          onLogout={handleLogout}
        />

        <UserInfoHeader
          userInitials={selectedExam.userInitials}
          userName={selectedExam.userName}
          subtitle={isIELTS ? "IELTS Academic" : "TOEFL ITP"}
          rightContent={
            <div className="flex items-center gap-4">
              {getStatusBadge(selectedExam.status)}
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Calendar className="w-4 h-4" />
                <span>{selectedExam.date}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Clock className="w-4 h-4" />
                <span>{selectedExam.totalDuration}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-foreground/70">Overall</p>
                <p className="text-3xl font-bold text-primary-foreground">
                  {isIELTS ? selectedExam.overallBand : selectedExam.totalScore}
                  <span className="text-lg opacity-70">
                    /{isIELTS ? 9 : selectedExam.maxTotalScore}
                  </span>
                </p>
              </div>
            </div>
          }
        />

        <main className="container mx-auto px-4 py-8">
          {isIELTS ? (
            /* IELTS Sections */
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="listening" className="gap-2">
                  <Headphones className="w-4 h-4" />
                  Listening
                </TabsTrigger>
                <TabsTrigger value="reading" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Reading
                </TabsTrigger>
                <TabsTrigger value="writingTask1" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Writing 1
                </TabsTrigger>
                <TabsTrigger value="writingTask2" className="gap-2">
                  <Pen className="w-4 h-4" />
                  Writing 2
                </TabsTrigger>
              </TabsList>

              {/* Listening Section */}
              <TabsContent value="listening">
                <SectionResults
                  title="Listening Comprehension"
                  duration={ieltsSection?.listening?.duration}
                  score={ieltsSection?.listening?.score}
                  maxScore={ieltsSection?.listening?.max}
                  results={ieltsSection?.listening?.results}
                />
              </TabsContent>

              {/* Reading Section */}
              <TabsContent value="reading">
                <SectionResults
                  title="Reading Comprehension"
                  duration={ieltsSection?.reading?.duration}
                  score={ieltsSection?.reading?.score}
                  maxScore={ieltsSection?.reading?.max}
                  results={ieltsSection?.reading?.results}
                />
              </TabsContent>

              {/* Writing Task 1 */}
              <TabsContent value="writingTask1" className="space-y-6">
                {ieltsSection?.writingTask1 && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Academic Writing Task 1</h2>
                        <p className="text-muted-foreground">
                          Duration: {ieltsSection.writingTask1.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-bold">CEFR</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">CEFR Level</p>
                          <p className="font-semibold">
                            {ieltsSection.writingTask1.cefrLevel}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Band Score</p>
                          <p className="text-4xl font-bold text-primary">
                            {ieltsSection.writingTask1.score}
                          </p>
                        </div>
                      </div>
                    </div>

                    {ieltsSection.writingTask1.criteriaBreakdown && (
                      <WritingCriteriaBreakdown
                        criteria={ieltsSection.writingTask1.criteriaBreakdown}
                      />
                    )}

                    {ieltsSection.writingTask1.userAnswer &&
                      ieltsSection.writingTask1.feedbackItems && (
                        <WritingAnswerFeedback
                          userAnswer={ieltsSection.writingTask1.userAnswer}
                          feedbackItems={ieltsSection.writingTask1.feedbackItems}
                          vocabularyData={ieltsSection.writingTask1.vocabularyData}
                        />
                      )}
                  </>
                )}
              </TabsContent>

              {/* Writing Task 2 */}
              <TabsContent value="writingTask2" className="space-y-6">
                {ieltsSection?.writingTask2 && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Writing Task 2</h2>
                        <p className="text-muted-foreground">
                          Duration: {ieltsSection.writingTask2.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">CEFR Level</p>
                          <p className="font-semibold">
                            {ieltsSection.writingTask2.cefrLevel}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Band Score</p>
                          <p className="text-4xl font-bold text-primary">
                            {ieltsSection.writingTask2.score}
                          </p>
                        </div>
                      </div>
                    </div>

                    {ieltsSection.writingTask2.criteriaBreakdown && (
                      <WritingCriteriaBreakdown
                        criteria={ieltsSection.writingTask2.criteriaBreakdown}
                      />
                    )}

                    {ieltsSection.writingTask2.userAnswer &&
                      ieltsSection.writingTask2.feedbackItems && (
                        <WritingAnswerFeedback
                          userAnswer={ieltsSection.writingTask2.userAnswer}
                          feedbackItems={ieltsSection.writingTask2.feedbackItems}
                          vocabularyData={ieltsSection.writingTask2.vocabularyData}
                        />
                      )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            /* TOEFL ITP Scores */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">TOEFL ITP Scores</h2>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Score</p>
                  <p className="text-4xl font-bold text-primary">
                    {selectedExam.totalScore}
                    <span className="text-lg text-muted-foreground">
                      /{selectedExam.maxTotalScore}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["listening", "structure", "reading"].map((section) => {
                  const sectionData = selectedExam.sections[
                    section as keyof typeof selectedExam.sections
                  ] as ToeflSectionData | undefined;
                  if (!sectionData) return null;
                  return (
                    <ToeflScoreCard
                      key={section}
                      section={section}
                      score={sectionData.score}
                      maxScore={sectionData.max}
                      label={sectionData.label}
                      description={sectionData.description}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==================== LIST VIEW ====================
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onBack={() => navigate("/exams")}
        onLogout={handleLogout}
      />

      <UserInfoHeader
        userInitials={userInitials}
        userName={userName}
        subtitle="Riwayat Ujian"
        rightContent={
          <div className="text-right text-primary-foreground">
            <p className="text-sm opacity-80">Total Ujian</p>
            <p className="text-3xl font-bold">{mockExamSessions.length}</p>
          </div>
        }
      />

      <main className="container mx-auto px-4 py-8">
        <ExamFilters
          examMode={examMode}
          onExamModeChange={setExamMode}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <StatsCards
          totalExams={filteredExams.length}
          inReviewCount={inReviewCount}
          doneCount={doneCount}
          averageScore={averageScore}
          examType={examMode}
        />

        {/* Exam List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/30">
            <h2 className="font-semibold">Daftar Hasil Ujian {examMode.toUpperCase()}</h2>
          </div>

          <div className="divide-y divide-border">
            {filteredExams.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Tidak ada hasil ujian ditemukan.
              </div>
            ) : (
              filteredExams.map((exam) => (
                <ExamListItem
                  key={exam.id}
                  exam={exam}
                  onClick={() => setSelectedExam(exam)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
