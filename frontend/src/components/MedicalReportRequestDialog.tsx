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
import { useState } from 'react';

const users: User[] = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    userType: 'admin',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'janesmith@yahoo.com',
    userType: 'user',
  },
  {
    _id: '3',
    name: 'Michael Johnson',
    email: 'michaeljohnson@hotmail.com',
    userType: 'user',
  },
  {
    _id: '4',
    name: 'Emily Brown',
    email: 'emilybrown@example.com',
    userType: 'admin',
  },
  {
    _id: '5',
    name: 'David Wilson',
    email: 'davidwilson@gmail.com',
    userType: 'user',
  },
  {
    _id: '6',
    name: 'David Wilson1',
    email: 'davidwilson@gmail.com',
    userType: 'user',
  },
];

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

  const requestMedicalHistory = () => {
    console.log('Requesting medical history');
  };

  const raiseClose = () => {
    setUser(null);
    onClose();
  };

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
            {users.map((user) => (
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
