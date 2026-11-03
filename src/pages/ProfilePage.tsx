import { useAuth } from "../store/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Perfil</h1>
      <div className="bg-card border border-border rounded-lg p-6">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> {user?.role}</p>
      </div>
    </div>
  );
}
