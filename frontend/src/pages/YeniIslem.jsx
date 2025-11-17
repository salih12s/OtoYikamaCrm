import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Alert,
  Snackbar,
  InputAdornment,
  Autocomplete,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  DirectionsCar as CarIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { hizmetler, islemler } from '../api';

export default function YeniIslem() {
  const [formData, setFormData] = useState({
    musteri_id: null,
    plaka: '',
    marka: '',
    model: '',
    hizmet_turu: '',
    tutar: '',
    odenen_tutar: '',
    odeme_yontemi: 'Nakit',
    notlar: '',
    durum: 'Bekliyor',
  });

  const [hizmetList, setHizmetList] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [selectedHizmetler, setSelectedHizmetler] = useState([]);
  const [plakaError, setPlakaError] = useState('');

  useEffect(() => {
    fetchHizmetler();
  }, []);

  const fetchHizmetler = async () => {
    try {
      const response = await hizmetler.getAll();
      setHizmetList(response.data);
    } catch (error) {
      console.error('Hizmetler yüklenemedi:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'plaka') {
      const upperValue = value.toUpperCase();
      setFormData({ ...formData, [name]: upperValue });
      
      // Boşluk kontrolü
      if (upperValue.length > 0 && !upperValue.includes(' ')) {
        setPlakaError('Plaka formatı: 34 ABC 123 (İl kodu ve harfler arasında boşluk olmalı)');
      } else {
        setPlakaError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const kalanTutar = parseFloat(formData.tutar || 0) - parseFloat(formData.odenen_tutar || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.plaka || selectedHizmetler.length === 0 || !formData.tutar) {
      setSnackbar({
        open: true,
        message: 'Plaka, hizmet türü ve tutar alanları zorunludur!',
        severity: 'error',
      });
      return;
    }

    // Plaka boşluk kontrolü
    if (!formData.plaka.includes(' ')) {
      setSnackbar({
        open: true,
        message: 'Plaka formatı yanlış! Boşluk kullanın (34 ABC 123)',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      // Seçilen hizmetleri '+' ile birleştir
      const hizmetTuruStr = selectedHizmetler.join('+');
      
      await islemler.create({
        ...formData,
        hizmet_turu: hizmetTuruStr,
        musteri_id: null,
      });
      
      setSnackbar({
        open: true,
        message: '✅ İşlem başarıyla eklendi!',
        severity: 'success',
      });
      
      // Formu temizle
      setSelectedHizmetler([]);
      setPlakaError('');
      setFormData({
        musteri_id: null,
        plaka: '',
        marka: '',
        model: '',
        hizmet_turu: '',
        tutar: '',
        odenen_tutar: '',
        odeme_yontemi: 'Nakit',
        notlar: '',
        durum: 'Bekliyor',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Hata: ' + (error.response?.data?.error || error.message),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        🚗 Yeni İşlem Ekle
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Araç Bilgileri */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CarIcon /> Araç Bilgileri
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Plaka"
                      name="plaka"
                      value={formData.plaka}
                      onChange={handleChange}
                      required
                      placeholder="34 ABC 123"
                      error={!!plakaError}
                      helperText={plakaError || "Plaka otomatik büyük harfe dönüştürülür"}
                      InputProps={{
                        style: { fontSize: '18px', fontWeight: 'bold' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Marka"
                      name="marka"
                      value={formData.marka}
                      onChange={handleChange}
                      placeholder="Örn: BMW"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="Örn: 3.20i"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Hizmet ve Ödeme */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MoneyIcon /> Hizmet ve Ödeme
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={hizmetList.map(h => h.hizmet_adi)}
                      value={selectedHizmetler}
                      onChange={(e, newValue) => setSelectedHizmetler(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const { key, ...tagProps } = getTagProps({ index });
                          return <Chip key={key} label={option} {...tagProps} />;
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Hizmet Türleri"
                          placeholder="Hizmet seçin"
                          required={selectedHizmetler.length === 0}
                          helperText={selectedHizmetler.length > 0 ? `Seçilen hizmetler: ${selectedHizmetler.join(' + ')}` : "Birden fazla hizmet seçebilirsiniz"}
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Toplam Tutar"
                      name="tutar"
                      value={formData.tutar}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                      }}
                      inputProps={{ step: '0.01', min: '0' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Ödenen Tutar"
                      name="odenen_tutar"
                      value={formData.odenen_tutar}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                      }}
                      inputProps={{ step: '0.01', min: '0' }}
                    />
                  </Grid>
                  
                  {kalanTutar > 0 && (
                    <Grid item xs={12}>
                      <Alert severity="warning">
                        <strong>Kalan Borç: ₺{kalanTutar.toFixed(2)}</strong>
                      </Alert>
                    </Grid>
                  )}
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Ödeme Yöntemi"
                      name="odeme_yontemi"
                      value={formData.odeme_yontemi}
                      onChange={handleChange}
                    >
                      <MenuItem value="Nakit">Nakit</MenuItem>
                      <MenuItem value="Kart">Kart</MenuItem>
                      <MenuItem value="Havale">Havale</MenuItem>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Durum"
                      name="durum"
                      value={formData.durum}
                      onChange={handleChange}
                    >
                      <MenuItem value="Bekliyor">Bekliyor</MenuItem>
                      <MenuItem value="İşlemde">İşlemde</MenuItem>
                      <MenuItem value="Teslim edildi">Teslim edildi</MenuItem>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Notlar"
                      name="notlar"
                      value={formData.notlar}
                      onChange={handleChange}
                      placeholder="Müşterinin özel istekleri, dikkat edilmesi gerekenler..."
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Kaydet Butonu */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={<SaveIcon />}
              sx={{ 
                minHeight: 64,
                fontSize: '20px',
                fontWeight: 'bold',
                mt: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  boxShadow: '0 12px 20px rgba(59, 130, 246, 0.6)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Kaydediliyor...' : '💾 İşlemi Kaydet'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
