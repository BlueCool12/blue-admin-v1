import { Box, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

interface TrafficData {
  date: string;
  pv: number;
  uv: number;
  [key: string]: string | number;
}

interface TrafficChartProps {
  data: TrafficData[];
  loading?: boolean;
}

export const TrafficChart = ({ data, loading }: TrafficChartProps) => {
  const theme = useTheme();

  if (loading) {
    return <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />;
  }

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        방문자 추이
      </Typography>

      <Box sx={{ width: '100%', height: 350 }}>
        <LineChart
          dataset={data}
          xAxis={[{
            dataKey: 'date',
            scaleType: 'point',
            disableTicks: true,            
          }]}
          series={[
            {
              dataKey: 'pv',
              label: '페이지뷰 (PV)',
              color: `${theme.palette.primary.main}80`,
              area: true,
              showMark: false,
              curve: 'natural',
            },
            {
              dataKey: 'uv',
              label: '방문자 (UV)',
              color: theme.palette.info.dark,
              area: true,
              showMark: false,
              curve: 'natural',
            },
          ]}
          margin={{ left: 0, right: 10, top: 20, bottom: 10 }}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: { vertical: 'top', horizontal: 'end' },
            },
          }}
          grid={{ horizontal: true, vertical: true }}
        />
      </Box>
    </Paper>
  );
}