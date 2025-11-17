import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { raporlar, giderler } from '../api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Raporlar() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gunlukData, setGunlukData] = useState(null);
  const [haftalikData, setHaftalikData] = useState([]);
  const [giderData, setGiderData] = useState([]);
  const [giderOzet, setGiderOzet] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Gider dialog
  const [giderDialogOpen, setGiderDialogOpen] = useState(false);
  const [editingGider, setEditingGider] = useState(null);
  const [giderForm, setGiderForm] = useState({
    tarih: new Date().toISOString().split('T')[0],
    kategori: 'Elektrik',
    aciklama: '',
    tutar: '',
  });

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      switch (tabValue) {
        case 0: // Günlük Rapor
          const gunluk = await raporlar.gunluk(selectedDate);
          setGunlukData(gunluk.data);
          break;
        case 1: // Haftalık Rapor
          const haftalik = await raporlar.haftalik();
          setHaftalikData(haftalik.data);
          break;
        case 2: // Giderler
          const giderlerRes = await giderler.getAll();
          setGiderData(giderlerRes.data);
          const ozetRes = await giderler.getOzet();
          setGiderOzet(ozetRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Rapor yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [tabValue, selectedDate]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleGiderDialogOpen = (gider = null) => {
    if (gider) {
      setEditingGider(gider);
      setGiderForm({
        tarih: gider.tarih.split('T')[0],
        kategori: gider.kategori,
        aciklama: gider.aciklama || '',
        tutar: gider.tutar,
      });
    } else {
      setEditingGider(null);
      setGiderForm({
        tarih: new Date().toISOString().split('T')[0],
        kategori: 'Elektrik',
        aciklama: '',
        tutar: '',
      });
    }
    setGiderDialogOpen(true);
  };

  const handleGiderSubmit = async () => {
    try {
      if (editingGider) {
        await giderler.update(editingGider.id, giderForm);
      } else {
        await giderler.create(giderForm);
      }
      setGiderDialogOpen(false);
      loadReports();
    } catch (error) {
      console.error('Gider kaydedilirken hata:', error);
    }
  };

  const handleGiderDelete = async (id) => {
    if (window.confirm('Bu gideri silmek istediğinize emin misiniz?')) {
      try {
        await giderler.delete(id);
        loadReports();
      } catch (error) {
        console.error('Gider silinirken hata:', error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AssessmentIcon /> Raporlar
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Günlük" />
        <Tab label="Haftalık" />
        <Tab label="Giderler" />
      </Tabs>

      {/* Günlük Rapor */}
      <TabPanel value={tabValue} index={0}>
        <TextField
          type="date"
          label="Tarih Seçin"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />

        {gunlukData && (
          <>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card sx={{ background: 'linear-gradient(135deg, #10b98133 0%, #10b98122 100%)', border: '3px solid #10b981' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TrendingUpIcon sx={{ color: '#10b981' }} />
                      <Typography variant="body2" color="text.secondary">Gelir</Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" color="#10b981">
                      ₺{parseFloat(gunlukData.toplam_gelir || 0).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{gunlukData.toplam_islem} işlem</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card sx={{ background: 'linear-gradient(135deg, #ef444433 0%, #ef444422 100%)', border: '3px solid #ef4444' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TrendingDownIcon sx={{ color: '#ef4444' }} />
                      <Typography variant="body2" color="text.secondary">Tahsil Edilmedi</Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" color="#ef4444">
                      ₺{parseFloat(gunlukData.tahsil_edilmedi || 0).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Borç</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {gunlukData.odeme_yontemleri && gunlukData.odeme_yontemleri.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Ödeme Yöntemleri</Typography>
                  <Grid container spacing={2}>
                    {gunlukData.odeme_yontemleri.map((odeme, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Card sx={{ bgcolor: 'background.default', border: '2px solid', borderColor: '#3b82f6' }}>
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">{odeme.odeme_yontemi}</Typography>
                            <Typography variant="h6" fontWeight="bold" color="#3b82f6">
                              ₺{parseFloat(odeme.toplam).toFixed(2)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">{odeme.adet} işlem</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </TabPanel>

      {/* Haftalık Rapor */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Son 7 Günlük Gelir</Typography>
            {haftalikData.length === 0 ? (
              <Alert severity="info">Henüz veri bulunmuyor.</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Tarih</strong></TableCell>
                      <TableCell align="right"><strong>İşlem</strong></TableCell>
                      <TableCell align="right"><strong>Gelir</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {haftalikData.map((gun, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(gun.gun).toLocaleDateString('tr-TR')}</TableCell>
                        <TableCell align="right">
                          <Chip label={gun.toplam_islem} color="primary" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="#10b981">
                            ₺{parseFloat(gun.toplam_gelir).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    {haftalikData.length > 0 && (
                      <TableRow sx={{ bgcolor: 'background.default' }}>
                        <TableCell><strong>TOPLAM</strong></TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={haftalikData.reduce((sum, g) => sum + parseInt(g.toplam_islem), 0)} 
                            color="primary" 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="#10b981" variant="h6">
                            ₺{haftalikData.reduce((sum, g) => sum + parseFloat(g.toplam_gelir), 0).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Giderler */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Gider Yönetimi</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleGiderDialogOpen()}
          >
            Yeni Gider
          </Button>
        </Box>

        {/* Gider Özeti */}
        {giderOzet.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {giderOzet.map((ozet, idx) => (
              <Grid item xs={6} key={idx}>
                <Card sx={{ background: 'linear-gradient(135deg, #f59e0b33 0%, #f59e0b22 100%)', border: '2px solid #f59e0b' }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">{ozet.kategori}</Typography>
                    <Typography variant="h5" fontWeight="bold" color="#f59e0b">
                      ₺{parseFloat(ozet.toplam).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{ozet.adet} kayıt</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card sx={{ background: 'linear-gradient(135deg, #ef444433 0%, #ef444422 100%)', border: '3px solid #ef4444' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">TOPLAM GİDER</Typography>
                  <Typography variant="h4" fontWeight="bold" color="#ef4444">
                    ₺{giderOzet.reduce((sum, g) => sum + parseFloat(g.toplam), 0).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Gider Listesi */}
        <Card>
          <CardContent>
            {giderData.length === 0 ? (
              <Alert severity="info">Henüz gider kaydı bulunmuyor. "Yeni Gider" butonuna tıklayarak ekleyebilirsiniz.</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Tarih</strong></TableCell>
                      <TableCell><strong>Kategori</strong></TableCell>
                      <TableCell><strong>Açıklama</strong></TableCell>
                      <TableCell align="right"><strong>Tutar</strong></TableCell>
                      <TableCell align="right"><strong>İşlem</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {giderData.map((gider) => (
                      <TableRow key={gider.id} hover>
                        <TableCell>{new Date(gider.tarih).toLocaleDateString('tr-TR')}</TableCell>
                        <TableCell>
                          <Chip label={gider.kategori} size="small" color="warning" />
                        </TableCell>
                        <TableCell>{gider.aciklama || '-'}</TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="#ef4444">
                            ₺{parseFloat(gider.tutar).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" color="primary" onClick={() => handleGiderDialogOpen(gider)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleGiderDelete(gider.id)}>
                            <DeleteIcon fontSize="small" />
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
      </TabPanel>

      {/* Gider Ekleme/Düzenleme Dialog */}
      <Dialog open={giderDialogOpen} onClose={() => setGiderDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingGider ? 'Gider Düzenle' : 'Yeni Gider Ekle'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Tarih"
                value={giderForm.tarih}
                onChange={(e) => setGiderForm({ ...giderForm, tarih: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Kategori"
                value={giderForm.kategori}
                onChange={(e) => setGiderForm({ ...giderForm, kategori: e.target.value })}
              >
                <MenuItem value="Elektrik">Elektrik</MenuItem>
                <MenuItem value="Su">Su</MenuItem>
                <MenuItem value="Doğalgaz">Doğalgaz</MenuItem>
                <MenuItem value="Kira">Kira</MenuItem>
                <MenuItem value="Maaş">Maaş</MenuItem>
                <MenuItem value="Temizlik Malzemeleri">Temizlik Malzemeleri</MenuItem>
                <MenuItem value="Bakım-Onarım">Bakım-Onarım</MenuItem>
                <MenuItem value="Diğer">Diğer</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                value={giderForm.aciklama}
                onChange={(e) => setGiderForm({ ...giderForm, aciklama: e.target.value })}
                multiline
                rows={2}
                placeholder="Gider açıklaması (opsiyonel)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Tutar (₺)"
                value={giderForm.tutar}
                onChange={(e) => setGiderForm({ ...giderForm, tutar: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGiderDialogOpen(false)}>İptal</Button>
          <Button onClick={handleGiderSubmit} variant="contained" color="primary">
            {editingGider ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
