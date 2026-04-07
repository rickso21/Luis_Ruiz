import { Server as SocketServer } from 'socket.io';

let io: SocketServer | null = null;

export const setIo = (socketIo: SocketServer) => {
  io = socketIo;
 // console.log('✅ Socket.IO configurado correctamente');
};

export const emitNewMessage = (message: any) => {
  if (io) {
 //   console.log('📤 Emitiendo new_message:', message);
    io.emit('new_message', message);
  } else {
 //   console.log('❌ No se puede emitir: io no está configurado');
  }
};

export const emitLikeUpdate = (messageId: number, likes: number) => {
  if (io) {
   // console.log(`📤 Emitiendo like_update: messageId=${messageId}, likes=${likes}`);
    io.emit('like_update', { messageId, likes });
  } else {
  //  console.log('❌ No se puede emitir like: io no está configurado');
  }
};