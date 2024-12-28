import { apiClient } from "./api-client";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: any;
  token: string;
}

export const auth = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
