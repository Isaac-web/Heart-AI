import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'none',
          textTransform: 'none',
        },
        sizeLarge: {
          padding: 12,
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        // elevation: {
        //   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        // },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
  palette: {},
});

export default theme;
