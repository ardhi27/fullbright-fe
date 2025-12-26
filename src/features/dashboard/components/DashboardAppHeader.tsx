/**
 * DashboardAppHeader Component
 * Header aplikasi untuk halaman dashboard
 */

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo-wordmark.png";

interface DashboardAppHeaderProps {
  userEmail?: string;
  onLogout: () => void;
}

const DashboardAppHeader = ({ userEmail, onLogout }: DashboardAppHeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <img src={logo} alt="Fullbright Indonesia" className="h-10" />
          <div className="flex items-center gap-4">
            {userEmail && (
              <span className="text-sm text-muted-foreground hidden sm:block">
                {userEmail}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardAppHeader;
