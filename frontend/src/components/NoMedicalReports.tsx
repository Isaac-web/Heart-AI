import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

interface NoMedicalReportsProps {
  onRequestForReport(): void;
}

const NoMedicalReports = ({ onRequestForReport }: NoMedicalReportsProps) => {
  const theme = useTheme();

  return (
    <div>
      <Grid
        container
        direction={'column'}
        spacing={2}
        sx={{ p: theme.spacing(4) }}
      >
        <Grid item>
          <Typography variant="h5">No Medical Report</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            Looks like you don't have a medical report yet. You can request for
            a medical report from a doctor.
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ maxWidth: '10em' }}>
            <Button variant="contained" onClick={onRequestForReport}>
              Get Report
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoMedicalReports;
