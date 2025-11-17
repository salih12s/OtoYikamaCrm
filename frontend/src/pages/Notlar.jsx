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
  IconButton,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import { notlar } from '../api';

export default function Notlar() {
  const [notList, setNotList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNot, setEditingNot] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    baslik: '',
    icerik: '',
    renk: 'yellow',
  });

  const renkler = [
    { value: 'yellow', label: 'Sarı', color: '#fef08a' },
    { value: 'blue', label: 'Mavi', color: '#bfdbfe' },
    { value: 'green', label: 'Yeşil', color: '#bbf7d0' },
    { value: 'pink', label: 'Pembe', color: '#fbcfe8' },
    { value: 'orange', label: 'Turuncu', color: '#fed7aa' },
    { value: 'purple', label: 'Mor', color: '#e9d5ff' },
  ];

  useEffect(() => {
    fetchNotlar();
  }, []);

  const fetchNotlar = async () => {
    try {
      setLoading(true);
      const response = await notlar.getAll();
      setNotList(response.data);
    } catch (error) {
      console.error('Notlar yüklenemedi:', error);
      setSnackbar({
        open: true,
        message: 'Notlar yüklenirken hata oluştu',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (not = null) => {
    if (not) {
      setEditingNot(not);
      setFormData({
        baslik: not.baslik,
        icerik: not.icerik || '',
        renk: not.renk,
      });
    } else {
      setEditingNot(null);
      setFormData({
        baslik: '',
        icerik: '',
        renk: 'yellow',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingNot(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.baslik) {
      setSnackbar({
        open: true,
        message: 'Başlık alanı zorunludur!',
        severity: 'error',
      });
      return;
    }

    try {
      if (editingNot) {
        await notlar.update(editingNot.id, formData);
        setSnackbar({
          open: true,
          message: 'Not başarıyla güncellendi!',
          severity: 'success',
        });
      } else {
        await notlar.create(formData);
        setSnackbar({
          open: true,
          message: 'Not başarıyla eklendi!',
          severity: 'success',
        });
      }
      fetchNotlar();
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Hata: ' + (error.response?.data?.error || error.message),
        severity: 'error',
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      try {
        await notlar.delete(id);
        setSnackbar({
          open: true,
          message: 'Not başarıyla silindi!',
          severity: 'success',
        });
        fetchNotlar();
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Silme işlemi başarısız!',
          severity: 'error',
        });
      }
    }
  };

  const getRenkValue = (renkAdi) => {
    const renk = renkler.find(r => r.value === renkAdi);
    return renk ? renk.color : '#fef08a';
  };

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
          <NoteIcon /> Notlar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Yeni Not
        </Button>
      </Box>

      {notList.length === 0 ? (
        <Alert severity="info">Henüz not eklenmemiş. Yeni not eklemek için yukarıdaki butona tıklayın.</Alert>
      ) : (
        <Grid container spacing={2}>
          {notList.map((not) => (
            <Grid item xs={12} sm={6} md={4} key={not.id}>
              <Card 
                sx={{ 
                  backgroundColor: getRenkValue(not.renk),
                  height: '100%',
                  position: 'relative',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#000', pr: 1 }}>
                      {not.baslik}
                    </Typography>
                    <Box>
                      <IconButton size="small" onClick={() => handleOpenDialog(not)} sx={{ color: '#000' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(not.id)} sx={{ color: '#d32f2f' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#000', whiteSpace: 'pre-wrap', mb: 2 }}>
                    {not.icerik || 'İçerik yok'}
                  </Typography>
                  
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {new Date(not.guncelleme_tarihi).toLocaleString('tr-TR')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Not Ekleme/Düzenleme Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingNot ? 'Not Düzenle' : 'Yeni Not Ekle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Başlık"
                name="baslik"
                value={formData.baslik}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="İçerik"
                name="icerik"
                value={formData.icerik}
                onChange={handleChange}
                placeholder="Notunuzu buraya yazın..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Renk"
                name="renk"
                value={formData.renk}
                onChange={handleChange}
              >
                {renkler.map((renk) => (
                  <MenuItem key={renk.value} value={renk.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          backgroundColor: renk.color,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                        }} 
                      />
                      {renk.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingNot ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
