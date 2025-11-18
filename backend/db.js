const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Türkiye saatine çevir (UTC+3)
pool.on('connect', (client) => {
  client.query("SET timezone = 'Europe/Istanbul'", (err) => {
    if (err) console.error('Timezone ayarlanamadı:', err);
  });
});

module.exports = pool;
