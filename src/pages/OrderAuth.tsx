import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface OrderData {
  id: string;
  order_id: string;
  user_email: string;
  package_type: string;
  package_level: string;
  status: string;
}

const OrderAuth = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [authStep, setAuthStep] = useState<"fetching" | "authenticating" | "redirecting" | "error">("fetching");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID tidak ditemukan");
      setAuthStep("error");
      setLoading(false);
      return;
    }

    processOrderAuth();
  }, [orderId]);

  const processOrderAuth = async () => {
    try {
      // Step 1: Fetch order data
      setAuthStep("fetching");
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_id", orderId)
        .maybeSingle();

      if (orderError) {
        throw new Error("Gagal mengambil data order: " + orderError.message);
      }

      if (!order) {
        throw new Error("Order tidak ditemukan. Pastikan Order ID benar.");
      }

      if (order.status !== "paid") {
        throw new Error(`Order belum dibayar. Status: ${order.status}`);
      }

      setOrderData(order);

      // Step 2: Check if user already logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User already logged in, just redirect
        localStorage.setItem("user_package", `${order.package_type}_${order.package_level}`);
        setAuthStep("redirecting");
        
        toast({
          title: "Selamat datang kembali!",
          description: `Mengalihkan ke dashboard ${order.package_type}...`,
        });

        setTimeout(() => {
          redirectToDashboard(order.package_type);
        }, 1500);
        return;
      }

      // Step 3: Auto-login user using their email
      setAuthStep("authenticating");
      
      // Try to sign in with a generated password based on order
      const generatedPassword = `order_${order.order_id}_${order.user_email.split('@')[0]}`;
      
      // First try to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: order.user_email,
        password: generatedPassword,
      });

      if (signInError) {
        // If sign in fails, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email: order.user_email,
          password: generatedPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard/auth/${orderId}`,
          },
        });

        if (signUpError && !signUpError.message.includes("User already registered")) {
          throw new Error("Gagal membuat akun: " + signUpError.message);
        }

        // Try sign in again after signup
        const { error: retrySignInError } = await supabase.auth.signInWithPassword({
          email: order.user_email,
          password: generatedPassword,
        });

        if (retrySignInError) {
          throw new Error("Gagal login otomatis. Silakan hubungi customer service.");
        }
      }

      // Step 4: Save package info and redirect
      localStorage.setItem("user_package", `${order.package_type}_${order.package_level}`);
      setAuthStep("redirecting");

      toast({
        title: "Login berhasil!",
        description: `Selamat datang! Mengalihkan ke dashboard ${order.package_type}...`,
      });

      setTimeout(() => {
        redirectToDashboard(order.package_type);
      }, 1500);

    } catch (err: any) {
      console.error("Order auth error:", err);
      setError(err.message);
      setAuthStep("error");
      setLoading(false);
    }
  };

  const redirectToDashboard = (packageType: string) => {
    const type = packageType.toUpperCase();
    if (type.includes("TOEFL")) {
      navigate("/dashboard/toefl");
    } else {
      navigate("/dashboard/ielts");
    }
  };

  const getStepMessage = () => {
    switch (authStep) {
      case "fetching":
        return "Memvalidasi token order...";
      case "authenticating":
        return "Memproses autentikasi...";
      case "redirecting":
        return `Mengalihkan ke dashboard ${orderData?.package_type || ""}...`;
      case "error":
        return "Terjadi kesalahan";
      default:
        return "Memproses...";
    }
  };

  if (authStep === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={logo} alt="Fullbright Indonesia" className="h-16 mx-auto mb-4" />
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-xl text-destructive">Autentikasi Gagal</CardTitle>
            <CardDescription className="text-destructive/80">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Order ID: <code className="bg-muted px-2 py-1 rounded">{orderId}</code>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Kembali ke Home
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setAuthStep("fetching");
                  processOrderAuth();
                }}
              >
                Coba Lagi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Fullbright Indonesia" className="h-16 mx-auto mb-4" />
          {authStep === "redirecting" ? (
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          ) : (
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          )}
          <CardTitle className="text-xl">
            {authStep === "redirecting" ? "Berhasil!" : "Token sedang divalidasi"}
          </CardTitle>
          <CardDescription>
            {getStepMessage()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                authStep === "fetching" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
              }`}>
                {authStep !== "fetching" ? "✓" : "1"}
              </div>
              <span className={authStep !== "fetching" ? "text-muted-foreground" : ""}>
                Mengambil data order
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                authStep === "authenticating" ? "bg-primary text-primary-foreground" :
                authStep === "redirecting" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {authStep === "redirecting" ? "✓" : "2"}
              </div>
              <span className={authStep === "fetching" ? "text-muted-foreground" : ""}>
                Autentikasi pengguna
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                authStep === "redirecting" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                3
              </div>
              <span className={authStep !== "redirecting" ? "text-muted-foreground" : ""}>
                Redirect ke dashboard
              </span>
            </div>
          </div>

          {orderData && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{orderData.user_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paket:</span>
                <span className="font-medium">{orderData.package_type} - {orderData.package_level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-primary capitalize">{orderData.status}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAuth;