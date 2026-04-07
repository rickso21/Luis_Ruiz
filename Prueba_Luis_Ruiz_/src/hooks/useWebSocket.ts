import { useEffect, useState } from 'react';
import { socket } from '../config/api';
import type { Message } from '../types';

export const useWebSocket = () => {
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [likeUpdate, setLikeUpdate] = useState<{ messageId: number; likes: number } | null>(null);

  useEffect(() => {
    socket.on('new_message', (message: Message) => {
      setNewMessage(message);
    });

    socket.on('like_update', (data: { messageId: number; likes: number }) => {
      setLikeUpdate(data);
    });

    return () => {
      socket.off('new_message');
      socket.off('like_update');
    };
  }, []);

  return { newMessage, likeUpdate };
};