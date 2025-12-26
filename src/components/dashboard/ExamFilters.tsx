/**
 * ExamFilters
 * Komponen filter ujian: tabs tipe ujian, date picker, dan search
 *
 * @param examMode - Mode ujian aktif ("ielts" | "toefl")
 * @param onExamModeChange - Callback saat mode berubah
 * @param dateFilter - Tanggal filter yang dipilih
 * @param onDateFilterChange - Callback saat tanggal berubah
 * @param searchQuery - Query pencarian
 * @param onSearchChange - Callback saat search berubah
 */

import { format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ExamType } from "@/types/dashboard";

interface ExamFiltersProps {
  examMode: ExamType;
  onExamModeChange: (mode: ExamType) => void;
  dateFilter: Date | undefined;
  onDateFilterChange: (date: Date | undefined) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ExamFilters = ({
  examMode,
  onExamModeChange,
  dateFilter,
  onDateFilterChange,
  searchQuery,
  onSearchChange,
}: ExamFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      {/* Exam Type Tabs */}
      <div className="inline-flex rounded-lg border border-border p-1 bg-card">
        <button
          onClick={() => onExamModeChange("ielts")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            examMode === "ielts"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          IELTS
        </button>
        <button
          onClick={() => onExamModeChange("toefl")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            examMode === "toefl"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          TOEFL ITP
        </button>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "dd MMM yyyy") : "Filter tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover z-50" align="end">
            <CalendarComponent
              mode="single"
              selected={dateFilter}
              onSelect={onDateFilterChange}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {dateFilter && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDateFilterChange(undefined)}
            className="h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Search */}
        <div className="relative w-full md:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ExamFilters;
