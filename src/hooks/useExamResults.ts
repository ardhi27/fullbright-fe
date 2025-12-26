import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export interface ExamResult {
  id: string;
  user_id: string;
  exam_type: "ielts" | "toefl";
  exam_mode: "simulasi" | "final";
  package_level: string | null;
  total_score: number | null;
  section_scores: Record<string, any> | null;
  answers: Record<string, any> | null;
  time_spent: number | null;
  completed_at: string;
  created_at: string;
}

export interface SaveExamResultParams {
  exam_type: "ielts" | "toefl";
  exam_mode: "simulasi" | "final";
  package_level?: string;
  total_score: number;
  section_scores: Record<string, any>;
  answers?: Record<string, any>;
  time_spent?: number;
}

export const useExamResults = (examType?: "ielts" | "toefl") => {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchResults = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setResults([]);
        return;
      }

      let query = supabase
        .from("exam_results")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (examType) {
        query = query.eq("exam_type", examType);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Type assertion for the data
      setResults((data || []) as unknown as ExamResult[]);
    } catch (error: any) {
      console.error("Error fetching exam results:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveResult = async (params: SaveExamResultParams): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Anda harus login untuk menyimpan hasil ujian",
          variant: "destructive",
        });
        return false;
      }

      const packageLevel = localStorage.getItem("user_package") || "";

      const { error } = await supabase.from("exam_results").insert({
        user_id: user.id,
        exam_type: params.exam_type,
        exam_mode: params.exam_mode,
        package_level: params.package_level || packageLevel,
        total_score: params.total_score,
        section_scores: params.section_scores,
        answers: params.answers || {},
        time_spent: params.time_spent || 0,
      });

      if (error) throw error;

      toast({
        title: "Hasil Tersimpan",
        description: "Hasil ujian berhasil disimpan ke riwayat",
      });

      return true;
    } catch (error: any) {
      console.error("Error saving exam result:", error);
      toast({
        title: "Gagal Menyimpan",
        description: "Terjadi kesalahan saat menyimpan hasil ujian",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchResults();
  }, [examType]);

  return {
    results,
    loading,
    saveResult,
    refetch: fetchResults,
  };
};
