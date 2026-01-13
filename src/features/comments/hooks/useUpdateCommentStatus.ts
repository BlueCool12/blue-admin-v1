import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentStatus } from "@/features/comments/types/comment";
import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import { commentKeys } from "@/features/comments/hooks/commentKeys";
import type { AxiosError } from "axios";
import type { NestErrorResponse } from "@/shared/types/api";

export function useUpdateCommentStatus() {
  const qc = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: CommentStatus }) => {
      return await http.patch(`/comments/${id}/status`, { status });
    },
    onSuccess: () => {
      showAlert("댓글 상태가 수정되었습니다.", 'info');
      qc.invalidateQueries({ queryKey: commentKeys.lists() });
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = typeof serverMessage === 'string'
        ? serverMessage
        : '댓글 상태 변경에 실패했습니다.';

      console.error("Comment status update failed:", error);
      showAlert(displayMessage, 'error');
    }
  })
}