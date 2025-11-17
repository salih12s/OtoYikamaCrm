import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  DirectionsCar as CarIcon,
  AttachMoney as MoneyIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { musteriler } from '../api';

export default function Musteriler() {
  const [musteriList, setMusteriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMusteri, setSelectedMusteri] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [newMusteri, setNewMusteri] = useState({
    ad_soyad: '',
    telefon: '',
    notlar: '',
  });
  const [editMusteri, setEditMusteri] = useState({
    id: null,
    ad_soyad: '',
    telefon: '',
    notlar: '',
  });

  useEffect(() => {
    fetchMusteriler();
  }, []);

  const fetchMusteriler = async () => {
    try {
      setLoading(true);
      const response = await musteriler.getAll();
      setMusteriList(response.data);
      setError(null);
    } catch (err) {
      setError('Müşteriler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMusteriDetail = async (id) => {
    try {
      const response = await musteriler.getById(id);
      setSelectedMusteri(response.data);
      setDetailDialog(true);
    } catch (error) {
      console.error('Müşteri detayı yüklenirken hata:', error);
    }
  };

  const handleAddMusteri = async () => {
    try {
      await musteriler.create(newMusteri);
      setAddDialog(false);
      setNewMusteri({ ad_soyad: '', telefon: '', notlar: '' });
      fetchMusteriler();
    } catch (error) {
      console.error('Müşteri eklenirken hata:', error);
    }
  };

  const handleEditOpen = (musteri) => {
    setEditMusteri({
      id: musteri.id,
      ad_soyad: musteri.ad_soyad,
      telefon: musteri.telefon,
      notlar: musteri.notlar || '',
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      await musteriler.update(editMusteri.id, {
        ad_soyad: editMusteri.ad_soyad,
        telefon: editMusteri.telefon,
        notlar: editMusteri.notlar,
      });
      setEditDialog(false);
      fetchMusteriler();
    } catch (error) {
      console.error('Müşteri güncellenirken hata:', error);
      alert(error.response?.data?.error || 'Müşteri güncellenirken hata oluştu');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await musteriler.delete(selectedMusteri.id);
      setDeleteDialog(false);
      setSelectedMusteri(null);
      fetchMusteriler();
    } catch (error) {
      console.error('Müşteri silinirken hata:', error);
      alert(error.response?.data?.error || 'Müşteri silinirken hata oluştu');
    }
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          👥 Müşteriler ({musteriList.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialog(true)}
        >
          Yeni Müşteri
        </Button>
      </Box>

      {musteriList.length === 0 ? (
        <Alert severity="info">Henüz müşteri bulunmuyor.</Alert>
      ) : (
        <Grid container spacing={2}>
          {musteriList.map((musteri) => (
            <Grid item xs={12} sm={6} md={4} key={musteri.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {musteri.ad_soyad}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {musteri.telefon}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                    <Chip 
                      size="small" 
                      label={`${musteri.toplam_islem || 0} işlem`}
                      icon={<CarIcon />}
                    />
                    <Chip 
                      size="small" 
                      label={`₺${parseFloat(musteri.toplam_harcama || 0).toFixed(2)}`}
                      color="success"
                      icon={<MoneyIcon />}
                    />
                  </Box>

                  {parseFloat(musteri.aktif_bakiye) > 0 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Borç: ₺{parseFloat(musteri.aktif_bakiye).toFixed(2)}
                    </Alert>
                  )}

                  {musteri.son_gelis && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                      Son: {new Date(musteri.son_gelis).toLocaleDateString('tr-TR')}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      onClick={() => handleMusteriDetail(musteri.id)}
                    >
                      Detay
                    </Button>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditOpen(musteri);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMusteri(musteri);
                        setDeleteDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Müşteri Detay Dialog */}
      <Dialog
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>👤 Müşteri Detayları</DialogTitle>
        <DialogContent>
          {selectedMusteri && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Ad Soyad</Typography>
                  <Typography variant="h6">{selectedMusteri.ad_soyad}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Telefon</Typography>
                  <Typography variant="h6">{selectedMusteri.telefon}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Toplam Harcama</Typography>
                  <Typography variant="h6" color="success.main">
                    ₺{parseFloat(selectedMusteri.toplam_harcama || 0).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Aktif Bakiye</Typography>
                  <Typography variant="h6" color={parseFloat(selectedMusteri.aktif_bakiye) > 0 ? 'error.main' : 'inherit'}>
                    ₺{parseFloat(selectedMusteri.aktif_bakiye || 0).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">Kayıt Tarihi</Typography>
                  <Typography variant="h6">
                    {new Date(selectedMusteri.kayit_tarihi).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                🚗 Araç Geçmişi ({selectedMusteri.araclar?.length || 0})
              </Typography>

              {selectedMusteri.araclar && selectedMusteri.araclar.length > 0 ? (
                <List>
                  {selectedMusteri.araclar.slice(0, 5).map((arac) => (
                    <React.Fragment key={arac.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box>
                              <strong>{arac.plaka}</strong> - {arac.marka} {arac.model}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {arac.hizmet_turu} - ₺{parseFloat(arac.tutar).toFixed(2)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(arac.gelis_tarihi).toLocaleString('tr-TR')}
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip 
                          label={arac.durum} 
                          size="small"
                          color={
                            arac.durum === 'Teslim edildi' ? 'success' : 
                            arac.durum === 'İşlemde' ? 'info' : 'warning'
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Alert severity="info">Henüz işlem geçmişi yok.</Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialog(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>

      {/* Yeni Müşteri Dialog */}
      <Dialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>➕ Yeni Müşteri Ekle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Ad Soyad"
              value={newMusteri.ad_soyad}
              onChange={(e) => setNewMusteri({ ...newMusteri, ad_soyad: e.target.value })}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Telefon"
              value={newMusteri.telefon}
              onChange={(e) => setNewMusteri({ ...newMusteri, telefon: e.target.value })}
              sx={{ mb: 2 }}
              placeholder="05551234567"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notlar (opsiyonel)"
              value={newMusteri.notlar}
              onChange={(e) => setNewMusteri({ ...newMusteri, notlar: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>İptal</Button>
          <Button 
            onClick={handleAddMusteri} 
            variant="contained"
            disabled={!newMusteri.ad_soyad || !newMusteri.telefon}
          >
            Kaydet
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
        <DialogTitle>✏️ Müşteri Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Ad Soyad"
              value={editMusteri.ad_soyad}
              onChange={(e) => setEditMusteri({ ...editMusteri, ad_soyad: e.target.value })}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Telefon"
              value={editMusteri.telefon}
              onChange={(e) => setEditMusteri({ ...editMusteri, telefon: e.target.value })}
              sx={{ mb: 2 }}
              placeholder="05551234567"
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notlar (opsiyonel)"
              value={editMusteri.notlar}
              onChange={(e) => setEditMusteri({ ...editMusteri, notlar: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>İptal</Button>
          <Button 
            onClick={handleEditSubmit} 
            variant="contained"
            disabled={!editMusteri.ad_soyad || !editMusteri.telefon}
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
        <DialogTitle>⚠️ Müşteri Sil</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Bu müşteriyi silmek istediğinizden emin misiniz?
          </Alert>
          {selectedMusteri && (
            <Typography variant="body2">
              <strong>{selectedMusteri.ad_soyad}</strong>
              <br />
              Telefon: {selectedMusteri.telefon}
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
