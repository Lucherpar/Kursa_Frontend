import { useAuth } from "../store/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiList } from "../lib/utils";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const payload = await res.json();
      return getApiList<any>(payload);
    },
  });

  const handleLogout = () => {
    logout();
    queryClient.clear();
  };

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <button onClick={handleLogout} className="text-sm text-destructive hover:underline">
            Cerrar sesión
          </button>
        </div>
      </div>
      <h2 className="text-lg font-semibold">Cursos disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course: any) => (
          <div key={course.id} className="border border-border rounded-xl p-4 bg-card">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.description || "Sin descripción"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
