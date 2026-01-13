import { SendRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface ReplyEditorProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
  disabled?: boolean;
}

export function ReplyEditor({ onSubmit, onCancel, disabled }: ReplyEditorProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isPending = loading || disabled;

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(content);
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="답글을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontSize: '0.875rem',
            bgcolor: 'action.hover'
          }
        }}
      />

      <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={onCancel}
          disabled={isPending}
          sx={{ borderRadius: 2, px: 2 }}
        >
          취소
        </Button>

        <Button
          variant="contained"
          size="small"
          startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : <SendRounded />}
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
          sx={{ borderRadius: 2, px: 2 }}
        >
          답글 등록
        </Button>
      </Stack>
    </Box>
  );
}