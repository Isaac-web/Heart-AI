import { useAppStore } from '@/hooks/store';
import { getUserId } from '@/utils/auth';
import {
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const MedicalReportsTable = () => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchMedicalReports({ doctorId: getUserId() });
  }, []);

  return store.loadingMedicalReports ? (
    <CircularProgress />
  ) : !store.medicalReports.length ? (
    'No requests yet.'
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Patient Name</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Issued By</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Date Issued</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>cardio Status</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="right">
            Action
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {store.medicalReports.map((m) => (
          <TableRow>
            <TableCell>{m.patientId.name}</TableCell>
            <TableCell>{m.doctorId.name}</TableCell>
            <TableCell>{new Date(m.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <Chip
                color={m.cardioStatus ? 'error' : 'success'}
                variant="outlined"
                label={m.cardioStatus ? 'Unhealthy' : 'Healty'}
              />
            </TableCell>
            <TableCell align="right">
              <Button
                fullWidth={false}
                variant="outlined"
                size="small"
                onClick={() =>
                  //   navigate(`/doctor/medical-report-form/${m.patientId._id}`)
                  enqueueSnackbar('This feature is still under development.')
                }
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MedicalReportsTable;
