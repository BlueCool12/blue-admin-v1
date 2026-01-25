import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { StatSummaryCards } from "../components/StatSummaryCards";
import { TrafficChart } from "../components/TrafficChart";
import { DistributionCharts } from "../components/DistributionCharts";
import { PostPerformanceTable } from "../components/PostPerformanceTable";
import { QuickPostRanking } from "../components/QuickPostRanking";

const dailyData = [
  { date: '01-18', pv: 400, uv: 150 },
  { date: '01-19', pv: 300, uv: 120 },
  { date: '01-20', pv: 600, uv: 300 },
  { date: '01-21', pv: 800, uv: 450 },
  { date: '01-22', pv: 500, uv: 200 },
  { date: '01-23', pv: 700, uv: 350 },
  { date: '01-24', pv: 900, uv: 500 },
];

export default function AnalyticsPage() {

  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            블로그의 흐름과 독자의 반응을 분석해보세요.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            방문자 추이와 인기 콘텐츠 데이터를 통해 블로그의 성장 가능성을 확인합니다.
          </Typography>
        </Box>

        <Box>
          <StatSummaryCards />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TrafficChart data={dailyData} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <QuickPostRanking />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <PostPerformanceTable />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <DistributionCharts />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}