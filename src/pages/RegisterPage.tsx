import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const role = formData.get("role") as "admin" | "profesor" | "estudiante";

    login("dummy-token", "dummy-refresh", { id: 1, email, role });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 p-8 border border-border rounded-xl bg-card">
        <h2 className="text-2xl font-bold">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input type="email" name="email" required className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input type="password" name="password" required className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select name="role" className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary">
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Crear cuenta
          </button>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
