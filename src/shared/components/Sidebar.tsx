import { Box, CircularProgress, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddRounded, CategoryRounded, CommentRounded, DashboardRounded, DescriptionRounded, ForumRounded, PeopleAltRounded, SettingsRounded } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useCreateDraft } from "@/features/posts/hooks/useCreateDraft";

const NAV_ITEMS = [
  { text: '대시보드', icon: <DashboardRounded />, path: '/dashboard' },
  { text: '글 관리', icon: <DescriptionRounded />, path: '/posts' },
  { text: '카테고리 관리', icon: <CategoryRounded />, path: '/categories' },
  { text: '댓글 관리', icon: <CommentRounded />, path: '/comments' },
  { text: '계정 관리', icon: <PeopleAltRounded />, path: '/users' },
  { text: '방명록 관리', icon: <ForumRounded />, path: 'https://github.com/BlueCool12/blue/issues/1', isExternal: true },
  { text: '설정', icon: <SettingsRounded />, path: '/settings' },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutate: createDraft, isPending } = useCreateDraft();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <Box
        component={RouterLink}
        to="/"
        sx={{
          p: 3,
          display: 'block',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: 'primary.main',
            textAlign: 'center',
            letterSpacing: '0.1rem'
          }}
        >
          BLUECOOL
        </Typography>
      </Box>

      <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'center' }}>
        <Fab
          size="large"
          color="primary"
          aria-label="add"
          onClick={() => createDraft()}
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress />
          ) : (
            <AddRounded />
          )}
        </Fab>
      </Box>

      <List sx={{ px: 2 }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

          const handleClick = () => {
            if (item?.isExternal) {
              window.open(item.path, '_blank', 'noopener,noreferrer');
            } else {
              navigate(item.path);
            }
          };

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={active}
                onClick={handleClick}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      fontSize: 14,
                      fontWeight: active ? 700 : 500,
                      color: active ? 'primary.main' : 'text.primary'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}