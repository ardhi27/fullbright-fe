import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface OrderData {
  order_id: string;
  package_type: string;
  package_level: string;
  status: string;
}

const OrderAuth = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [authStep, setAuthStep] = useState<"validating" | "authenticating" | "redirecting" | "error">("validating");

  useEffect(() => {
    if (!orderId) {
      setError("Order ID tidak ditemukan");
      setAuthStep("error");
      return;
    }

    processOrderAuth();
  }, [orderId]);

  const processOrderAuth = async () => {
    try {
      // Step 1: Check if already logged in with valid session
      setAuthStep("validating");
      
      const { data: { session } } = await supabase.auth.getSession();
      
      // Quick check - if already logged in, verify order and redirect
      if (session?.user) {
        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("order_id", orderId)
          .maybeSingle();

        if (order && order.status === "paid") {
          const sessionEmail = (session.user.email || "").toLowerCase();
          const orderEmail = (order.user_email || "").toLowerCase();

          if (sessionEmail === orderEmail) {
            // Already logged in with correct email
            setOrderData({
              order_id: order.order_id,
              package_type: order.package_type,
              package_level: order.package_level,
              status: order.status,
            });
            
            localStorage.setItem("user_package", `${order.package_type}_${order.package_level}`);
            setAuthStep("redirecting");

            toast({
              title: "Selamat datang kembali!",
              description: `Mengalihkan ke dashboard ${order.package_type}...`,
            });

            setTimeout(() => {
              redirectToDashboard(order.package_type);
            }, 1000);
            return;
          } else {
            // Logged in with different email, sign out first
            await supabase.auth.signOut();
          }
        }
      }

      // Step 2: Call edge function to handle auth
      setAuthStep("authenticating");

      const { data, error: fnError } = await supabase.functions.invoke("order-auth", {
        body: { orderId },
      });

      if (fnError) {
        throw new Error(fnError.message || "Gagal memproses autentikasi");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data?.success) {
        throw new Error("Respons tidak valid dari server");
      }

      // Step 3: Sign in with credentials from edge function
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        throw new Error("Gagal login: " + signInError.message);
      }

      // Step 4: Save package info and redirect
      setOrderData(data.order);
      localStorage.setItem("user_package", `${data.order.package_type}_${data.order.package_level}`);
      setAuthStep("redirecting");

      toast({
        title: "Login berhasil!",
        description: `Selamat datang! Mengalihkan ke dashboard...`,
      });

      setTimeout(() => {
        redirectToDashboard(data.order.package_type);
      }, 1000);

    } catch (err: any) {
      console.error("Order auth error:", err);
      setError(err.message);
      setAuthStep("error");
    }
  };

  const redirectToDashboard = (packageType: string) => {
    const type = packageType.toUpperCase();
    if (type.includes("TOEFL")) {
      navigate("/dashboard/toefl", { replace: true });
    } else {
      navigate("/dashboard/ielts", { replace: true });
    }
  };

  const getStepMessage = () => {
    switch (authStep) {
      case "validating":
        return "Memvalidasi Order ID...";
      case "authenticating":
        return "Memproses autentikasi...";
      case "redirecting":
        return `Mengalihkan ke dashboard...`;
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
                onClick={() => navigate("/auth")}
              >
                Coba Order ID Lain
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setError(null);
                  setAuthStep("validating");
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
            {authStep === "redirecting" ? "Berhasil!" : "Memproses Order ID"}
          </CardTitle>
          <CardDescription>
            {getStepMessage()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                authStep === "validating" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
              }`}>
                {authStep !== "validating" ? "✓" : "1"}
              </div>
              <span className={authStep !== "validating" ? "text-muted-foreground" : ""}>
                Validasi Order ID
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                authStep === "authenticating" ? "bg-primary text-primary-foreground" :
                authStep === "redirecting" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {authStep === "redirecting" ? "✓" : "2"}
              </div>
              <span className={authStep === "validating" ? "text-muted-foreground" : ""}>
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
