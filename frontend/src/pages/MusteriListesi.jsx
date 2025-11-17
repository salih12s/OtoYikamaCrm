import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { musteriler } from '../api';

export default function MusteriListesi() {
  const [musteriList, setMusteriList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('kayit_tarihi');

  useEffect(() => {
    fetchMusteriler();
  }, []);

  const fetchMusteriler = async () => {
    try {
      setLoading(true);
      const response = await musteriler.getAll();
      setMusteriList(response.data);
      setFilteredList(response.data);
    } catch (error) {
      console.error('Müşteriler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSort = useCallback(() => {
    let filtered = [...musteriList];

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (musteri) =>
          musteri.ad_soyad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          musteri.telefon?.includes(searchTerm)
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ad_soyad':
          return (a.ad_soyad || '').localeCompare(b.ad_soyad || '');
        case 'toplam_harcama':
          return (b.toplam_harcama || 0) - (a.toplam_harcama || 0);
        case 'aktif_bakiye':
          return (b.aktif_bakiye || 0) - (a.aktif_bakiye || 0);
        case 'kayit_tarihi':
        default:
          return new Date(b.kayit_tarihi) - new Date(a.kayit_tarihi);
      }
    });

    setFilteredList(filtered);
  }, [searchTerm, sortBy, musteriList]);

  useEffect(() => {
    filterAndSort();
  }, [filterAndSort]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon /> Müşteri Listesi
      </Typography>

      {/* Filtreleme ve Arama */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                placeholder="Müşteri adı veya telefon ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Sırala</InputLabel>
                <Select
                  value={sortBy}
                  label="Sırala"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="kayit_tarihi">Kayıt Tarihi (Yeni → Eski)</MenuItem>
                  <MenuItem value="ad_soyad">İsme Göre (A → Z)</MenuItem>
                  <MenuItem value="toplam_harcama">Toplam Harcama (Çok → Az)</MenuItem>
                  <MenuItem value="aktif_bakiye">Borç Durumu (Çok → Az)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Özet Bilgi */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3b82f633 0%, #3b82f622 100%)', border: '2px solid #3b82f6' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam Müşteri</Typography>
              <Typography variant="h4" fontWeight="bold" color="#3b82f6">
                {filteredList.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #10b98133 0%, #10b98122 100%)', border: '2px solid #10b981' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam Harcama</Typography>
              <Typography variant="h5" fontWeight="bold" color="#10b981">
                ₺{filteredList.reduce((sum, m) => sum + parseFloat(m.toplam_harcama || 0), 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ef444433 0%, #ef444422 100%)', border: '2px solid #ef4444' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam Borç</Typography>
              <Typography variant="h5" fontWeight="bold" color="#ef4444">
                ₺{filteredList.reduce((sum, m) => sum + parseFloat(m.aktif_bakiye || 0), 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b33 0%, #f59e0b22 100%)', border: '2px solid #f59e0b' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Borçlu Müşteri</Typography>
              <Typography variant="h4" fontWeight="bold" color="#f59e0b">
                {filteredList.filter(m => parseFloat(m.aktif_bakiye || 0) > 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Müşteri Listesi Tablosu */}
      <Card>
        <CardContent>
          {filteredList.length === 0 ? (
            <Alert severity="info">
              {searchTerm ? 'Arama kriterlerine uygun müşteri bulunamadı.' : 'Henüz müşteri kaydı bulunmuyor.'}
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Müşteri Adı</strong></TableCell>
                    <TableCell><strong>Telefon</strong></TableCell>
                    <TableCell align="right"><strong>Toplam Harcama</strong></TableCell>
                    <TableCell align="right"><strong>Borç</strong></TableCell>
                    <TableCell><strong>Kayıt Tarihi</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredList.map((musteri) => (
                    <TableRow key={musteri.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon fontSize="small" color="primary" />
                          <Typography fontWeight="600">{musteri.ad_soyad}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon fontSize="small" color="action" />
                          {musteri.telefon || '-'}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={`₺${parseFloat(musteri.toplam_harcama || 0).toFixed(2)}`}
                          color="success"
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {parseFloat(musteri.aktif_bakiye || 0) > 0 ? (
                          <Chip 
                            label={`₺${parseFloat(musteri.aktif_bakiye || 0).toFixed(2)}`}
                            color="error"
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        ) : (
                          <Chip 
                            label="₺0.00"
                            color="default"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarIcon fontSize="small" color="action" />
                          {new Date(musteri.kayit_tarihi).toLocaleDateString('tr-TR')}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
