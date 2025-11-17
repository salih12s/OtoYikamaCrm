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
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  HourglassEmpty as HourglassIcon,
  Build as BuildIcon,
  Payment as PaymentIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { islemler } from '../api';

export default function Islemler() {
  const [islemList, setIslemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIslem, setSelectedIslem] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [durumFilter, setDurumFilter] = useState('Hepsi');
  const [tarihFilter, setTarihFilter] = useState('Tümü');
  const [paymentData, setPaymentData] = useState({
    odenen_miktar: '',
    odeme_yontemi: 'Nakit',
    notlar: '',
  });
  const [editData, setEditData] = useState({
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

  useEffect(() => {
    fetchIslemler();
  }, []);

  const fetchIslemler = async () => {
    try {
      setLoading(true);
      const response = await islemler.getAll();
      setIslemList(response.data);
      setError(null);
    } catch (err) {
      setError('İşlemler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDurumChange = async (id, yeniDurum) => {
    try {
      await islemler.updateDurum(id, yeniDurum);
      fetchIslemler();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      await islemler.addPayment(selectedIslem.id, paymentData);
      setPaymentDialog(false);
      setPaymentData({ odenen_miktar: '', odeme_yontemi: 'Nakit', notlar: '' });
      fetchIslemler();
    } catch (error) {
      console.error('Ödeme eklenirken hata:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await islemler.delete(selectedIslem.id);
      setDeleteDialog(false);
      setSelectedIslem(null);
      fetchIslemler();
    } catch (error) {
      console.error('İşlem silinirken hata:', error);
      alert(error.response?.data?.error || 'İşlem silinirken hata oluştu');
    }
  };

  const handleEditOpen = (islem) => {
    setSelectedIslem(islem);
    setEditData({
      plaka: islem.plaka,
      marka: islem.marka || '',
      model: islem.model || '',
      hizmet_turu: islem.hizmet_turu,
      tutar: islem.tutar,
      odenen_tutar: islem.odenen_tutar,
      odeme_yontemi: islem.odeme_yontemi || 'Nakit',
      notlar: islem.notlar || '',
      durum: islem.durum,
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      await islemler.update(selectedIslem.id, editData);
      setEditDialog(false);
      setSelectedIslem(null);
      fetchIslemler();
    } catch (error) {
      console.error('İşlem güncellenirken hata:', error);
      alert(error.response?.data?.error || 'İşlem güncellenirken hata oluştu');
    }
  };

  const getDurumColor = (durum) => {
    switch (durum) {
      case 'Bekliyor': return 'warning';
      case 'İşlemde': return 'info';
      case 'Teslim edildi': return 'success';
      default: return 'default';
    }
  };

  const getDurumIcon = (durum) => {
    switch (durum) {
      case 'Bekliyor': return <HourglassIcon />;
      case 'İşlemde': return <BuildIcon />;
      case 'Teslim edildi': return <CheckIcon />;
      default: return null;
    }
  };

  const filteredList = islemList.filter((islem) => {
    const matchesSearch = searchTerm === '' || 
      islem.plaka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      islem.ad_soyad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      islem.telefon?.includes(searchTerm) ||
      islem.marka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      islem.model?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDurum = durumFilter === 'Hepsi' || islem.durum === durumFilter;
    
    const matchesTarih = tarihFilter === 'Tümü' || 
      (tarihFilter === 'Bugün' && new Date(islem.gelis_tarihi).toDateString() === new Date().toDateString());
    
    return matchesSearch && matchesDurum && matchesTarih;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        🔧 İşlemler ({filteredList.length})
      </Typography>

      {/* Arama ve Filtre */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Plaka, müşteri adı, telefon ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                select
                fullWidth
                label="Tarih"
                value={tarihFilter}
                onChange={(e) => setTarihFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="Tümü">Tümü</MenuItem>
                <MenuItem value="Bugün">Bugün</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                select
                fullWidth
                label="Durum"
                value={durumFilter}
                onChange={(e) => setDurumFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="Hepsi">Hepsi</MenuItem>
                <MenuItem value="Bekliyor">Bekliyor</MenuItem>
                <MenuItem value="İşlemde">İşlemde</MenuItem>
                <MenuItem value="Teslim edildi">Teslim edildi</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {filteredList.length === 0 ? (
        <Alert severity="info">{searchTerm || durumFilter !== 'Hepsi' || tarihFilter !== 'Tümü' ? 'Arama kriterlerine uygun işlem bulunamadı.' : 'Henüz işlem bulunmuyor.'}</Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredList.map((islem) => (
            <Grid item xs={12} key={islem.id}>
              <Card>
                <CardContent>
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
                      icon={getDurumIcon(islem.durum)}
                      label={islem.durum}
                      color={getDurumColor(islem.durum)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    🛠️ {islem.hizmet_turu}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
                    <Chip label={`Tutar: ₺${parseFloat(islem.tutar).toFixed(2)}`} size="small" />
                    <Chip 
                      label={`Ödenen: ₺${parseFloat(islem.odenen_tutar).toFixed(2)}`} 
                      color="success" 
                      size="small" 
                    />
                    {parseFloat(islem.kalan_tutar) > 0 && (
                      <Chip 
                        label={`Kalan: ₺${parseFloat(islem.kalan_tutar).toFixed(2)}`} 
                        color="error" 
                        size="small" 
                      />
                    )}
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    📅 {new Date(islem.gelis_tarihi).toLocaleString('tr-TR', { 
                      timeZone: 'Europe/Istanbul',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                    {islem.durum !== 'Teslim edildi' && (
                      <>
                        {islem.durum === 'Bekliyor' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={() => handleDurumChange(islem.id, 'İşlemde')}
                          >
                            İşleme Al
                          </Button>
                        )}
                        {islem.durum === 'İşlemde' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleDurumChange(islem.id, 'Teslim edildi')}
                          >
                            Teslim Et
                          </Button>
                        )}
                      </>
                    )}
                    {parseFloat(islem.kalan_tutar) > 0 && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PaymentIcon />}
                        onClick={() => {
                          setSelectedIslem(islem);
                          setPaymentDialog(true);
                        }}
                      >
                        Ödeme Al
                      </Button>
                    )}
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditOpen(islem)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setSelectedIslem(islem);
                        setDeleteDialog(true);
                      }}
                    >
                      Sil
                    </Button>
                  </Box>

                  {islem.notlar && (
                    <Alert severity="info" sx={{ mt: 2 }} icon={<InfoIcon />}>
                      {islem.notlar}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Ödeme Dialog */}
      <Dialog 
        open={paymentDialog} 
        onClose={() => setPaymentDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>💰 Ödeme Al</DialogTitle>
        <DialogContent>
          {selectedIslem && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>{selectedIslem.plaka}</strong> - Kalan Borç: ₺{parseFloat(selectedIslem.kalan_tutar).toFixed(2)}
              </Alert>
              
              <TextField
                fullWidth
                type="number"
                label="Ödenen Miktar"
                value={paymentData.odenen_miktar}
                onChange={(e) => setPaymentData({ ...paymentData, odenen_miktar: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                }}
                inputProps={{ step: '0.01', min: '0', max: selectedIslem.kalan_tutar }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                select
                label="Ödeme Yöntemi"
                value={paymentData.odeme_yontemi}
                onChange={(e) => setPaymentData({ ...paymentData, odeme_yontemi: e.target.value })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Nakit">Nakit</MenuItem>
                <MenuItem value="Kart">Kart</MenuItem>
                <MenuItem value="Havale">Havale</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Not (opsiyonel)"
                value={paymentData.notlar}
                onChange={(e) => setPaymentData({ ...paymentData, notlar: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>İptal</Button>
          <Button 
            onClick={handlePaymentSubmit} 
            variant="contained"
            disabled={!paymentData.odenen_miktar || parseFloat(paymentData.odenen_miktar) <= 0}
          >
            Ödemeyi Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Düzenleme Dialog */}
      <Dialog 
        open={editDialog} 
        onClose={() => setEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>✏️ İşlem Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Plaka"
              value={editData.plaka}
              onChange={(e) => setEditData({ ...editData, plaka: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Marka"
              value={editData.marka}
              onChange={(e) => setEditData({ ...editData, marka: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Model"
              value={editData.model}
              onChange={(e) => setEditData({ ...editData, model: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Hizmet Türü"
              value={editData.hizmet_turu}
              onChange={(e) => setEditData({ ...editData, hizmet_turu: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Toplam Tutar"
              value={editData.tutar}
              onChange={(e) => setEditData({ ...editData, tutar: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₺</InputAdornment>,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Ödenen Tutar"
              value={editData.odenen_tutar}
              onChange={(e) => setEditData({ ...editData, odenen_tutar: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₺</InputAdornment>,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Ödeme Yöntemi"
              value={editData.odeme_yontemi}
              onChange={(e) => setEditData({ ...editData, odeme_yontemi: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Nakit">Nakit</MenuItem>
              <MenuItem value="Kart">Kart</MenuItem>
              <MenuItem value="Havale">Havale</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Durum"
              value={editData.durum}
              onChange={(e) => setEditData({ ...editData, durum: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Bekliyor">Bekliyor</MenuItem>
              <MenuItem value="İşlemde">İşlemde</MenuItem>
              <MenuItem value="Teslim edildi">Teslim edildi</MenuItem>
            </TextField>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Notlar"
              value={editData.notlar}
              onChange={(e) => setEditData({ ...editData, notlar: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>İptal</Button>
          <Button 
            onClick={handleEditSubmit} 
            variant="contained"
            color="primary"
          >
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Silme Onay Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>⚠️ İşlem Sil</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Bu işlemi silmek istediğinizden emin misiniz?
          </Alert>
          {selectedIslem && (
            <Typography variant="body2">
              <strong>{selectedIslem.plaka}</strong> - {selectedIslem.hizmet_turu}
              <br />
              Tutar: ₺{parseFloat(selectedIslem.tutar).toFixed(2)}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>İptal</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
