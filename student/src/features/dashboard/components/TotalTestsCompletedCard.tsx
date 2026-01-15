/**
 * TotalTestsCompletedCard
 * Menampilkan total tes yang diselesaikan dengan donut chart
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TotalTestsCompletedCardProps {
  totalTests: number;
  maxTests?: number;
  examType: "ielts" | "toefl";
}

const TotalTestsCompletedCard = ({ 
  totalTests, 
  maxTests = 10,
  examType,
}: TotalTestsCompletedCardProps) => {
  const navigate = useNavigate();
  const percentage = Math.min((totalTests / maxTests) * 100, 100);
  
  const data = [
    { name: "completed", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const handleStartTest = () => {
    navigate(examType === "toefl" ? "/exam/toefl-itp/simulasi" : "/exam/ielts/simulasi");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="border-t-4 border-primary -mx-6 -mt-6 mb-6" />
        
        <h3 className="text-lg font-semibold mb-1">
          Total tes yang diselesaikan
        </h3>
        <p className="text-sm text-muted-foreground mb-6">dalam Latihan Tes</p>

        <div className="flex flex-col items-center">
          {totalTests > 0 ? (
            <>
              <div className="relative w-32 h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={56}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill="hsl(var(--primary))" />
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{totalTests}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {totalTests} tes selesai
              </p>
            </>
          ) : (
            <>
              <div className="relative w-32 h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ name: "empty", value: 100 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={56}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                </div>
              </div>
              <p className="font-medium text-center mb-1">
                Tidak ada data yang tersedia
              </p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Coba tes untuk memulai
              </p>
              <Button onClick={handleStartTest}>
                Buka Latihan Tes
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalTestsCompletedCard;
