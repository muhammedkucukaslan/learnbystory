import { auth } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.signup,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};
