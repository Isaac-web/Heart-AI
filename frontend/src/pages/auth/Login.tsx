import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

const Login = () => {
  const theme = useTheme();
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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container justifyContent={'center'} alignItems={'center'}>
                <Typography variant="h5">Login</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <TextField label="Email" />
            </Grid>
            <Grid item>
              <Grid item>
                <TextField label="Password" />
              </Grid>
            </Grid>

            <Grid item>
              <Button size="large" variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
