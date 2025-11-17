import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { raporlar } from '../api';

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
  const [markalarData, setMarkalarData] = useState([]);
  const [hizmetlerData, setHizmetlerData] = useState([]);
  const [borcluData, setBorcluData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const loadReports = React.useCallback(async () => {
    setLoading(true);
    try {
      switch (tabValue) {
        case 0:
          const gunluk = await raporlar.gunluk(selectedDate);
          setGunlukData(gunluk.data);
          break;
        case 1:
          const haftalik = await raporlar.haftalik();
          setHaftalikData(haftalik.data);
          break;
        case 2:
          const markalar = await raporlar.markalar();
          setMarkalarData(markalar.data);
          break;
        case 3:
          const hizmetler = await raporlar.hizmetler();
          setHizmetlerData(hizmetler.data);
          break;
        case 4:
          const borclu = await raporlar.borcluMusteriler();
          setBorcluData(borclu.data);
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

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        📊 Raporlar
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Günlük" />
        <Tab label="Haftalık" />
        <Tab label="Markalar" />
        <Tab label="Hizmetler" />
        <Tab label="Borçlu Müşteriler" />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Günlük Rapor */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 3 }}>
              <TextField
                type="date"
                label="Tarih Seçin"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>

            {gunlukData && (
              <>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">Toplam İşlem</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {gunlukData.genel.toplam_islem}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ background: 'linear-gradient(135deg, #10b98122 0%, #10b98111 100%)' }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">Toplam Gelir</Typography>
                        <Typography variant="h4" fontWeight="bold" color="success.main">
                          ₺{parseFloat(gunlukData.genel.toplam_gelir).toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ background: 'linear-gradient(135deg, #ef444422 0%, #ef444411 100%)' }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">Toplam Borç</Typography>
                        <Typography variant="h4" fontWeight="bold" color="error.main">
                          ₺{parseFloat(gunlukData.genel.toplam_borc).toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Hizmet Dağılımı
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Hizmet</strong></TableCell>
                        <TableCell align="right"><strong>Adet</strong></TableCell>
                        <TableCell align="right"><strong>Toplam</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {gunlukData.hizmetler.map((hizmet, index) => (
                        <TableRow key={index}>
                          <TableCell>{hizmet.hizmet_turu}</TableCell>
                          <TableCell align="right">{hizmet.adet}</TableCell>
                          <TableCell align="right">₺{parseFloat(hizmet.toplam || 0).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {gunlukData.odemeler.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Ödeme Yöntemleri
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Yöntem</strong></TableCell>
                            <TableCell align="right"><strong>Adet</strong></TableCell>
                            <TableCell align="right"><strong>Toplam</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {gunlukData.odemeler.map((odeme, index) => (
                            <TableRow key={index}>
                              <TableCell>{odeme.odeme_yontemi}</TableCell>
                              <TableCell align="right">{odeme.adet}</TableCell>
                              <TableCell align="right">₺{parseFloat(odeme.toplam).toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </>
            )}
          </TabPanel>

          {/* Haftalık Rapor */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Son 7 Günlük Gelir Grafiği
            </Typography>
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
                      <TableCell align="right">{gun.toplam_islem}</TableCell>
                      <TableCell align="right">₺{parseFloat(gun.toplam_gelir).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {haftalikData.length > 0 && (
                    <TableRow>
                      <TableCell><strong>TOPLAM</strong></TableCell>
                      <TableCell align="right">
                        <strong>{haftalikData.reduce((sum, g) => sum + parseInt(g.toplam_islem), 0)}</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>₺{haftalikData.reduce((sum, g) => sum + parseFloat(g.toplam_gelir), 0).toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Markalar */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              <CarIcon /> En Çok Gelen Araç Markaları
            </Typography>
            <Grid container spacing={2}>
              {markalarData.map((marka, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold">
                        {marka.marka}
                      </Typography>
                      <Chip 
                        label={`${marka.adet} araç`} 
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Hizmetler */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>
              <BuildIcon /> En Çok Tercih Edilen Hizmetler
            </Typography>
            {hizmetlerData && hizmetlerData.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Hizmet</strong></TableCell>
                      <TableCell align="right"><strong>Kullanım</strong></TableCell>
                      <TableCell align="right"><strong>Toplam Gelir</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hizmetlerData.map((hizmet, index) => (
                      <TableRow key={index}>
                        <TableCell>{hizmet.hizmet_turu}</TableCell>
                        <TableCell align="right">
                          <Chip label={hizmet.kullanim_sayisi} color="primary" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <strong>₺{parseFloat(hizmet.toplam_gelir).toFixed(2)}</strong>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Henüz hizmet verisi bulunmuyor.
              </Typography>
            )}
          </TabPanel>

          {/* Borçlu Müşteriler */}
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6" gutterBottom>
              <WarningIcon /> Borçlu Müşteriler
            </Typography>
            {borcluData.length === 0 ? (
              <Alert severity="success">Harika! Borçlu müşteri yok.</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Müşteri</strong></TableCell>
                      <TableCell><strong>Telefon</strong></TableCell>
                      <TableCell align="right"><strong>Borç</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {borcluData.map((musteri, index) => (
                      <TableRow key={index}>
                        <TableCell>{musteri.ad_soyad}</TableCell>
                        <TableCell>{musteri.telefon}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={`₺${parseFloat(musteri.toplam_borc).toFixed(2)}`}
                            color="error"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2}><strong>TOPLAM BORÇ</strong></TableCell>
                      <TableCell align="right">
                        <strong style={{ color: '#ef4444', fontSize: '1.2em' }}>
                          ₺{borcluData.reduce((sum, m) => sum + parseFloat(m.toplam_borc), 0).toFixed(2)}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </>
      )}
    </Box>
  );
}
