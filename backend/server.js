const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', // Development
    'https://test3.salihsydm.com', // Production custom domain
    'https://otoyikamacrm-production.up.railway.app' // Production Railway domain
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================
// 👤 MÜŞTERİ İŞLEMLERİ
// ============================================

// Tüm müşterileri getir
app.get('/api/musteriler', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, 
             COUNT(a.id) as toplam_islem,
             MAX(a.gelis_tarihi) as son_gelis
      FROM musteriler m
      LEFT JOIN arac_islemler a ON m.id = a.musteri_id
      GROUP BY m.id
      ORDER BY m.kayit_tarihi DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tek müşteri detayı (araçlarıyla birlikte)
app.get('/api/musteriler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const musteri = await pool.query('SELECT * FROM musteriler WHERE id = $1', [id]);
    const araclar = await pool.query(
      'SELECT * FROM arac_islemler WHERE musteri_id = $1 ORDER BY gelis_tarihi DESC',
      [id]
    );
    
    res.json({
      ...musteri.rows[0],
      araclar: araclar.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni müşteri ekle
app.post('/api/musteriler', async (req, res) => {
  try {
    const { ad_soyad, telefon, notlar } = req.body;
    
    const result = await pool.query(
      'INSERT INTO musteriler (ad_soyad, telefon, notlar) VALUES ($1, $2, $3) RETURNING *',
      [ad_soyad, telefon, notlar]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Müşteri güncelle
app.put('/api/musteriler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ad_soyad, telefon, notlar } = req.body;
    
    const result = await pool.query(
      'UPDATE musteriler SET ad_soyad = $1, telefon = $2, notlar = $3 WHERE id = $4 RETURNING *',
      [ad_soyad, telefon, notlar, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Müşteri sil
app.delete('/api/musteriler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Müşterinin işlemlerini kontrol et
    const islemler = await pool.query('SELECT COUNT(*) FROM arac_islemler WHERE musteri_id = $1', [id]);
    
    if (parseInt(islemler.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: 'Bu müşterinin işlem kaydı var. Önce işlemleri silmeniz gerekir.' 
      });
    }
    
    await pool.query('DELETE FROM musteriler WHERE id = $1', [id]);
    res.json({ message: 'Müşteri başarıyla silindi', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Telefona göre müşteri ara
app.get('/api/musteriler/telefon/:telefon', async (req, res) => {
  try {
    const { telefon } = req.params;
    const result = await pool.query('SELECT * FROM musteriler WHERE telefon LIKE $1', [`%${telefon}%`]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 🚗 ARAÇ İŞLEM İŞLEMLERİ
// ============================================

// Tüm işlemleri getir (son 100)
app.get('/api/islemler', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, m.ad_soyad, m.telefon
      FROM arac_islemler a
      LEFT JOIN musteriler m ON a.musteri_id = m.id
      ORDER BY a.gelis_tarihi DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tarihe göre işlemleri getir
app.get('/api/islemler/tarih', async (req, res) => {
  try {
    const { baslangic, bitis } = req.query;
    
    let query = `
      SELECT a.*, m.ad_soyad, m.telefon
      FROM arac_islemler a
      LEFT JOIN musteriler m ON a.musteri_id = m.id
      WHERE 1=1
    `;
    const params = [];
    
    if (baslangic) {
      params.push(baslangic);
      query += ` AND a.gelis_tarihi >= $${params.length}`;
    }
    
    if (bitis) {
      params.push(bitis);
      query += ` AND a.gelis_tarihi <= $${params.length}`;
    }
    
    query += ' ORDER BY a.gelis_tarihi DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni araç işlemi ekle
app.post('/api/islemler', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const {
      musteri_id,
      plaka,
      marka,
      model,
      hizmet_turu,
      tutar,
      odenen_tutar,
      odeme_yontemi,
      notlar,
      durum
    } = req.body;
    
    const kalan_tutar = parseFloat(tutar) - parseFloat(odenen_tutar || 0);
    
    // İşlem ekle
    const islemResult = await client.query(
      `INSERT INTO arac_islemler 
       (musteri_id, plaka, marka, model, hizmet_turu, tutar, odenen_tutar, kalan_tutar, odeme_yontemi, notlar, durum, gelis_tarihi)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul') RETURNING *`,
      [musteri_id, plaka, marka, model, hizmet_turu, tutar, odenen_tutar, kalan_tutar, odeme_yontemi, notlar, durum || 'Bekliyor']
    );
    
    // Ödeme geçmişi ekle (eğer ödeme yapıldıysa)
    if (odenen_tutar > 0) {
      await client.query(
        'INSERT INTO odeme_gecmisi (arac_islem_id, odenen_miktar, odeme_yontemi, odeme_tarihi) VALUES ($1, $2, $3, CURRENT_TIMESTAMP AT TIME ZONE \'Europe/Istanbul\')',
        [islemResult.rows[0].id, odenen_tutar, odeme_yontemi]
      );
    }
    
    // Müşteri bilgilerini güncelle
    if (musteri_id) {
      await client.query(
        'UPDATE musteriler SET toplam_harcama = toplam_harcama + $1, aktif_bakiye = aktif_bakiye + $2 WHERE id = $3',
        [parseFloat(odenen_tutar || 0), kalan_tutar, musteri_id]
      );
    }
    
    await client.query('COMMIT');
    res.status(201).json(islemResult.rows[0]);
    
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// İşlem durumunu güncelle
app.put('/api/islemler/:id/durum', async (req, res) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;
    
    const result = await pool.query(
      'UPDATE arac_islemler SET durum = $1 WHERE id = $2 RETURNING *',
      [durum, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// İşlem güncelle (tam düzenleme)
app.put('/api/islemler/:id', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const {
      plaka,
      marka,
      model,
      hizmet_turu,
      tutar,
      odenen_tutar,
      odeme_yontemi,
      notlar,
      durum
    } = req.body;
    
    // Eski işlem bilgilerini al
    const eskiIslem = await client.query('SELECT * FROM arac_islemler WHERE id = $1', [id]);
    
    if (eskiIslem.rows.length === 0) {
      throw new Error('İşlem bulunamadı');
    }
    
    const kalan_tutar = parseFloat(tutar) - parseFloat(odenen_tutar || 0);
    
    // İşlemi güncelle
    const result = await client.query(
      `UPDATE arac_islemler 
       SET plaka = $1, marka = $2, model = $3, hizmet_turu = $4, 
           tutar = $5, odenen_tutar = $6, kalan_tutar = $7, 
           odeme_yontemi = $8, notlar = $9, durum = $10
       WHERE id = $11 RETURNING *`,
      [plaka, marka, model, hizmet_turu, tutar, odenen_tutar, kalan_tutar, odeme_yontemi, notlar, durum, id]
    );
    
    // Müşteri bakiyesini güncelle (eğer müşteri varsa)
    if (eskiIslem.rows[0].musteri_id) {
      const fark = parseFloat(odenen_tutar) - parseFloat(eskiIslem.rows[0].odenen_tutar);
      const bakiyeFark = kalan_tutar - parseFloat(eskiIslem.rows[0].kalan_tutar);
      
      await client.query(
        'UPDATE musteriler SET toplam_harcama = toplam_harcama + $1, aktif_bakiye = aktif_bakiye + $2 WHERE id = $3',
        [fark, bakiyeFark, eskiIslem.rows[0].musteri_id]
      );
    }
    
    await client.query('COMMIT');
    res.json(result.rows[0]);
    
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// İşlem sil
app.delete('/api/islemler/:id', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    
    // İşlem bilgilerini al
    const islem = await client.query('SELECT * FROM arac_islemler WHERE id = $1', [id]);
    
    if (islem.rows.length === 0) {
      throw new Error('İşlem bulunamadı');
    }
    
    const silinecekIslem = islem.rows[0];
    
    // Müşteri bakiyesini güncelle (eğer müşteri varsa)
    if (silinecekIslem.musteri_id) {
      await client.query(
        'UPDATE musteriler SET toplam_harcama = toplam_harcama - $1, aktif_bakiye = aktif_bakiye - $2 WHERE id = $3',
        [parseFloat(silinecekIslem.odenen_tutar), parseFloat(silinecekIslem.kalan_tutar), silinecekIslem.musteri_id]
      );
    }
    
    // Ödeme geçmişini sil (CASCADE olduğu için otomatik silinir, ama yine de kontrol edelim)
    await client.query('DELETE FROM odeme_gecmisi WHERE arac_islem_id = $1', [id]);
    
    // İşlemi sil
    await client.query('DELETE FROM arac_islemler WHERE id = $1', [id]);
    
    await client.query('COMMIT');
    res.json({ message: 'İşlem başarıyla silindi', id });
    
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Ödeme ekle (partial payment)
app.post('/api/islemler/:id/odeme', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { odenen_miktar, odeme_yontemi, notlar } = req.body;
    
    // İşlemi getir
    const islem = await client.query('SELECT * FROM arac_islemler WHERE id = $1', [id]);
    
    if (islem.rows.length === 0) {
      throw new Error('İşlem bulunamadı');
    }
    
    const mevcutIslem = islem.rows[0];
    const yeniOdenenTutar = parseFloat(mevcutIslem.odenen_tutar) + parseFloat(odenen_miktar);
    const yeniKalanTutar = parseFloat(mevcutIslem.tutar) - yeniOdenenTutar;
    
    // İşlemi güncelle
    await client.query(
      'UPDATE arac_islemler SET odenen_tutar = $1, kalan_tutar = $2 WHERE id = $3',
      [yeniOdenenTutar, yeniKalanTutar, id]
    );
    
    // Ödeme geçmişi ekle
    await client.query(
      'INSERT INTO odeme_gecmisi (arac_islem_id, odenen_miktar, odeme_yontemi, notlar, odeme_tarihi) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP AT TIME ZONE \'Europe/Istanbul\')',
      [id, odenen_miktar, odeme_yontemi, notlar]
    );
    
    // Müşteri bakiyesini güncelle
    if (mevcutIslem.musteri_id) {
      await client.query(
        'UPDATE musteriler SET toplam_harcama = toplam_harcama + $1, aktif_bakiye = aktif_bakiye - $2 WHERE id = $3',
        [parseFloat(odenen_miktar), parseFloat(odenen_miktar), mevcutIslem.musteri_id]
      );
    }
    
    await client.query('COMMIT');
    res.json({ success: true, yeni_kalan_tutar: yeniKalanTutar });
    
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// ============================================
// 🛠️ HİZMET İŞLEMLERİ
// ============================================

// Tüm hizmetleri getir
app.get('/api/hizmetler', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hizmetler WHERE aktif = true ORDER BY hizmet_adi');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni hizmet ekle
app.post('/api/hizmetler', async (req, res) => {
  try {
    const { hizmet_adi } = req.body;
    
    const result = await pool.query(
      'INSERT INTO hizmetler (hizmet_adi) VALUES ($1) RETURNING *',
      [hizmet_adi]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hizmet güncelle
app.put('/api/hizmetler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hizmet_adi, aktif } = req.body;
    
    const result = await pool.query(
      'UPDATE hizmetler SET hizmet_adi = $1, aktif = $2 WHERE id = $3 RETURNING *',
      [hizmet_adi, aktif !== undefined ? aktif : true, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hizmet sil (soft delete - aktif = false)
app.delete('/api/hizmetler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Soft delete - sadece aktif durumunu false yap
    const result = await pool.query(
      'UPDATE hizmetler SET aktif = false WHERE id = $1 RETURNING *',
      [id]
    );
    
    res.json({ message: 'Hizmet pasif hale getirildi', hizmet: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hizmeti tamamen sil (hard delete)
app.delete('/api/hizmetler/:id/kalici', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Hizmetin kullanılıp kullanılmadığını kontrol et
    const kullanim = await pool.query(
      'SELECT COUNT(*) FROM arac_islemler WHERE hizmet_turu = (SELECT hizmet_adi FROM hizmetler WHERE id = $1)',
      [id]
    );
    
    if (parseInt(kullanim.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: 'Bu hizmet işlemlerde kullanılmış. Silmek yerine pasif hale getirebilirsiniz.' 
      });
    }
    
    await pool.query('DELETE FROM hizmetler WHERE id = $1', [id]);
    res.json({ message: 'Hizmet kalıcı olarak silindi', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 📊 RAPORLAR
// ============================================

// Günlük rapor
app.get('/api/raporlar/gunluk', async (req, res) => {
  try {
    const { tarih } = req.query;
    const selectedDate = tarih || new Date().toISOString().split('T')[0];
    
    // Günlük gelir
    const gelir = await pool.query(
      `SELECT 
         COUNT(*) as toplam_islem,
         COALESCE(SUM(odenen_tutar), 0) as toplam_gelir,
         COALESCE(SUM(kalan_tutar), 0) as toplam_borc
       FROM arac_islemler
       WHERE DATE(gelis_tarihi) = $1`,
      [selectedDate]
    );
    
    // Hizmet dağılımı
    const hizmetler = await pool.query(
      `SELECT hizmet_turu, COUNT(*) as adet, SUM(tutar) as toplam
       FROM arac_islemler
       WHERE DATE(gelis_tarihi) = $1
       GROUP BY hizmet_turu
       ORDER BY adet DESC`,
      [selectedDate]
    );
    
    // Ödeme yöntemleri
    const odemeler = await pool.query(
      `SELECT odeme_yontemi, COUNT(*) as adet, SUM(odenen_tutar) as toplam
       FROM arac_islemler
       WHERE DATE(gelis_tarihi) = $1 AND odeme_yontemi IS NOT NULL
       GROUP BY odeme_yontemi`,
      [selectedDate]
    );
    
    res.json({
      tarih: selectedDate,
      genel: gelir.rows[0],
      hizmetler: hizmetler.rows,
      odemeler: odemeler.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Haftalık rapor
app.get('/api/raporlar/haftalik', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         DATE(gelis_tarihi) as gun,
         COUNT(*) as toplam_islem,
         COALESCE(SUM(odenen_tutar), 0) as toplam_gelir
       FROM arac_islemler
       WHERE gelis_tarihi >= CURRENT_DATE - INTERVAL '7 days'
       GROUP BY DATE(gelis_tarihi)
       ORDER BY gun DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// En çok gelen araç markaları
app.get('/api/raporlar/markalar', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT marka, COUNT(*) as adet
       FROM arac_islemler
       WHERE marka IS NOT NULL AND marka != ''
       GROUP BY marka
       ORDER BY adet DESC
       LIMIT 10`
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// En çok tercih edilen hizmetler
app.get('/api/raporlar/hizmetler', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT hizmet_turu, COUNT(*) as kullanim_sayisi, SUM(tutar) as toplam_gelir
       FROM arac_islemler
       GROUP BY hizmet_turu
       ORDER BY kullanim_sayisi DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borçlu müşteriler
app.get('/api/raporlar/borclu-musteriler', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.*, 
         COALESCE(SUM(a.kalan_tutar), 0) as toplam_borc
       FROM musteriler m
       LEFT JOIN arac_islemler a ON m.id = a.musteri_id
       WHERE a.kalan_tutar > 0
       GROUP BY m.id
       HAVING SUM(a.kalan_tutar) > 0
       ORDER BY toplam_borc DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard özet
app.get('/api/raporlar/dashboard', async (req, res) => {
  try {
    // Bugünkü gelir
    const bugun = await pool.query(
      `SELECT COUNT(*) as islem, COALESCE(SUM(odenen_tutar), 0) as gelir
       FROM arac_islemler
       WHERE DATE(gelis_tarihi) = CURRENT_DATE`
    );
    
    // Bu ayki gelir
    const buay = await pool.query(
      `SELECT COUNT(*) as islem, COALESCE(SUM(odenen_tutar), 0) as gelir
       FROM arac_islemler
       WHERE EXTRACT(MONTH FROM gelis_tarihi) = EXTRACT(MONTH FROM CURRENT_DATE)
       AND EXTRACT(YEAR FROM gelis_tarihi) = EXTRACT(YEAR FROM CURRENT_DATE)`
    );
    
    // Bekleyen işlemler
    const bekleyen = await pool.query(
      `SELECT COUNT(*) as adet FROM arac_islemler WHERE durum = 'Bekliyor'`
    );
    
    // Toplam borç
    const borclar = await pool.query(
      `SELECT COALESCE(SUM(kalan_tutar), 0) as toplam FROM arac_islemler WHERE kalan_tutar > 0`
    );
    
    res.json({
      bugun: bugun.rows[0],
      bu_ay: buay.rows[0],
      bekleyen_islem: bekleyen.rows[0].adet,
      toplam_borc: borclar.rows[0].toplam
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 💰 GİDER İŞLEMLERİ
// ============================================

// Tüm giderleri getir
app.get('/api/giderler', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM giderler 
      ORDER BY tarih DESC, olusturma_tarihi DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gider ekle
app.post('/api/giderler', async (req, res) => {
  try {
    const { tarih, kategori, aciklama, tutar } = req.body;
    
    const result = await pool.query(
      `INSERT INTO giderler (tarih, kategori, aciklama, tutar, olusturma_tarihi) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul') 
       RETURNING *`,
      [tarih, kategori, aciklama, tutar]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gider güncelle
app.put('/api/giderler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tarih, kategori, aciklama, tutar } = req.body;
    
    const result = await pool.query(
      `UPDATE giderler 
       SET tarih = $1, kategori = $2, aciklama = $3, tutar = $4 
       WHERE id = $5 
       RETURNING *`,
      [tarih, kategori, aciklama, tutar, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gider sil
app.delete('/api/giderler/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM giderler WHERE id = $1', [id]);
    res.json({ message: 'Gider silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tarih aralığına göre giderler
app.get('/api/giderler/tarih/:baslangic/:bitis', async (req, res) => {
  try {
    const { baslangic, bitis } = req.params;
    
    const result = await pool.query(
      `SELECT * FROM giderler 
       WHERE tarih BETWEEN $1 AND $2 
       ORDER BY tarih DESC`,
      [baslangic, bitis]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kategoriye göre gider özeti
app.get('/api/giderler/ozet', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        kategori,
        COUNT(*) as adet,
        SUM(tutar) as toplam
      FROM giderler
      GROUP BY kategori
      ORDER BY toplam DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// SERVER BAŞLAT
// ============================================

app.get('/', (req, res) => {
  res.json({ message: '🚗 Oto Yıkama CRM API çalışıyor!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`📡 API: http://localhost:${PORT}`);
});
