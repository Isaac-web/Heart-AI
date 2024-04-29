import { getUserId } from '@/utils/auth';
import { AppBar, Toolbar, Grid, Avatar, useTheme, Button } from '@mui/material';
import { useEffect } from 'react';
import logo from '../assets/images/heart-ai-logo.png';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

  const isAuthPage = () => {
    const pathname = location.pathname;
    return pathname === '/login' || pathname === '/register';
  };

  console.log(isAuthPage());

  const renderAuthBox = () => {
    return isAuthPage() ? null : (
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
          <Button onClick={() => window.location.assign('/login')}>
            Login
          </Button>
        )}
      </Grid>
    );
  };

  useEffect(() => {}, [window.location.pathname]);

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
              <img src={logo} className="w-12 h-12" />
            </Grid>
            <>{isAuthPage() ? null : <Grid item>{renderAuthBox()}</Grid>}</>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={{ ...theme.mixins.toolbar }} />
      <div style={{ marginBottom: theme.spacing(4) }} />
    </>
  );
};

export default Header;
