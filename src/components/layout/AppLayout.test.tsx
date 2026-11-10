import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AppLayout from "./AppLayout";

const mockLogout = vi.fn();

vi.mock("../../store/AuthContext", () => ({
  useAuth: () => ({
    user: { id: 1, email: "admin@kursa.dev", role: "admin" },
    token: "token",
    loading: false,
    login: vi.fn(),
    logout: mockLogout,
    isAuthenticated: true,
  }),
}));

describe("AppLayout", () => {
  it("muestra la navegación principal y los enlaces por rol", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation", { name: /navegación principal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /administración/i })).toBeInTheDocument();
  });

  it("cierra sesión desde la barra lateral", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppLayout />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("abre y cierra el menú móvil", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppLayout />
      </MemoryRouter>
    );

    const toggle = screen.getByRole("button", { name: /abrir menú/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /cerrar menú/i }));
    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveAttribute("aria-expanded", "false");
  });
});
