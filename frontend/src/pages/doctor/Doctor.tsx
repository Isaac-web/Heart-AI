import AppContainer from '@/components/Container';
import MedicalReportRequestTable from '@/components/MedicalReportRequestTable';
import MedicalReportsTable from '@/components/MedicalReportsTable';
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const Doctor = () => {
  const [currentTab, setCurrentTab] = useState('0');
  const theme = useTheme();

  return (
    <AppContainer>
      <Box sx={{ marginBottom: theme.spacing(5) }}>
        <Typography variant="h4">
          {currentTab === '0' ? 'Report Requests' : 'Medical Reports'}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: theme.spacing(4) }}>
        <Tabs
          value={currentTab}
          onChange={(_, value) => {
            setCurrentTab(value.toString());
          }}
        >
          <Tab label="Medical Report Requests" value={'0'} />
          <Tab label="Medical Reports" value={'1'} />
        </Tabs>
      </Box>

      {currentTab === '0' && (
        <Box>
          <MedicalReportRequestTable />
        </Box>
      )}

      {currentTab === '1' && <MedicalReportsTable />}
    </AppContainer>
  );
};

export default Doctor;
