# Oto Yıkama CRM - Hızlı Başlangıç

## 🚀 3 Adımda Başlat

### 1️⃣ PostgreSQL Veritabanını Hazırla
PostgreSQL'in çalıştığından emin ol. Veritabanı adı: **BayiStok**

### 2️⃣ Backend'i Başlat

```powershell
cd backend
npm install
npm run init-db
npm start
```

✅ Backend hazır: http://localhost:5000

### 3️⃣ Frontend'i Başlat (Yeni Terminal)

```powershell
cd frontend
npm install
npm start
```

✅ Uygulama açıldı: http://localhost:3000

---

## 📱 Kullanım İpuçları

### Telefondan Veri Girişi
- **Büyük Butonlar**: Tüm butonlar minimum 48px yüksekliğinde
- **Alt Menü**: En sık kullanılan sayfalar alt menüde
- **Hızlı İşlem**: "Yeni İşlem" sekmesinden 30 saniyede işlem ekle

### İlk Kullanım
1. **Dashboard**'a bak - özet bilgileri gör
2. **Yeni İşlem** ekle - ilk kaydını oluştur
3. **Raporlar**'a bak - istatistikleri incele

---

## ⚙️ Ayarlar

### Backend (.env)
```
DB_NAME=BayiStok
DB_PASSWORD=12345
PORT=5000
```

### Frontend
API otomatik olarak `http://localhost:5000` adresine bağlanır.

---

## 🆘 Sorun Giderme

**Veritabanı hatası?**
- PostgreSQL çalışıyor mu kontrol et
- Veritabanı adı `BayiStok` olmalı
- Şifre doğru mu? (.env dosyasında)

**Port hatası?**
- 5000 portu kullanılıyor mu kontrol et
- Başka bir uygulamayı kapat

**Frontend açılmıyor?**
- npm install çalıştı mı?
- Backend çalışıyor mu?

---

## 📞 İletişim

Sorularınız için: GitHub Issues

---

Başarılar! 🚗💨
