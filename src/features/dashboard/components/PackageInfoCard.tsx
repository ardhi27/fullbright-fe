/**
 * PackageInfoCard Component - Fullbright Theme (Putih-Hitam-Merah)
 * Menampilkan informasi paket ujian dengan branding Fullbright
 */

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Target, Crown, Zap } from "lucide-react";
import type { PackageInfo } from "../utils/examData";
import type { ExamType } from "../utils/scoreUtils";

interface PackageInfoCardProps {
  packageInfo: PackageInfo;
  examType: ExamType;
}

const PackageInfoCard = ({ packageInfo, examType }: PackageInfoCardProps) => {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl animate-fade-up">
      {/* Fullbright Red Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-600" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-black/10 to-transparent rounded-full blur-2xl" />
      
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <CardContent className="relative p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
          {/* Left Side - Package Info */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Icon Container */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-xl animate-pulse-soft" />
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-600" />
              </div>
              {/* Premium Crown Badge */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-black shadow-lg flex items-center justify-center">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight truncate">
                {packageInfo.name}
              </h2>
              <p className="text-sm sm:text-base text-white/80">
                {examType === "ielts" ? "IELTS Academic Preparation" : "TOEFL ITP Preparation"}
              </p>
              
              {/* Features Row - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:flex flex-wrap gap-2 pt-2">
                {packageInfo.features.slice(0, 3).map((feature) => (
                  <span 
                    key={feature} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20"
                  >
                    <Award className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Target Score & Remaining Days */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3 mt-2 sm:mt-0">
            {/* Remaining Days */}
            <div className="text-center sm:text-right mb-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-white">59 hari tersisa</span>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Target Skor</p>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {packageInfo.targetScore}
                </span>
              </div>
            </div>
            
            {/* Quick Action */}
            <button className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white hover:bg-white/90 transition-all duration-300 shadow-lg">
              <Zap className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold text-red-600">Mulai Belajar</span>
            </button>
          </div>
        </div>

        {/* Mobile Features - Only visible on mobile */}
        <div className="flex sm:hidden flex-wrap gap-2 mt-4">
          {packageInfo.features.slice(0, 2).map((feature) => (
            <span 
              key={feature} 
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white border border-white/20"
            >
              <Award className="w-3 h-3" />
              {feature}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInfoCard;
