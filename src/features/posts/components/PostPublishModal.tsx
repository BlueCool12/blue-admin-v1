import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { AppRegistrationOutlined } from "@mui/icons-material";

import { useMemo } from "react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { flattenCategories } from "@/features/categories/utils/category.utils";
import { PostStatus } from "@/features/posts/types/post";

import type { PublishDataState } from "@/features/posts/pages/PostEditPage";

interface PostPublishModalProps {
  open: boolean;
  onClose: () => void;
  data: PublishDataState;
  onChange: <K extends keyof PublishDataState>(key: K, value: PublishDataState[K]) => void;
  onConfirm: () => void;
}

export default function PostPublishModal({ open, onClose, data, onChange, onConfirm }: PostPublishModalProps) {

  const { data: categories, isLoading, isError } = useCategories();

  const categoryOptions = useMemo(() => {
    return flattenCategories(categories ?? []);
  }, [categories]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 700,
          pt: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
        <AppRegistrationOutlined sx={{ fontSize: '1.2rem' }} />
        포스팅 설정
      </DialogTitle>

      <DialogContent>
        <Stack spacing={4} sx={{ mt: 1 }}>

          <TextField
            label="URL SLUG"
            fullWidth
            value={data.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            helperText="영문, 숫자, 하이픈(-)만 사용할 수 있어요."
          />

          <TextField
            label="글 요약"
            fullWidth
            multiline
            rows={3}
            value={data.description}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                onChange('description', e.target.value);
              }
            }}
            placeholder="이 글을 200자 이내로 짧게 소개해 주세요."
            helperText={
              <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>메인 페이지와 검색 결과에 노출됩니다.</span>
                <Box component="span" sx={{ color: data.description.length > 200 ? 'error.main' : 'text.secondary' }}>
                  {data.description.length} / 200
                </Box>
              </Box>
            }
          />

          <FormControl fullWidth error={isError}>
            <InputLabel>카테고리</InputLabel>
            <Select
              displayEmpty
              value={data.categoryId}
              label="카테고리"
              onChange={(e) => onChange('categoryId', Number(e.target.value))}
              disabled={isLoading}
              renderValue={(selected) => {
                if (!selected || selected === 0) {
                  return (
                    <Typography sx={{ color: 'text.secondary' }}>
                      카테고리를 선택해 주세요
                    </Typography>
                  );
                }

                const selectedCategory = categoryOptions.find((c) => c.id === selected);
                return selectedCategory ? selectedCategory.name : '';
              }}
            >
              {isLoading ? (
                <MenuItem disabled>카테고리 로딩 중...</MenuItem>
              ) : (
                categoryOptions.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    disabled={category.depth === 0}
                    sx={{
                      pl: 2 + category.depth * 2,
                      fontWeight: category.depth === 0 ? 700 : 400,
                      color: 'text.primary',
                      '&.Mui-disabled': {
                        opacity: 1,
                      }
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: 'text.secondary' }}>
              공개 설정
            </Typography>
            <ToggleButtonGroup
              value={data.status}
              exclusive
              onChange={(_, nextStatus) => {
                if (nextStatus) onChange('status', nextStatus);
              }}
              fullWidth
              color="primary"
            >
              <ToggleButton value={PostStatus.DRAFT} sx={{ py: 1 }}>초안</ToggleButton>
              <ToggleButton value={PostStatus.PUBLISHED} sx={{ py: 1 }}>공개</ToggleButton>
              <ToggleButton value={PostStatus.ARCHIVED} sx={{ py: 1 }}>보관</ToggleButton>
            </ToggleButtonGroup>
          </Box>

        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          variant="outlined"
          size="large"
          color="info"
          sx={{ px: 4 }}
          onClick={onClose}
        >
          취소
        </Button>

        <Button
          variant="contained"
          size="large"
          disableElevation
          sx={{ px: 4 }}
          onClick={onConfirm}
        >
          완료
        </Button>
      </DialogActions>
    </Dialog>
  );
}