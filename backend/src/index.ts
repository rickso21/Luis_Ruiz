import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO
const io = new SocketServer(server, {
  cors: { origin: "*", credentials: true }
});

// Almacenamiento en memoria (sin DB para simplificar el deploy)
let messages: any[] = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Obtener mensajes
app.get('/api/messages', (req, res) => {
  res.json({ success: true, data: messages });
});

// Crear mensaje
app.post('/api/messages', (req, res) => {
  const { content, author } = req.body;
  const newMessage = {
    id: nextId++,
    content,
    author,
    likes: 0,
    created_at: new Date().toISOString()
  };
  messages.unshift(newMessage);
  io.emit('new_message', newMessage);
  res.json({ success: true, data: newMessage });
});

// Dar like
app.post('/api/messages/like', (req, res) => {
  const { messageId, userId } = req.body;
  const message = messages.find(m => m.id === messageId);
  if (message) {
    message.likes++;
    io.emit('like_update', { messageId, likes: message.likes });
  }
  res.json({ success: true });
});

// WebSocket
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});