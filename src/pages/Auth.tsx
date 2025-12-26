import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, KeyRound } from "lucide-react";
import logo from "@/assets/logo.png";

const Auth = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    // Redirect to order auth page
    navigate(`/dashboard/auth/${orderId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Fullbright Indonesia" className="h-16 mx-auto mb-4" />
          <CardTitle className="text-2xl">Masuk dengan Order ID</CardTitle>
          <CardDescription>
            Masukkan Order ID yang Anda terima setelah pembelian paket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="orderId"
                  type="text"
                  placeholder="ORDER-IELTS-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  className="pl-10 uppercase"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !orderId.trim()}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Belum punya Order ID?</p>
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => navigate("/")}
            >
              Lihat paket tersedia
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
