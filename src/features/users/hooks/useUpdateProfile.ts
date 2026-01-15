import { authKeys } from "@/features/auth/hooks/authKeys";
import { http } from "@/shared/api/http";
import { useAlert } from "@/shared/hooks/useAlert";
import type { NestErrorResponse } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useUpdateProfile() {
  const qc = useQueryClient();
  const { showAlert } = useAlert();

  const uploadImage = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return http.post<{ url: string }>('/media/images/profile', formData);
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = Array.isArray(serverMessage)
        ? serverMessage[0]
        : serverMessage || '이미지 업로드 중 오류가 발생했습니다.';

      console.error("Image upload failed:", error);
      showAlert(displayMessage, 'error');
    },
  });

  const updateInfo = useMutation({
    mutationFn: (data: { nickname?: string; profileImageUrl?: string }) => {
      return http.patch('/users/me/profile', data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [authKeys.me] });
      showAlert('프로필이 정상적으로 수정되었습니다.', 'success');
    },
    onError: (error: AxiosError<NestErrorResponse>) => {
      const serverMessage = error.response?.data?.message;
      const displayMessage = Array.isArray(serverMessage)
        ? serverMessage[0]
        : serverMessage || '프로필 정보 수정에 실패했습니다.';

      console.error("User profile update failed:", error);
      showAlert(displayMessage, 'error');
    },
  });

  return { uploadImage, updateInfo };
}