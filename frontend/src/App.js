import React, { useState, useEffect } from 'react';
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
  Logout as LogoutIcon,
} from '@mui/icons-material';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import YeniIslem from './pages/YeniIslem';
import Islemler from './pages/Islemler';
import Giderler from './pages/Giderler';
import BorcTakip from './pages/BorcTakip';
import Hizmetler from './pages/Hizmetler';
import MusteriListesi from './pages/MusteriListesi';
import Notlar from './pages/Notlar';

// Dark tema oluştur
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC107',
    },
    secondary: {
      main: '#FFD54F',
    },
    background: {
      default: '#161616',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Roboto", "Arial", sans-serif',
    fontSize: 18, // Xiaomi 12 Pro için optimize
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
    },
    h4: {
      fontSize: '2rem', // 32px
      fontWeight: 800,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontSize: '1.5rem', // 24px
      fontWeight: 700,
      letterSpacing: '-0.3px',
    },
    h6: {
      fontSize: '1.25rem', // 20px
      fontWeight: 700,
      letterSpacing: '-0.2px',
    },
    body1: {
      fontSize: '1.125rem', // 18px
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
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

function HeaderBar({ onLogout }) {
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
        {isHome && (
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              overflow: 'hidden',
              mr: 2,
              border: '2px solid #FFC107',
              boxShadow: '0 0 20px rgba(255, 193, 7, 0.6)',
            }}
          >
            <img 
              src="/Logo.jpg" 
              alt="Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </Box>
        )}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: isHome ? 'left' : 'left',
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.5px',
            fontFamily: '"Poppins", sans-serif'
          }}
        >
          Lion Oto Yıkama
        </Typography>
        <IconButton
          color="inherit"
          onClick={onLogout}
          sx={{ width: 48, height: 48 }}
          title="Çıkış Yap"
        >
          <LogoutIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan giriş durumunu kontrol et
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  // Giriş yapılmamışsa Login sayfasını göster
  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header */}
          <HeaderBar onLogout={handleLogout} />
          
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
              <Route path="/giderler" element={<Giderler />} />
              <Route path="/hizmetler" element={<Hizmetler />} />
              <Route path="/musteri-listesi" element={<MusteriListesi />} />
              <Route path="/notlar" element={<Notlar />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
