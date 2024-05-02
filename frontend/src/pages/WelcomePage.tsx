import { Button, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent={'center'}
      alignContent={'center'}
      sx={{
        height: '100vh',
        width: '100%',
        pl: theme.spacing(2),
        pr: theme.spacing(2),
      }}
    >
      <Grid item xs={12} md={8} xl={4}>
        <Paper
          sx={{
            pt: theme.spacing(4),
            pb: theme.spacing(4),
            pl: theme.spacing(5),
            pr: theme.spacing(5),
          }}
        >
          <Grid
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ mb: theme.spacing(2) }}
          >
            <Grid item sx={{ mb: theme.spacing(2) }}>
              <Typography align="center" variant="h5" fontWeight={'bold'}>
                Logo
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                fontWeight={'bold'}
                sx={{ mb: theme.spacing(4) }}
              >
                Welcome CardioBot
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate('/login?userType=patient')}
              >
                Continue as a Patient
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => navigate('/login?userType=doctor')}
              >
                Continue as a Doctor
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default WelcomePage;
