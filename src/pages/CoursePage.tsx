import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CoursePage() {
  const { courseId } = useParams();

  const { data: subjects = [], isLoading } = useQuery({
    queryKey: ["subjects", courseId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/courses/${courseId}/subjects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      return res.json();
    },
  });

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Asignaturas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject: any) => (
          <div key={subject.id} className="border border-border rounded-xl p-4 bg-card">
            <h3 className="font-semibold">{subject.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
