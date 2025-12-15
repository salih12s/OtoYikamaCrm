import React, { useState, useEffect } from 'react';
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
  Notes as NotesIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { raporlar } from '../api';

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
  const [durumOzeti, setDurumOzeti] = useState(null);

  useEffect(() => {
    fetchDurumOzeti();
  }, []);

  const fetchDurumOzeti = async () => {
    try {
      const response = await raporlar.dashboard();
      setDurumOzeti(response.data.durum_ozeti);
    } catch (error) {
      console.error('Durum özeti yüklenemedi:', error);
    }
  };

  return (
    <Box>
      {durumOzeti && (
        <Grid container spacing={1} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={2.4}>
            <Card sx={{ 
              background: '#d2a92fff',
              color: 'white',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(210, 169, 47, 0.3)'
            }}>
              <CardContent sx={{ py: 2, px: 1.5 }}>
                <Typography variant="h4" fontWeight="bold">
                  {durumOzeti.bugun_arac}
                </Typography>
                <Typography variant="body2" fontWeight="500">Bugün Araç</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={2.4}>
            <Card sx={{ 
              background: '#d2a92fff',
              color: 'white',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(210, 169, 47, 0.3)'
            }}>
              <CardContent sx={{ py: 2, px: 1.5 }}>
                <Typography variant="h4" fontWeight="bold">
                  ₺{parseFloat(durumOzeti.bugun_gelir || 0).toFixed(0)}
                </Typography>
                <Typography variant="body2" fontWeight="500">Gelir</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sm={2.4}>
            <Card sx={{ 
              background: '#d2a92fff',
              color: 'white',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(210, 169, 47, 0.3)'
            }}>
              <CardContent sx={{ py: 2, px: 1.5 }}>
                <Typography variant="h4" fontWeight="bold">
                  {durumOzeti.bekliyor || 0}
                </Typography>
                <Typography variant="body2" fontWeight="500">Bekliyor</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sm={2.4}>
            <Card sx={{ 
              background: '#d2a92fff',
              color: 'white',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(210, 169, 47, 0.3)'
            }}>
              <CardContent sx={{ py: 2, px: 1.5 }}>
                <Typography variant="h4" fontWeight="bold">
                  {durumOzeti.islemde || 0}
                </Typography>
                <Typography variant="body2" fontWeight="500">İşlemde</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} sm={2.4}>
            <Card sx={{ 
              background: '#d2a92fff',
              color: 'white',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(210, 169, 47, 0.3)'
            }}>
              <CardContent sx={{ py: 2, px: 1.5 }}>
                <Typography variant="h4" fontWeight="bold">
                  {durumOzeti.teslim || 0}
                </Typography>
                <Typography variant="body2" fontWeight="500">Teslim</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <QuickAccessButton
            title="Yeni İşlem"
            icon={<CarIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/yeni-islem"
            onClick={() => navigate('/yeni-islem')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="İşlemler"
            icon={<BuildIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/islemler"
            onClick={() => navigate('/islemler')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Borç Takip"
            icon={<PeopleIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/borc-takip"
            onClick={() => navigate('/borc-takip')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Giderler"
            icon={<AssessmentIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/giderler"
            onClick={() => navigate('/giderler')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Hizmet Yönetimi"
            icon={<SettingsIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/hizmetler"
            onClick={() => navigate('/hizmetler')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Müşteri Listesi"
            icon={<ListIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/musteri-listesi"
            onClick={() => navigate('/musteri-listesi')}
          />
        </Grid>

        <Grid item xs={12}>
          <QuickAccessButton
            title="Notlar"
            icon={<NotesIcon sx={{ color: 'white', fontSize: 56 }} />}
            color="#d2a92fff"
            path="/notlar"
            onClick={() => navigate('/notlar')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
