import { useMutationData } from "@/hooks/use-mutation-data";
import { auth } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();

  return useMutationData(["auth"], auth.login, "auth", () =>
    router.push("/dashboard")
  );
};

export const useSignup = () => {
  const router = useRouter();

  return useMutationData(["auth"], auth.signup, "auth", () =>
    router.push("/dashboard")
  );
};

export const useLogout = () => {
  const router = useRouter();

  return useMutationData(["auth"], auth.logout, "auth", () =>
    router.push("/sign-in")
  );
};
