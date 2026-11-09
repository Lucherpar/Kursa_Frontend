import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApiList } from "../lib/utils";

export default function RecordingsPage() {
  const { subjectId } = useParams();

  const { data: recordings = [], isLoading } = useQuery({
    queryKey: ["recordings", subjectId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/subjects/${subjectId}/recordings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const payload = await res.json();
      return getApiList<any>(payload);
    },
  });

  if (isLoading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clases grabadas</h1>
      <div className="space-y-2">
        {recordings.map((r: any) => (
          <div key={r.id} className="border border-border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{r.recordedAt}</p>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ver grabación</a>
          </div>
        ))}
      </div>
    </div>
  );
}
