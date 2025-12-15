import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Kullanıcı adı ve şifre kontrolü
    if (username === 'Göktuğ33' && password === 'Göktuğ123456') {
      // Başarılı giriş - localStorage'a kaydet
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      onLogin();
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #161616 0%, #2a2a2a 50%, #161616 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 0.5,
            },
            '50%': {
              transform: 'translate(-50%, -50%) scale(1.1)',
              opacity: 0.8,
            },
          },
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 1,
          animation: 'fadeInUp 0.8s ease-out',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(40px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo ve Başlık */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2,
                overflow: 'hidden',
                border: '3px solid #FFC107',
                boxShadow: '0 0 30px rgba(255, 193, 7, 0.8), 0 0 50px rgba(255, 193, 7, 0.5), 0 0 70px rgba(255, 193, 7, 0.3)',
                animation: 'floatBounce 3s ease-in-out infinite',
                '@keyframes floatBounce': {
                  '0%, 100%': {
                    transform: 'translateY(0px) scale(1)',
                  },
                  '50%': {
                    transform: 'translateY(-15px) scale(1.05)',
                  },
                },
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
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Lion Oto Yıkama
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Giriş yaparak devam edin
            </Typography>
          </Box>

          {/* Hata Mesajı */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Giriş Formu */}
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              autoComplete="username"
            />

            <TextField
              fullWidth
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #161616 0%, #FFC107 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #000000 0%, #FFD54F 100%)',
                },
              }}
            >
              Giriş Yap
            </Button>
          </form>

          {/* Alt Bilgi */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 3 }}
          >
            © 2025 Lion Oto Yıkama
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
