import { apiClient } from "./api-client";

export const users = {
  getUser: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (data: any) => {
    const response = await apiClient.put(`/users`, data);
    return response.data;
  },
};
