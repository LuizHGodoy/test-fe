"use client";

import { usePathname } from "next/navigation";
import SidebarNavigation from "./sidebar-navigation";
import { Toaster } from "./ui/toaster";

export const RootLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isLoginPage = pathname.includes("/auth");
  return (
    <div className="flex h-screen bg-gray-100">
      {!isLoginPage && <SidebarNavigation />}
      <div className={`flex-1 p-${isLoginPage ? 0 : 8}`}>{children}</div>
      <Toaster />
    </div>
  );
};
