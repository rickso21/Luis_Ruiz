import { pool } from '../config/database';

export interface Message {
  id: number;
  content: string;
  author: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}

export class MessageModel {
  static async getAllMessages(): Promise<Message[]> {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async createMessage(data: { content: string; author: string }): Promise<Message> {
    const { content, author } = data;
    const result = await pool.query(
      'INSERT INTO messages (content, author) VALUES ($1, $2) RETURNING *',
      [content, author]
    );
    return result.rows[0];
  }

  static async likeMessage(messageId: number, userId: string): Promise<boolean> {
    try {
      // Verificar si ya existe like
      const existingLike = await pool.query(
        'SELECT * FROM likes WHERE message_id = $1 AND user_id = $2',
        [messageId, userId]
      );

      if (existingLike.rows.length > 0) {
        console.log(`⚠️ Usuario ${userId} ya dio like al mensaje ${messageId}`);
        return false;
      }

      // Insertar like
      await pool.query(
        'INSERT INTO likes (message_id, user_id) VALUES ($1, $2)',
        [messageId, userId]
      );

      // Actualizar contador
      await pool.query(
        'UPDATE messages SET likes = likes + 1 WHERE id = $1',
        [messageId]
      );

      console.log(`✅ Like registrado: mensaje ${messageId} por usuario ${userId}`);
      return true;
    } catch (error) {
      console.error('Error en likeMessage:', error);
      return false;
    }
  }
}