import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "./auth.schema";

describe("schemas de autenticación", () => {
  it("loginSchema acepta email y contraseña", () => {
    expect(loginSchema.parse({ email: "a@b.com", password: "x" })).toEqual({
      email: "a@b.com",
      password: "x",
    });
  });

  it("loginSchema rechaza emails inválidos", () => {
    expect(() => loginSchema.parse({ email: "no", password: "x" })).toThrow();
  });

  it("registerSchema aplica el rol estudiante por defecto", () => {
    expect(registerSchema.parse({ email: "a@b.com", password: "123456" }).role).toBe("estudiante");
  });

  it("registerSchema rechaza contraseñas cortas", () => {
    expect(() => registerSchema.parse({ email: "a@b.com", password: "123" })).toThrow();
  });
});
