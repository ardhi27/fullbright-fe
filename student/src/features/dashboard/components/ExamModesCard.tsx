import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, GraduationCap, Clock, ChevronRight } from "lucide-react";

interface ExamMode {
  title: string;
  description: string;
  icon: React.ReactNode;
  timerInfo: string;
  additionalInfo: string;
  onClick: () => void;
}

interface ExamModesCardProps {
  examModes: ExamMode[];
}

const ExamModesCard = ({ examModes }: ExamModesCardProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FlaskConical className="w-5 h-5 text-primary" />
        Pilih Mode Ujian
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {examModes.map((mode, index) => (
          <Card
            key={index}
            className="group cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
            onClick={mode.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {mode.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mode.timerInfo}
                    </span>
                    <span>•</span>
                    <span>{mode.additionalInfo}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamModesCard;