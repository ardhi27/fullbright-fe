import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Link2,
  BookText,
  SpellCheck,
} from "lucide-react";

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
  color: string;
  bgColor: string;
}

interface WritingCriteriaBreakdownProps {
  sectionScores: Record<string, unknown>;
}

// Simple Radar Chart Component
const RadarChart = ({ data, color }: { data: SubCriterion[]; color: string }) => {
  const centerX = 140;
  const centerY = 150; // Moved down to give space for top labels
  const maxRadius = 80;
  const levels = 5;
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // Start from top

  // Calculate points for each data item
  const points = data.map((item, index) => {
    const angle = startAngle + index * angleStep;
    const radius = (item.score / 9) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      labelX: centerX + (maxRadius + 35) * Math.cos(angle),
      labelY: centerY + (maxRadius + 35) * Math.sin(angle),
      score: item.score,
      name: item.name,
    };
  });

  // Create polygon path
  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Create grid lines
  const gridLines = [];
  for (let level = 1; level <= levels; level++) {
    const radius = (level / levels) * maxRadius;
    const levelPoints = data.map((_, index) => {
      const angle = startAngle + index * angleStep;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
    const path = levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    gridLines.push(path);
  }

  // Axis lines from center to each point
  const axisLines = data.map((_, index) => {
    const angle = startAngle + index * angleStep;
    return {
      x2: centerX + maxRadius * Math.cos(angle),
      y2: centerY + maxRadius * Math.sin(angle),
    };
  });

  return (
    <svg width="280" height="300" className="mx-auto">
      {/* Grid levels */}
      {gridLines.map((path, i) => (
        <path
          key={`grid-${i}`}
          d={path}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          opacity={0.5}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={`axis-${i}`}
          x1={centerX}
          y1={centerY}
          x2={line.x2}
          y2={line.y2}
          stroke="hsl(var(--border))"
          strokeWidth="1"
          opacity={0.5}
        />
      ))}

      {/* Data polygon */}
      <path
        d={polygonPath}
        fill={color}
        fillOpacity={0.3}
        stroke={color}
        strokeWidth="2"
      />

      {/* Data points and labels */}
      {points.map((point, i) => (
        <g key={`point-${i}`}>
          {/* Score badge */}
          <rect
            x={point.labelX - 20}
            y={point.labelY - 25}
            width="40"
            height="24"
            rx="12"
            fill={color}
          />
          <text
            x={point.labelX}
            y={point.labelY - 9}
            textAnchor="middle"
            className="text-xs font-bold fill-white"
          >
            {point.score.toFixed(1)}
          </text>
          {/* Label */}
          <text
            x={point.labelX}
            y={point.labelY + 10}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {point.name}
          </text>
          {/* Point dot */}
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
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
          { name: "Key features", score: taskScore },
          { name: "Overview", score: taskScore },
        ],
        icon: <CheckCircle2 className="w-5 h-5 text-purple-500" />,
        color: "#a855f7",
        bgColor: "bg-purple-500/20",
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
          { name: "Cohesive devices", score: coherenceScore },
          { name: "Paragraphing", score: coherenceScore },
          { name: "Referencing", score: Math.min(9, coherenceScore + 0.5) },
        ],
        icon: <Link2 className="w-5 h-5 text-green-500" />,
        color: "#22c55e",
        bgColor: "bg-green-500/20",
      },
      {
        key: "lexical-resource",
        name: "Lexical Resource",
        score: lexicalScore,
        explanation: "Lexical Resource is about the variety and accuracy of your vocabulary.",
        scoreSummary: "The writer demonstrates a modest lexical range with a few appropriate collocations and linking phrases, though overall the vocabulary remains fairly basic.",
        examinerPerspective: "IELTS examiners assess vocabulary range, accuracy, and appropriateness.",
        subCriteria: [
          { name: "Range of vocabulary", score: lexicalScore },
          { name: "Spelling", score: lexicalScore },
          { name: "Accuracy", score: lexicalScore },
        ],
        icon: <BookText className="w-5 h-5 text-amber-500" />,
        color: "#f59e0b",
        bgColor: "bg-amber-500/20",
      },
      {
        key: "grammatical-range",
        name: "Grammatical Range & Accuracy",
        score: grammaticalScore,
        explanation: "Grammatical Range & Accuracy is about the variety and accuracy of your grammar, sentence structures and punctuation.",
        scoreSummary: "The essay displays a narrow grammatical range with frequent subject-verb agreement and verb-form errors, plus several punctuation problems, leading to limited grammatical accuracy.",
        examinerPerspective: "Examiners evaluate both grammatical range and accuracy in assessment.",
        subCriteria: [
          { name: "Range of structures", score: grammaticalScore },
          { name: "Punctuation", score: grammaticalScore },
          { name: "Accuracy", score: grammaticalScore },
        ],
        icon: <SpellCheck className="w-5 h-5 text-red-500" />,
        color: "#ef4444",
        bgColor: "bg-red-500/20",
      },
    ];
  };

  const criteriaData = getCriteriaData();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Criteria Breakdown</h3>
      <Accordion type="single" collapsible className="space-y-3">
        {criteriaData.map((criterion) => (
          <AccordionItem
            key={criterion.key}
            value={criterion.key}
            className="border border-border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/30">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-full ${criterion.bgColor} flex items-center justify-center`}>
                  {criterion.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{criterion.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xl font-bold" style={{ color: criterion.color }}>
                      {criterion.score.toFixed(1)}
                    </span>
                    <div className="flex-1 h-2 max-w-[120px] bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${(criterion.score / 9) * 100}%`,
                          backgroundColor: criterion.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6">
              {/* Explanation */}
              <div className="mb-6 p-3 rounded-lg border-l-4" style={{ borderColor: criterion.color, backgroundColor: `${criterion.color}10` }}>
                <p className="text-sm" style={{ color: criterion.color }}>
                  {criterion.explanation}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <div className="flex items-center justify-center">
                  <RadarChart data={criterion.subCriteria} color={criterion.color} />
                </div>

                {/* Summary Cards */}
                <div className="space-y-4">
                  <Card className="p-4 border-l-4" style={{ borderLeftColor: criterion.color }}>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: criterion.color }}>
                      Score Summary
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {criterion.scoreSummary}
                    </p>
                  </Card>

                  <Card className="p-4 border-l-4" style={{ borderLeftColor: criterion.color }}>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: criterion.color }}>
                      Examiner's Perspective
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {criterion.examinerPerspective}
                    </p>
                  </Card>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WritingCriteriaBreakdown;
