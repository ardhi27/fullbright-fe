/**
 * Profile Page
 * Halaman profil student untuk melihat dan mengelola akun
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft,
  User as UserIcon,
  Mail,
  Calendar,
  GraduationCap,
  Trophy,
  BookOpen,
  Shield,
  Edit2,
  LogOut,
  Settings,
  Bell,
  Globe,
  Clock,
  Monitor,
  Layers,
  CalendarDays,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.png";

// Mock stats data
const mockStats = {
  totalExams: 12,
  completedExams: 10,
  averageScore: 7.5,
  bestScore: 8.0,
  practicesCompleted: 45,
  studyHours: 120,
  currentStreak: 7,
  longestStreak: 14,
};

// Mock achievements
const achievements = [
  { id: 1, title: "First Exam", description: "Completed your first exam", icon: "🏆", unlocked: true },
  { id: 2, title: "Score 7+", description: "Achieved Band 7 or higher", icon: "⭐", unlocked: true },
  { id: 3, title: "Weekly Warrior", description: "7 day study streak", icon: "🔥", unlocked: true },
  { id: 4, title: "Practice Pro", description: "Complete 50 practice sessions", icon: "📚", unlocked: false },
  { id: 5, title: "Perfect Score", description: "Get 100% on any section", icon: "💯", unlocked: false },
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    targetExam: "IELTS Academic",
    targetScore: "7.5",
  });

  // Class registration data
  const [classData, setClassData] = useState({
    fullName: "",
    classType: "",
    classLevel: "",
    studySchedule: "",
    month: "",
    teacherName: "",
  });

  // Options for dropdowns
  const classTypes = ["IELTS", "TOEFL ITP", "TOEFL iBT", "General English"];
  const classLevels: Record<string, string[]> = {
    "IELTS": ["Starter", "Intermediate", "Advanced"],
    "TOEFL ITP": ["Starter", "Intermediate", "Advanced"],
    "TOEFL iBT": ["Starter", "Intermediate", "Advanced"],
    "General English": ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"],
  };
  const studySchedules: Record<string, string[]> = {
    "IELTS": ["Senin & Rabu (09:00 - 11:00)", "Selasa & Kamis (14:00 - 16:00)", "Sabtu (09:00 - 12:00)"],
    "TOEFL ITP": ["Senin & Rabu (14:00 - 16:00)", "Selasa & Kamis (09:00 - 11:00)", "Minggu (09:00 - 12:00)"],
    "TOEFL iBT": ["Senin & Rabu (16:00 - 18:00)", "Jumat (14:00 - 17:00)"],
    "General English": ["Senin - Jumat (09:00 - 10:30)", "Senin - Jumat (16:00 - 17:30)"],
  };
  const months = [
    "Januari 2025", "Februari 2025", "Maret 2025", "April 2025",
    "Mei 2025", "Juni 2025", "Juli 2025", "Agustus 2025",
    "September 2025", "Oktober 2025", "November 2025", "Desember 2025"
  ];
  const teachers = ["Mr. John Smith", "Ms. Sarah Johnson", "Mr. Ahmad Rizki", "Ms. Putri Lestari", "Mr. David Chen"];

  // Auth effect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        // Set profile data from user metadata
        setProfileData({
          firstName: session.user.user_metadata?.first_name || "",
          lastName: session.user.user_metadata?.last_name || "",
          phone: session.user.user_metadata?.phone || "",
          targetExam: session.user.user_metadata?.target_exam || "IELTS Academic",
          targetScore: session.user.user_metadata?.target_score || "7.5",
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          target_exam: profileData.targetExam,
          target_score: profileData.targetScore,
        }
      });
      
      if (!error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const userName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : user?.email?.split("@")[0] || "User";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
    : "Unknown";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-red-600 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">Fullbright Indonesia</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/30">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-white text-red-600 text-xs font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-white text-red-600 text-2xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{userName}</h1>
              <p className="text-white/80">{user?.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {profileData.targetExam}
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Trophy className="w-3 h-3 mr-1" />
                  Target: {profileData.targetScore}
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  Sejak {memberSince}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 mx-auto text-red-600 mb-2" />
                  <p className="text-2xl font-bold">{mockStats.totalExams}</p>
                  <p className="text-xs text-muted-foreground">Total Ujian</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 mx-auto text-amber-500 mb-2" />
                  <p className="text-2xl font-bold">{mockStats.averageScore}</p>
                  <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-6 h-6 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">{mockStats.practicesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Latihan Selesai</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">{mockStats.studyHours}h</p>
                  <p className="text-xs text-muted-foreground">Jam Belajar</p>
                </CardContent>
              </Card>
            </div>

            {/* Study Streak */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  🔥 Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-red-600">{mockStats.currentStreak} hari</p>
                    <p className="text-sm text-muted-foreground">Streak saat ini</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-muted-foreground">{mockStats.longestStreak} hari</p>
                    <p className="text-sm text-muted-foreground">Streak terpanjang</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`flex-1 h-2 rounded ${i < mockStats.currentStreak ? 'bg-red-600' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  🏅 Pencapaian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        achievement.unlocked 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-gray-100 border-gray-200 opacity-50'
                      }`}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <p className="font-medium text-sm mt-2">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Settings */}
          <div className="space-y-6">
            {/* Profile Info Card */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Informasi Profil
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    {isEditing ? 'Simpan' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Nama Depan</Label>
                  {isEditing ? (
                    <Input 
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(p => ({ ...p, firstName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{profileData.firstName || "-"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Nama Belakang</Label>
                  {isEditing ? (
                    <Input 
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(p => ({ ...p, lastName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{profileData.lastName || "-"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {user?.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">No. Telepon</Label>
                  {isEditing ? (
                    <Input 
                      value={profileData.phone}
                      onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+62 812 3456 7890"
                    />
                  ) : (
                    <p className="font-medium">{profileData.phone || "-"}</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Target Ujian</Label>
                  {isEditing ? (
                    <Input 
                      value={profileData.targetExam}
                      onChange={(e) => setProfileData(p => ({ ...p, targetExam: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{profileData.targetExam}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Target Skor</Label>
                  {isEditing ? (
                    <Input 
                      value={profileData.targetScore}
                      onChange={(e) => setProfileData(p => ({ ...p, targetScore: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{profileData.targetScore}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Class Registration Card */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Data Kelas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <UserIcon className="w-3 h-3" />
                    Nama Lengkap
                  </Label>
                  <Input
                    value={classData.fullName}
                    onChange={(e) => setClassData(p => ({ ...p, fullName: e.target.value }))}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Monitor className="w-3 h-3" />
                    Jenis Kelas
                  </Label>
                  <Select
                    value={classData.classType}
                    onValueChange={(value) => setClassData(p => ({ ...p, classType: value, classLevel: "", studySchedule: "" }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {classTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Layers className="w-3 h-3" />
                    Level Kelas
                  </Label>
                  <Select
                    value={classData.classLevel}
                    onValueChange={(value) => setClassData(p => ({ ...p, classLevel: value }))}
                    disabled={!classData.classType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={classData.classType ? "Pilih level kelas" : "Pilih jenis kelas terlebih dahulu"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(classLevels[classData.classType] || []).map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="w-3 h-3" />
                    Jadwal Belajar
                  </Label>
                  <Select
                    value={classData.studySchedule}
                    onValueChange={(value) => setClassData(p => ({ ...p, studySchedule: value }))}
                    disabled={!classData.classType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={classData.classType ? "Pilih jadwal belajar" : "Pilih jenis kelas terlebih dahulu"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(studySchedules[classData.classType] || []).map((schedule) => (
                        <SelectItem key={schedule} value={schedule}>{schedule}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Bulan
                  </Label>
                  <Select
                    value={classData.month}
                    onValueChange={(value) => setClassData(p => ({ ...p, month: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    Nama Pengajar
                  </Label>
                  <Select
                    value={classData.teacherName}
                    onValueChange={(value) => setClassData(p => ({ ...p, teacherName: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih nama pengajar" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setClassData({ fullName: "", classType: "", classLevel: "", studySchedule: "", month: "", teacherName: "" })}
                  >
                    Batal
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={!classData.fullName || !classData.classType || !classData.classLevel || !classData.studySchedule || !classData.month || !classData.teacherName}
                  >
                    Mulai Ujian →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Notifikasi</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Bahasa & Regional</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Keamanan Akun</span>
                </button>
                <Separator />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
