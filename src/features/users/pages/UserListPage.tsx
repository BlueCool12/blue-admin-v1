import { EditRounded, LockRounded, PersonAddRounded } from "@mui/icons-material";
import { Box, Button, Chip, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { UserCreateModal } from "../components/UserCreateModal";

const mockAdmins = [
  {
    id: 1,
    login_id: 'admin_cool',
    name: '김철수',
    nickname: '블루마스터',
    role: 'ADMIN',
    last_login_at: '2024-03-25 14:20:00',
    locked_until: null
  },
  {
    id: 2,
    login_id: 'editor_01',
    name: '이영희',
    nickname: '에디터K',
    role: 'USER',
    last_login_at: '2024-03-24 09:15:00',
    locked_until: '2026-12-31 23:59:59'
  },
];

export default function UserListPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLocked = (lockedUntil: string | null) => {
    if (!lockedUntil) return false;
    return new Date(lockedUntil) > new Date();
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              운영 계정 및 보안 설정
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              등록된 모든 관리자 계정을 확인하고 권한을 수정하거나 새로운 멤버를 추가하세요.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<PersonAddRounded />}
            onClick={() => setIsModalOpen(true)}
          >
            계정 추가
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>계정 정보</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>활동명</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>권한</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>최근 접속일</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">설정</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mockAdmins.map((admin) => (
                <TableRow key={admin.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {admin.name}
                          {isLocked(admin.locked_until) && (
                            <Tooltip title="계정 잠금 상태">
                              <LockRounded color="error" sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle' }} />
                            </Tooltip>
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {admin.login_id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{admin.nickname}</TableCell>

                  <TableCell>
                    <Chip
                      label={admin.role}
                      size="small"
                      color={admin.role === 'ADMIN' ? 'primary' : 'default'}
                      variant={admin.role === 'ADMIN' ? 'filled' : 'outlined'}
                    />
                  </TableCell>

                  <TableCell sx={{ typography: 'body2', color: 'text.secondary' }}>
                    {admin.last_login_at || '기록 없음'}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton size="small">
                      <EditRounded fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {/* 계정 생성 모달 */}
      <UserCreateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}