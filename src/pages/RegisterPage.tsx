import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/AuthContext";
import { useRegister } from "../hooks/useAuthForms";
import { api } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type RegisterFormData = {
  email: string;
  password: string;
  role: "admin" | "profesor" | "estudiante";
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message;
  }
  return undefined;
};

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { schema, defaultValues } = useRegister();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await api.post("/auth/register", data);

      const loginResponse = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      const payload = loginResponse.data?.data as {
        user: { id: number; email: string; role: "admin" | "profesor" | "estudiante" };
        accessToken: string;
        refreshToken: string;
      };

      login(payload.accessToken, payload.refreshToken, payload.user);
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      setServerError(getErrorMessage(error) ?? "No se pudo crear la cuenta. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                disabled={isSubmitting}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
                {...register("role")}
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="font-medium text-primary hover:underline">
              Iniciar sesión
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}