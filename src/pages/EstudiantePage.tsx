import { useAuth } from "../store/AuthContext";

export default function EstudiantePage() {
  const { user } = useAuth();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Panel de estudiante</h1>
      <p className="text-sm text-muted-foreground">Usuario: {user?.email} ({user?.role})</p>
    </div>
  );
}
