import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Müşteri API'leri
export const musteriler = {
  getAll: () => api.get('/musteriler'),
  getById: (id) => api.get(`/musteriler/${id}`),
  create: (data) => api.post('/musteriler', data),
  update: (id, data) => api.put(`/musteriler/${id}`, data),
  delete: (id) => api.delete(`/musteriler/${id}`),
  searchByPhone: (telefon) => api.get(`/musteriler/telefon/${telefon}`),
};

// İşlem API'leri
export const islemler = {
  getAll: () => api.get('/islemler'),
  getByDate: (baslangic, bitis) => api.get('/islemler/tarih', { params: { baslangic, bitis } }),
  create: (data) => api.post('/islemler', data),
  update: (id, data) => api.put(`/islemler/${id}`, data),
  updateDurum: (id, durum) => api.put(`/islemler/${id}/durum`, { durum }),
  delete: (id) => api.delete(`/islemler/${id}`),
  addPayment: (id, data) => api.post(`/islemler/${id}/odeme`, data),
};

// Hizmet API'leri
export const hizmetler = {
  getAll: () => api.get('/hizmetler'),
  create: (data) => api.post('/hizmetler', data),
  update: (id, data) => api.put(`/hizmetler/${id}`, data),
  delete: (id) => api.delete(`/hizmetler/${id}`),
  deleteKalici: (id) => api.delete(`/hizmetler/${id}/kalici`),
};

// Rapor API'leri
export const raporlar = {
  dashboard: () => api.get('/raporlar/dashboard'),
  gunluk: (tarih) => api.get('/raporlar/gunluk', { params: { tarih } }),
  haftalik: () => api.get('/raporlar/haftalik'),
  markalar: () => api.get('/raporlar/markalar'),
  hizmetler: () => api.get('/raporlar/hizmetler'),
  borcluMusteriler: () => api.get('/raporlar/borclu-musteriler'),
};

export default api;
