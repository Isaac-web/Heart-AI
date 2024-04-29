import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material';
import './index.css';
import theme from './theme.ts';
import { SnackbarProvider } from 'notistack';
import Header from './components/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Header />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
