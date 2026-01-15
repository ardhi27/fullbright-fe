/**
 * BiodataForm Component - Fullbright Theme
 * Form biodata yang harus diisi sebelum masuk ujian Final
 * 
 * Fields:
 * - Nama Lengkap (Input)
 * - Jenis Kelas (Dropdown: Online / Offline)
 * - Level Kelas (Dropdown - dependent on Jenis Kelas)
 *   - Online: Starter, Intermediate, Advance
 *   - Offline: Intermediate, Advance (hanya 2 level)
 * - Jadwal Belajar (Dropdown - dependent on Jenis Kelas)
 * - Bulan (Dropdown)
 * - Nama Pengajar (Dropdown)
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  GraduationCap, 
  Calendar, 
  Users,
  ArrowRight,
  AlertCircle,
  Monitor,
  MapPin,
  BookOpen,
  CalendarDays
} from "lucide-react";

// Jenis Kelas Options
const JENIS_KELAS_OPTIONS = [
  { value: "online", label: "Online Class" },
  { value: "offline", label: "Offline Class" },
];

// Level Kelas - Online (3 levels)
const LEVEL_ONLINE_OPTIONS = [
  { value: "starter", label: "Starter" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advance", label: "Advance" },
];

// Level Kelas - Offline (hanya 2 levels)
const LEVEL_OFFLINE_OPTIONS = [
  { value: "intermediate", label: "Intermediate" },
  { value: "advance", label: "Advance" },
];

// Jadwal - Online Class
const JADWAL_ONLINE_OPTIONS = [
  { value: "09.00-10.00-pagi", label: "09.00 - 10.00 WIB (Pagi)" },
  { value: "13.00-14.00-siang", label: "13.00 - 14.00 WIB (Siang)" },
  { value: "16.00-17.00-sore", label: "16.00 - 17.00 WIB (Sore)" },
  { value: "18.45-19.45-malam", label: "18.45 - 19.45 WIB (Malam)" },
  { value: "20.00-21.00-malam", label: "20.00 - 21.00 WIB (Malam)" },
];

// Jadwal - Offline Class
const JADWAL_OFFLINE_OPTIONS = [
  { value: "10.00-11.30-pagi", label: "10.00 - 11.30 WIB (Pagi)" },
  { value: "14.00-15.30-siang", label: "14.00 - 15.30 WIB (Siang)" },
  { value: "17.00-18.30-sore", label: "17.00 - 18.30 WIB (Sore)" },
  { value: "19.00-20.30-malam", label: "19.00 - 20.30 WIB (Malam)" },
];

// Bulan Options
const BULAN_OPTIONS = [
  { value: "januari", label: "Januari" },
  { value: "februari", label: "Februari" },
  { value: "maret", label: "Maret" },
  { value: "april", label: "April" },
  { value: "mei", label: "Mei" },
  { value: "juni", label: "Juni" },
  { value: "juli", label: "Juli" },
  { value: "agustus", label: "Agustus" },
  { value: "september", label: "September" },
  { value: "oktober", label: "Oktober" },
  { value: "november", label: "November" },
  { value: "desember", label: "Desember" },
];

// Daftar Pengajar
const PENGAJAR_OPTIONS = [
  { value: "mr-rifqi", label: "Mr. Rifqi" },
  { value: "mr-abduh", label: "Mr. Abduh" },
  { value: "mr-aslam", label: "Mr. Aslam" },
  { value: "mr-ahmad-mukhlis", label: "Mr. Ahmad Mukhlis" },
  { value: "mr-rum", label: "Mr. Rum" },
  { value: "mr-arlan", label: "Mr. Arlan" },
  { value: "mr-ahkam", label: "Mr. Ahkam" },
  { value: "ms-leli", label: "Ms. Leli" },
  { value: "ms-nana", label: "Ms. Nana" },
  { value: "ms-anggi", label: "Ms. Anggi" },
];

export interface BiodataFormData {
  nama: string;
  jenisKelas: string;
  levelKelas: string;
  jadwalBelajar: string;
  bulan: string;
  namaPengajar: string;
}

interface BiodataFormProps {
  examType: "ielts" | "toefl";
  onSubmit: (data: BiodataFormData) => void;
  onCancel: () => void;
}

const BiodataForm = ({ examType, onSubmit, onCancel }: BiodataFormProps) => {
  const [formData, setFormData] = useState<BiodataFormData>({
    nama: "",
    jenisKelas: "",
    levelKelas: "",
    jadwalBelajar: "",
    bulan: "",
    namaPengajar: "",
  });
  const [errors, setErrors] = useState<Partial<BiodataFormData>>({});

  // Reset level dan jadwal when jenis kelas changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      levelKelas: "",
      jadwalBelajar: "",
    }));
  }, [formData.jenisKelas]);

  // Get current level options based on jenis kelas
  const getLevelOptions = () => {
    if (formData.jenisKelas === "online") {
      return LEVEL_ONLINE_OPTIONS;
    } else if (formData.jenisKelas === "offline") {
      return LEVEL_OFFLINE_OPTIONS;
    }
    return [];
  };

  // Get current jadwal options based on jenis kelas
  const getJadwalOptions = () => {
    if (formData.jenisKelas === "online") {
      return JADWAL_ONLINE_OPTIONS;
    } else if (formData.jenisKelas === "offline") {
      return JADWAL_OFFLINE_OPTIONS;
    }
    return [];
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BiodataFormData> = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    }
    if (!formData.jenisKelas) {
      newErrors.jenisKelas = "Jenis kelas wajib dipilih";
    }
    if (!formData.levelKelas) {
      newErrors.levelKelas = "Level kelas wajib dipilih";
    }
    if (!formData.jadwalBelajar) {
      newErrors.jadwalBelajar = "Jadwal belajar wajib dipilih";
    }
    if (!formData.bulan) {
      newErrors.bulan = "Bulan wajib dipilih";
    }
    if (!formData.namaPengajar) {
      newErrors.namaPengajar = "Nama pengajar wajib dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("exam_biodata", JSON.stringify(formData));
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-500/[0.03] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg animate-fade-up">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Data Peserta Ujian</h1>
                <p className="text-sm text-white/80">
                  {examType.toUpperCase()} Final Exam
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 mt-3">
              Lengkapi data berikut sebelum memulai ujian final. Data ini digunakan untuk tracking performa pengajar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-gray-500" />
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className={errors.nama ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.nama && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.nama}
                </p>
              )}
            </div>

            {/* Jenis Kelas */}
            <div className="space-y-2">
              <Label htmlFor="jenisKelas" className="flex items-center gap-2 text-sm font-medium">
                {formData.jenisKelas === "offline" ? (
                  <MapPin className="w-4 h-4 text-gray-500" />
                ) : (
                  <Monitor className="w-4 h-4 text-gray-500" />
                )}
                Jenis Kelas
              </Label>
              <Select
                value={formData.jenisKelas}
                onValueChange={(value) => setFormData({ ...formData, jenisKelas: value })}
              >
                <SelectTrigger className={errors.jenisKelas ? "border-red-500" : ""}>
                  <SelectValue placeholder="Pilih jenis kelas" />
                </SelectTrigger>
                <SelectContent>
                  {JENIS_KELAS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        {option.value === "online" ? (
                          <Monitor className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.jenisKelas && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.jenisKelas}
                </p>
              )}
            </div>

            {/* Level Kelas */}
            <div className="space-y-2">
              <Label htmlFor="levelKelas" className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="w-4 h-4 text-gray-500" />
                Level Kelas
                {formData.jenisKelas === "offline" && (
                  <span className="text-xs text-muted-foreground">(2 level tersedia)</span>
                )}
              </Label>
              <Select
                value={formData.levelKelas}
                onValueChange={(value) => setFormData({ ...formData, levelKelas: value })}
                disabled={!formData.jenisKelas}
              >
                <SelectTrigger className={errors.levelKelas ? "border-red-500" : ""}>
                  <SelectValue placeholder={formData.jenisKelas ? "Pilih level kelas" : "Pilih jenis kelas terlebih dahulu"} />
                </SelectTrigger>
                <SelectContent>
                  {getLevelOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.levelKelas && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.levelKelas}
                </p>
              )}
            </div>

            {/* Jadwal Belajar */}
            <div className="space-y-2">
              <Label htmlFor="jadwalBelajar" className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-gray-500" />
                Jadwal Belajar
              </Label>
              <Select
                value={formData.jadwalBelajar}
                onValueChange={(value) => setFormData({ ...formData, jadwalBelajar: value })}
                disabled={!formData.jenisKelas}
              >
                <SelectTrigger className={errors.jadwalBelajar ? "border-red-500" : ""}>
                  <SelectValue placeholder={formData.jenisKelas ? "Pilih jadwal belajar" : "Pilih jenis kelas terlebih dahulu"} />
                </SelectTrigger>
                <SelectContent>
                  {getJadwalOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.jadwalBelajar && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.jadwalBelajar}
                </p>
              )}
            </div>

            {/* Bulan */}
            <div className="space-y-2">
              <Label htmlFor="bulan" className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Bulan
              </Label>
              <Select
                value={formData.bulan}
                onValueChange={(value) => setFormData({ ...formData, bulan: value })}
              >
                <SelectTrigger className={errors.bulan ? "border-red-500" : ""}>
                  <SelectValue placeholder="Pilih bulan" />
                </SelectTrigger>
                <SelectContent>
                  {BULAN_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bulan && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.bulan}
                </p>
              )}
            </div>

            {/* Nama Pengajar */}
            <div className="space-y-2">
              <Label htmlFor="pengajar" className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-gray-500" />
                Nama Pengajar
              </Label>
              <Select
                value={formData.namaPengajar}
                onValueChange={(value) => setFormData({ ...formData, namaPengajar: value })}
              >
                <SelectTrigger className={errors.namaPengajar ? "border-red-500" : ""}>
                  <SelectValue placeholder="Pilih nama pengajar" />
                </SelectTrigger>
                <SelectContent>
                  {PENGAJAR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.namaPengajar && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.namaPengajar}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 hover:bg-gray-50"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Mulai Ujian
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Data ini akan disimpan untuk keperluan evaluasi dan tidak akan dibagikan ke pihak lain.
        </p>
      </div>
    </div>
  );
};

export default BiodataForm;
