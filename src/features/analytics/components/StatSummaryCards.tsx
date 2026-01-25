import { ExitToAppRounded, PeopleAltRounded, TrendingUpRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, trend, icon }: StatCardProps) => (
  <Card sx={{ height: '100%', boxShadow: 1 }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>

          {trend && (
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
              <TrendingUpRounded sx={{ fontSize: '1rem', color: 'primary.main', fontWeight: 'medium' }} />

              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                {trend}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                전일 대비
              </Typography>
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            color: 'text.disabled',
            display: 'flex'
          }}
        >
          {icon}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export const StatSummaryCards = () => {
  const stats = [
    { title: '오늘 방문자 (UV)', value: '1,240', trend: '+5.2%', icon: <PeopleAltRounded />, color: '#1976d2' },
    { title: '오늘 페이지뷰 (PV)', value: '3,820', trend: '+12.1%', icon: <VisibilityRounded />, color: '#2e7d32' },
    { title: '평균 체류 시간', value: '2m 35s', trend: '-2.4%', icon: <TrendingUpRounded />, color: '#ed6c02' },
    { title: '이탈률', value: '42.3%', trend: '+0.8%', icon: <ExitToAppRounded />, color: '#d32f2f' },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};