# 🚀 Sistem Başlatma Komutları

## Backend Başlat
```powershell
cd backend
npm start
```

## Frontend Başlat (Yeni Terminal)
```powershell
cd frontend
npm start
```

## Veritabanını Sıfırla
```powershell
cd backend
npm run init-db
```

---

## 📌 Önemli Notlar

### Database Bağlantısı
- Host: localhost
- Port: 5432
- Database: BayiStok
- User: postgres
- Password: 12345

### API Endpoint'leri

#### Müşteriler
- `GET /api/musteriler` - Tüm müşteriler
- `POST /api/musteriler` - Yeni müşteri ekle
- `PUT /api/musteriler/:id` - Müşteri güncelle
- `DELETE /api/musteriler/:id` - Müşteri sil

#### İşlemler
- `GET /api/islemler` - Tüm işlemler
- `POST /api/islemler` - Yeni işlem ekle
- `PUT /api/islemler/:id` - İşlem güncelle
- `DELETE /api/islemler/:id` - İşlem sil
- `POST /api/islemler/:id/odeme` - Kısmi ödeme ekle

#### Hizmetler
- `GET /api/hizmetler` - Tüm hizmetler
- `POST /api/hizmetler` - Yeni hizmet ekle
- `PUT /api/hizmetler/:id` - Hizmet güncelle
- `DELETE /api/hizmetler/:id` - Hizmet pasif yap (soft delete)

#### Raporlar
- `GET /api/raporlar/dashboard` - Dashboard özeti
- `GET /api/raporlar/gunluk` - Günlük rapor
- `GET /api/raporlar/haftalik` - Haftalık rapor
- `GET /api/raporlar/markalar` - Marka istatistikleri
- `GET /api/raporlar/borclu-musteriler` - Borçlu müşteriler

---

## ✅ Yapılan İşlemler

### Backend
- ✅ PostgreSQL veritabanı yapısı
- ✅ RESTful API (Express.js)
- ✅ CRUD işlemleri (Ekle, Sil, Güncelle, Listele)
- ✅ Partial payment sistemi
- ✅ Raporlama endpoint'leri
- ✅ İlişkili tablolar (Foreign Keys)
- ✅ Transaction yönetimi

### Frontend
- ✅ React 18 + Material-UI
- ✅ Mobil uyumlu tasarım
- ✅ Dark mode
- ✅ Büyük dokunmatik butonlar (48px+)
- ✅ Alt navigasyon menüsü
- ✅ Dashboard
- ✅ Yeni işlem ekleme
- ✅ İşlem listeleme, düzenleme, silme
- ✅ Müşteri listeleme, ekleme, düzenleme, silme
- ✅ Raporlar (günlük, haftalık, markalar, borçlular)

### Özellikler
- ✅ Müşteri yönetimi
- ✅ Araç işlem takibi
- ✅ Kısmi ödeme (partial payment)
- ✅ Borç takibi
- ✅ Durum güncellemeleri (Bekliyor → İşlemde → Teslim)
- ✅ Hizmet tanımları
- ✅ Detaylı raporlama
- ✅ Telefon ile müşteri arama

---

## 🎯 Kullanım Senaryoları

### 1. Yeni İşlem Ekle
1. Alt menüden "Yeni İşlem"e tıkla
2. Müşteri ara (opsiyonel)
3. Plaka, marka, model gir
4. Hizmet seç
5. Tutar ve ödeme bilgilerini gir
6. Kaydet

### 2. Kısmi Ödeme Al
1. İşlemler sayfasında işlemi bul
2. "Ödeme Al" butonuna tıkla
3. Ödenen miktarı gir
4. Kaydet

### 3. İşlem Durumunu Güncelle
1. İşlemler sayfasında işlemi bul
2. "İşleme Al" veya "Teslim Et" butonuna tıkla

### 4. Rapor Görüntüle
1. Alt menüden "Raporlar"a tıkla
2. İstediğin rapor sekmesini seç
3. İstatistikleri incele

---

Sistem kullanıma hazır! 🚗💨
