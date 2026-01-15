import { useForm } from "react-hook-form";
import type { UserRole } from "@/features/auth/types/auth-user";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import { useCreateUser, type CreateUserPayload } from "../hooks/useCreateUser";

interface UserCreateModalProps {
  open: boolean;
  onClose: () => void;
}

interface CreateUserInputs {
  loginId: string;
  name: string;
  nickname: string;
  role: UserRole;
  password: string;
  passwordConfirm: string;
}

export function UserCreateModal({ open, onClose }: UserCreateModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<CreateUserInputs>({
    defaultValues: {
      role: 'USER'
    }
  });

  const password = watch("password");

  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const onSubmit = (data: CreateUserInputs) => {
    const payload: Partial<CreateUserInputs> = { ...data };
    delete payload.passwordConfirm;

    createUser(payload as CreateUserPayload, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold' }}>새 계정 추가</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              {...register("loginId", {
                required: "아이디를 입력해주세요",
                pattern: { value: /^[a-z0-9]+$/, message: "영문 소문자와 숫자만 가능합니다" }
              })}
              label="아이디"
              fullWidth
              size="small"
              error={!!errors.loginId}
              helperText={errors.loginId?.message}
            />

            <TextField
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: { value: 6, message: "6자 이상 입력하세요" }
              })}
              label="비밀번호"
              type="password"
              fullWidth
              size="small"
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              {...register("passwordConfirm", {
                required: "비밀번호를 한 번 더 입력해주세요",
                validate: (value) => value === password || "비밀번호가 일치하지 않습니다"
              })}
              label="비밀번호 확인"
              type="password"
              fullWidth
              size="small"
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
            />

            <TextField
              {...register("name", { required: "이름을 입력해주세요" })}
              label="이름"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              {...register("nickname", { required: "닉네임을 입력해주세요" })}
              label="활동명(닉네임)"
              fullWidth
              size="small"
              error={!!errors.nickname}
              helperText={errors.nickname?.message}
            />

            <TextField
              {...register("role")}
              select
              label="권한 설정"
              fullWidth
              size="small"
              defaultValue="USER"
            >
              <MenuItem value="ADMIN">관리자(ADMIN)</MenuItem>
              <MenuItem value="USER">게스트(USER)</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">취소</Button>

          <Button type="submit" variant="contained" disabled={isCreating}>
            {isCreating ? '생성 중...' : '생성'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}