import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { cn } from "../../lib/utils";
import { queryClient } from "../../lib/queryClient";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  User,
  X,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const baseItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Perfil", icon: User },
  { to: "/grades", label: "Notas", icon: GraduationCap },
];

const roleItems: Record<string, NavItem[]> = {
  admin: [{ to: "/admin", label: "Administración", icon: Shield }],
  profesor: [{ to: "/profesor", label: "Profesor", icon: BookOpen }],
  estudiante: [{ to: "/estudiante", label: "Estudiante", icon: BookOpen }],
};

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Perfil",
  "/grades": "Notas",
  "/admin": "Administración",
  "/profesor": "Profesor",
  "/estudiante": "Estudiante",
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = [...baseItems, ...(roleItems[user?.role ?? ""] ?? [])];

  const handleLogout = () => {
    queryClient.clear();
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="text-lg font-semibold">Kursa</span>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegación principal" className="flex flex-col gap-1 p-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="sidebar"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-semibold">{titles[location.pathname] ?? "Kursa"}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
              {user?.role}
            </span>
          </div>
        </header>

        <main id="main-content" className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
