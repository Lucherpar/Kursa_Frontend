import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LessonCard } from "../components/common/common";

export default function SubjectPage() {
  const { subjectId } = useParams();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons", subjectId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/subjects/${subjectId}/lessons`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      return res.json();
    },
  });

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lecciones</h1>
      <div className="space-y-2">
        {lessons.map((lesson: any) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
