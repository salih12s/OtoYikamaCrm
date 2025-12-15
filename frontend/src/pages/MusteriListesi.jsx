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
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { musteriler, istatistikler } from '../api';

export default function MusteriListesi() {
  const [musteriList, setMusteriList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('kayit_tarihi');
  const [aylikIstatistik, setAylikIstatistik] = useState({
    aylik_musteri: 0,
    aylik_kazanc: 0
  });

  useEffect(() => {
    fetchMusteriler();
    fetchAylikIstatistik();
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

  const fetchAylikIstatistik = async () => {
    try {
      const response = await istatistikler.aylik();
      setAylikIstatistik(response.data);
    } catch (error) {
      console.error('Aylık istatistikler yüklenemedi:', error);
    }
  };

  const filterAndSort = useCallback(() => {
    let filtered = [...musteriList];

    // Arama filtresi (plaka ve notlar)
    if (searchTerm) {
      filtered = filtered.filter(
        (musteri) =>
          musteri.plaka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          musteri.notlar?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'plaka':
          return (a.plaka || '').localeCompare(b.plaka || '');
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
                placeholder="Plaka veya not ile ara..."
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
                  <MenuItem value="plaka">Plakaya Göre (A → Z)</MenuItem>
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
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam Müşteri</Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {filteredList.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Aylık Müşteri</Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {aylikIstatistik.aylik_musteri}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam gelir</Typography>
              <Typography variant="h5" fontWeight="bold" color="success.main">
                ₺{filteredList.reduce((sum, m) => sum + parseFloat(m.toplam_harcama || 0), 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Aylık Kazanç</Typography>
              <Typography variant="h5" fontWeight="bold" color="success.main">
                ₺{aylikIstatistik.aylik_kazanc.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Toplam Borç</Typography>
              <Typography variant="h5" fontWeight="bold" color="error.main">
                ₺{filteredList.reduce((sum, m) => sum + parseFloat(m.aktif_bakiye || 0), 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">Borçlu Müşteri</Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {filteredList.filter(m => parseFloat(m.aktif_bakiye || 0) > 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Müşteri Listesi Tablosu */}
      <Card>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          {filteredList.length === 0 ? (
            <Alert severity="info">
              {searchTerm ? 'Arama kriterlerine uygun müşteri bulunamadı.' : 'Henüz müşteri kaydı bulunmuyor.'}
            </Alert>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small" sx={{ minWidth: 400 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ py: 0.5, px: 1, fontSize: '12px', fontWeight: 'bold' }}>Plaka</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, px: 1, fontSize: '12px', fontWeight: 'bold' }}>Gelir</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, px: 1, fontSize: '12px', fontWeight: 'bold' }}>Borç</TableCell>
                    <TableCell align="center" sx={{ py: 0.5, px: 1, fontSize: '12px', fontWeight: 'bold' }}>Kayıt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredList.map((musteri) => (
                    <TableRow key={musteri.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography fontWeight="600" fontSize="13px">{musteri.plaka || '-'}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                        <Chip 
                          label={`₺${parseFloat(musteri.toplam_harcama || 0).toFixed(0)}`}
                          color="success"
                          size="small"
                          sx={{ fontWeight: 'bold', fontSize: '10px', height: '20px', minWidth: '50px' }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                        {parseFloat(musteri.aktif_bakiye || 0) > 0 ? (
                          <Chip 
                            label={`₺${parseFloat(musteri.aktif_bakiye || 0).toFixed(0)}`}
                            color="error"
                            size="small"
                            sx={{ fontWeight: 'bold', fontSize: '10px', height: '20px', minWidth: '50px' }}
                          />
                        ) : (
                          <Chip 
                            label="₺0"
                            color="default"
                            size="small"
                            sx={{ fontSize: '10px', height: '20px', minWidth: '40px' }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                        <Typography fontSize="11px" color="text.secondary">
                          {new Date(musteri.kayit_tarihi).toLocaleDateString('tr-TR', { 
                            day: '2-digit', 
                            month: '2-digit'
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
