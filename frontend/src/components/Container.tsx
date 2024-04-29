import { useTheme } from '@mui/material';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

const AppContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        pt: theme.spacing(4),
        pb: theme.spacing(4),
      }}
    >
      {children}
    </Container>
  );
};

export default AppContainer;
