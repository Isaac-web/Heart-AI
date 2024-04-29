import { getUserId } from '@/utils/auth';
import {
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  Typography,
  useTheme,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

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
              {getUserId() ? (
                <Grid container alignItems={'center'} spacing={2}>
                  <Grid item>
                    <Avatar />
                  </Grid>
                  <Grid item>
                    <Button onClick={handleLogout}>Logout</Button>
                  </Grid>
                </Grid>
              ) : (
                <Button>Login</Button>
              )}
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
