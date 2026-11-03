import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export const Sidebar = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <aside className={cn("fixed left-0 top-0 h-full w-64 border-r border-border bg-background z-50 transform transition-transform duration-300 md:relative md:translate-x-0", className)}>{children}</aside>
  );
};

export const Navbar = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <nav className={cn("sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur", className)}>{children}</nav>
  );
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
