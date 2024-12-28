import axios from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);
