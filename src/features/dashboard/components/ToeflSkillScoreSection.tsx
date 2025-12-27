/**
 * ToeflSkillScoreSection
 * Menampilkan skor rata-rata berdasarkan keterampilan dengan donut chart
 * Seperti referensi: Listening-Reading dan Structure scores
 */

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ToeflSkillScoreSectionProps {
  sectionScores: {
    Listening?: number;
    Reading?: number;
    Structure?: number;
  };
}

const ToeflSkillScoreSection = ({ sectionScores }: ToeflSkillScoreSectionProps) => {
  const listening = sectionScores?.Listening || 0;
  const reading = sectionScores?.Reading || 0;
  const structure = sectionScores?.Structure || 0;

  // Listening + Reading combined (max ~136 based on TOEFL ITP scale 31-68 each)
  const listeningReadingTotal = listening + reading;
  const listeningReadingMax = 136; // 68 + 68

  // Structure score (max 68)
  const structureMax = 68;

  const DonutChart = ({ 
    value, 
    maxValue, 
    color, 
    label 
  }: { 
    value: number; 
    maxValue: number; 
    color: string;
    label: string;
  }) => {
    const percentage = (value / maxValue) * 100;
    const data = [
      { name: "filled", value: percentage },
      { name: "empty", value: 100 - percentage },
    ];

    return (
      <div className="relative w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={44}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-[10px] text-muted-foreground">{maxValue}</span>
        </div>
      </div>
    );
  };

  const ScoreItem = ({ 
    color, 
    label, 
    value 
  }: { 
    color: string; 
    label: string; 
    value: number;
  }) => (
    <div className="flex items-center gap-2">
      <div 
        className="w-2.5 h-2.5 rounded-sm" 
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium ml-auto">{Math.round(value)}</span>
    </div>
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="border-t-4 border-primary -mx-6 -mt-6 mb-6" />
        
        <h3 className="text-lg font-semibold mb-1">
          Skor rata-rata berdasarkan keterampilan
        </h3>
        <p className="text-sm text-muted-foreground mb-6">dalam Latihan Tes</p>

        <div className="space-y-8">
          {/* Listening - Reading Score */}
          <div>
            <h4 className="font-medium text-sm mb-4">Listening - Reading Score</h4>
            <div className="flex items-center gap-6">
              <DonutChart 
                value={listeningReadingTotal} 
                maxValue={listeningReadingMax} 
                color="#f59e0b"
                label="L+R"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Skor</span>
                  <span className="text-xl font-bold">{Math.round(listeningReadingTotal)}</span>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <ScoreItem color="#f59e0b" label="Listening" value={listening} />
                  <ScoreItem color="#22c55e" label="Reading" value={reading} />
                </div>
              </div>
            </div>
          </div>

          {/* Structure Score */}
          <div>
            <h4 className="font-medium text-sm mb-4">Structure & Written Expression</h4>
            <div className="flex items-center gap-6">
              <DonutChart 
                value={structure} 
                maxValue={structureMax} 
                color="#3b82f6"
                label="Structure"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Skor</span>
                  <span className="text-xl font-bold">{Math.round(structure)}</span>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <ScoreItem color="#3b82f6" label="Structure" value={structure} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToeflSkillScoreSection;
