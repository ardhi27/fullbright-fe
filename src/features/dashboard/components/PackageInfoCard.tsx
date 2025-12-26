/**
 * PackageInfoCard Component
 * Menampilkan informasi paket ujian user
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Target } from "lucide-react";
import type { PackageInfo } from "../utils/examData";
import type { ExamType } from "../utils/scoreUtils";

interface PackageInfoCardProps {
  packageInfo: PackageInfo;
  examType: ExamType;
}

const PackageInfoCard = ({ packageInfo, examType }: PackageInfoCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${packageInfo.color}`} />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${packageInfo.color} flex items-center justify-center`}>
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">{packageInfo.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {examType === "ielts" ? "IELTS Academic" : "TOEFL ITP"}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <Target className="w-3 h-3" />
            Target: {packageInfo.targetScore}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {packageInfo.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="gap-1">
              <Award className="w-3 h-3" />
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInfoCard;
