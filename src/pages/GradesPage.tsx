import { useQuery } from "@tanstack/react-query";

export default function GradesPage() {
  const { data: grades = [], isLoading } = useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/grades`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      return res.json();
    },
  });

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Calificaciones</h1>
      <table className="w-full border-collapse border border-border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Tarea</th>
            <th className="p-2 text-left">Calificación</th>
            <th className="p-2 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g: any) => (
            <tr key={g.id} className="border-b">
              <td className="p-2">{g.assignmentTitle || "Tarea"}</td>
              <td className="p-2">{g.grade}</td>
              <td className="p-2 text-muted-foreground">{g.submittedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
