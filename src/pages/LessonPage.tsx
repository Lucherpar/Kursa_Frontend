import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TextContent, ImageGallery, VideoPlayer } from "../components/content/content";
import { getApiData } from "../lib/utils";

export default function LessonPage() {
  const { lessonId } = useParams();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const payload = await res.json();
      return getApiData<any>(payload);
    },
  });

  if (isLoading) return <div className="p-8">Cargando...</div>;
  if (!lesson) return <div className="p-8">Lección no encontrada</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <div className="bg-card border border-border rounded-lg p-6">
        {lesson.contentType === "text" && <TextContent value={lesson.contentUrl || ""} />}
        {lesson.contentType === "image" && <ImageGallery images={[lesson.contentUrl || ""]} />}
        {lesson.contentType === "video" && <VideoPlayer src={lesson.contentUrl || ""} />}
      </div>
    </div>
  );
}
