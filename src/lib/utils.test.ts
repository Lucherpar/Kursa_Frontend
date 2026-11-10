import { describe, it, expect } from "vitest";
import { cn, getApiData, getApiList } from "./utils";

describe("cn", () => {
  it("combina clases", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resuelve conflictos de Tailwind quedándose con la última", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("getApiData", () => {
  it("extrae data del sobre del backend", () => {
    expect(getApiData<{ id: number }>({ success: true, data: { id: 1 } })).toEqual({ id: 1 });
  });

  it("devuelve el payload si no hay sobre", () => {
    expect(getApiData<{ id: number }>({ id: 1 })).toEqual({ id: 1 });
  });
});

describe("getApiList", () => {
  it("extrae una lista del sobre del backend", () => {
    expect(getApiList<{ id: number }>({ success: true, data: [{ id: 1 }] })).toEqual([{ id: 1 }]);
  });

  it("devuelve array vacío si data no es una lista", () => {
    expect(getApiList({ success: false, message: "error" })).toEqual([]);
  });
});
