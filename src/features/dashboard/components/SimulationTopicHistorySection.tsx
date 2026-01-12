/**
 * SimulationTopicHistorySection Component - Fullbright Theme
 * Section untuk menampilkan riwayat latihan simulasi per topik/materi
 * Data disimpan sebagai list, setiap percobaan membuat entry baru
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, ArrowRight, TrendingUp } from "lucide-react";
import SimulationTopicHistoryCard from "./SimulationTopicHistoryCard";
import SimulationTopicResultDetail from "./SimulationTopicResultDetail";

// Extended interface with full data for detail view
export interface TopicHistoryEntry {
  id: string;
  topicId: string;
  topicTitle: string;
  section: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  timeSpent: number;
  answers?: Record<number, string> | { writing: string };
  questions?: any[];
}

interface SimulationTopicHistorySectionProps {
  examType: "ielts" | "toefl";
  maxDisplay?: number;
}

const SimulationTopicHistorySection = ({
  examType,
  maxDisplay = 5,
}: SimulationTopicHistorySectionProps) => {
  const navigate = useNavigate();
  const [topicHistory, setTopicHistory] = useState<TopicHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<TopicHistoryEntry | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    migrateOldData();
    loadTopicHistory();
  }, [examType]);

  // Migrate old format data to new format
  const migrateOldData = () => {
    const historyKey = `${examType}_simulation_history`;
    const existingHistory = localStorage.getItem(historyKey);

    // Skip if already have new format data
    if (existingHistory) return;

    const sections = examType === "toefl"
      ? ["listening", "structure", "reading"]
      : ["listening", "reading", "writing"];

    const migratedHistory: TopicHistoryEntry[] = [];

    sections.forEach(section => {
      const oldKey = `${examType}_${section}_progress`;
      const oldData = localStorage.getItem(oldKey);

      if (oldData) {
        try {
          const progress = JSON.parse(oldData);
          // Old format was object: { "topic-id": { completed, attempts, lastScore, ... } }
          Object.entries(progress).forEach(([topicId, data]: [string, any]) => {
            if (data.completed) {
              migratedHistory.push({
                id: `migrated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                topicId,
                topicTitle: data.topicTitle || topicId,
                section,
                score: data.lastScore || 0,
                totalQuestions: data.totalQuestions || 10,
                percentage: data.percentage || 0,
                completedAt: data.completedAt || new Date().toISOString(),
                timeSpent: data.timeSpent || 0,
                answers: data.answers,
                questions: data.questions,
              });
            }
          });
          // Remove old key after migration
          localStorage.removeItem(oldKey);
        } catch (e) {
          console.error(`Failed to migrate ${oldKey}:`, e);
        }
      }
    });

    if (migratedHistory.length > 0) {
      // Sort by completedAt descending
      migratedHistory.sort((a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      localStorage.setItem(historyKey, JSON.stringify(migratedHistory));
    }
  };

  const loadTopicHistory = () => {
    const historyKey = `${examType}_simulation_history`;
    const savedHistory = localStorage.getItem(historyKey);

    if (savedHistory) {
      const history: TopicHistoryEntry[] = JSON.parse(savedHistory);
      // Already sorted by completedAt descending (most recent first) when saved
      setTopicHistory(history);
    } else {
      setTopicHistory([]);
    }
  };

  const handleViewDetail = (entry: TopicHistoryEntry) => {
    setSelectedEntry(entry);
  };

  const handleBack = () => {
    setSelectedEntry(null);
  };

  const handleRetake = () => {
    if (selectedEntry) {
      navigate(`/exam/${examType}/${selectedEntry.section}/topic/${selectedEntry.topicId}`);
    }
  };

  // Show empty state if no history (don't hide the section completely)
  if (topicHistory.length === 0) {
    return (
      <div className="animate-fade-up animation-delay-500">
        {/* Section Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-purple-100 border border-purple-200">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
              Riwayat Latihan per Materi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Belum ada riwayat latihan
            </p>
          </div>
        </div>

        {/* Empty State Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-dashed border-border bg-muted/30 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Belum Ada Latihan</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Mulai latihan simulasi per materi untuk melihat riwayat dan progres Anda di sini.
          </p>
        </div>
      </div>
    );
  }

  // Show detail view if an entry is selected
  if (selectedEntry) {
    return (
      <div className="animate-fade-up">
        <SimulationTopicResultDetail
          entry={selectedEntry}
          examType={examType}
          onBack={handleBack}
          onRetake={handleRetake}
        />
      </div>
    );
  }

  const displayHistory = showAll ? topicHistory : topicHistory.slice(0, maxDisplay);

  return (
    <div className="animate-fade-up animation-delay-500">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-purple-100 border border-purple-200">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
              Riwayat Latihan per Materi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {topicHistory.length} latihan tercatat
            </p>
          </div>
        </div>

        {topicHistory.length > maxDisplay && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span className="hidden sm:inline">Lihat Semua</span>
            <span className="sm:hidden">Semua</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* History Cards */}
      <div className="space-y-3 sm:space-y-4">
        {displayHistory.map((entry, index) => (
          <div
            key={entry.id}
            className="animate-fade-up"
            style={{ animationDelay: `${(index + 1) * 50}ms` }}
          >
            <SimulationTopicHistoryCard
              entry={entry}
              examType={examType}
              onViewDetail={() => handleViewDetail(entry)}
            />
          </div>
        ))}

        {topicHistory.length > maxDisplay && !showAll && (
          <div className="text-center pt-2 sm:pt-4">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-100 hover:bg-purple-200 border border-purple-200 text-xs sm:text-sm font-medium text-purple-700 hover:text-purple-900 transition-all duration-300"
            >
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Lihat {topicHistory.length - maxDisplay} latihan lainnya
            </button>
          </div>
        )}

        {showAll && topicHistory.length > maxDisplay && (
          <div className="text-center pt-2 sm:pt-4">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              Tampilkan lebih sedikit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationTopicHistorySection;
