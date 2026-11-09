import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "./LoginPage";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../lib/api", () => ({
  api: { post: vi.fn(), get: vi.fn() },
}));

vi.mock("../store/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    token: null,
    loading: false,
    login: mockLogin,
    logout: vi.fn(),
    isAuthenticated: false,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("LoginPage", () => {
  beforeEach(async () => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
    const { api } = await import("../lib/api");
    (api.post as any).mockReset();
  });

  it("inicia sesión con credenciales reales", async () => {
    const { api } = await import("../lib/api");
    (api.post as any).mockResolvedValue({
      data: { data: { accessToken: "access", refreshToken: "refresh", user: { id: 1, email: "a@b.com", role: "estudiante" } } },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/correo electrónico/i), "a@b.com");
    await user.type(screen.getByLabelText(/contraseña/i), "secret");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/auth/login", { email: "a@b.com", password: "secret" });
      expect(mockLogin).toHaveBeenCalledWith("access", "refresh", expect.objectContaining({ email: "a@b.com" }));
    });
  });

  it("muestra error 401 del backend", async () => {
    const { api } = await import("../lib/api");
    (api.post as any).mockRejectedValue({
      response: { status: 401, data: { message: "Credenciales inválidas" } },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/correo electrónico/i), "a@b.com");
    await user.type(screen.getByLabelText(/contraseña/i), "bad");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Credenciales inválidas");
    });
  });
});
