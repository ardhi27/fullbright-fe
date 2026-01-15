/**
 * ExamSectionsGrid Component - Fullbright Theme (Putih-Hitam-Merah)
 * Grid untuk menampilkan informasi section ujian
 */

import { Card } from "@/components/ui/card";
import { Headphones, BookOpen, PenTool, FileText } from "lucide-react";
import type { ExamType } from "../utils/scoreUtils";
import { getExamSections } from "../utils/examData";

interface ExamSectionsGridProps {
  examType: ExamType;
}

const iconMap: Record<string, React.ElementType> = {
  "🎧": Headphones,
  "📖": BookOpen,
  "✍️": PenTool,
  "📝": FileText,
};

const colorMap: Record<string, { gradient: string; iconBg: string; border: string; iconColor: string }> = {
  "Listening": {
    gradient: "from-gray-100/50 via-transparent to-gray-50/50",
    iconBg: "bg-gray-100 border-gray-200",
    border: "border-gray-200 hover:border-gray-300",
    iconColor: "text-gray-700",
  },
  "Reading": {
    gradient: "from-gray-100/50 via-transparent to-gray-50/50",
    iconBg: "bg-gray-100 border-gray-200",
    border: "border-gray-200 hover:border-gray-300",
    iconColor: "text-gray-700",
  },
  "Writing": {
    gradient: "from-red-50/50 via-transparent to-red-100/30",
    iconBg: "bg-red-100 border-red-200",
    border: "border-red-200 hover:border-red-300",
    iconColor: "text-red-600",
  },
  "Structure": {
    gradient: "from-gray-100/50 via-transparent to-gray-50/50",
    iconBg: "bg-gray-100 border-gray-200",
    border: "border-gray-200 hover:border-gray-300",
    iconColor: "text-gray-700",
  },
};

const ExamSectionsGrid = ({ examType }: ExamSectionsGridProps) => {
  const sections = getExamSections(examType);

  return (
    <div className="animate-fade-up animation-delay-500">
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-red-100 border border-red-200">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
            Struktur Ujian
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {examType === "ielts" ? "IELTS Academic" : "TOEFL ITP"} - {sections.length} section
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`grid gap-3 sm:gap-4 ${
        examType === "ielts" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"
      }`}>
        {sections.map((section, index) => {
          const IconComponent = iconMap[section.icon] || FileText;
          const colors = colorMap[section.name] || colorMap["Listening"];

          return (
            <Card 
              key={section.name} 
              className={`group relative overflow-hidden border bg-card transition-all duration-300 hover:shadow-lg ${colors.border} animate-fade-up`}
              style={{ animationDelay: `${(index + 1) * 100 + 500}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-4 sm:p-5 lg:p-6">
                {/* Icon */}
                <div className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl border mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 ${colors.iconBg}`}>
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-red-600 transition-colors">
                  {section.name}
                </h3>
                
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-100">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400" />
                    {section.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-100">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400" />
                    {section.questions} {section.questionLabel || "soal"}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamSectionsGrid;
