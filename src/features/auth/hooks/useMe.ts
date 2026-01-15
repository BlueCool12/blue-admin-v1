import { useQuery } from "@tanstack/react-query";
import { authKeys } from "@/features/auth/hooks/authKeys";
import { http } from "@/shared/api/http";
import type { AuthUser } from "@/features/auth/types/auth-user";
import { getAccessToken } from "@/features/auth/utils/storage";

export function useMe() {
  const token = getAccessToken();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const { data } = await http.get<AuthUser>('/auth/me');
      return data;
    },
    enabled: token !== null,
    retry: false,
    staleTime: Infinity,
  });
}