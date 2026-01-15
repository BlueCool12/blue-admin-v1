import React, { useRef, useState } from "react";
import { CheckCircleRounded, PhotoCameraRounded } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Container, Paper, Stack, TextField, Typography } from "@mui/material";

import { useMe } from "@/features/auth/hooks/useMe";
import { useUpdateProfile } from "@/features/users/hooks/useUpdateProfile";

export default function SettingsPage() {
  const { data: user } = useMe();
  const { uploadImage, updateInfo } = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(user?.nickname || user?.name || '');
  const [previewUrl, setPreviewUrl] = useState(user?.profileImageUrl || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadImage.mutateAsync(file);
      const newUrl = response.data.url;
      setPreviewUrl(newUrl);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const handleSave = () => {
    if (!nickname.trim()) return;

    updateInfo.mutate({
      nickname: nickname.trim(),
      profileImageUrl: previewUrl,
    });
  };

  const isActionPending = uploadImage.isPending || updateInfo.isPending;

  return (
    <Container maxWidth="sm" disableGutters>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          내 정보 수정
        </Typography>
        <Typography variant="body2" color="text.secondary">
          프로필 사진과 닉네임을 변경하여 나만의 개성을 표현해 보세요.
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={previewUrl || undefined}
              sx={{ width: 160, height: 160, border: '4px solid', borderColor: 'primary.lighter' }}
            >
              {user?.name?.charAt(0)}
            </Avatar>

            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />

            <Button
              variant="contained"
              size="small"
              onClick={() => fileInputRef.current?.click()}
              disabled={isActionPending}
              sx={{
                position: 'absolute',
                bottom: 2,
                right: 8,
                minWidth: 40,
                width: 40,
                height: 40,
                borderRadius: '50%',
                p: 0,
              }}
            >
              {uploadImage.isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <PhotoCameraRounded fontSize="small" />
              )}
            </Button>
          </Box>

          <TextField
            fullWidth
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            variant="outlined"
            helperText="작성하신 닉네임은 댓글에 작성자로 표시됩니다."
            disabled={isActionPending}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={!updateInfo.isPending && <CheckCircleRounded />}
            onClick={handleSave}
            loading={isActionPending || !nickname.trim()}
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            {updateInfo.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "설정 저장"
            )}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}