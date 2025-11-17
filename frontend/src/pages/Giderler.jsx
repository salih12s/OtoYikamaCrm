import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  InputAdornment,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { giderler } from '../api';

export default function Giderler() {
  const [giderList, setGiderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGider, setEditingGider] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    tarih: new Date().toISOString().split('T')[0],
    kategori: 'Elektrik',
    aciklama: '',
    tutar: '',
  });

  const kategoriler = [
    'Genel',
    'Elektrik',
    'Su',
    'Kira',
    'Ürün Alımı',
    'Maaş',
    'Bakım-Onarım',
    'Vergi',
    'Diğer'
  ];

  useEffect(() => {
    fetchGiderler();
  }, [selectedMonth]);

  const fetchGiderler = async () => {
    try {
      setLoading(true);
      const response = await giderler.getAll();
      setGiderList(response.data);
    } catch (error) {
      console.error('Giderler yüklenemedi:', error);
      setSnackbar({ open: true, message: 'Giderler yüklenemedi', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (gider = null) => {
    if (gider) {
      setEditingGider(gider);
      setFormData({
        tarih: gider.tarih,
        kategori: gider.kategori,
        aciklama: gider.aciklama,
        tutar: gider.tutar,
      });
    } else {
      setEditingGider(null);
      setFormData({
        tarih: new Date().toISOString().split('T')[0],
        kategori: 'Elektrik',
        aciklama: '',
        tutar: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingGider(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.tutar || parseFloat(formData.tutar) <= 0) {
      setSnackbar({ open: true, message: 'Lütfen geçerli bir tutar girin', severity: 'error' });
      return;
    }
    
    try {
      if (editingGider) {
        await giderler.update(editingGider.id, formData);
        setSnackbar({ open: true, message: 'Gider güncellendi', severity: 'success' });
      } else {
        await giderler.create(formData);
        setSnackbar({ open: true, message: 'Gider eklendi', severity: 'success' });
      }
      fetchGiderler();
      handleCloseDialog();
    } catch (error) {
      console.error('Gider kaydedilemedi:', error);
      setSnackbar({ open: true, message: 'Hata: ' + (error.response?.data?.error || error.message), severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu gideri silmek istediğinize emin misiniz?')) {
      try {
        await giderler.delete(id);
        setSnackbar({ open: true, message: 'Gider silindi', severity: 'success' });
        fetchGiderler();
      } catch (error) {
        console.error('Gider silinemedi:', error);
        setSnackbar({ open: true, message: 'Hata: ' + (error.response?.data?.error || error.message), severity: 'error' });
      }
    }
  };

  // Seçili aya göre filtrele
  const filteredGiderler = giderList.filter(gider => {
    const giderMonth = gider.tarih.slice(0, 7);
    return giderMonth === selectedMonth;
  });

  const toplamGider = filteredGiderler.reduce((sum, g) => sum + parseFloat(g.tutar || 0), 0);

  // Kategoriye göre grupla
  const kategoriOzet = kategoriler.map(kat => {
    const katGiderler = filteredGiderler.filter(g => g.kategori === kat);
    const toplam = katGiderler.reduce((sum, g) => sum + parseFloat(g.tutar || 0), 0);
    return { kategori: kat, toplam, adet: katGiderler.length };
  }).filter(k => k.adet > 0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon /> Giderler
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="large"
        >
          Yeni Gider
        </Button>
      </Box>

      {/* Ay Seçimi ve Özet */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="month"
            label="Ay Seç"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: 'error.dark' }}>
            <CardContent>
              <Typography variant="body2" color="white">Toplam Gider</Typography>
              <Typography variant="h4" fontWeight="bold" color="white">
                ₺{toplamGider.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="white">
                {filteredGiderler.length} kayıt
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Kategori Özeti */}
      {kategoriOzet.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Kategorilere Göre Dağılım</Typography>
            <Grid container spacing={1}>
              {kategoriOzet.map((k) => (
                <Grid item xs={6} sm={4} md={3} key={k.kategori}>
                  <Box sx={{ p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">{k.kategori}</Typography>
                    <Typography variant="h6" fontWeight="bold">₺{k.toplam.toFixed(2)}</Typography>
                    <Typography variant="caption">{k.adet} kayıt</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Gider Listesi */}
      <Card>
        <CardContent>
          {filteredGiderler.length === 0 ? (
            <Alert severity="info">Bu ay için kayıtlı gider bulunmuyor.</Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Tarih</strong></TableCell>
                    <TableCell><strong>Kategori</strong></TableCell>
                    <TableCell><strong>Açıklama</strong></TableCell>
                    <TableCell align="right"><strong>Tutar</strong></TableCell>
                    <TableCell align="center"><strong>İşlemler</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGiderler
                    .sort((a, b) => new Date(b.tarih) - new Date(a.tarih))
                    .map((gider) => (
                      <TableRow key={gider.id} hover>
                        <TableCell>
                          {new Date(gider.tarih).toLocaleDateString('tr-TR')}
                        </TableCell>
                        <TableCell>
                          <Chip label={gider.kategori} size="small" color="primary" />
                        </TableCell>
                        <TableCell>{gider.aciklama}</TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="error">
                            ₺{parseFloat(gider.tutar).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(gider)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(gider.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Gider Ekleme/Düzenleme Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingGider ? 'Gider Düzenle' : 'Yeni Gider Ekle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Tarih"
                name="tarih"
                value={formData.tarih}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& input[type="date"]': {
                    colorScheme: 'dark',
                  },
                  '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    filter: 'invert(1)',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
              >
                {kategoriler.map((kat) => (
                  <MenuItem key={kat} value={kat}>
                    {kat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                name="aciklama"
                value={formData.aciklama}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="Gider açıklaması"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Tutar"
                name="tutar"
                value={formData.tutar}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingGider ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
