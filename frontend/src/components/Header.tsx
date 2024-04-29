import {
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material';

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.common.white,
          color: theme.palette.grey[600],
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid item>
              <Typography variant="h6">HeartAI</Typography>
            </Grid>
            <Grid item>
              <Avatar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={{ ...theme.mixins.toolbar }} />
      <div style={{ marginBottom: theme.spacing(4) }} />
    </>
  );
};

export default Header;
