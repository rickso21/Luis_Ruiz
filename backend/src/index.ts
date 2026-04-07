import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import messageRoutes from './routes/messageRoutes';
import { initDatabase } from './config/database';
import { setIo } from './socket/socketService';

// Cargar variables de entorno según el entorno
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// Configurar CORS para múltiples entornos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
  'https://*.onrender.com'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => allowed === origin || origin.includes('onrender.com'))) {
      callback(null, true);
    } else {
      console.log('CORS bloqueado:', origin);
      callback(null, true); // En desarrollo permitir todo
    }
  },
  credentials: true
}));

app.use(express.json());

// Configurar Socket.IO
const io = new SocketServer(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.some(allowed => allowed === origin || origin.includes('onrender.com'))) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST"]
  }
});

setIo(io);

// Rutas
app.use('/api', messageRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// WebSocket
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// Inicializar
initDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Servidor (${process.env.NODE_ENV || 'development'}) en puerto ${PORT}`);
  });
});