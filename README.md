# 🦁 Lion Oto Yıkama CRM Sistemi

Modern ve mobil uyumlu oto yıkama işletmesi yönetim sistemi. Müşteri takibi, işlem yönetimi, borç takibi ve detaylı raporlama özellikleri sunar. **Xiaomi 12 Pro 5G için özel olarak optimize edilmiştir.**

---

## 🎨 Tasarım ve Tema

### Renk Paleti
- **Ana Renk (Sarı)**: `#FFC107` - Parlak altın sarısı
- **İkincil Renk**: `#FFD54F` - Açık sarı
- **Arka Plan**: `#161616` - Koyu siyah
- **Kart Renkleri**:
  - **Bugün Araç**: `#D4A927` (Altın)
  - **Gelir**: `#10B981` (Yeşil)
  - **Bekliyor**: `#F97316` (Turuncu)
  - **İşlemde**: `#06B6D4` (Mavi)
  - **Teslim**: `#10B981` (Yeşil)

### Logo
- Sistemde özel Lion logo kullanılmaktadır
- Logo dosyası: `public/Logo.jpg`
- Login sayfasında 120x120px circular görüntü
- Header'da logo ile birlikte "Lion Oto Yıkama" marka adı

---

## 📱 Özellikler

### 🎯 Ana Özellikler
- **Mobil Uyumlu Tasarım**: Xiaomi 12 Pro 5G için optimize edilmiş responsive arayüz
- **Modern Karanlık Tema**: Sarı-Siyah renk paleti ile göz yormayan tasarım
- **Türkçe Dil Desteği**: Tamamen Türkçe arayüz ve tarih formatları (Türkiye saat dilimi)
- **Gerçek Zamanlı Güncellemeler**: Anında veri senkronizasyonu
- **Görsel Dashboard**: Renkli kartlarla durum özeti

### 💼 İşlem Yönetimi
- Hızlı yeni işlem kaydı
- Araç plakası, marka, model bilgileri
- Müşteri bilgileri (opsiyonel - boş bırakılabilir)
- Hizmet türü seçimi (kullanıcı tanımlı)
- Ödeme yöntemi (Nakit, Kredi Kartı, Banka Transferi)
- Kısmi ödeme desteği
- Durum takibi (Bekliyor, İşlemde, Teslim Edildi)
- **Plaka ve müşteri bazlı arama**
- **Durum filtreleme**
- İşlem düzenleme ve silme

### 👥 Müşteri Yönetimi
- Müşteri kayıt sistemi (ad-soyad ve telefon opsiyonel)
- Toplam harcama takibi
- Aktif bakiye/borç takibi
- **Müşteri arama ve filtreleme**
- **Sıralama seçenekleri** (tarih, isim, harcama, borç)
- Özet istatistikler (toplam müşteri, harcama, borç, borçlu sayısı)

### 💰 Borç Takip Sistemi
- Borçlu müşteri listesi
- Toplam borç özeti
- Kısmi ödeme alma
- Ödeme geçmişi
- **Müşteri/plaka bazlı arama**
- **Borç tutarına göre sıralama** (çok → az, az → çok)
- **Tarih bazlı sıralama** (yeni → eski, eski → yeni)

### 📊 Raporlama ve Grafikler
- **Dashboard Durum Kartları**: 
  - Bugün Araç Sayısı (Sarı kart)
  - Günlük Gelir (Yeşil kart)
  - Bekleyen İşlem Sayısı (Turuncu kart)
  - İşlemdeki Araç Sayısı (Mavi kart)
  - Teslim Edilen Araç Sayısı (Yeşil kart)

- **Aylık İstatistikler**:
  - Aylık müşteri sayısı (o ay içinde işlem yapan)
  - Aylık kazanç (geliş tarihine göre)
  - API endpoint: `/api/istatistikler/aylik`

- **Günlük Raporlar**: 
  - Seçilen tarih için günlük gelir
  - İşlem sayısı
  - Ödeme yöntemleri dağılımı
  - Tahsil edilmeyen tutar

- **Haftalık Raporlar**: 
  - Son 7 günlük gelir tablosu
  - Günlük bazda karşılaştırma

- **Aylık Grafik** (YENİ! 🎨):
  - **İnteraktif çubuk grafik**: Son 12 ay kazanç trendi
  - **Hover efektleri**: Çubuğun üzerine gelindiğinde detaylı bilgi
  - **3 özet kart**:
    - 💰 Toplam Kazanç (Yeşil)
    - 👥 Toplam Müşteri (Sarı)
    - 📊 Aylık Ortalama Kazanç (Mavi)
  - **Animasyonlu çubuklar**: Gradient renkli, gölgeli, hover'da büyüme efekti
  - **Müşteri sayısı**: Her ay için müşteri ikonu ile gösterim
  - **Detay tablosu**: Ay bazında kazanç ve müşteri detayları

- **Gider Yönetimi**: 
  - 8 kategori (Elektrik, Su, Doğalgaz, Kira, Maaş, Temizlik Malzemeleri, Bakım-Onarım, Diğer)
  - Gider ekleme/düzenleme/silme
  - Kategori bazlı özetler
  - Toplam gider takibi

### 🔧 Hizmet Yönetimi
- **Kullanıcı tanımlı hizmet türleri** (sadece hizmet adı)
- Hizmet ekleme/düzenleme/silme
- Aktif/pasif hizmet yönetimi

---

## 🛠️ Teknolojiler

### Frontend
- **React 18.2.0**: Modern UI kütüphanesi
- **Material-UI 5.15.0**: Komponent kütüphanesi (Dark Mode)
- **React Router 6.20.0**: Sayfa yönlendirme
- **Axios 1.6.2**: HTTP istekleri

### Backend
- **Node.js 18+**: JavaScript runtime
- **Express.js 4.18.2**: Web framework
- **PostgreSQL**: Veritabanı (Railway cloud)
- **pg 8.11.3**: PostgreSQL client (Europe/Istanbul timezone)
- **dotenv 16.3.1**: Ortam değişkenleri
- **cors 2.8.5**: CORS yönetimi

### Veritabanı Yapısı
- **musteriler**: Müşteri bilgileri (ad_soyad ve telefon NULL olabilir), harcama ve borç takibi
- **hizmetler**: Kullanıcı tanımlı hizmet türleri (sadece hizmet_adi)
- **arac_islemler**: İşlem kayıtları, ödeme ve durum bilgileri
- **odeme_gecmisi**: Ödeme hareketleri
- **giderler**: İşletme giderleri ve kategorileri

---

## 📋 Kurulum

### Gereksinimler
- Node.js 18+ 
- PostgreSQL veritabanı
- npm veya yarn

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/salih12s/OtoYikamaCrm.git
cd OtoYikamaCrm
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```

### 3. Veritabanı Ayarları
`backend/.env` dosyası oluşturun:
```env
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
PORT=5000
```

### 4. Veritabanı Tablolarını Oluşturun
```bash
node init-db.js
```

### 5. Frontend Kurulumu
```bash
cd ../frontend
npm install
```

### 6. Uygulamayı Başlatın

**Backend:**
```bash
cd backend
node server.js
```
Backend http://localhost:5000 adresinde çalışacak.

**Frontend:**
```bash
cd frontend
npm start
```
Frontend http://localhost:3000 adresinde açılacak.

---

## 🚀 Railway Deployment

Proje Railway platformunda deploy edilebilir. Detaylı talimatlar için [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) dosyasına bakın.

### Hızlı Deploy
1. Railway hesabı oluşturun
2. PostgreSQL eklentisi ekleyin
3. Veritabanı bilgilerini ortam değişkenlerine ekleyin
4. GitHub repo'nuzu bağlayın
5. Deploy edin

---

## 📱 Kullanım Kılavuzu

### 🔐 Giriş Bilgileri
- **Kullanıcı Adı**: `Göktuğ33`
- **Şifre**: `Göktuğ123456`

### 🏠 Ana Ekran (Dashboard)

Dashboard'da 5 durum kartı ve 8 ana menü butonu bulunur:

**Durum Kartları (Renkli)**:
1. **Bugün Araç** (Sarı - #D4A927): Bugün işlem gören araç sayısı
2. **Gelir** (Yeşil - #10B981): Bugünkü toplam gelir (₺)
3. **Bekliyor** (Turuncu - #F97316): Bekleyen işlem sayısı
4. **İşlemde** (Mavi - #06B6D4): İşlemdeki araç sayısı
5. **Teslim** (Yeşil - #10B981): Teslim edilen araç sayısı

**Ana Menü Butonları** (Sarı kenarlıklı):
- **Yeni İşlem**: Hızlı işlem kaydı
- **İşlemler**: Tüm işlemleri görüntüle ve yönet
- **Borç Takip**: Borçlu müşterileri takip et
- **Giderler**: Gider kayıtları
- **Hizmet Yönetimi**: Hizmet türlerini yönet
- **Müşteri Listesi**: Tüm müşterileri görüntüle
- **Notlar**: Not defteri
- **Raporlar**: Gelir/gider grafikleri ve detaylı raporlar

### 📝 Yeni İşlem Ekleme
1. Dashboard'dan "Yeni İşlem" butonuna tıklayın
2. Müşteri bilgilerini girin (opsiyonel - boş bırakılabilir)
3. Plaka numarasını girin (zorunlu - büyük harfe otomatik dönüşür)
4. Araç markası ve modelini girin
5. Hizmet türünü seçin (açılır liste)
6. Tutar girin
7. Ödenen tutarı girin (kısmi ödeme için farklı girebilirsiniz)
8. Ödeme yöntemini seçin (Nakit, Kredi Kartı, Banka Transferi)
9. Durum seçin (Bekliyor, İşlemde, Teslim Edildi)
10. Not ekleyin (opsiyonel)
11. "İşlem Kaydet" butonuna tıklayın

**Özellikler**:
- Plaka otomatik büyük harfe dönüşür
- Kısmi ödeme durumunda otomatik borç hesaplanır
- Müşteri bilgileri veritabanında kaydedilir
- Aynı plaka için işlem geçmişi tutulur

### 💼 İşlemler Sayfası
**Arama ve Filtreleme**:
- 🔍 Plaka, müşteri adı veya notlara göre arama
- 📋 Duruma göre filtreleme (Tümü, Bekliyor, İşlemde, Teslim Edildi)

**İşlem Detayları**:
- Plaka numarası (tıklanabilir - detay gösterir)
- Müşteri adı
- Araç bilgisi (marka/model)
- Hizmet türü
- Tutar ve ödenen miktar
- Borç durumu (varsa kırmızı)
- Ödeme yöntemi
- İşlem durumu (renkli chip)
- Tarih ve saat

**İşlemler**:
- ✏️ Düzenle: İşlem bilgilerini güncelle
- 🗑️ Sil: İşlemi tamamen sil (onay ister)

### 👥 Müşteri Listesi

**Üst Özet Kartlar** (6 adet):
1. **Toplam Müşteri**: Kayıtlı müşteri sayısı
2. **Toplam Harcama**: Tüm müşterilerin toplam harcaması
3. **Toplam Borç**: Tüm borçların toplamı
4. **Borçlu Sayısı**: Borcu olan müşteri sayısı
5. **Aylık Müşteri**: Bu ay işlem yapan müşteri sayısı
6. **Aylık Kazanç**: Bu ay toplam kazanç

**Müşteri Tablosu** (Mobil Optimize):
- Plaka numarası
- Toplam gelir (müşterinin toplam harcaması)
- Borç (varsa kırmızı renkte)
- Kayıt tarihi

**Arama**: Plaka veya müşteri adına göre arama

### 💰 Borç Takip Sistemi

**Özet Bilgiler**:
- Toplam borçlu müşteri sayısı
- Toplam borç miktarı
- Ortalama borç tutarı

**Borçlu Müşteri Listesi**:
- Müşteri adı
- Plaka numarası
- Toplam borç (kırmızı)
- Ödeme Al butonu

**Ödeme Alma İşlemi**:
1. "Ödeme Al" butonuna tıklayın
2. Ödeme tutarını girin (tam veya kısmi)
3. Ödeme yöntemini seçin
4. "Ödeme Al" butonuna tıklayın
5. Borç otomatik güncellenir

**Sıralama Seçenekleri**:
- Borç Çok → Az
- Borç Az → Çok
- Tarih Yeni → Eski
- Tarih Eski → Yeni

### 📊 Raporlar Sayfası

**4 Ana Tab**:

#### 1. **Günlük Rapor** 📅
- Tarih seçici ile istediğiniz günü seçin
- **Bu Ayki Gelir Kartı**: Mavi kart, toplam aylık gelir ve işlem sayısı
- **Günlük İstatistikler**:
  - Toplam gelir
  - İşlem sayısı
  - Tahsil edilmeyen tutar (borç)
- **Ödeme Yöntemleri**: Nakit, Kart, Havale dağılımı
- **Hizmet Dağılımı**: Hangi hizmet kaç kere kullanıldı

#### 2. **Haftalık Rapor** 📈
- Son 7 günün gelir tablosu
- Günlük bazda karşılaştırma
- Toplam haftalık gelir

#### 3. **Giderler** 💸
- **Gider Kategorileri**:
  - Elektrik
  - Su
  - Doğalgaz
  - Kira
  - Maaş
  - Temizlik Malzemeleri
  - Bakım-Onarım
  - Diğer

- **İşlemler**:
  - ➕ Yeni Gider Ekle
  - ✏️ Gider Düzenle
  - 🗑️ Gider Sil

- **Gider Özeti**: Kategori bazında toplam giderler

#### 4. **Aylık Grafik** 📊 (YENİ!)
**3 Özet Kart**:
1. 💰 **Toplam Kazanç** (Yeşil kart): Son 12 ayın toplam kazancı
2. 👥 **Toplam Müşteri** (Sarı kart): Son 12 ayda işlem yapan müşteri sayısı
3. 📊 **Aylık Ortalama** (Mavi kart): Ay başına ortalama kazanç

**İnteraktif Çubuk Grafik**:
- Son 12 ayın kazanç trendi
- Her çubuk bir ayı temsil eder
- Çubuğun üzerine fare ile gelindiğinde:
  - Tam kazanç miktarı görünür (tooltip)
  - Çubuk büyür (animasyon)
  - Gölge efekti artar
- Çubuk renkleri: Sarı gradient (#FFC107 → #FFD54F)
- Alt kısımda ay ismi (Oca, Şub, Mar...)
- Alt kısımda müşteri sayısı (👤 ikonu ile)

**Detay Tablosu**:
- Ay adı (Ocak 2025, Kasım 2024...)
- Kazanç (₺ ile, sarı chip)
- Müşteri sayısı (gri chip)

**Grafik Özellikleri**:
- Hover efekti ile interaktif
- Gradient renkli çubuklar
- Gölge efektleri
- Smooth animasyonlar
- Mobil uyumlu (küçük ekranlarda da düzgün görünür)

### 🔧 Hizmet Yönetimi
1. "Hizmet Yönetimi" sayfasına gidin
2. Yeni hizmet ekle: Hizmet adı girin
3. Hizmetleri düzenle veya sil
4. Aktif/pasif durumu yönet

### 📝 Notlar
- Not ekle/düzenle/sil
- Basit not defteri özelliği
1. Borç Takip sayfasına git
2. Borçlu müşteriyi bul
3. "Ödeme Al" butonuna tıkla
4. Ödeme tutarını ve yöntemini gir
5. Kaydet

### Rapor Görüntüleme
1. Raporlar sayfasına git
2. **Günlük**: Tarih seçerek günlük geliri görüntüle
3. **Haftalık**: Son 7 günün gelirine bak
4. **Giderler**: Gider ekle ve kategori bazlı özetleri gör

---

## 🔒 Güvenlik

- SQL injection koruması (Parametreli sorgular)
- CORS ayarları
- Input validation
- Transaction yönetimi (Ödeme işlemleri)
- Cascade delete koruması (İşlemleri olan müşteri silinemez)

---

## 🎨 Kullanıcı Arayüzü Özellikleri

### Dashboard Kartlar
- **Düz Renk Tasarım**: Gradient yerine solid renkler
- **Büyük Sayılar**: h4 variant ile belirgin gösterim
- **Gölge Efektleri**: Her kart kendi renginde gölge
- **Border Radius**: 8px yuvarlatılmış köşeler

### Grafik Özellikleri
- **Smooth Animations**: cubic-bezier(0.4, 0, 0.2, 1) timing function
- **Hover Tooltip**: ::after pseudo-element ile popup bilgi
- **Gradient Bars**: 3 renkli gradient (#FFC107 → #D4A927 → #FFD54F)
- **Box Shadow**: Sarı gölgeler ile derinlik efekti
- **Transform Effects**: Scale ve translate ile interaktif deneyim

### Renk Sistemi
```css
Sarı Palette:
- Ana: #FFC107 (Bright Amber)
- Koyu: #D4A927 (Dark Gold)
- Açık: #FFD54F (Light Yellow)

Yeşil: #10B981 (Emerald)
Turuncu: #F97316 (Orange)
Mavi: #06B6D4 (Cyan)
Siyah: #161616 (Near Black)
Kart Arka Plan: #1a1a1a (Dark Gray)
```

---

## 📊 API Endpoints

### İstatistikler
- `GET /api/istatistikler/aylik`: Aylık kazanç ve müşteri istatistikleri
  ```json
  {
    "aylik": {
      "musteri_sayisi": 25,
      "kazanc": "15420.00"
    },
    "grafik": [
      {
        "ay": "2024-12",
        "musteri_sayisi": 25,
        "kazanc": "15420.00"
      }
    ]
  }
  ```

### Müşteriler
- `GET /api/musteriler`: Tüm müşteri listesi (plaka, gelir, borç, tarih)
- `POST /api/musteriler`: Yeni müşteri ekle
- `PUT /api/musteriler/:id`: Müşteri güncelle
- `DELETE /api/musteriler/:id`: Müşteri sil

### İşlemler
- `GET /api/islemler`: Tüm işlemler
- `POST /api/islemler`: Yeni işlem ekle
- `PUT /api/islemler/:id`: İşlem güncelle
- `DELETE /api/islemler/:id`: İşlem sil

### Raporlar
- `GET /api/raporlar/gunluk/:tarih`: Günlük rapor
- `GET /api/raporlar/haftalik`: Haftalık rapor
- `GET /api/raporlar/dashboard`: Dashboard özet verileri

### Giderler
- `GET /api/giderler`: Tüm giderler
- `GET /api/giderler/ozet`: Kategori bazlı özet
- `POST /api/giderler`: Yeni gider ekle
- `PUT /api/giderler/:id`: Gider güncelle
- `DELETE /api/giderler/:id`: Gider sil

---

## 📞 İletişim

**GitHub**: [salih12s](https://github.com/salih12s)  
**Repository**: [OtoYikamaCrm](https://github.com/salih12s/OtoYikamaCrm)

---

## 📄 Lisans

Bu proje özel kullanım için geliştirilmiştir.

---

## 🔄 Versiyon Geçmişi

### v2.0.0 (15 Aralık 2025) 🎉
- ✅ **Yeni Tema**: Sarı-Siyah renk paleti (#FFC107, #161616)
- ✅ **Logo Entegrasyonu**: Lion logo eklendi
- ✅ **Sistem Adı**: "Lion Oto Yıkama" olarak güncellendi
- ✅ **Dashboard Kartları**: Düz renkli, modern tasarım
- ✅ **Aylık Grafik**: İnteraktif çubuk grafik sistemi
- ✅ **Hover Efektleri**: Tooltip ve animasyonlar
- ✅ **3 Özet Kart**: Toplam kazanç, müşteri, ortalama
- ✅ **Gradient Çubuklar**: 3 renkli gradient sistemleri
- ✅ **Gölge Efektleri**: Box-shadow ile derinlik
- ✅ **Mobil Optimizasyon**: Müşteri listesi ultra-compact
- ✅ **API Endpoint**: /api/istatistikler/aylik eklendi
- ✅ **Not Arama**: İşlemler sayfasında nota göre arama

### v1.0.0 (17 Kasım 2025)
- ✅ İlk versiyon yayınlandı
- ✅ Temel CRUD işlemleri
- ✅ Mobil responsive tasarım (Xiaomi 12 Pro 5G)
- ✅ Borç takip sistemi
- ✅ Gider yönetimi (8 kategori)
- ✅ Filtreleme ve arama özellikleri
- ✅ Türkiye saat dilimi desteği (Europe/Istanbul)
- ✅ Railway deployment yapılandırması
- ✅ Hizmet yönetimi sadeleştirildi (sadece hizmet adı)
- ✅ Müşteri bilgileri opsiyonel hale getirildi
- ✅ Bu ayki gelir ve günlük gelir kartları eklendi

---

## 🆘 Sorun Giderme

### Backend başlamıyor
- `.env` dosyasının doğru yapılandırıldığından emin olun
- PostgreSQL veritabanının çalıştığını kontrol edin
- Port 5000'in kullanımda olmadığını kontrol edin

### Frontend API'ye bağlanamıyor
- Backend'in çalıştığından emin olun
- `frontend/src/api.js` içindeki API_URL'yi kontrol edin (http://localhost:5000/api)
- CORS ayarlarını kontrol edin

### Veritabanı hataları
- `node init-db.js` scriptini çalıştırın
- Veritabanı bağlantı bilgilerini kontrol edin
- PostgreSQL servisinin çalıştığından emin olun

### Saat/Tarih hataları
- Backend'de timezone "Europe/Istanbul" olarak ayarlandı
- Yeni işlemlerde saat Türkiye saatine göre kaydedilir

---

## 🎯 Gelecek Özellikler

- [ ] Kullanıcı giriş sistemi (çoklu kullanıcı)
- [ ] Çoklu şube desteği
- [ ] SMS/Email bildirimleri
- [ ] QR kod ile müşteri takibi
- [ ] Mobil uygulama (React Native)
- [ ] Excel/PDF rapor dışa aktarma
- [ ] Stok yönetimi (malzeme takibi)
- [ ] Personel takip sistemi
- [ ] Randevu sistemi
- [ ] Otomatik SMS hatırlatıcılar
- [ ] Kamera ile plaka okuma
- [ ] Online ödeme entegrasyonu
- [ ] Müşteri sadakat programı
- [ ] Kampanya yönetimi

---

## 💡 Öne Çıkan Özellikler

### 🎨 Modern Grafik Sistemi
- **Interaktif Çubuklar**: Hover ile detay görüntüleme
- **Smooth Animasyonlar**: 0.4s cubic-bezier geçişler
- **Gradient Renkler**: 3 tonlu sarı gradientler
- **Tooltip Sistemi**: ::after pseudo-element ile bilgi kutuları
- **Responsive Tasarım**: Mobilde de mükemmel görünüm

### 📊 Gelişmiş İstatistikler
- **Aylık Trend**: Son 12 ayın görsel analizi
- **Müşteri Metriği**: Ay bazında müşteri sayısı takibi
- **Ortalama Hesapları**: Otomatik ortalama kazanç
- **Renk Kodlaması**: Yeşil (kazanç), Sarı (müşteri), Mavi (ortalama)

### 🎯 Dashboard Kartlar Sistemi
```javascript
Kart Yapısı:
- Solid Renkler (gradient yok)
- Box Shadow (0 4px 12px rgba)
- Border Radius 8px
- Padding 16px (py: 2, px: 1.5)
- Typography h4 (sayılar için)
- Typography body2 (etiketler için)
```

### 🖼️ Logo ve Branding
- **Logo Konumu**: Login + Header
- **Logo Boyutu**: 120x120px (login), küçük (header)
- **Border Radius**: Circular (50%)
- **Marka Rengi**: #FFC107 (Sarı)
- **Marka Adı**: "Lion Oto Yıkama"

---

## 📱 Mobil Optimizasyon Detayları

### Müşteri Listesi Tablosu
```css
Compact Tasarım:
- Padding: py: 0.5, px: 1
- Font Size: 10-13px
- Line Height: 1.2
- Max Width: 480px
- 4 Sütun: Plaka, Gelir, Borç, Kayıt
```

### Dashboard Kartlar
```css
Grid Sistemi:
- xs: 6 (Bugün Araç, Gelir)
- xs: 4 (Bekliyor, İşlemde, Teslim)
- sm: 2.4 (tüm kartlar)
- spacing: 1 (8px gap)
```

### Grafik
```css
Responsive Boyutlar:
- Height: 320px
- Max Width per bar: 60px
- Gap: 0.5 (4px)
- Padding: { xs: 1, sm: 2 }
```

---

## 🔧 Teknik Detaylar

### SQL Sorgular

**Aylık İstatistik Query**:
```sql
SELECT 
  COUNT(DISTINCT musteri_id) as musteri_sayisi,
  COALESCE(SUM(odenen), 0) as kazanc
FROM arac_islemler
WHERE DATE_TRUNC('month', gelis_tarihi AT TIME ZONE 'Europe/Istanbul') 
  = DATE_TRUNC('month', CURRENT_DATE AT TIME ZONE 'Europe/Istanbul')
```

**12 Aylık Grafik Query**:
```sql
SELECT 
  TO_CHAR(DATE_TRUNC('month', gelis_tarihi), 'YYYY-MM') as ay,
  COUNT(DISTINCT musteri_id) as musteri_sayisi,
  COALESCE(SUM(odenen), 0) as kazanc
FROM arac_islemler
WHERE gelis_tarihi >= CURRENT_DATE - INTERVAL '11 months'
GROUP BY DATE_TRUNC('month', gelis_tarihi)
ORDER BY ay
```

### React Hooks Kullanımı
```javascript
// Grafik data fetch
const loadReports = useCallback(async () => {
  const grafikRes = await istatistikler.aylik();
  setGrafikData(grafikRes.data.grafik || []);
}, [tabValue]);

useEffect(() => {
  loadReports();
}, [loadReports]);
```

### CSS-in-JS (Material-UI sx prop)
```javascript
// Gradient çubuk örneği
sx={{
  background: 'linear-gradient(180deg, #FFC107 0%, #D4A927 50%, #FFD54F 100%)',
  borderRadius: '8px 8px 0 0',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scaleY(1.08) scaleX(1.1)',
    boxShadow: '0 8px 24px rgba(255, 193, 7, 0.7)'
  }
}}
```

---

**Not**: Bu proje aktif olarak geliştirilmektedir. Önerileriniz için issue açabilirsiniz.

---

## 📚 Ek Kaynaklar

- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)

---

## 🙏 Teşekkürler

Bu proje modern web teknolojileri ve en iyi pratikler kullanılarak geliştirilmiştir. Katkılarınız ve geri bildirimleriniz için teşekkür ederiz!
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
