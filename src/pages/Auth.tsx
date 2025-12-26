import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(() => searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for existing session or token-based auto-login
  useEffect(() => {
    const token = searchParams.get("token");
    const packageType = searchParams.get("package") || "IELTS_STARTER";

    const checkAuth = async () => {
      // Check existing session first
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const savedPackage = localStorage.getItem("user_package") || packageType;
        redirectBasedOnPackage(savedPackage);
        return;
      }

      // If token provided, try auto-login
      if (token) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: token,
          });

          if (!error && data.session) {
            localStorage.setItem("user_package", packageType);
            toast({ title: "Login berhasil!", description: "Selamat datang." });
            redirectBasedOnPackage(packageType);
            return;
          }
        } catch (error) {
          console.error("Auto login error:", error);
        }
      }

      setCheckingSession(false);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const savedPackage = localStorage.getItem("user_package") || packageType;
          redirectBasedOnPackage(savedPackage);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [searchParams, navigate]);

  const redirectBasedOnPackage = (packageType: string) => {
    const pkg = packageType.toUpperCase();
    if (pkg.includes("TOEFL")) {
      navigate("/dashboard/toefl");
    } else {
      navigate("/dashboard/ielts");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const packageType = searchParams.get("package") || localStorage.getItem("user_package") || "IELTS_STARTER";

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        localStorage.setItem("user_package", packageType);
        toast({ title: "Login berhasil!", description: "Selamat datang kembali." });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth?package=${packageType}`,
          },
        });
        if (error) throw error;
        
        localStorage.setItem("user_package", packageType);
        toast({ 
          title: "Registrasi berhasil!", 
          description: "Silakan cek email Anda untuk verifikasi atau login langsung." 
        });
      }
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes("User already registered")) {
        message = "Email sudah terdaftar. Silakan login.";
      } else if (error.message.includes("Invalid login credentials")) {
        message = "Email atau password salah.";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Email belum dikonfirmasi. Silakan cek email Anda.";
      }
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <img src={logo} alt="Fullbright Indonesia" className="h-16 mx-auto" />
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Fullbright Indonesia" className="h-16 mx-auto mb-4" />
          <CardTitle className="text-2xl">
            {isLogin ? "Masuk" : "Daftar"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Masuk ke akun Anda untuk melanjutkan" 
              : "Buat akun baru untuk memulai"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLogin ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
            </span>{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
