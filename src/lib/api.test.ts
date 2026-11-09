import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios", () => {
  const api: any = vi.fn().mockResolvedValue({ data: {} });
  api.interceptors = {
    request: { use: vi.fn() },
    response: {
      use: vi.fn((_success: any, error: any) => {
        (globalThis as any).__responseError = error;
      }),
    },
  };
  api.defaults = { headers: { common: {} } };
  return {
    default: {
      create: vi.fn(() => api),
      post: vi.fn(),
    },
  };
});

import axios from "axios";
import { api } from "./api";

describe("api refresh", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(axios.post).mockReset();
    vi.mocked(api).mockReset();
    vi.mocked(api).mockResolvedValue({ data: {} } as any);
  });

  it("renueva el access token ante un 401", async () => {
    localStorage.setItem("accessToken", "old-access");
    localStorage.setItem("refreshToken", "refresh-token");
    vi.mocked(axios.post).mockResolvedValue({ data: { data: { accessToken: "new-access" } } });

    const error = { config: { url: "/courses", headers: {} }, response: { status: 401 } };
    await (globalThis as any).__responseError(error);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/auth/refresh"),
      { refreshToken: "refresh-token" }
    );
    expect(localStorage.getItem("accessToken")).toBe("new-access");
  });

  it("limpia la sesión si el refresh falla", async () => {
    localStorage.setItem("accessToken", "old-access");
    localStorage.setItem("refreshToken", "refresh-token");
    localStorage.setItem("user", JSON.stringify({ id: 1 }));
    vi.mocked(axios.post).mockRejectedValue(new Error("invalid refresh"));

    const error = { config: { url: "/courses", headers: {} }, response: { status: 401 } };
    await expect((globalThis as any).__responseError(error)).rejects.toBeDefined();

    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
