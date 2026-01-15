import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import type { AxiosError } from "axios";
import type { NestErrorResponse } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useDeleteUser = () => {
  const qc = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async (userId: string) => {
      await http.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      showAlert("사용자가 정상적으로 삭제되었습니다.", 'success');
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = Array.isArray(serverMessage)
        ? serverMessage[0]
        : serverMessage || '계정 삭제에 실패했습니다.';

      console.error("User delete failed:", error);
      showAlert(displayMessage, 'error');
    },
  });
}