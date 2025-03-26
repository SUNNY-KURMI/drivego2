import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2D72',
      dark: '#1A1D4A'
    },
    secondary: {
      main: '#FF6B6B',
      dark: '#FF4757'
    },
    background: {
      paper: '#F9FAFF'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

export default theme;