/**
 * DashboardAppHeader Component - Fullbright Theme
 * Header aplikasi dengan branding Fullbright (Putih-Hitam-Merah)
 */

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo-wordmark.png";
import { Link } from "react-router-dom";

interface DashboardAppHeaderProps {
  userEmail?: string;
  onLogout: () => void;
}

const DashboardAppHeader = ({ userEmail, onLogout }: DashboardAppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 py-2 sm:py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Fullbright Indonesia" 
              className="h-8 sm:h-10 transition-transform hover:scale-105" 
            />
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {userEmail && (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/profile">
                  <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center shadow-md hover:ring-2 hover:ring-red-400 hover:scale-105 transition-all cursor-pointer">
                    <span className="text-sm font-bold text-white uppercase">
                      {userEmail.charAt(0)}
                    </span>
                  </div>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {userEmail.split('@')[0]}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {userEmail}
                  </span>
                </div>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardAppHeader;
