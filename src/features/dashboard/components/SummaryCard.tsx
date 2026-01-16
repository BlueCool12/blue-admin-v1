import { Box, Paper, Typography, type SvgIconProps } from "@mui/material";
import type { ReactElement } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactElement<SvgIconProps>;
}

export function SummaryCard({ title, value, icon }: SummaryCardProps) {

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>

        <Box sx={{ color: 'text.disabled' }}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};