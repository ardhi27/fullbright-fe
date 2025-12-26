import { Card, CardContent } from "@/components/ui/card";

interface ScoreRange {
  score: string;
  level: string;
  color?: string;
}

interface ScoreRangeInfoProps {
  title: string;
  ranges: ScoreRange[];
}

const ScoreRangeInfo = ({ title, ranges }: ScoreRangeInfoProps) => {
  return (
    <Card className="p-6 bg-muted/30">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="grid sm:grid-cols-4 gap-4 text-center">
        {ranges.map((range, index) => (
          <div key={index} className="p-3 rounded-lg bg-background">
            <p className={`text-2xl font-bold ${range.color || 'text-muted-foreground'}`}>
              {range.score}
            </p>
            <p className="text-xs text-muted-foreground">{range.level}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ScoreRangeInfo;