
import { http } from "@/shared/api/http";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/features/users/types/user";

interface UseUsersProps {
  page: number;
  limit: number;
  search?: string;
  role?: string;
}

interface GetUsersResponse {
  items: User[];
  total: number;
  page: number;
  limit: number;
}

export const useUsers = ({ page, limit, search, role }: UseUsersProps) => {
  return useQuery<GetUsersResponse>({
    queryKey: ['users', { page, limit, search, role }],
    queryFn: async () => {
      const { data } = await http.get('users', {
        params: { page, limit, search, role },
      });
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};