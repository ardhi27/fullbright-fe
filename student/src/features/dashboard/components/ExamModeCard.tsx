/**
 * ExamModeCard Component - Fullbright Theme (Putih-Hitam-Merah)
 * Card untuk memilih mode ujian dengan tema Fullbright
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, GraduationCap, ChevronRight, Clock, Check, Zap, Shield } from "lucide-react";
import type { ExamModeInfo } from "../utils/examData";

interface ExamModeCardProps {
  mode: ExamModeInfo;
  onClick: () => void;
}

const ExamModeCard = ({ mode, onClick }: ExamModeCardProps) => {
  const isSimulasi = mode.id === "simulasi";
  const Icon = isSimulasi ? FlaskConical : GraduationCap;

  return (
    <Card
      className={`group relative overflow-hidden border cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-up ${
        isSimulasi 
          ? "border-gray-200 hover:border-gray-300 animation-delay-100" 
          : "border-red-200 hover:border-red-300 animation-delay-200"
      }`}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isSimulasi 
          ? "bg-gradient-to-br from-gray-100/50 via-transparent to-gray-50/50" 
          : "bg-gradient-to-br from-red-50/50 via-transparent to-red-100/30"
      }`} />

      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isSimulasi 
          ? "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800" 
          : "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
      } transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

      {/* Floating Badge */}
      <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
        isSimulasi 
          ? "bg-gray-100 text-gray-700 border border-gray-200" 
          : "bg-red-100 text-red-700 border border-red-200"
      }`}>
        {isSimulasi ? "Practice" : "Official"}
      </div>

      <CardContent className="relative p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Icon & Title Section */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Animated Icon */}
            <div className="relative shrink-0">
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
                isSimulasi ? "bg-gray-400" : "bg-red-500"
              }`} />
              <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                isSimulasi 
                  ? "bg-gray-100 border border-gray-200" 
                  : "bg-red-100 border border-red-200"
              }`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${
                  isSimulasi ? "text-gray-700" : "text-red-600"
                }`} />
              </div>
            </div>

            <div className="flex-1 pt-1 min-w-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors truncate">
                {mode.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {mode.description}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {mode.features.map((feature) => (
              <div
                key={feature}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  isSimulasi 
                    ? "bg-gray-50 border border-gray-100 group-hover:bg-gray-100 group-hover:border-gray-200" 
                    : "bg-red-50/50 border border-red-100 group-hover:bg-red-50 group-hover:border-red-200"
                }`}
              >
                {feature.toLowerCase().includes("timer") ? (
                  <Clock className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${isSimulasi ? "text-gray-600" : "text-red-500"}`} />
                ) : feature.toLowerCase().includes("sertifikat") ? (
                  <Shield className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${isSimulasi ? "text-gray-600" : "text-red-500"}`} />
                ) : (
                  <Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${isSimulasi ? "text-gray-600" : "text-red-500"}`} />
                )}
                <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-foreground/80 truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            className={`w-full h-10 sm:h-11 lg:h-12 text-sm sm:text-base font-semibold transition-all duration-300 group-hover:shadow-lg ${
              isSimulasi 
                ? "bg-gray-900 hover:bg-gray-800 text-white" 
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
            {mode.buttonText}
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamModeCard;
