import { useAppStore } from '@/hooks/store';
import { User } from '@/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  useTheme,
  Chip,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface MedicalReportRequestDialogProps {
  open: boolean;
  onClose(): void;
}

const MedicalReportRequestDialog = ({
  open,
  onClose,
}: MedicalReportRequestDialogProps) => {
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const store = useAppStore();

  const requestMedicalHistory = () => {
    console.log('Requesting medical history');
  };

  const raiseClose = () => {
    setUser(null);
    onClose();
  };

  useEffect(() => {
    store.fetchUsers({ userType: 'doctor' });
  }, []);

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" fontWeight={'bold'}>
          Request Medical Report
        </Typography>
        <Typography variant="subtitle2">
          Your medical report will be issued by the doctor you select.
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box>Search...</Box>
        <Box sx={{ mb: theme.spacing(2) }}>
          <List sx={{ maxHeight: '18em', overflow: 'auto' }}>
            {store.users.map((user) => (
              <DoctorListItem
                key={user.name}
                name={user.name}
                title="Doctor"
                onSelect={() => setUser(user)}
              />
            ))}
          </List>
        </Box>

        {user && (
          <Box>
            <Chip label={user.name} onDelete={() => setUser(null)} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="text" sx={{ width: '120px' }} onClick={raiseClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: '120px' }}
          disabled={!user}
          onClick={() => requestMedicalHistory()}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DoctorListItemProps {
  name: string;
  title: string;
  onSelect: () => void;
}

const DoctorListItem = ({ name, title, onSelect }: DoctorListItemProps) => {
  const theme = useTheme();

  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.grey['50'],
        },
      }}
      onClick={onSelect}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={title} onSelect={onSelect} />
    </ListItem>
  );
};

export default MedicalReportRequestDialog;
