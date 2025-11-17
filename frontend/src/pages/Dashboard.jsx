import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Build as BuildIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickAccessButton = ({ title, icon, color, path, onClick }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${color}33 0%, ${color}22 100%)`,
      border: `4px solid ${color}`,
      boxShadow: `0 8px 24px ${color}44`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 32px ${color}66`,
      },
      '&:active': {
        transform: 'translateY(-2px)',
      }
    }}
    onClick={onClick}
  >
    <CardContent sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: 180,
      p: 3,
    }}>
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: 4,
          p: 3,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 16px ${color}66`,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: color, textAlign: 'center', fontSize: '1.375rem' }}>
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, textAlign: 'center', fontSize: '1.75rem' }}>
        🚗 Oto Yıkama CRM
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <QuickAccessButton
            title="Yeni İşlem"
            icon={<CarIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#10b981"
            path="/yeni-islem"
            onClick={() => navigate('/yeni-islem')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="İşlemler"
            icon={<BuildIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#3b82f6"
            path="/islemler"
            onClick={() => navigate('/islemler')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Borç Takip"
            icon={<PeopleIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#f59e0b"
            path="/borc-takip"
            onClick={() => navigate('/borc-takip')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Raporlar"
            icon={<AssessmentIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#ef4444"
            path="/raporlar"
            onClick={() => navigate('/raporlar')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Hizmet Yönetimi"
            icon={<SettingsIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#8b5cf6"
            path="/hizmetler"
            onClick={() => navigate('/hizmetler')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Müşteri Listesi"
            icon={<ListIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#06b6d4"
            path="/musteri-listesi"
            onClick={() => navigate('/musteri-listesi')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
