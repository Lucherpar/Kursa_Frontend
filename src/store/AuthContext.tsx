import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../lib/api";

export type Role = "admin" | "profesor" | "estudiante";

export interface User {
  id: number;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const clearStoredSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    const init = async () => {
      if (!storedToken) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        const me = response.data?.data ?? response.data;
        if (cancelled) return;
        const currentToken = localStorage.getItem("accessToken") || storedToken;
        setToken(currentToken);
        setUser(me as User);
        localStorage.setItem("user", JSON.stringify(me));
      } catch {
        if (cancelled) return;
        clearStoredSession();
        setToken(null);
        setUser(null);
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Avoid blocking render when there is no token.
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        clearStoredSession();
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken) {
      // Best-effort backend notification; do not block local cleanup.
      api.post("/auth/logout").catch(() => undefined);
    }
    clearStoredSession();
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token && !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
