import { useMutationData } from "@/hooks/use-mutation-data";
import { auth } from "@/lib/api/auth";
import { users } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

export const useQueryUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: auth.getCurrentUser,
  });
};

export const useUpdateUser = () => {
  return useMutationData(["user"], users.updateUser, "user");
};
