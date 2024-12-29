import { apiClient } from "./api-client";

export const stories = {
  getStories: async () => {
    const response = await apiClient.get("/stories");
    return response.data;
  },

  getStory: async (id: string) => {
    const response = await apiClient.get(`/stories/${id}`);
    return response.data;
  },

  generateStory: async (data: {
    language: string;
    length: string;
    interest: string;
  }) => {
    const response = await apiClient.post("/stories", data);
    return response.data;
  },
};
