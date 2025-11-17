import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { hizmetler } from '../api';

export default function Hizmetler() {
  const [hizmetList, setHizmetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHizmet, setEditingHizmet] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    hizmet_adi: '',
  });

  useEffect(() => {
    fetchHizmetler();
  }, []);

  const fetchHizmetler = async () => {
    try {
      setLoading(true);
      const response = await hizmetler.getAll();
      setHizmetList(response.data);
    } catch (error) {
      console.error('Hizmetler yüklenemedi:', error);
      setSnackbar({
        open: true,
        message: 'Hizmetler yüklenirken hata oluştu',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (hizmet = null) => {
    if (hizmet) {
      setEditingHizmet(hizmet);
      setFormData({
        hizmet_adi: hizmet.hizmet_adi,
      });
    } else {
      setEditingHizmet(null);
      setFormData({
        hizmet_adi: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingHizmet(null);
    setFormData({
      hizmet_adi: '',
    });
  };

  const handleSubmit = async () => {
    if (!formData.hizmet_adi) {
      setSnackbar({
        open: true,
        message: 'Hizmet adı zorunludur!',
        severity: 'error',
      });
      return;
    }

    try {
      if (editingHizmet) {
        await hizmetler.update(editingHizmet.id, formData);
        setSnackbar({
          open: true,
          message: '✅ Hizmet güncellendi!',
          severity: 'success',
        });
      } else {
        await hizmetler.create(formData);
        setSnackbar({
          open: true,
          message: '✅ Hizmet eklendi!',
          severity: 'success',
        });
      }
      handleCloseDialog();
      fetchHizmetler();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Hata: ' + (error.response?.data?.error || error.message),
        severity: 'error',
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      try {
        await hizmetler.delete(id);
        setSnackbar({
          open: true,
          message: '✅ Hizmet silindi!',
          severity: 'success',
        });
        fetchHizmetler();
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Hata: ' + (error.response?.data?.error || error.message),
          severity: 'error',
        });
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BuildIcon /> Hizmet Yönetimi
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            height: 56,
            fontSize: '18px',
            px: 3,
          }}
        >
          Yeni Hizmet
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>Yükleniyor...</Typography>
        </Box>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Hizmet Adı</strong></TableCell>
                  <TableCell align="right"><strong>İşlemler</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hizmetList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                        Henüz hizmet eklenmemiş. "Yeni Hizmet" butonuna tıklayarak hizmet ekleyebilirsiniz.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  hizmetList.map((hizmet) => (
                    <TableRow key={hizmet.id}>
                      <TableCell>
                        <Typography fontWeight="bold">{hizmet.hizmet_adi}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(hizmet)}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(hizmet.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      )}

      {/* Hizmet Ekleme/Düzenleme Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingHizmet ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hizmet Adı"
                value={formData.hizmet_adi}
                onChange={(e) => setFormData({ ...formData, hizmet_adi: e.target.value })}
                required
                placeholder="Örn: İç-Dış Yıkama"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingHizmet ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
