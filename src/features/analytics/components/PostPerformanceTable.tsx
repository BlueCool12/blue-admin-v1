import { Box, Chip, Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { koKR } from '@mui/x-data-grid/locales';

interface PostStat {
  id: number;
  title: string;
  slug: string;
  views: number;
  uniqueVisitors: number;
  avgDuration: string;
  publishedAt: string;
}

const rows: PostStat[] = [
  { id: 1, title: 'NestJS와 Domain-Driven Design 적용기', slug: '/nestjs-ddd', views: 1240, uniqueVisitors: 850, avgDuration: '3m 20s', publishedAt: '2026-01-15' },
  { id: 2, title: 'React MUI로 깔끔한 어드민 페이지 만들기', slug: '/mui-admin-tips', views: 980, uniqueVisitors: 720, avgDuration: '2m 45s', publishedAt: '2026-01-18' },
  { id: 3, title: 'Next.js 14 App Router 마이그레이션 가이드', slug: '/nextjs-14-guide', views: 850, uniqueVisitors: 610, avgDuration: '4m 10s', publishedAt: '2026-01-20' },
  { id: 4, title: '풀마라톤 서브4 달성을 위한 훈련 일지', slug: '/marathon-sub4', views: 520, uniqueVisitors: 300, avgDuration: '1m 50s', publishedAt: '2026-01-12' },
  { id: 5, title: 'TypeScript 인덱스 시그니처 이해하기', slug: '/ts-index-signature', views: 430, uniqueVisitors: 280, avgDuration: '5m 15s', publishedAt: '2026-01-22' },
];

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: '글 제목',
    flex: 2,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant='body2' fontWeight="medium">{params.value}</Typography>
        <Typography variant='caption' color='text.secondary'>{params.row.slug}</Typography>
      </Box>
    )
  },
  {
    field: 'views',
    headerName: '조회수(PV)',
    type: 'number',
    flex: 1,
    renderCell: (params) => (
      <Chip label={params.value.toLocaleString()} size='small' variant='outlined' />
    )
  },
  {
    field: 'uniqueVisitors',
    headerName: '방문자(UV)',
    type: 'number',
    flex: 1,
  },
  { field: 'avgDuration', headerName: '평균 체류시간', flex: 1 },
  { field: 'publishedAt', headerName: '게시일', flex: 1 },
];

export const PostPerformanceTable = () => {

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Typography variant='h6' sx={{ mb: 1, fontWeight: 'bold' }}>
        콘텐츠별 상세 성과 분석
      </Typography>

      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'action.hover',
              fontWeight: 'bold',
            },
          }}
          localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Paper>
  );
};