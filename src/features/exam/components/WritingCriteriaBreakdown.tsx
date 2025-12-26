/**
 * @fileoverview WritingCriteriaBreakdown Component
 *
 * Komponen ini menampilkan breakdown detail dari kriteria penilaian writing test
 * berdasarkan 4 kriteria IELTS: Task Achievement, Coherence & Cohesion,
 * Lexical Resource, dan Grammatical Range & Accuracy.
 *
 * @module WritingCriteriaBreakdown
 *
 * @description
 * Fitur utama:
 * - Accordion expandable untuk setiap kriteria penilaian
 * - Radar chart untuk visualisasi sub-kriteria
 * - Progress bar untuk menampilkan skor
 * - Score Summary dan Examiner's Perspective untuk setiap kriteria
 * - Color-coded berdasarkan kategori kriteria
 *
 * @example
 * ```tsx
 * <WritingCriteriaBreakdown
 *   criteria={{
 *     taskAchievement: {
 *       score: 7.0,
 *       max: 9,
 *       label: "Task Achievement",
 *       description: "How well you addressed the task",
 *       explanation: "Your response addresses all parts of the task",
 *       scoreSummary: "Band 7 - Good",
 *       examinerPerspective: "Clear position throughout",
 *       subCriteria: [
 *         { name: "Response", score: 7 },
 *         { name: "Ideas", score: 6.5 }
 *       ]
 *     },
 *     coherence: { ... },
 *     lexicalResource: { ... },
 *     grammaticalRange: { ... }
 *   }}
 * />
 * ```
 */

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Link2, BookOpen, CheckSquare, ChevronRight } from "lucide-react";

/**
 * Interface untuk detail setiap kriteria penilaian
 * @interface CriterionDetail
 * @property {number} score - Skor yang didapat (contoh: 7.0)
 * @property {number} max - Skor maksimal (biasanya 9 untuk IELTS)
 * @property {string} label - Label/nama kriteria
 * @property {string} description - Deskripsi singkat kriteria
 * @property {string} explanation - Penjelasan detail tentang performa di kriteria ini
 * @property {string} scoreSummary - Ringkasan interpretasi skor
 * @property {string} examinerPerspective - Perspektif/komentar dari sudut pandang examiner
 * @property {{ name: string; score: number }[]} subCriteria - Array sub-kriteria untuk radar chart
 */
interface CriterionDetail {
  score: number;
  max: number;
  label: string;
  description: string;
  explanation: string;
  scoreSummary: string;
  examinerPerspective: string;
  subCriteria: {
    name: string;
    score: number;
  }[];
}

/**
 * Props untuk komponen WritingCriteriaBreakdown
 * @interface WritingCriteriaBreakdownProps
 * @property {Object} criteria - Object berisi 4 kriteria penilaian IELTS
 * @property {CriterionDetail} criteria.taskAchievement - Kriteria Task Achievement
 * @property {CriterionDetail} criteria.coherence - Kriteria Coherence & Cohesion
 * @property {CriterionDetail} criteria.lexicalResource - Kriteria Lexical Resource (Vocabulary)
 * @property {CriterionDetail} criteria.grammaticalRange - Kriteria Grammatical Range & Accuracy
 */
interface WritingCriteriaBreakdownProps {
  criteria: {
    taskAchievement: CriterionDetail;
    coherence: CriterionDetail;
    lexicalResource: CriterionDetail;
    grammaticalRange: CriterionDetail;
  };
}

const criteriaConfig = {
  taskAchievement: {
    icon: Target,
    color: "bg-purple-500",
    textColor: "text-purple-500",
    borderColor: "border-l-purple-500",
  },
  coherence: {
    icon: Link2,
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    borderColor: "border-l-emerald-500",
  },
  lexicalResource: {
    icon: BookOpen,
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-l-orange-500",
  },
  grammaticalRange: {
    icon: CheckSquare,
    color: "bg-primary",
    textColor: "text-primary",
    borderColor: "border-l-primary",
  },
};

const criteriaNames = {
  taskAchievement: "Task Achievement",
  coherence: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range & Accuracy",
};

/**
 * Komponen Radar Chart sederhana untuk visualisasi sub-kriteria
 *
 * @component
 * @param {Object} props - Props komponen
 * @param {{ name: string; score: number }[]} props.data - Array data sub-kriteria
 * @param {string} props.color - Warna hex untuk chart (contoh: "#a855f7")
 * @returns {JSX.Element} SVG radar chart
 *
 * @description
 * Menampilkan radar/spider chart dengan:
 * - Grid polygonal 3 level
 * - Axis lines dari center ke setiap data point
 * - Data polygon dengan fill dan stroke
 * - Label score dan nama untuk setiap data point
 */
const RadarChart = ({ data, color }: { data: { name: string; score: number }[]; color: string }) => {
  const centerX = 120;
  const centerY = 100;
  const radius = 70;
  const angleStep = (2 * Math.PI) / data.length;
  const maxScore = 9;

  // Calculate points for the data polygon
  const points = data.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (item.score / maxScore) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      labelX: centerX + (radius + 30) * Math.cos(angle),
      labelY: centerY + (radius + 30) * Math.sin(angle),
      score: item.score,
      name: item.name,
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Grid lines
  const gridLevels = [0.33, 0.66, 1];

  return (
    <svg width="240" height="200" className="mx-auto">
      {/* Grid */}
      {gridLevels.map((level, i) => (
        <polygon
          key={i}
          points={data
            .map((_, j) => {
              const angle = j * angleStep - Math.PI / 2;
              const r = level * radius;
              return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
            })
            .join(" ")}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(angle)}
            y2={centerY + radius * Math.sin(angle)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon points={polygonPoints} fill={`${color}20`} stroke={color} strokeWidth="2" />

      {/* Data points and labels */}
      {points.map((point, i) => (
        <g key={i}>
          <circle cx={point.x} cy={point.y} r="4" fill={color} />
          <text
            x={point.labelX}
            y={point.labelY - 10}
            textAnchor="middle"
            className="text-xs font-bold fill-current"
            style={{ fill: color }}
          >
            {point.score.toFixed(1)}
          </text>
          <text
            x={point.labelX}
            y={point.labelY + 5}
            textAnchor="middle"
            className="text-[10px] fill-muted-foreground"
          >
            {point.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

const WritingCriteriaBreakdown = ({ criteria }: WritingCriteriaBreakdownProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold mb-6">Criteria Breakdown</h3>

      <Accordion type="single" collapsible className="space-y-3">
        {(Object.keys(criteria) as Array<keyof typeof criteria>).map((key) => {
          const criterion = criteria[key];
          const config = criteriaConfig[key];
          const Icon = config.icon;
          const percentage = (criterion.score / criterion.max) * 100;

          return (
            <AccordionItem
              key={key}
              value={key}
              className={`border-l-4 ${config.borderColor} border border-border rounded-lg overflow-hidden`}
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-secondary/30">
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{criteriaNames[key]}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xl font-bold">{criterion.score.toFixed(1)}</span>
                      <div className="flex-1 max-w-32">
                        <Progress value={percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-6">
                {/* Explanation */}
                <p className={`${config.textColor} font-medium mb-6`}>{criterion.explanation}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Radar Chart */}
                  <div className="flex items-center justify-center">
                    <RadarChart
                      data={criterion.subCriteria}
                      color={
                        key === "taskAchievement"
                          ? "#a855f7"
                          : key === "coherence"
                          ? "#22c55e"
                          : key === "lexicalResource"
                          ? "#f97316"
                          : "#ef4444"
                      }
                    />
                  </div>

                  {/* Summary Cards */}
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-l-4 ${config.borderColor} bg-secondary/30`}>
                      <h4 className={`font-semibold ${config.textColor} mb-2`}>Score Summary</h4>
                      <p className="text-sm text-muted-foreground">{criterion.scoreSummary}</p>
                    </div>

                    <div className={`p-4 rounded-lg border-l-4 ${config.borderColor} bg-secondary/30`}>
                      <h4 className={`font-semibold ${config.textColor} mb-2`}>Examiner&apos;s Perspective</h4>
                      <p className="text-sm text-muted-foreground">{criterion.examinerPerspective}</p>
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
