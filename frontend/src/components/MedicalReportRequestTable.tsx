import { useAppStore } from '@/hooks/store';
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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const MedicalReportRequestTable = () => {
  const navigate = useNavigate();

  const store = useAppStore();

  useEffect(() => {
    store.fetchMedicalReportRequests();
  }, []);

  return store.loadingMedicalReportRequests ? (
    <LoadingIndicator />
  ) : !store.medicalReportRequests.length ? (
    'No Medical Report Requests yet.'
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Date Requested</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="right">
            Action
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {store.medicalReportRequests.map((m) => (
          <TableRow>
            <TableCell>{m.patientId.name}</TableCell>
            <TableCell>
              <Chip
                label={m.status ? 'Approved' : 'Pending'}
                color={m.status ? 'success' : 'default'}
              />
            </TableCell>
            <TableCell>{new Date(m.createdAt).toLocaleString()}</TableCell>
            <TableCell align="right">
              <Button
                fullWidth={false}
                variant="outlined"
                size="small"
                onClick={() =>
                  navigate(`/doctor/medical-report-form/${m.patientId._id}`)
                }
                disabled={Boolean(m.status)}
              >
                Issue Medical Report
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MedicalReportRequestTable;
