import { auth } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useQueryUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: auth.getCurrentUser,
  });
};
