import { CircularProgress, Grid, Typography } from '@mui/material';

const LoadingIndicator = ({ message }: { message?: string }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <CircularProgress size="1.2em" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">
          {message ? message : 'Please wait...'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoadingIndicator;
