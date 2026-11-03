import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renderiza el texto recibido", () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("aplica la variante destructiva", () => {
    render(<Button variant="destructive">Eliminar</Button>);
    expect(screen.getByText("Eliminar")).toHaveClass("bg-destructive");
  });
});
