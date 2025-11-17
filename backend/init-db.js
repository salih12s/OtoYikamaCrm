const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Mevcut tablolar siliniyor...');
    
    // Önce tüm tabloları sil (CASCADE ile bağlantıları da siler)
    await client.query('DROP TABLE IF EXISTS giderler CASCADE');
    await client.query('DROP TABLE IF EXISTS odeme_gecmisi CASCADE');
    await client.query('DROP TABLE IF EXISTS arac_islemler CASCADE');
    await client.query('DROP TABLE IF EXISTS hizmetler CASCADE');
    await client.query('DROP TABLE IF EXISTS musteriler CASCADE');
    
    console.log('✅ Tüm tablolar silindi\n');
    console.log('🔧 Veritabanı tabloları oluşturuluyor...');

    // 1. Müşteriler Tablosu
    await client.query(`
      CREATE TABLE IF NOT EXISTS musteriler (
        id SERIAL PRIMARY KEY,
        plaka VARCHAR(20) UNIQUE NOT NULL,
        kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        toplam_harcama DECIMAL(10, 2) DEFAULT 0,
        aktif_bakiye DECIMAL(10, 2) DEFAULT 0,
        notlar TEXT
      )
    `);
    console.log('✅ Müşteriler tablosu oluşturuldu');

    // 2. Hizmet Tanımları Tablosu
    await client.query(`
      CREATE TABLE IF NOT EXISTS hizmetler (
        id SERIAL PRIMARY KEY,
        hizmet_adi VARCHAR(255) NOT NULL,
        aktif BOOLEAN DEFAULT true,
        olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Hizmetler tablosu oluşturuldu');

    // 3. Araç İşlem Tablosu
    await client.query(`
      CREATE TABLE IF NOT EXISTS arac_islemler (
        id SERIAL PRIMARY KEY,
        musteri_id INTEGER REFERENCES musteriler(id) ON DELETE SET NULL,
        plaka VARCHAR(20) NOT NULL,
        marka VARCHAR(100),
        model VARCHAR(100),
        gelis_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        hizmet_turu VARCHAR(255) NOT NULL,
        tutar DECIMAL(10, 2) NOT NULL,
        odenen_tutar DECIMAL(10, 2) DEFAULT 0,
        kalan_tutar DECIMAL(10, 2) DEFAULT 0,
        odeme_yontemi VARCHAR(50),
        notlar TEXT,
        durum VARCHAR(50) DEFAULT 'Bekliyor'
      )
    `);
    console.log('✅ Araç işlemler tablosu oluşturuldu');

    // 4. Ödeme Geçmişi Tablosu (Partial payment için)
    await client.query(`
      CREATE TABLE IF NOT EXISTS odeme_gecmisi (
        id SERIAL PRIMARY KEY,
        arac_islem_id INTEGER REFERENCES arac_islemler(id) ON DELETE CASCADE,
        odeme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        odenen_miktar DECIMAL(10, 2) NOT NULL,
        odeme_yontemi VARCHAR(50),
        notlar TEXT
      )
    `);
    console.log('✅ Ödeme geçmişi tablosu oluşturuldu');

    // 5. Giderler Tablosu
    await client.query(`
      CREATE TABLE IF NOT EXISTS giderler (
        id SERIAL PRIMARY KEY,
        tarih DATE NOT NULL DEFAULT CURRENT_DATE,
        kategori VARCHAR(100) NOT NULL,
        aciklama TEXT,
        tutar DECIMAL(10, 2) NOT NULL,
        olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Giderler tablosu oluşturuldu');

    // 6. Notlar Tablosu
    await client.query(`
      CREATE TABLE IF NOT EXISTS notlar (
        id SERIAL PRIMARY KEY,
        baslik VARCHAR(255) NOT NULL,
        icerik TEXT,
        renk VARCHAR(20) DEFAULT 'yellow',
        olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        guncelleme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Notlar tablosu oluşturuldu');

    console.log('\n🎉 Veritabanı başarıyla hazırlandı!');
    console.log('📊 Oluşturulan tablolar:');
    console.log('   - musteriler');
    console.log('   - hizmetler');
    console.log('   - arac_islemler');
    console.log('   - odeme_gecmisi');
    console.log('   - giderler');
    console.log('   - notlar');

  } catch (error) {
    console.error('❌ Hata:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

initDatabase();
