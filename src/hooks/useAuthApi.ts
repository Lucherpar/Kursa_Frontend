import { useAuth } from "../store/AuthContext";
import { api } from "../lib/api";

export const useAuthApi = () => {
  const { logout } = useAuth();

  const request = async <T>(method: "get" | "post" | "put" | "patch" | "delete", url: string, data?: any): Promise<T> => {
    try {
      const response = await api[method]<T>(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        logout();
      }
      throw error;
    }
  };

  return {
    get: <T>(url: string) => request<T>("get", url),
    post: <T>(url: string, data: any) => request<T>("post", url, data),
    put: <T>(url: string, data: any) => request<T>("put", url, data),
    patch: <T>(url: string, data: any) => request<T>("patch", url, data),
    delete: <T>(url: string) => request<T>("delete", url),
  };
};
