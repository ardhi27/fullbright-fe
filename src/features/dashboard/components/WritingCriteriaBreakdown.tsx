import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Link2,
  BookText,
  SpellCheck,
  Target,
  Lightbulb,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubCriterion {
  name: string;
  score: number;
}

interface CriterionDetail {
  key: string;
  name: string;
  score: number;
  explanation: string;
  scoreSummary: string;
  examinerPerspective: string;
  subCriteria: SubCriterion[];
  icon: React.ReactNode;
}

interface WritingCriteriaBreakdownProps {
  sectionScores: Record<string, unknown>;
}

// Score level indicator
const getScoreLevel = (score: number): { label: string; color: string } => {
  if (score >= 8) return { label: "Expert", color: "text-emerald-600" };
  if (score >= 7) return { label: "Good", color: "text-blue-600" };
  if (score >= 6) return { label: "Competent", color: "text-amber-600" };
  if (score >= 5) return { label: "Modest", color: "text-orange-600" };
  return { label: "Limited", color: "text-red-600" };
};

// Circular Progress Component
const CircularProgress = ({ score, maxScore = 9, size = 100 }: { score: number; maxScore?: number; size?: number }) => {
  const percentage = (score / maxScore) * 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-foreground transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{score.toFixed(1)}</span>
        <span className="text-[10px] text-muted-foreground">/ {maxScore}</span>
      </div>
    </div>
  );
};

// Horizontal Bar Component
const HorizontalBar = ({ name, score, maxScore = 9, index }: { name: string; score: number; maxScore?: number; index: number }) => {
  const percentage = (score / maxScore) * 100;
  const isHighScore = score >= 7;
  const isLowScore = score < 6;
  
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-foreground">{name}</span>
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "text-xs font-bold",
            isHighScore ? "text-emerald-600" : isLowScore ? "text-red-600" : "text-foreground"
          )}>
            {score.toFixed(1)}
          </span>
          {isHighScore && <TrendingUp className="w-3 h-3 text-emerald-600" />}
          {isLowScore && <AlertCircle className="w-3 h-3 text-red-600" />}
        </div>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            isHighScore ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
            isLowScore ? "bg-gradient-to-r from-red-500 to-red-400" :
            "bg-gradient-to-r from-foreground to-foreground/70"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const WritingCriteriaBreakdown = ({ sectionScores }: WritingCriteriaBreakdownProps) => {
  const getCriteriaData = (): CriterionDetail[] => {
    const taskScore = (sectionScores?.TaskAchievement as number) || 6.0;
    const coherenceScore = (sectionScores?.CoherenceCohesion as number) || 7.0;
    const lexicalScore = (sectionScores?.LexicalResource as number) || 6.0;
    const grammaticalScore = (sectionScores?.GrammaticalRange as number) || 6.0;

    return [
      {
        key: "task-achievement",
        name: "Task Achievement",
        score: taskScore,
        explanation: "Task Achievement is about how well you answer and support all parts of the task.",
        scoreSummary: "The response covers almost all the specific data points and provides a clear overview, but it only fully addresses two of the three key features.",
        examinerPerspective: "IELTS examiners look for complete task coverage and accurate data interpretation.",
        subCriteria: [
          { name: "Coverage", score: Math.min(9, taskScore + 1) },
          { name: "Key Features", score: taskScore },
          { name: "Overview", score: taskScore },
        ],
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
      {
        key: "coherence-cohesion",
        name: "Coherence & Cohesion",
        score: coherenceScore,
        explanation: "Coherence & Cohesion is about how logically your ideas are organised and linked.",
        scoreSummary: "The essay presents a generally clear logical flow and well-structured paragraphs, with mostly accurate cohesive devices and consistently correct referential cohesion, though some connectors are basic and a few weak links appear.",
        examinerPerspective: "Examiners evaluate logical flow and effective use of cohesive devices.",
        subCriteria: [
          { name: "Progression", score: Math.min(9, coherenceScore + 0.5) },
          { name: "Cohesive Devices", score: coherenceScore },
          { name: "Paragraphing", score: coherenceScore },
          { name: "Referencing", score: Math.min(9, coherenceScore + 0.5) },
        ],
        icon: <Link2 className="w-5 h-5" />,
      },
      {
        key: "lexical-resource",
        name: "Lexical Resource",
        score: lexicalScore,
        explanation: "Lexical Resource is about the variety and accuracy of your vocabulary.",
        scoreSummary: "The writer demonstrates a modest lexical range with a few appropriate collocations and linking phrases, though overall the vocabulary remains fairly basic.",
        examinerPerspective: "IELTS examiners assess vocabulary range, accuracy, and appropriateness.",
        subCriteria: [
          { name: "Range of Vocabulary", score: lexicalScore },
          { name: "Spelling", score: lexicalScore },
          { name: "Accuracy", score: lexicalScore },
        ],
        icon: <BookText className="w-5 h-5" />,
      },
      {
        key: "grammatical-range",
        name: "Grammatical Range & Accuracy",
        score: grammaticalScore,
        explanation: "Grammatical Range & Accuracy is about the variety and accuracy of your grammar, sentence structures and punctuation.",
        scoreSummary: "The essay displays a narrow grammatical range with frequent subject-verb agreement and verb-form errors, plus several punctuation problems, leading to limited grammatical accuracy.",
        examinerPerspective: "Examiners evaluate both grammatical range and accuracy in assessment.",
        subCriteria: [
          { name: "Range of Structures", score: grammaticalScore },
          { name: "Punctuation", score: grammaticalScore },
          { name: "Accuracy", score: grammaticalScore },
        ],
        icon: <SpellCheck className="w-5 h-5" />,
      },
    ];
  };

  const criteriaData = getCriteriaData();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Criteria Breakdown</h3>
        <div className="hidden sm:flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Strong</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-muted-foreground">Average</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Improve</span>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {criteriaData.map((criterion) => {
          const scoreLevel = getScoreLevel(criterion.score);
          const avgSubScore = criterion.subCriteria.reduce((a, b) => a + b.score, 0) / criterion.subCriteria.length;
          
          return (
            <AccordionItem
              key={criterion.key}
              value={criterion.key}
              className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-foreground/20"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/30">
                <div className="flex items-center gap-3 flex-1">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
                    <span className="text-foreground">{criterion.icon}</span>
                  </div>
                  
                  {/* Title & Score */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm">{criterion.name}</p>
                      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted", scoreLevel.color)}>
                        {scoreLevel.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-2xl font-bold text-foreground">{criterion.score.toFixed(1)}</span>
                      <div className="flex-1 max-w-[120px]">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground rounded-full transition-all duration-500"
                            style={{ width: `${(criterion.score / 9) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">/ 9.0</span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-5">
                {/* Description */}
                <div className="rounded-lg bg-muted/50 border border-border p-3 mb-5 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {criterion.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left: Circular Score + Sub-criteria Bars */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Main Score Circle */}
                    <div className="flex items-center justify-center py-2">
                      <CircularProgress score={criterion.score} />
                    </div>
                    
                    {/* Sub-criteria Bars */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
                        <span className="w-0.5 h-3 bg-foreground rounded-full" />
                        Sub-Criteria
                      </h4>
                      <div className="space-y-3">
                        {criterion.subCriteria.map((sub, index) => (
                          <HorizontalBar 
                            key={sub.name} 
                            name={sub.name} 
                            score={sub.score} 
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Feedback Cards */}
                  <div className="lg:col-span-7 space-y-3">
                    {/* Score Summary */}
                    <div className="rounded-lg border border-border p-4 bg-card hover:border-foreground/20 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-foreground/5 flex items-center justify-center flex-shrink-0">
                          <Target className="w-3.5 h-3.5 text-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1.5">Score Analysis</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {criterion.scoreSummary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Examiner's Perspective */}
                    <div className="rounded-lg border border-border p-4 bg-card hover:border-foreground/20 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-foreground/5 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-3.5 h-3.5 text-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1.5">Examiner's Insight</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {criterion.examinerPerspective}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-border p-2.5 text-center bg-card">
                        <p className="text-lg font-bold text-foreground">{criterion.subCriteria.length}</p>
                        <p className="text-[10px] text-muted-foreground">Metrics</p>
                      </div>
                      <div className="rounded-lg border border-border p-2.5 text-center bg-card">
                        <p className="text-lg font-bold text-foreground">{avgSubScore.toFixed(1)}</p>
                        <p className="text-[10px] text-muted-foreground">Average</p>
                      </div>
                      <div className="rounded-lg border border-border p-2.5 text-center bg-card">
                        <p className="text-lg font-bold text-foreground">
                          {Math.max(...criterion.subCriteria.map(s => s.score)).toFixed(1)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">Best</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default WritingCriteriaBreakdown;
