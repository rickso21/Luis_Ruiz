import { api } from '../config/api';
import type { Message, CreateMessageDTO } from '../types';

export const messageService = {
  // Obtener todos los mensajes
  getMessages: async (): Promise<Message[]> => {
    const response = await api.get('/messages');
    return response.data.data;
  },

  // Crear mensaje
  createMessage: async (data: CreateMessageDTO): Promise<Message> => {
    const response = await api.post('/messages', data);
    return response.data.data;
  },

  // Dar like
  likeMessage: async (messageId: number, userId: string): Promise<void> => {
    await api.post('/messages/like', { messageId, userId });
  }
};