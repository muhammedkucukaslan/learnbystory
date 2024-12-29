import { stories } from "@/lib/api/story";
import { useQuery } from "@tanstack/react-query";

export const useQueryStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: stories.getStories,
  });
};
