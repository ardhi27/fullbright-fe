/**
 * DashboardHeader
 * Header navigasi dengan logo, tombol kembali, dan logout
 *
 * @param onBack - Callback saat tombol kembali diklik
 * @param onLogout - Callback saat tombol logout diklik
 * @param backLabel - Label tombol kembali (default: "Kembali")
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

interface DashboardHeaderProps {
  onBack: () => void;
  onLogout: () => void;
  backLabel?: string;
}

const DashboardHeader = ({ onBack, onLogout, backLabel = "Kembali" }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
            <img src={logo} alt="Fullbright Indonesia" className="h-6" />
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
