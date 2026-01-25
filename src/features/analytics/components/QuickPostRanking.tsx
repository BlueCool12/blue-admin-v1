import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";

export const QuickPostRanking = () => {

  const posts = [
    { title: 'NestJS와 DDD 적용기', views: 120, color: '#1976d2' },
    { title: 'MUI v6 가이드', views: 85, color: '#9c27b0' },
    { title: '마라톤 훈련 일지', views: 64, color: '#2e7d32' },
    { title: 'TS 인덱스 시그니처', views: 42, color: '#ed6c02' },
    { title: 'Next.js 14 마이그레이션', views: 31, color: '#d32f2f' },
  ];

  return (
    <Paper sx={{ p: 3, height: '100%', minHeight: 350, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        실시간 인기 콘텐츠
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {posts.map((post, index) => (
          <ListItem key={index} sx={{ px: 1 }}>
            <ListItemAvatar sx={{ minWidth: 40 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '0.75rem',
                  bgcolor: index < 3 ? 'primary.main' : 'action.disabled'
                }}
              >
                {index + 1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={`${post.views} views today`}
              slotProps={{
                primary: {
                  variant: 'body2',
                  fontWeight: 'medium',
                  noWrap: true,
                },
                secondary: {
                  variant: 'caption',
                  color: 'text.secondary',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}