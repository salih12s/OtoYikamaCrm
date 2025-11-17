const pool = require('./db');

async function fixNullCustomers() {
  try {
    console.log('🔧 NULL musteri_id olan işlemler düzeltiliyor...');
    
    // NULL musteri_id olan tüm işlemleri bul
    const nullCustomers = await pool.query(`
      SELECT * FROM arac_islemler 
      WHERE musteri_id IS NULL
      ORDER BY gelis_tarihi
    `);
    
    console.log(`📊 ${nullCustomers.rows.length} adet NULL müşteri bulundu.`);
    
    for (const islem of nullCustomers.rows) {
      // Her işlem için yeni bir müşteri kaydı oluştur
      const musteriResult = await pool.query(
        'INSERT INTO musteriler (ad_soyad, telefon) VALUES ($1, $2) RETURNING id',
        [null, null]
      );
      
      const newMusteriId = musteriResult.rows[0].id;
      
      // İşlemin musteri_id'sini güncelle
      await pool.query(
        'UPDATE arac_islemler SET musteri_id = $1 WHERE id = $2',
        [newMusteriId, islem.id]
      );
      
      console.log(`✅ İşlem ${islem.plaka} için müşteri ${newMusteriId} oluşturuldu`);
    }
    
    console.log('🎉 Tüm NULL müşteriler düzeltildi!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

fixNullCustomers();
