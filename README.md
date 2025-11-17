# 🚗 Oto Yıkama CRM Sistemi

Profesyonel oto yıkama işletmeleri için geliştirilmiş, **tamamen mobil uyumlu**, **modern** ve **kullanıcı dostu** CRM (Müşteri İlişkileri Yönetimi) sistemi. Telefondan veri girişi için özel olarak optimize edilmiştir.

---

## 📋 İçindekiler

1. [Özellikler](#-özellikler)
2. [Teknolojiler](#-teknolojiler)
3. [Kurulum](#-kurulum)
4. [Veritabanı Yapısı](#-veritabanı-yapısı)
5. [API Dokümantasyonu](#-api-dokümantasyonu)
6. [Kullanım Kılavuzu](#-kullanım-kılavuzu)
7. [Ekran Görüntüleri](#-ekran-görüntüleri)
8. [Sistem Mimarisi](#-sistem-mimarisi)
9. [Güvenlik](#-güvenlik)
10. [Sorun Giderme](#-sorun-giderme)

---

## 🎯 Özellikler

### ✅ Temel Özellikler

#### 1. **Araç İşlem Yönetimi**
- **Detaylı Kayıt Sistemi:**
  - Plaka numarası (zorunlu)
  - Araç markası ve modeli
  - Hizmet türü seçimi
  - Tutar ve ödeme bilgileri
  - Özel notlar (müşteri istekleri)
  - İşlem durumu takibi
  
- **CRUD İşlemleri:**
  - ✅ Yeni işlem ekleme
  - ✅ İşlem düzenleme
  - ✅ İşlem silme
  - ✅ İşlem listeleme ve filtreleme
  - ✅ Durum güncelleme (Bekliyor → İşlemde → Teslim Edildi)

- **Ödeme Yönetimi:**
  - Nakit, Kart, Havale seçenekleri
  - Kısmi ödeme (Partial Payment) desteği
  - Ödeme geçmişi takibi
  - Otomatik kalan tutar hesaplama

#### 2. **Müşteri Yönetimi**
- **Müşteri Profili:**
  - Ad-Soyad
  - Telefon numarası (benzersiz)
  - Kayıt tarihi
  - Toplam harcama tutarı (otomatik hesaplanan)
  - Aktif bakiye/borç durumu
  - Özel notlar

- **CRUD İşlemleri:**
  - ✅ Yeni müşteri ekleme
  - ✅ Müşteri düzenleme
  - ✅ Müşteri silme (güvenli silme kontrolü)
  - ✅ Müşteri listeleme
  - ✅ Telefon ile hızlı arama

- **Müşteri Geçmişi:**
  - Tüm işlem kayıtları
  - Araç bilgileri
  - Toplam harcama
  - Son geliş tarihi
  - Borç durumu

#### 3. **Kısmi Ödeme Sistemi (Partial Payment)**
- **Özellikler:**
  - Birden fazla taksitle ödeme alma
  - Her ödeme için ayrı kayıt
  - Ödeme geçmişi izleme
  - Otomatik kalan tutar güncelleme
  - Müşteri bakiyesi otomatik güncelleme

- **Kullanım Senaryosu:**
  ```
  Örnek: Araç yıkama ücreti: 500₺
  1. Ödeme: 200₺ (Kalan: 300₺)
  2. Ödeme: 150₺ (Kalan: 150₺)
  3. Ödeme: 150₺ (Kalan: 0₺) ✅ Ödeme Tamamlandı
  ```

#### 4. **Hizmet Tanımları**
- **Hazır Hizmetler:**
  - İç-Dış Yıkama (30 dk)
  - Detaylı Temizlik (120 dk)
  - Koltuk Yıkama (90 dk)
  - Motor Yıkama (45 dk)
  - Pasta/Cila (180 dk)
  - Boya Koruma (240 dk)
  - Cam Filmi (120 dk)
  - Oto Kuaför (150 dk)

- **CRUD İşlemleri:**
  - ✅ Yeni hizmet ekleme
  - ✅ Hizmet düzenleme
  - ✅ Hizmet silme (Soft Delete - pasif yapma)
  - ✅ Hizmet listeleme
  - Hizmet kategorileri
  - Tahmini süre bilgisi

#### 5. **Durum Takibi**
- **İşlem Durumları:**
  - 🟡 **Bekliyor** - Araç henüz işleme alınmadı
  - 🔵 **İşlemde** - Araç şu an yıkanıyor
  - 🟢 **Teslim Edildi** - İşlem tamamlandı, araç teslim edildi

- **Durum Geçişleri:**
  - Tek tıkla durum değiştirme
  - Otomatik zaman damgası
  - Durum geçmişi

### 📊 Raporlama Sistemi

#### 1. **Dashboard (Ana Sayfa)**
- **Anlık Veriler:**
  - 💰 Bugünkü gelir ve işlem sayısı
  - 📅 Bu ayın toplam geliri ve işlem sayısı
  - ⏳ Bekleyen işlem sayısı
  - ⚠️ Toplam tahsil edilmemiş borç

- **Görselleştirme:**
  - Renkli kartlar
  - İkonlu gösterimler
  - Hızlı özet bilgiler

#### 2. **Günlük Rapor**
- **Detaylı Analiz:**
  - Seçilen tarihe göre rapor
  - Toplam işlem sayısı
  - Toplam gelir
  - Toplam borç
  
- **Hizmet Dağılımı:**
  - Hangi hizmet kaç kez kullanıldı
  - Hizmet başına gelir
  - Tablo formatında görünüm

- **Ödeme Yöntemleri:**
  - Nakit/Kart/Havale dağılımı
  - Yöntem başına toplam tutar

#### 3. **Haftalık Rapor**
- Son 7 günlük gelir grafiği
- Gün bazında işlem sayısı
- Gün bazında gelir tutarı
- Haftalık toplam özet

#### 4. **Marka İstatistikleri**
- En çok gelen araç markaları
- Marka başına toplam işlem sayısı
- Top 10 marka listesi
- Görsel kart formatı

#### 5. **Hizmet İstatistikleri**
- En çok tercih edilen hizmetler
- Hizmet başına kullanım sayısı
- Hizmet başına toplam gelir
- Performans analizi

#### 6. **Borçlu Müşteriler**
- Borcu olan tüm müşteriler
- Müşteri adı ve telefonu
- Toplam borç tutarı
- Toplam borç özeti
- Uyarı sistemi

### 📱 Mobil Uyum ve Kullanıcı Deneyimi

#### 1. **Responsive Tasarım**
- **Telefon (< 600px):**
  - Tam genişlik butonlar
  - Dikey liste görünümü
  - Kolay dokunma alanları
  - Alt navigasyon menüsü

- **Tablet (600px - 960px):**
  - 2 sütunlu grid yapısı
  - Optimize edilmiş kart boyutları
  - Dengeli içerik dağılımı

- **Masaüstü (> 960px):**
  - 3-4 sütunlu grid yapısı
  - Geniş ekran optimizasyonu
  - Detaylı veri görünümü

#### 2. **Dokunmatik Optimizasyon**
- **Apple Human Interface Guidelines:**
  - Minimum buton boyutu: 48px (iOS standartı)
  - Geniş dokunma alanları
  - Kolay hedefleme

- **Font Boyutları:**
  - Input alanları: 16px (iOS zoom engelleyici)
  - Başlıklar: 18-24px
  - Normal metin: 14-16px

#### 3. **Alt Navigasyon Menüsü**
- **Özellikler:**
  - Sabit konum (Fixed Bottom)
  - 5 ana sayfa erişimi
  - İkonlu navigasyon
  - Aktif sayfa gösterimi
  - Kolay başparmaklı erişim

- **Menü Öğeleri:**
  - 🏠 Ana Sayfa (Dashboard)
  - 🚗 Yeni İşlem
  - 🔧 İşlemler
  - 👥 Müşteriler
  - 📊 Raporlar

#### 4. **Dark Mode (Karanlık Tema)**
- **Avantajlar:**
  - Göz yorgunluğunu azaltır
  - Düşük ışıkta rahat kullanım
  - OLED ekranlarda pil tasarrufu
  - Modern ve profesyonel görünüm

- **Renk Paleti:**
  - Arka Plan: #0f172a (Koyu lacivert)
  - Kartlar: #1e293b (Açık lacivert)
  - Primary: #3b82f6 (Mavi)
  - Success: #10b981 (Yeşil)
  - Warning: #f59e0b (Turuncu)
  - Error: #ef4444 (Kırmızı)

#### 5. **Hızlı Veri Girişi**
- **Otomatik Tamamlama:**
  - Müşteri telefon araması
  - Daha önce girilen plakalar
  - Hizmet seçimi

- **Akıllı Formlar:**
  - Otomatik kalan tutar hesaplama
  - Varsayılan değerler
  - Zorunlu alan kontrolü
  - Anında doğrulama

### 🔐 Güvenlik Özellikleri

#### 1. **Veri Güvenliği**
- **Database Güvenliği:**
  - PostgreSQL parametreli sorgular (SQL Injection koruması)
  - Transaction yönetimi
  - Foreign Key ilişkileri
  - Veri bütünlüğü kontrolü

- **Backend Güvenliği:**
  - CORS politikaları
  - Input validasyonu
  - Error handling
  - Güvenli silme işlemleri

#### 2. **Silme Koruması**
- **Güvenli Silme:**
  - Müşteri silme: İşlem varsa engelleyici uyarı
  - Hizmet silme: Soft delete (pasif yapma) seçeneği
  - Onay dialog'ları
  - Geri alınamaz uyarıları

#### 3. **Veri İlişkileri**
- Foreign Key cascade kuralları
- İlişkili veri otomatik güncelleme
- Müşteri bakiyesi senkronizasyonu
- Ödeme geçmişi takibi

---

## 🛠️ Teknolojiler

### Backend Stack

#### 1. **Node.js (v18+)**
- JavaScript runtime environment
- Asenkron I/O işlemleri
- Yüksek performans
- NPM paket yönetimi

#### 2. **Express.js (v4.18+)**
- **Özellikler:**
  - RESTful API mimarisi
  - Middleware desteği
  - Route yönetimi
  - Error handling
  
- **Kullanılan Middleware:**
  - `cors` - Cross-Origin Resource Sharing
  - `body-parser` - JSON parsing
  - `dotenv` - Environment variables

#### 3. **PostgreSQL (v13+)**
- **Avantajları:**
  - İlişkisel veritabanı
  - ACID compliance
  - Foreign Key desteği
  - Transaction yönetimi
  - JSON veri tipi desteği
  
- **Kullanılan Kütüphane:**
  - `pg` (node-postgres) - PostgreSQL client

#### 4. **Diğer Backend Paketleri**
```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "body-parser": "^1.20.2",
  "nodemon": "^3.0.1" (dev)
}
```

### Frontend Stack

#### 1. **React 18**
- **Özellikler:**
  - Component-based architecture
  - Virtual DOM
  - Hooks API (useState, useEffect)
  - Functional components
  - SPA (Single Page Application)

#### 2. **Material-UI (MUI) v5**
- **Avantajları:**
  - Google Material Design
  - Hazır component'ler
  - Responsive grid system
  - Theme customization
  - Dark mode desteği
  
- **Kullanılan Component'ler:**
  - Layout: Box, Container, Grid, Paper
  - Input: TextField, Button, Select, Autocomplete
  - Display: Card, Chip, Alert, Table
  - Navigation: BottomNavigation, Tabs
  - Feedback: Dialog, Snackbar, CircularProgress
  - Icons: @mui/icons-material

#### 3. **React Router v6**
- **Özellikler:**
  - Client-side routing
  - Nested routes
  - URL parametreleri
  - Programmatic navigation
  
- **Kullanılan Hooks:**
  - `useNavigate()` - Sayfa yönlendirme
  - `useLocation()` - Aktif sayfa tespiti

#### 4. **Axios**
- **Özellikler:**
  - Promise-based HTTP client
  - Request/Response interceptors
  - Automatic JSON transformation
  - Error handling
  
- **Kullanım Alanları:**
  - API istekleri
  - CRUD operasyonları
  - Centralized API management

#### 5. **Emotion (CSS-in-JS)**
- MUI ile entegre
- Dinamik styling
- Theme-aware styling
- Performance optimization

#### 6. **Diğer Frontend Paketleri**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "@mui/material": "^5.15.0",
  "@mui/icons-material": "^5.15.0",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "react-scripts": "5.0.1" (dev)
}
```

### Geliştirme Araçları

#### 1. **Package Manager**
- NPM (Node Package Manager)
- Dependency management
- Script running

#### 2. **Development Server**
- Nodemon (backend auto-reload)
- React Scripts (webpack dev server)
- Hot module replacement

#### 3. **Code Quality**
- ESLint (kod standardı)
- Prettier (kod formatı)

### Sistem Gereksinimleri

#### Backend
- Node.js: v18.0.0 veya üzeri
- PostgreSQL: v13.0 veya üzeri
- RAM: Minimum 512MB
- Disk: 100MB boş alan

#### Frontend
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage support
- Minimum ekran çözünürlüğü: 320px

### Deployment Stack (Opsiyonel)

#### Production Ready
- **Backend:**
  - PM2 (Process Manager)
  - Nginx (Reverse Proxy)
  - SSL/TLS (HTTPS)
  
- **Frontend:**
  - Static file hosting
  - CDN (Content Delivery Network)
  - Gzip compression
  
- **Database:**
  - PostgreSQL master-slave replication
  - Regular backups
  - Connection pooling

---

## 📦 Kurulum

### Ön Gereksinimler

#### 1. **Node.js ve NPM Kurulumu**
- Node.js v18.0.0 veya üzeri
- NPM v8.0.0 veya üzeri

**Kurulum Kontrolü:**
```powershell
node --version  # v18.0.0 veya üzeri olmalı
npm --version   # v8.0.0 veya üzeri olmalı
```

**İndirme:** https://nodejs.org/

#### 2. **PostgreSQL Kurulumu**
- PostgreSQL v13.0 veya üzeri
- pgAdmin 4 (opsiyonel - veritabanı yönetimi için)

**Kurulum Kontrolü:**
```powershell
psql --version  # PostgreSQL 13.0 veya üzeri olmalı
```

**İndirme:** https://www.postgresql.org/download/

#### 3. **Git (Opsiyonel)**
Projeyi klonlamak için:
```powershell
git --version
```

---

### Adım Adım Kurulum

#### Adım 1: PostgreSQL Veritabanını Hazırlama

**1.1. PostgreSQL'e Bağlanma**
```powershell
psql -U postgres
```

**1.2. Veritabanı Oluşturma**
```sql
CREATE DATABASE "BayiStok";
\q  -- Çıkış
```

**1.3. Bağlantı Ayarları**
- Host: `localhost`
- Port: `5432`
- Database: `BayiStok`
- User: `postgres`
- Password: `12345` (veya sizin belirlediğiniz şifre)

**Not:** Farklı bir şifre kullanıyorsanız, `backend/.env` dosyasını düzenleyin.

---

#### Adım 2: Projeyi İndirme

**Yöntem 1: Git Clone (Önerilen)**
```powershell
git clone <repository-url>
cd oto-yikama-crm
```

**Yöntem 2: ZIP İndirme**
- Projeyi ZIP olarak indirin
- Klasöre çıkarın
- Terminal'de proje klasörüne gidin

---

#### Adım 3: Backend Kurulumu

**3.1. Backend Klasörüne Gitme**
```powershell
cd backend
```

**3.2. Bağımlılıkları Yükleme**
```powershell
npm install
```

**Yüklenen Paketler:**
- express (API framework)
- pg (PostgreSQL client)
- cors (Cross-origin desteği)
- dotenv (Environment variables)
- body-parser (JSON parsing)
- nodemon (Development tool)

**3.3. Environment Variables Ayarlama**

`.env` dosyasını kontrol edin ve gerekirse düzenleyin:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=BayiStok
DB_USER=postgres
DB_PASSWORD=12345
```

**3.4. Veritabanı Tablolarını Oluşturma**
```powershell
npm run init-db
```

**Bu komut:**
- ✅ 4 tablo oluşturur (musteriler, hizmetler, arac_islemler, odeme_gecmisi)
- ✅ İlişkileri tanımlar (Foreign Keys)
- ✅ 8 örnek hizmet ekler
- ✅ 2 örnek müşteri ekler

**Beklenen Çıktı:**
```
🔧 Veritabanı tabloları oluşturuluyor...
✅ Müşteriler tablosu oluşturuldu
✅ Hizmetler tablosu oluşturuldu
✅ Araç işlemler tablosu oluşturuldu
✅ Ödeme geçmişi tablosu oluşturuldu
✅ Örnek hizmetler eklendi
✅ Örnek müşteriler eklendi
🎉 Veritabanı başarıyla hazırlandı!
```

**3.5. Backend Sunucusunu Başlatma**
```powershell
npm start
```

**Beklenen Çıktı:**
```
🚀 Server 5000 portunda çalışıyor
📡 API: http://localhost:5000
```

**Test Etme:**
Tarayıcıda `http://localhost:5000` adresine gidin. Şu mesajı görmelisiniz:
```json
{
  "message": "🚗 Oto Yıkama CRM API çalışıyor!"
}
```

---

#### Adım 4: Frontend Kurulumu

**4.1. Yeni Terminal Açma**
Backend çalışmaya devam etsin, yeni bir terminal penceresi açın.

**4.2. Frontend Klasörüne Gitme**
```powershell
cd frontend
```

**4.3. Bağımlılıkları Yükleme**
```powershell
npm install
```

**Yüklenen Paketler:**
- react & react-dom (UI framework)
- react-router-dom (Routing)
- axios (HTTP client)
- @mui/material (UI components)
- @mui/icons-material (Icons)
- @emotion/react & @emotion/styled (CSS-in-JS)

**Not:** Yükleme 1-3 dakika sürebilir (1300+ paket).

**4.4. Environment Variables (Opsiyonel)**

`.env` dosyası zaten hazır:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Not:** Backend farklı bir portta çalışıyorsa bu dosyayı düzenleyin.

**4.5. Frontend Uygulamasını Başlatma**
```powershell
npm start
```

**Beklenen Çıktı:**
```
Compiled successfully!

You can now view oto-yikama-crm-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

**4.6. Tarayıcıda Açılma**
- Otomatik olarak `http://localhost:3000` açılacak
- Manuel olarak tarayıcınıza `http://localhost:3000` yazın

---

### Kurulum Sonrası Kontrol

#### ✅ Backend Kontrolü
1. Terminal'de hata mesajı yok ✓
2. `http://localhost:5000` açılıyor ✓
3. API mesajı görünüyor ✓

#### ✅ Frontend Kontrolü
1. Terminal'de hata mesajı yok ✓
2. `http://localhost:3000` açılıyor ✓
3. Dashboard görünüyor ✓
4. Alt menü çalışıyor ✓

#### ✅ Database Kontrolü
```powershell
psql -U postgres -d BayiStok
\dt  # Tabloları listele
SELECT COUNT(*) FROM hizmetler;  # 8 olmalı
SELECT COUNT(*) FROM musteriler; # 2 olmalı
\q
```

---

### Alternatif Başlatma Yöntemleri

#### Development Mode (Otomatik Yeniden Yükleme)

**Backend:**
```powershell
cd backend
npm run dev  # nodemon ile çalışır
```

**Frontend:**
```powershell
cd frontend
npm start    # Hot reload zaten aktif
```

#### Production Build (Sadece Frontend)

```powershell
cd frontend
npm run build
```

Build dosyaları `build/` klasöründe oluşur. Bu dosyaları bir web sunucusunda (Nginx, Apache) host edebilirsiniz.

---

### Port Değiştirme

#### Backend Port Değiştirme
`backend/.env` dosyasını düzenleyin:
```env
PORT=8080  # Yeni port
```

#### Frontend Port Değiştirme
Windows'ta:
```powershell
$env:PORT=3001; npm start
```

**Not:** Frontend API URL'ini de güncelleyin: `frontend/.env`

---

### Veritabanını Sıfırlama

Tüm verileri silip baştan başlamak için:

```powershell
cd backend
npm run init-db
```

**Uyarı:** Bu işlem tüm verileri siler!

---

### Kurulum Sorunları

#### "PostgreSQL connection error"
- PostgreSQL çalışıyor mu? Kontrol edin: `pg_ctl status`
- Şifre doğru mu? `.env` dosyasını kontrol edin
- Veritabanı var mı? `psql -l` ile kontrol edin

#### "Port 5000 already in use"
- Backend başka bir uygulamada çalışıyor
- Port'u değiştirin veya çakışan uygulamayı kapatın

#### "npm install" hatası
- Node.js sürümünü kontrol edin: `node --version`
- Cache'i temizleyin: `npm cache clean --force`
- Tekrar deneyin: `npm install`

#### "Cannot find module"
- `node_modules` klasörünü silin
- `npm install` komutunu tekrar çalıştırın

---

## 🗄️ Veritabanı Yapısı

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   musteriler    │         │  arac_islemler   │         │ odeme_gecmisi   │
├─────────────────┤         ├──────────────────┤         ├─────────────────┤
│ id (PK)         │◄────┐   │ id (PK)          │◄────┐   │ id (PK)         │
│ ad_soyad        │     └───│ musteri_id (FK)  │     └───│ arac_islem_id   │
│ telefon (UNQ)   │         │ plaka            │         │ odeme_tarihi    │
│ kayit_tarihi    │         │ marka            │         │ odenen_miktar   │
│ toplam_harcama  │         │ model            │         │ odeme_yontemi   │
│ aktif_bakiye    │         │ gelis_tarihi     │         │ notlar          │
│ notlar          │         │ hizmet_turu      │         └─────────────────┘
└─────────────────┘         │ tutar            │
                            │ odenen_tutar     │         ┌─────────────────┐
                            │ kalan_tutar      │         │   hizmetler     │
                            │ odeme_yontemi    │         ├─────────────────┤
                            │ notlar           │         │ id (PK)         │
                            │ durum            │         │ hizmet_adi      │
                            └──────────────────┘         │ kategori        │
                                                         │ sure            │
                                                         │ aktif           │
                                                         │ olusturma_tarihi│
                                                         └─────────────────┘
```

### Tablo Detayları

#### 1. **musteriler** - Müşteri Bilgileri

| Kolon          | Tip           | Açıklama                          | Kısıtlamalar          |
|----------------|---------------|-----------------------------------|-----------------------|
| id             | SERIAL        | Otomatik artan birincil anahtar   | PRIMARY KEY           |
| ad_soyad       | VARCHAR(255)  | Müşterinin adı soyadı             | NOT NULL              |
| telefon        | VARCHAR(20)   | İletişim telefon numarası         | UNIQUE                |
| kayit_tarihi   | TIMESTAMP     | Müşteri kayıt zamanı              | DEFAULT NOW()         |
| toplam_harcama | DECIMAL(10,2) | Toplam harcanan tutar             | DEFAULT 0             |
| aktif_bakiye   | DECIMAL(10,2) | Borç/alacak durumu                | DEFAULT 0             |
| notlar         | TEXT          | Müşteri hakkında özel notlar      | NULL                  |

**İndeksler:**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `telefon`
- INDEX: `ad_soyad` (Hızlı arama için)

**İş Kuralları:**
- `toplam_harcama`: Otomatik hesaplanır (trigger ile)
- `aktif_bakiye`: Pozitif değer = borç, Negatif değer = alacak
- `telefon`: Benzersiz olmalı (müşteri tespiti için)

---

#### 2. **hizmetler** - Hizmet Tanımları

| Kolon            | Tip           | Açıklama                          | Kısıtlamalar          |
|------------------|---------------|-----------------------------------|-----------------------|
| id               | SERIAL        | Otomatik artan birincil anahtar   | PRIMARY KEY           |
| hizmet_adi       | VARCHAR(255)  | Hizmetin adı                      | NOT NULL              |
| kategori         | VARCHAR(100)  | Hizmet kategorisi                 | NULL                  |
| sure             | INTEGER       | Tahmini süre (dakika)             | NULL                  |
| aktif            | BOOLEAN       | Hizmet aktif mi?                  | DEFAULT TRUE          |
| olusturma_tarihi | TIMESTAMP     | Hizmet eklenme zamanı             | DEFAULT NOW()         |

**İndeksler:**
- PRIMARY KEY: `id`
- INDEX: `aktif` (Aktif hizmetleri hızlı getirmek için)

**Örnek Veriler:**
```sql
İç-Dış Yıkama (30 dk)
Detaylı Temizlik (120 dk)
Koltuk Yıkama (90 dk)
Motor Yıkama (45 dk)
Pasta/Cila (180 dk)
Boya Koruma (240 dk)
Cam Filmi (120 dk)
Oto Kuaför (150 dk)
```

**İş Kuralları:**
- `aktif`: FALSE yapılınca soft delete (kalıcı silme değil)
- Kullanılan hizmetler kalıcı silinemez

---

#### 3. **arac_islemler** - Araç İşlem Kayıtları

| Kolon          | Tip           | Açıklama                          | Kısıtlamalar          |
|----------------|---------------|-----------------------------------|-----------------------|
| id             | SERIAL        | Otomatik artan birincil anahtar   | PRIMARY KEY           |
| musteri_id     | INTEGER       | İlişkili müşteri                  | FOREIGN KEY, NULL     |
| plaka          | VARCHAR(20)   | Araç plakası                      | NOT NULL              |
| marka          | VARCHAR(100)  | Araç markası                      | NULL                  |
| model          | VARCHAR(100)  | Araç modeli                       | NULL                  |
| gelis_tarihi   | TIMESTAMP     | Aracın geliş zamanı               | DEFAULT NOW()         |
| hizmet_turu    | VARCHAR(255)  | Yapılacak hizmet                  | NOT NULL              |
| tutar          | DECIMAL(10,2) | Toplam hizmet ücreti              | NOT NULL              |
| odenen_tutar   | DECIMAL(10,2) | Şu ana kadar ödenen tutar         | DEFAULT 0             |
| kalan_tutar    | DECIMAL(10,2) | Kalan borç                        | DEFAULT 0             |
| odeme_yontemi  | VARCHAR(50)   | Ödeme şekli                       | NULL                  |
| notlar         | TEXT          | Özel istekler, notlar             | NULL                  |
| durum          | VARCHAR(50)   | İşlem durumu                      | DEFAULT 'Bekliyor'    |

**İndeksler:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `musteri_id` → `musteriler(id)` ON DELETE SET NULL
- INDEX: `plaka` (Plakaya göre arama)
- INDEX: `gelis_tarihi` (Tarihe göre raporlama)
- INDEX: `durum` (Durum bazlı sorgular)

**İş Kuralları:**
- `kalan_tutar` = `tutar` - `odenen_tutar` (otomatik hesaplanan)
- `musteri_id`: NULL olabilir (müşterisiz işlem)
- `durum`: "Bekliyor", "İşlemde", "Teslim edildi"
- `odeme_yontemi`: "Nakit", "Kart", "Havale"

**Cascade Rules:**
- Müşteri silinirse: `musteri_id` NULL'a set edilir (işlem kaydı kalır)

---

#### 4. **odeme_gecmisi** - Ödeme Geçmişi (Partial Payment)

| Kolon          | Tip           | Açıklama                          | Kısıtlamalar          |
|----------------|---------------|-----------------------------------|-----------------------|
| id             | SERIAL        | Otomatik artan birincil anahtar   | PRIMARY KEY           |
| arac_islem_id  | INTEGER       | İlişkili araç işlemi              | FOREIGN KEY, NOT NULL |
| odeme_tarihi   | TIMESTAMP     | Ödeme yapılma zamanı              | DEFAULT NOW()         |
| odenen_miktar  | DECIMAL(10,2) | Ödenen tutar                      | NOT NULL              |
| odeme_yontemi  | VARCHAR(50)   | Ödeme şekli                       | NULL                  |
| notlar         | TEXT          | Ödeme ile ilgili notlar           | NULL                  |

**İndeksler:**
- PRIMARY KEY: `id`
- FOREIGN KEY: `arac_islem_id` → `arac_islemler(id)` ON DELETE CASCADE
- INDEX: `arac_islem_id` (İşlem bazlı ödeme geçmişi)
- INDEX: `odeme_tarihi` (Zaman bazlı raporlama)

**İş Kuralları:**
- Her ödeme `arac_islemler` tablosunu günceller
- `odenen_miktar` > 0 olmalı
- İşlem silinirse, tüm ödemeleri de silinir (CASCADE)

**Cascade Rules:**
- Araç işlemi silinirse: İlişkili tüm ödemeler otomatik silinir

---

### İlişkiler (Relationships)

#### 1. **musteriler ↔ arac_islemler**
- **Tip:** One-to-Many (Bir müşterinin birden fazla işlemi)
- **İlişki:** `arac_islemler.musteri_id` → `musteriler.id`
- **Cascade:** ON DELETE SET NULL
- **İş Mantığı:** Müşteri silinince işlemler kalır, sadece `musteri_id` NULL olur

#### 2. **arac_islemler ↔ odeme_gecmisi**
- **Tip:** One-to-Many (Bir işlemin birden fazla ödemesi)
- **İlişki:** `odeme_gecmisi.arac_islem_id` → `arac_islemler.id`
- **Cascade:** ON DELETE CASCADE
- **İş Mantığı:** İşlem silinince tüm ödemeleri de silinir

---

### Veritabanı İşlemleri (Transactions)

#### Yeni İşlem Ekleme Transaction

```sql
BEGIN;

-- 1. İşlem kaydı ekle
INSERT INTO arac_islemler (...) VALUES (...) RETURNING id;

-- 2. Ödeme varsa ödeme geçmişine ekle
INSERT INTO odeme_gecmisi (...) VALUES (...);

-- 3. Müşteri bakiyesini güncelle
UPDATE musteriler 
SET toplam_harcama = toplam_harcama + odenen_tutar,
    aktif_bakiye = aktif_bakiye + kalan_tutar
WHERE id = musteri_id;

COMMIT;
```

#### Kısmi Ödeme Transaction

```sql
BEGIN;

-- 1. Ödeme geçmişine ekle
INSERT INTO odeme_gecmisi (...) VALUES (...);

-- 2. İşlem tutarlarını güncelle
UPDATE arac_islemler 
SET odenen_tutar = odenen_tutar + yeni_odeme,
    kalan_tutar = kalan_tutar - yeni_odeme
WHERE id = islem_id;

-- 3. Müşteri bakiyesini güncelle
UPDATE musteriler 
SET toplam_harcama = toplam_harcama + yeni_odeme,
    aktif_bakiye = aktif_bakiye - yeni_odeme
WHERE id = musteri_id;

COMMIT;
```

---

### Veritabanı Optimizasyonu

#### İndeks Stratejisi
- **Frequently Queried Columns:** İndekslenmiş
- **Foreign Keys:** Otomatik indeksleme
- **Full-text Search:** İhtiyaç olursa eklenebilir

#### Query Optimization
- **JOIN Operations:** Index kullanımı
- **Aggregate Functions:** Verimli hesaplama
- **Date Ranges:** BETWEEN kullanımı

#### Connection Pooling
```javascript
const pool = new Pool({
  max: 20,              // Maksimum bağlantı sayısı
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

### Backup ve Restore

#### Veritabanı Yedekleme
```powershell
pg_dump -U postgres -d BayiStok -F c -f backup.dump
```

#### Veritabanı Geri Yükleme
```powershell
pg_restore -U postgres -d BayiStok backup.dump
```

#### SQL Script Yedekleme
```powershell
pg_dump -U postgres -d BayiStok > backup.sql
```

---

### Veri Bütünlüğü

#### Referential Integrity
- Foreign Key kısıtlamaları
- Cascade delete/update rules
- NOT NULL constraints

#### Data Validation
- CHECK constraints (ileride eklenebilir)
- Trigger'lar (business logic)
- Application-level validation

#### ACID Properties
- **Atomicity:** Transaction başarılı/başarısız
- **Consistency:** İş kurallarına uygun
- **Isolation:** Eşzamanlı işlem izolasyonu
- **Durability:** Commit edilince kalıcı

## 📱 Kullanım

### Ana Sayfa (Dashboard)
- Bugünkü gelir
- Bu ayın özeti
- Bekleyen işlemler
- Toplam borç durumu

### Yeni İşlem Ekle
1. Müşteri ara (opsiyonel) - telefon/ad ile arama
2. Araç bilgilerini gir (plaka, marka, model)
3. Hizmet seç
4. Tutar ve ödeme bilgilerini gir
5. Kaydet

### İşlemler
- Tüm işlemleri görüntüle
- Durum güncelle (Bekliyor → İşlemde → Teslim)
- Kısmi ödeme al
- İşlem detaylarını görüntüle

### Müşteriler
- Müşteri listesi
- Müşteri detayları ve işlem geçmişi
- Yeni müşteri ekle
- Borç durumunu takip et

### Raporlar
- **Günlük**: Belirli bir günün detaylı raporu
- **Haftalık**: Son 7 günün gelir grafiği
- **Markalar**: En çok gelen araç markaları
- **Hizmetler**: En popüler hizmetler
- **Borçlu Müşteriler**: Borcu olan müşteriler listesi

## 🎨 Tasarım Özellikleri

### Mobil Öncelikli
- Minimum buton boyutu: 48px (Apple Human Interface Guidelines)
- Font boyutu: 16px (iOS zoom engelleyici)
- Tam genişlik butonlar (mobilde)
- Alt navigasyon menüsü (kolay erişim)

### Dark Mode
- Göz yormayan karanlık tema
- Yüksek kontrast
- Material Design 3 prensiplerine uygun

### Renkler
- **Primary**: Mavi (#3b82f6)
- **Success**: Yeşil (#10b981)
- **Warning**: Turuncu (#f59e0b)
- **Error**: Kırmızı (#ef4444)

## 🔧 API Endpoints

### Müşteriler
- `GET /api/musteriler` - Tüm müşteriler
- `GET /api/musteriler/:id` - Müşteri detayı
- `POST /api/musteriler` - Yeni müşteri
- `PUT /api/musteriler/:id` - Müşteri güncelle
- `GET /api/musteriler/telefon/:telefon` - Telefon ile ara

### İşlemler
- `GET /api/islemler` - Tüm işlemler
- `GET /api/islemler/tarih` - Tarihe göre filtrele
- `POST /api/islemler` - Yeni işlem
- `PUT /api/islemler/:id/durum` - Durum güncelle
- `POST /api/islemler/:id/odeme` - Ödeme ekle

### Hizmetler
- `GET /api/hizmetler` - Tüm hizmetler
- `POST /api/hizmetler` - Yeni hizmet

### Raporlar
- `GET /api/raporlar/dashboard` - Dashboard özeti
- `GET /api/raporlar/gunluk` - Günlük rapor
- `GET /api/raporlar/haftalik` - Haftalık rapor
- `GET /api/raporlar/markalar` - Marka istatistikleri
- `GET /api/raporlar/hizmetler` - Hizmet istatistikleri
- `GET /api/raporlar/borclu-musteriler` - Borçlu müşteriler

## 🚀 Production Deployment

### Backend
\`\`\`powershell
cd backend
npm run build
npm start
\`\`\`

### Frontend
\`\`\`powershell
cd frontend
npm run build
# Build klasörünü web sunucusuna yükle
\`\`\`

## 📝 Notlar

- Veritabanı şifresi: `12345` (.env dosyasında değiştirilebilir)
- PostgreSQL portu: `5432`
- Backend portu: `5000`
- Frontend portu: `3000`

## 💡 Gelecek Özellikler (Opsiyonel)

- [ ] QR kod ile plaka okuma
- [ ] Müşteri SMS bildirimleri
- [ ] Randevu sistemi
- [ ] Personel yönetimi
- [ ] Stok takibi (kimyasal, malzeme)
- [ ] Detaylı grafikler (Chart.js)
- [ ] Excel export
- [ ] Çoklu dil desteği

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**Geliştirici Notu**: Sistem tamamen mobil uyumlu ve telefon üzerinden veri girişi için optimize edilmiştir. Büyük butonlar, kolay navigasyon ve hızlı işlem ekleme özellikleri ile gerçek dükkân ortamında kullanıma hazırdır.
