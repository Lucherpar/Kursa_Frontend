import { useQuery } from "@tanstack/react-query";
import { getApiList } from "../lib/utils";

export default function DashboardPage() {
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

  if (isLoading) {
    return (
      <div className="text-zinc-300 flex items-center justify-center font-mono text-sm py-12">
        <span>cargando...</span>
      </div>
    );
  }

  const courseList = Array.isArray(courses) ? courses : [];

  return (
    <div className="text-zinc-100 font-sans space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-400">cursos disponibles</h2>
        <span className="text-xs font-mono text-zinc-600">{courseList.length} total</span>
      </div>

      {courseList.length === 0 ? (
        <div className="border border-zinc-800/60 rounded-xl p-8 text-center bg-[#1a1a1e]/40">
          <p className="text-sm text-zinc-500 font-mono">no hay cursos por aquí todavía</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {courseList.map((course: any) => (
            <div
              key={course.id}
              className="bg-[#1a1a1e] border border-zinc-800/60 hover:border-zinc-700/80 rounded-xl p-5 transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-1.5">
                <h3 className="font-medium text-zinc-200 text-base">{course.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {course.description || "sin descripción"}
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800/40 flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>activo</span>
                <span className="text-zinc-300 hover:text-white cursor-pointer transition-colors">
                  entrar &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
