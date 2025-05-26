import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './utils/axiosConfig';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5C3D2E', // Rich brown color
      light: '#B85C38', // Lighter brown
      dark: '#2C1810', // Darker brown
    },
    secondary: {
      main: '#E0C097', // Warm beige
      light: '#F2D7B6',
      dark: '#C1A173',
    },
    background: {
      default: '#FFF8E7', // Light cream color
    },
  },
  typography: {
    fontFamily: "'Playfair Display', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
    },
    h5: {
      fontFamily: "'Playfair Display', serif",
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(92, 61, 46, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
);
