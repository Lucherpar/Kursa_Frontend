import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DropzoneZone } from "../components/common/common";

export default function AssignmentPage() {
  const { assignmentId } = useParams();
  const queryClient = useQueryClient();

  const { data: assignment } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/assignments/${assignmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      return res.json();
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        body: formData,
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["assignment", assignmentId] }),
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{assignment?.title || "Tarea"}</h1>
      {assignment?.description && <p>{assignment.description}</p>}
      <div className="bg-card border border-border rounded-lg p-6">
        <DropzoneZone onFilesAdded={(files) => submitMutation.mutate(files)} />
        {submitMutation.isPending && <p className="mt-2 text-sm">Enviando...</p>}
      </div>
    </div>
  );
}
