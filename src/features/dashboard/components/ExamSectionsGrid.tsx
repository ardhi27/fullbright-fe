/**
 * ExamSectionsGrid Component
 * Grid untuk menampilkan informasi section ujian
 */

import { Card } from "@/components/ui/card";
import type { ExamType } from "../utils/scoreUtils";
import { getExamSections } from "../utils/examData";

interface ExamSectionsGridProps {
  examType: ExamType;
}

const ExamSectionsGrid = ({ examType }: ExamSectionsGridProps) => {
  const sections = getExamSections(examType);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Struktur Ujian {examType === "ielts" ? "IELTS" : "TOEFL ITP"}
      </h2>
      <div className={`grid gap-4 ${examType === "ielts" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-3"}`}>
        {sections.map((section) => (
          <Card key={section.name} className="p-4">
            <div className="text-2xl mb-2">{section.icon}</div>
            <h3 className="font-medium">{section.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {section.duration} • {section.questions}{" "}
              {section.questionLabel || (section.questions > 3 ? "soal" : "bagian")}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamSectionsGrid;
