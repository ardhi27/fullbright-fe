/**
 * ExamModeCard Component
 * Card untuk memilih mode ujian (simulasi/final)
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, GraduationCap, ChevronRight, Clock, Check } from "lucide-react";
import type { ExamModeInfo } from "../utils/examData";

interface ExamModeCardProps {
  mode: ExamModeInfo;
  onClick: () => void;
}

const ExamModeCard = ({ mode, onClick }: ExamModeCardProps) => {
  const Icon = mode.id === "simulasi" ? FlaskConical : GraduationCap;

  return (
    <Card
      className="group cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${mode.iconBgColor} flex items-center justify-center shrink-0`}>
            <Icon className={`w-6 h-6 ${mode.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{mode.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {mode.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {mode.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full"
                >
                  {feature.includes("timer") ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                  {feature}
                </span>
              ))}
            </div>
            <Button className="w-full group-hover:bg-primary/90">
              {mode.buttonText}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamModeCard;
