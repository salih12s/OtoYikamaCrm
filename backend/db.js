const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Türkiye saatine çevir (UTC+3) - Her bağlantıda ayarla
pool.on('connect', async (client) => {
  await client.query("SET timezone = 'Turkey'");
});

// Pool query'yi override ederek her sorguda timezone'u ayarla
const originalQuery = pool.query.bind(pool);
pool.query = async (...args) => {
  const client = await pool.connect();
  try {
    await client.query("SET timezone = 'Turkey'");
    const result = await client.query(...args);
    return result;
  } finally {
    client.release();
  }
};

module.exports = pool;
