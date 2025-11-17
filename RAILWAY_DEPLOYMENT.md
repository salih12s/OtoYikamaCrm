# Railway Deployment Talimatları

## Environment Variables (Railway Dashboard'da ayarlayın):

```
PORT=5000
DB_HOST=nozomi.proxy.rlwy.net
DB_PORT=35540
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=rZBxtHWIzYZvWkwZWWHJSupcXHvzmCXB
```

## Railway'de Yapılacaklar:

1. Railway Dashboard'da projenizi açın
2. "Variables" sekmesine gidin
3. Yukarıdaki tüm environment variables'ları ekleyin
4. "Deploy" butonuna tıklayın

## Deploy Sonrası:

- Backend API çalışacak
- Veritabanı tabloları zaten oluşturuldu
- API endpoint: https://[your-railway-domain].up.railway.app

## Frontend Deployment (İsteğe Bağlı):

Frontend'i ayrı deploy etmek isterseniz:
1. Vercel veya Netlify kullanabilirsiniz
2. Frontend'deki API URL'ini Railway backend URL'iniz ile güncelleyin
3. `frontend/src/api.js` dosyasında `API_URL` değişkenini değiştirin

## Not:
- .env dosyası git'e commit edilmedi (güvenlik)
- Tüm hassas bilgiler Railway environment variables'ında
