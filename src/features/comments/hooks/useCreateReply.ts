import { http } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "@/features/comments/hooks/commentKeys";
import { useAlert } from "@/shared/hooks/useAlert";
import type { AxiosError } from "axios";
import type { NestErrorResponse } from "@/shared/types/api";

interface CreateReplyPayload {
  parentId: string;
  content: string;
}

export function useCreateReply() {
  const qc = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: async ({ parentId, content }: CreateReplyPayload) => {
      const { data } = await http.post(`/comments/${parentId}/reply`, {
        content,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentKeys.all });
      showAlert("답글이 등록되었습니다.", 'success');
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = typeof serverMessage === 'string'
        ? serverMessage
        : '답글 작성에 실패했습니다.';

      console.error("Comment reply create failed:", error);
      showAlert(displayMessage, 'error');
    }
  })
}