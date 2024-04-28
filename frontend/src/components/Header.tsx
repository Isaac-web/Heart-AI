import { useTheme } from '@mui/material';
import { AppBar, Toolbar, Grid } from '@mui/material';

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid item>Logo</Grid>
            <Grid item>Account</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={{ ...theme.mixins.toolbar }} />
    </>
  );
};

export default Header;
