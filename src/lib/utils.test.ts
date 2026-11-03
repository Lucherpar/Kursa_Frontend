import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("combina clases", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resuelve conflictos de Tailwind quedándose con la última", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
