import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import type { Role } from "../../store/AuthContext";
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

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
