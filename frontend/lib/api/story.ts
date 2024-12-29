import { apiClient } from "./api-client";

export const stories = {
  getStories: async () => {
    const response = await apiClient.get("/stories");
    return response.data;
  },
};
