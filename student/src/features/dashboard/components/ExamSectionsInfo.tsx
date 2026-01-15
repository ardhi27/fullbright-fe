import { Card, CardContent } from "@/components/ui/card";

interface ExamSection {
  name: string;
  duration: string;
  questions: number;
  icon: string;
}

interface ExamSectionsInfoProps {
  title: string;
  sections: ExamSection[];
  columns?: number; // Number of columns for grid layout (default: 4 for IELTS, 3 for TOEFL)
}

const ExamSectionsInfo = ({ 
  title, 
  sections, 
  columns = 4 
}: ExamSectionsInfoProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className={`grid ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {sections.map((section) => (
          <Card key={section.name} className="p-4">
            <div className="text-2xl mb-2">{section.icon}</div>
            <h3 className={`font-medium ${columns === 3 ? 'text-sm' : ''}`}>{section.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {section.duration} • {section.questions} {section.questions > 3 ? "soal" : "bagian"}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamSectionsInfo;