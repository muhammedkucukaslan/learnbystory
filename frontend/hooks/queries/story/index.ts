import { useMutationData } from "@/hooks/use-mutation-data";
import { stories } from "@/lib/api/story";
import { useModal } from "@/providers/modal-provider";
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
  const { setClose } = useModal();

  return useMutationData(
    ["stories"],
    stories.generateStory,
    "stories",
    // @ts-ignore
    (data) => {
      router.push(`/dashboard/stories/${data.id}`);
      setClose();
    }
  );
};

export const useUpdateStory = (id: string) => {
  return useMutationData(
    ["stories", id],
    (data) => stories.updateStory(data.id, data),
    "stories"
  );
};
