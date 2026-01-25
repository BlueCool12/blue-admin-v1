import { Box, Grid, Paper, Typography } from "@mui/material";
import { PieChart, type PieChartProps } from "@mui/x-charts";

const referrerData = [
  { id: 0, value: 45, label: 'Google', color: '#4285F4' },
  { id: 1, value: 25, label: 'Naver', color: '#03C75A' },
  { id: 2, value: 20, label: 'Direct', color: '#757575' },
  { id: 3, value: 10, label: 'Others', color: '#FF9800' },
];

const deviceData = [
  { id: 0, value: 70, label: 'Desktop', color: '#673ab7' },
  { id: 1, value: 25, label: 'Mobile', color: '#e91e63' },
  { id: 2, value: 5, label: 'Tablet', color: '#00bcd4' },
];

export const DistributionCharts = () => {

  const commonChartProps: Partial<PieChartProps> = {
    height: 300,
    margin: { top: 30, bottom: 30, left: 10, right: 10 },
    slotProps: {
      legend: {
        direction: 'horizontal',
        position: { vertical: 'bottom', horizontal: 'center' }
      },
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%', minHeight: 300 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            유입 경로 (Referrer)
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PieChart
              series={[
                {
                  data: referrerData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  innerRadius: 60,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              {...commonChartProps}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%', minHeight: 300 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            접속 기기 (Device)
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PieChart
              series={[
                {
                  data: deviceData,
                  highlightScope: { fade: 'global', highlight: 'item' },
                },
              ]}
              {...commonChartProps}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}