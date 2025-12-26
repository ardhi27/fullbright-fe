/**
 * ToeflScoreCard
 * Kartu skor untuk section TOEFL ITP
 *
 * @param section - Nama section (listening, structure, reading)
 * @param score - Skor yang didapat
 * @param maxScore - Skor maksimal
 * @param label - Label performa (Good, Excellent, Fair)
 * @param description - Deskripsi section
 */

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ToeflScoreCardProps {
  section: string;
  score: number;
  maxScore: number;
  label: string;
  description?: string;
}

const getLabelColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "excellent":
      return "text-emerald-500";
    case "good":
      return "text-primary";
    default:
      return "text-amber-500";
  }
};

const getSectionTitle = (section: string) => {
  if (section === "structure") return "Structure & Written Expression";
  return `${section.charAt(0).toUpperCase() + section.slice(1)} Comprehension`;
};

const ToeflScoreCard = ({
  section,
  score,
  maxScore,
  label,
  description,
}: ToeflScoreCardProps) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium capitalize">{getSectionTitle(section)}</h3>
        <p className="text-2xl font-bold">
          {score}
          <span className="text-sm text-muted-foreground">/{maxScore}</span>
        </p>
      </div>
      <Progress value={percentage} className="h-2 mb-3" />
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={getLabelColor(label)}>
          {label}
        </Badge>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
};

export default ToeflScoreCard;
