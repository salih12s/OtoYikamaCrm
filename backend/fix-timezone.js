const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function fixTimezone() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Timezone düzeltmeleri başlıyor...\n');

    // arac_islemler tablosundaki tarihleri düzelt
    console.log('1️⃣ İşlem tarihlerini düzeltiyorum...');
    const islemlerResult = await client.query(`
      UPDATE arac_islemler 
      SET gelis_tarihi = gelis_tarihi - INTERVAL '3 hours'
      WHERE gelis_tarihi > NOW() - INTERVAL '7 days'
    `);
    console.log(`✅ ${islemlerResult.rowCount} işlem tarihi düzeltildi\n`);

    // odeme_gecmisi tablosundaki tarihleri düzelt
    console.log('2️⃣ Ödeme tarihlerini düzeltiyorum...');
    const odemeResult = await client.query(`
      UPDATE odeme_gecmisi 
      SET odeme_tarihi = odeme_tarihi - INTERVAL '3 hours'
      WHERE odeme_tarihi > NOW() - INTERVAL '7 days'
    `);
    console.log(`✅ ${odemeResult.rowCount} ödeme tarihi düzeltildi\n`);

    // giderler tablosundaki tarihleri düzelt
    console.log('3️⃣ Gider tarihlerini düzeltiyorum...');
    const giderResult = await client.query(`
      UPDATE giderler 
      SET olusturma_tarihi = olusturma_tarihi - INTERVAL '3 hours'
      WHERE olusturma_tarihi > NOW() - INTERVAL '7 days'
    `);
    console.log(`✅ ${giderResult.rowCount} gider tarihi düzeltildi\n`);

    console.log('🎉 Tüm tarihler başarıyla düzeltildi!');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

fixTimezone();
