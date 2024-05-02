import { CircularProgress, Grid, Typography } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <CircularProgress size="1.2em" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">Please wait...</Typography>
      </Grid>
    </Grid>
  );
};

export default LoadingIndicator;
