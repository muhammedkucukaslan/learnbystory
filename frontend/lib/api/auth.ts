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

export const auth = {
  signup: async (data: SignupData) => {
    const response = await apiClient.post("/signup", data);
    return response;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post("/login", data);
    return response;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },
};
