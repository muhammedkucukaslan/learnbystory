import { useMutationData } from "@/hooks/use-mutation-data";
import { stories } from "@/lib/api/story";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useQueryStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: stories.getStories,
  });
};

export const useQueryStory = (id: string) => {
  return useQuery({
    queryKey: ["stories", id],
    queryFn: () => stories.getStory(id),
  });
};

export const useGenerateStory = () => {
  const router = useRouter();

  return useMutationData(
    ["stories"],
    stories.generateStory,
    "stories",
    // @ts-ignore
    (data) => router.push(`/stories/${data.id}`)
  );
};

export const useUpdateStory = (id: string) => {
  return useMutationData(
    ["stories", id],
    (data) => stories.updateStory(data.id, data),
    "stories"
  );
};
