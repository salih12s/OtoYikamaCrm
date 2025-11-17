import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { islemler } from '../api';

export default function BorcTakip() {
  const [borcluList, setBorcluList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorc, setSelectedBorc] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('tutar_desc');
  const [odemeData, setOdemeData] = useState({
    odenen_miktar: '',
    odeme_yontemi: 'Nakit',
    odeme_tarihi: new Date().toISOString().split('T')[0],
    notlar: '',
  });
  const [islemDetay, setIslemDetay] = useState([]);

  useEffect(() => {
    fetchBorcluler();
  }, []);

  const fetchBorcluler = async () => {
    try {
      setLoading(true);
      // Kalan tutarı olan tüm işlemleri getir
      const response = await islemler.getAll();
      const borcluIslemler = response.data.filter(
        (islem) => parseFloat(islem.kalan_tutar) > 0
      );
      setBorcluList(borcluIslemler);
    } catch (error) {
      console.error('Borçlu listesi yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOdemeAl = (islem) => {
    setSelectedBorc(islem);
    setOdemeData({
      odenen_miktar: islem.kalan_tutar,
      odeme_yontemi: 'Nakit',
      odeme_tarihi: new Date().toISOString().split('T')[0],
      notlar: '',
    });
    setPaymentDialog(true);
  };

  const handleOdemeKaydet = async () => {
    try {
      await islemler.addPayment(selectedBorc.id, {
        odenen_miktar: odemeData.odenen_miktar,
        odeme_yontemi: odemeData.odeme_yontemi,
        notlar: `Ödeme Tarihi: ${odemeData.odeme_tarihi}. ${odemeData.notlar}`,
      });
      
      setPaymentDialog(false);
      fetchBorcluler();
      alert('✅ Ödeme başarıyla kaydedildi!');
    } catch (error) {
      console.error('Ödeme kaydedilirken hata:', error);
      alert('Hata: ' + (error.response?.data?.error || error.message));
    }
  };

  const filteredAndSortedList = borcluList
    .filter((islem) => {
      return searchTerm === '' ||
        islem.plaka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        islem.ad_soyad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        islem.telefon?.includes(searchTerm);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'tutar_desc':
          return parseFloat(b.kalan_tutar) - parseFloat(a.kalan_tutar);
        case 'tutar_asc':
          return parseFloat(a.kalan_tutar) - parseFloat(b.kalan_tutar);
        case 'tarih_desc':
          return new Date(b.gelis_tarihi) - new Date(a.gelis_tarihi);
        case 'tarih_asc':
          return new Date(a.gelis_tarihi) - new Date(b.gelis_tarihi);
        default:
          return 0;
      }
    });

  const handleGecmisGoster = async (islem) => {
    setSelectedBorc(islem);
    // İşlem detaylarını göster
    setIslemDetay([
      {
        tarih: islem.gelis_tarihi,
        aciklama: 'İşlem Oluşturuldu',
        tutar: islem.tutar,
        odenen: islem.odenen_tutar,
        kalan: islem.kalan_tutar,
      },
    ]);
    setHistoryDialog(true);
  };

  const toplamBorc = filteredAndSortedList.reduce(
    (sum, islem) => sum + parseFloat(islem.kalan_tutar),
    0
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        💳 Borç Takip Sistemi
      </Typography>

      {/* Özet Kartı */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #ef444433 0%, #ef444422 100%)', border: '2px solid #ef4444' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="600">
                Toplam Borç
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="#ef4444">
                ₺{toplamBorc.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.primary" fontWeight="500">
                {filteredAndSortedList.length} borçlu işlem
              </Typography>
            </Box>
            <WarningIcon sx={{ fontSize: 80, color: '#ef4444', opacity: 0.5 }} />
          </Box>
        </CardContent>
      </Card>

      {/* Arama ve Sıralama */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                placeholder="Müşteri adı, plaka veya telefon ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Sırala"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
              >
                <MenuItem value="tutar_desc">Borç (Çok → Az)</MenuItem>
                <MenuItem value="tutar_asc">Borç (Az → Çok)</MenuItem>
                <MenuItem value="tarih_desc">Tarih (Yeni → Eski)</MenuItem>
                <MenuItem value="tarih_asc">Tarih (Eski → Yeni)</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Borçlu Listesi */}
      {borcluList.length === 0 ? (
        <Alert severity="success" icon={<CheckIcon />}>
          <Typography variant="h6">Harika! Hiç borç yok! 🎉</Typography>
          Tüm ödemeler tamamlanmış durumda.
        </Alert>
      ) : filteredAndSortedList.length === 0 ? (
        <Alert severity="info">Arama kriterlerine uygun borçlu işlem bulunamadı.</Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredAndSortedList.map((islem) => (
            <Grid item xs={12} key={islem.id}>
              <Card>
                <CardContent>
                  {/* Başlık */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {islem.plaka}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {islem.marka} {islem.model}
                      </Typography>
                      {islem.ad_soyad && (
                        <Typography variant="body2" color="text.secondary">
                          👤 {islem.ad_soyad} - {islem.telefon}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      icon={<WarningIcon />}
                      label="Borçlu"
                      color="error"
                      size="medium"
                    />
                  </Box>

                  {/* Hizmet Bilgisi */}
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    🛠️ {islem.hizmet_turu}
                  </Typography>

                  {/* Ödeme Bilgileri */}
                  <Grid container spacing={2} sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#3b82f622' }}>
                        <Typography variant="caption" color="text.secondary">
                          Toplam Tutar
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="#3b82f6">
                          ₺{parseFloat(islem.tutar).toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#10b98122' }}>
                        <Typography variant="caption" color="text.secondary">
                          Ödenen
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="#10b981">
                          ₺{parseFloat(islem.odenen_tutar).toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#ef444422' }}>
                        <Typography variant="caption" color="text.secondary">
                          Kalan Borç
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="#ef4444">
                          ₺{parseFloat(islem.kalan_tutar).toFixed(2)}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Tarih Bilgisi */}
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    📅 İşlem Tarihi: {new Date(islem.gelis_tarihi).toLocaleString('tr-TR')}
                  </Typography>

                  {/* Notlar */}
                  {islem.notlar && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {islem.notlar}
                    </Alert>
                  )}

                  {/* Aksiyon Butonları */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<PaymentIcon />}
                      onClick={() => handleOdemeAl(islem)}
                      fullWidth
                      sx={{ minHeight: 48 }}
                    >
                      Ödeme Al
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<HistoryIcon />}
                      onClick={() => handleGecmisGoster(islem)}
                      fullWidth
                      sx={{ minHeight: 48 }}
                    >
                      Geçmiş
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Ödeme Dialog */}
      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>💰 Ödeme Al</DialogTitle>
        <DialogContent>
          {selectedBorc && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  <strong>{selectedBorc.plaka}</strong>
                </Typography>
                <Typography variant="h6" color="error.main">
                  Kalan Borç: ₺{parseFloat(selectedBorc.kalan_tutar).toFixed(2)}
                </Typography>
              </Alert>

              <TextField
                fullWidth
                type="number"
                label="Ödenen Miktar"
                value={odemeData.odenen_miktar}
                onChange={(e) => setOdemeData({ ...odemeData, odenen_miktar: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                }}
                inputProps={{ step: '0.01', min: '0', max: selectedBorc.kalan_tutar }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="date"
                label="Ödeme Tarihi"
                value={odemeData.odeme_tarihi}
                onChange={(e) => setOdemeData({ ...odemeData, odeme_tarihi: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                select
                label="Ödeme Yöntemi"
                value={odemeData.odeme_yontemi}
                onChange={(e) => setOdemeData({ ...odemeData, odeme_yontemi: e.target.value })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Nakit">Nakit</MenuItem>
                <MenuItem value="Kart">Kart</MenuItem>
                <MenuItem value="Havale">Havale</MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notlar (opsiyonel)"
                value={odemeData.notlar}
                onChange={(e) => setOdemeData({ ...odemeData, notlar: e.target.value })}
                placeholder="Örn: Sonraki ödeme 1 hafta sonra"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>İptal</Button>
          <Button
            onClick={handleOdemeKaydet}
            variant="contained"
            color="success"
            disabled={!odemeData.odenen_miktar || parseFloat(odemeData.odenen_miktar) <= 0}
          >
            Ödemeyi Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Geçmiş Dialog */}
      <Dialog open={historyDialog} onClose={() => setHistoryDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>📜 İşlem Geçmişi</DialogTitle>
        <DialogContent>
          {selectedBorc && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedBorc.plaka} - {selectedBorc.hizmet_turu}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tarih</TableCell>
                      <TableCell>İşlem</TableCell>
                      <TableCell align="right">Tutar</TableCell>
                      <TableCell align="right">Ödenen</TableCell>
                      <TableCell align="right">Kalan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {islemDetay.map((detay, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(detay.tarih).toLocaleDateString('tr-TR')}
                        </TableCell>
                        <TableCell>{detay.aciklama}</TableCell>
                        <TableCell align="right">₺{parseFloat(detay.tutar).toFixed(2)}</TableCell>
                        <TableCell align="right">₺{parseFloat(detay.odenen).toFixed(2)}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`₺${parseFloat(detay.kalan).toFixed(2)}`}
                            color={parseFloat(detay.kalan) > 0 ? 'error' : 'success'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryDialog(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
