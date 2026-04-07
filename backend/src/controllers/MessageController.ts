import { Request, Response } from 'express';
import { MessageModel } from '../models/MessageModel';
import { emitNewMessage, emitLikeUpdate } from '../socket/socketService';

export class MessageController {
  static async getMessages(req: Request, res: Response) {
    try {
      const messages = await MessageModel.getAllMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error obteniendo mensajes' });
    }
  }

  static async createMessage(req: Request, res: Response) {
    try {
      const { content, author } = req.body;
      
      if (!content || !author) {
        return res.status(400).json({ success: false, message: 'Faltan datos' });
      }

      const newMessage = await MessageModel.createMessage({ content, author });
    //  console.log('📝 Nuevo mensaje creado:', newMessage);
      
      // Emitir via WebSocket
      emitNewMessage(newMessage);
      
      res.json({ success: true, data: newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error creando mensaje' });
    }
  }

  static async likeMessage(req: Request, res: Response) {
    try {
      const { messageId, userId } = req.body;
      
     // console.log(`👍 Like request: messageId=${messageId}, userId=${userId}`);
      
      if (!messageId || !userId) {
        return res.status(400).json({ success: false, message: 'Faltan datos' });
      }

      const liked = await MessageModel.likeMessage(Number(messageId), userId);
     // console.log(`Like result: ${liked}`);
      
      if (liked) {
        // Obtener el mensaje actualizado
        const messages = await MessageModel.getAllMessages();
        const message = messages.find(m => m.id === Number(messageId));
        
        if (message) {
      //    console.log(`📢 Emitiendo like_update: messageId=${messageId}, nuevos likes=${message.likes}`);
          emitLikeUpdate(Number(messageId), message.likes);
        }
      }
      
      res.json({ success: true, liked });
    } catch (error) {
     // console.error('Error en likeMessage:', error);
      res.status(500).json({ success: false, message: 'Error dando like' });
    }
  }
}