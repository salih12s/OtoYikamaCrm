import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
} from '@mui/icons-material';

// Pages
import Dashboard from './pages/Dashboard';
import YeniIslem from './pages/YeniIslem';
import Islemler from './pages/Islemler';
import Raporlar from './pages/Raporlar';
import BorcTakip from './pages/BorcTakip';
import Hizmetler from './pages/Hizmetler';
import MusteriListesi from './pages/MusteriListesi';

// Dark tema oluştur
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 18, // Xiaomi 12 Pro için optimize
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
    },
    h4: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.5rem', // 24px
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.125rem', // 18px
    },
    body2: {
      fontSize: '1rem', // 16px
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '16px 28px',
          fontSize: '1.125rem', // 18px
          minHeight: 56,
          fontWeight: 600,
        },
        sizeLarge: {
          padding: '20px 36px',
          fontSize: '1.25rem', // 20px
          minHeight: 64,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '1.125rem', // 18px
            minHeight: 56,
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.125rem', // 18px
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1rem', // 16px
          padding: '16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // 14px
          height: 32,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
        },
      },
    },
  },
});

function HeaderBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  return (
    <AppBar position="sticky" elevation={2} sx={{ minHeight: 64 }}>
      <Toolbar sx={{ minHeight: 64, py: 1.5 }}>
        {!isHome && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2, width: 48, height: 48 }}
          >
            <BackIcon sx={{ fontSize: 28 }} />
          </IconButton>
        )}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: isHome ? 'center' : 'left',
            fontWeight: 'bold',
            fontSize: '1.375rem' // 22px - Xiaomi 12 Pro için optimize
          }}
        >
          🚗 Oto Yıkama CRM
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header */}
          <HeaderBar />
          
          {/* Main Content */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3, // Xiaomi 12 Pro için sabit 24px padding
              maxWidth: '480px', // Xiaomi 12 Pro genişliği: 1440x3200 (scale 3x = 480x1067 mantıksal)
              width: '100%',
              margin: '0 auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/yeni-islem" element={<YeniIslem />} />
              <Route path="/islemler" element={<Islemler />} />
              <Route path="/borc-takip" element={<BorcTakip />} />
              <Route path="/raporlar" element={<Raporlar />} />
              <Route path="/hizmetler" element={<Hizmetler />} />
              <Route path="/musteri-listesi" element={<MusteriListesi />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
