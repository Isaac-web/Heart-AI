import { Paper, PaperProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

const AppPaper = ({
  children,
}: {
  children: ReactNode;
  paperProps?: PaperProps;
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: theme.spacing(2),
      }}
    >
      {children}
    </Paper>
  );
};

export default AppPaper;
