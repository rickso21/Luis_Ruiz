import axios from 'axios';
import io from 'socket.io-client';

// Determinar URL del backend según el entorno
const getBackendUrl = () => {
  // Producción en Render
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BACKEND_URL || 'https://message-feed-backend.onrender.com';
  }
  // Desarrollo local
  return 'http://localhost:3001';
};

const BACKEND_URL = getBackendUrl();

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 10000,
});







export const socket = io(BACKEND_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Interceptor para logs
api.interceptors.request.use((config) => {
  console.log(`📡 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);