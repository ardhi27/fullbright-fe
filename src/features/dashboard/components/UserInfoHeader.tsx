/**
 * UserInfoHeader
 * Header info user dengan gradient background
 *
 * @param userInitials - Inisial nama user (2 huruf)
 * @param userName - Nama lengkap user
 * @param subtitle - Teks subtitle di bawah nama
 * @param rightContent - Konten di sisi kanan (opsional)
 */

import { ReactNode } from "react";

interface UserInfoHeaderProps {
  userInitials: string;
  userName: string;
  subtitle: string;
  rightContent?: ReactNode;
}

const UserInfoHeader = ({
  userInitials,
  userName,
  subtitle,
  rightContent,
}: UserInfoHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xl font-bold text-primary-foreground">
            {userInitials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-foreground">{userName}</h1>
            <p className="text-primary-foreground/80">{subtitle}</p>
          </div>
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default UserInfoHeader;
