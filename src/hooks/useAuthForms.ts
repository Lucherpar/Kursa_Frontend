import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from "../schemas/auth.schema";

export const useLogin = () => {
  return { schema: loginSchema, defaultValues: { email: "", password: "" } as LoginFormData };
};

export const useRegister = () => {
  return { schema: registerSchema, defaultValues: { email: "", password: "", role: "estudiante" } as RegisterFormData };
};
