import AppContainer from '@/components/Container';
import MedicalReportRequestDialog from '@/components/MedicalReportRequestDialog';
import NoMedicalReports from '@/components/NoMedicalReports';
import { useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const Patient = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();

  return (
    <AppContainer>
      <Box sx={{ mb: theme.spacing(5) }}>
        <Typography variant="h4">Good Afternoon Patient</Typography>
      </Box>

      <NoMedicalReports onRequestForReport={() => setDialogOpen(true)} />
      <MedicalReportRequestDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </AppContainer>
  );
};

export default Patient;
