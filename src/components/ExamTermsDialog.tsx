import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, ShieldCheck, Eye, Clock, Ban, Smartphone } from "lucide-react";

interface ExamTermsDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  examType: "TOEFL" | "IELTS";
}

const examRules = [
  {
    icon: Ban,
    title: "Dilarang Menyontek",
    description: "Tidak boleh membuka buku, catatan, atau materi referensi apapun selama ujian berlangsung.",
  },
  {
    icon: Smartphone,
    title: "Matikan Perangkat Lain",
    description: "Matikan atau letakkan ponsel dan perangkat elektronik lainnya jauh dari jangkauan.",
  },
  {
    icon: Eye,
    title: "Tetap Fokus pada Layar",
    description: "Jangan membuka tab atau aplikasi lain. Aktivitas Anda akan dipantau.",
  },
  {
    icon: Clock,
    title: "Waktu Terbatas",
    description: "Ujian harus diselesaikan dalam waktu yang ditentukan. Tidak ada tambahan waktu.",
  },
];

export function ExamTermsDialog({ isOpen, onAccept, onDecline, examType }: ExamTermsDialogProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-up">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-br from-red-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ketentuan Ujian {examType}</h2>
              <p className="text-sm text-muted-foreground">Baca dan setujui sebelum memulai</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Banner */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-700">Peringatan Integritas Akademik</p>
              <p className="text-sm text-amber-600">
                Pelanggaran terhadap ketentuan ujian dapat mengakibatkan pembatalan hasil dan sanksi akademik.
              </p>
            </div>
          </div>

          {/* Rules List */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Ketentuan yang Harus Dipatuhi:
            </h3>
            {examRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0">
                  <rule.icon className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{rule.title}</p>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200 mb-6">
            <Checkbox
              id="agree-terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="agree-terms" className="text-sm cursor-pointer">
              Saya telah membaca, memahami, dan setuju untuk mematuhi semua ketentuan ujian. 
              Saya berjanji untuk menjaga integritas akademik selama ujian berlangsung.
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1 hover:bg-gray-100"
            >
              Batal
            </Button>
            <Button
              onClick={onAccept}
              disabled={!agreedToTerms}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              Setuju & Mulai Ujian
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
