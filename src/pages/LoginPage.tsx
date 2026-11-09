import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/AuthContext";
import { useLogin } from "../hooks/useAuthForms";
import { api } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type LoginFormData = {
  email: string;
  password: string;
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message;
  }
  return undefined;
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { schema, defaultValues } = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const response = await api.post("/auth/login", data);
      const payload = response.data?.data as {
        user: { id: number; email: string; role: "admin" | "profesor" | "estudiante" };
        accessToken: string;
        refreshToken: string;
      };

      login(payload.accessToken, payload.refreshToken, payload.user);
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      setServerError(getErrorMessage(error) ?? "No se pudo iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
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
                autoComplete="current-password"
                disabled={isSubmitting}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="font-medium text-primary hover:underline">
              Regístrate
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}