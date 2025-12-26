import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Target } from "lucide-react";

interface PackageInfo {
  name: string;
  description: string;
  features: string[];
  targetScore: string;
  color: string;
}

interface PackageInfoCardProps {
  packageInfo: PackageInfo;
}

const PackageInfoCard = ({ packageInfo }: PackageInfoCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${packageInfo.color}`} />
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${packageInfo.color}/20 flex items-center justify-center`}>
              <Award className={`w-7 h-7 ${packageInfo.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{packageInfo.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{packageInfo.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Target className="w-3 h-3 mr-1" />
            Target: {packageInfo.targetScore}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {packageInfo.features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInfoCard;