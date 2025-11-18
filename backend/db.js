const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Türkiye saati için yardımcı fonksiyon
const getTurkeyTime = () => {
  // Şu anki UTC zamanı al
  const now = new Date();
  
  // Türkiye saati için formatla (PostgreSQL TIMESTAMP formatında)
  const turkeyTimeString = now.toLocaleString('sv-SE', { 
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(' ', 'T');
  
  return turkeyTimeString;
};

module.exports = { pool, getTurkeyTime };
