import type { UserRole } from "@/features/auth/types/auth-user";
import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import type { NestErrorResponse } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface CreateUserPayload {
  loginId: string;
  name: string;
  nickname: string;
  role: UserRole;
  password: string;
}

export function useCreateUser() {
  const qc = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      const { data } = await http.post('/users', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      showAlert('새로운 계정이 생성되었습니다.', 'success');
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = Array.isArray(serverMessage)
        ? serverMessage[0]
        : serverMessage || '계정 생성에 실패했습니다.';

      console.error("User creation failed:", error);
      showAlert(displayMessage, 'error');
    }
  })
}