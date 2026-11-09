import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterPage from "./RegisterPage";

const mockLogin = vi.fn();

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

describe("RegisterPage", () => {
  beforeEach(async () => {
    mockLogin.mockReset();
    const { api } = await import("../lib/api");
    (api.post as any).mockReset();
  });

  it("registra y autentica al usuario", async () => {
    const { api } = await import("../lib/api");
    (api.post as any)
      .mockResolvedValueOnce({ data: { data: { id: 1, email: "nuevo@kursa.dev", role: "estudiante" } } })
      .mockResolvedValueOnce({ data: { data: { accessToken: "access", refreshToken: "refresh", user: { id: 1, email: "nuevo@kursa.dev", role: "estudiante" } } } });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/correo electrónico/i), "nuevo@kursa.dev");
    await user.type(screen.getByLabelText(/contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenNthCalledWith(1, "/auth/register", expect.objectContaining({ email: "nuevo@kursa.dev", password: "123456", role: "estudiante" }));
      expect(api.post).toHaveBeenNthCalledWith(2, "/auth/login", { email: "nuevo@kursa.dev", password: "123456" });
      expect(mockLogin).toHaveBeenCalledWith("access", "refresh", expect.objectContaining({ email: "nuevo@kursa.dev" }));
    });
  });

  it("muestra error 409 email duplicado", async () => {
    const { api } = await import("../lib/api");
    (api.post as any).mockRejectedValue({
      response: { status: 409, data: { message: "El correo ya está registrado" } },
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/correo electrónico/i), "dup@kursa.dev");
    await user.type(screen.getByLabelText(/contraseña/i), "123456");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("El correo ya está registrado");
    });
  });
});
