import { useTheme } from '@mui/material';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

const AppContainer = ({
  children,
  maxWidth,
}: {
  children: ReactNode;
  maxWidth?: 'xs' | 'md' | 'lg' | 'xl';
}) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={maxWidth}
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
