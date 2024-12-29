import { auth } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/dashboard");
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: auth.signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/dashboard");
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
