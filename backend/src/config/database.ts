import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'message_feed',
});

export const initDatabase = async () => {
  const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      author VARCHAR(100) NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createLikesTable = `
    CREATE TABLE IF NOT EXISTS likes (
      id SERIAL PRIMARY KEY,
      message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
      user_id VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(message_id, user_id)
    );
  `;

  try {
    await pool.query(createMessagesTable);
    await pool.query(createLikesTable);
    //console.log('✅ Tablas creadas/verificadas correctamente');
  } catch (error) {
   // console.error('❌ Error creando tablas:', error);
  }
};