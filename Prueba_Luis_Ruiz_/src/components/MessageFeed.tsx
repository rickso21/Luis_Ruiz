import React, { useState, useEffect } from 'react';
import { messageService } from '../services/messageService';
import { useWebSocket } from '../hooks/useWebSocket';
import type { Message } from '../types';
import toast from 'react-hot-toast';

const MessageFeed: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estado para el userId que cambiará en cada like
  const [, setCurrentUserId] = useState<string>('');

  const { newMessage, likeUpdate } = useWebSocket();

  // Función para generar nuevo userId automáticamente
  const generateNewUserId = () => {
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCurrentUserId(newId);
    return newId;
  };

  // Inicializar userId al cargar el componente
  useEffect(() => {
    generateNewUserId();
  }, []);

  // Cargar mensajes iniciales
  useEffect(() => {
    loadMessages();
  }, []);

  // Escuchar nuevos mensajes por WebSocket
  useEffect(() => {
    if (newMessage) {
      setMessages(prev => [newMessage, ...prev]);
      toast.success('Nuevo mensaje recibido');
    }
  }, [newMessage]);

  // Escuchar actualizaciones de likes
  useEffect(() => {
    if (likeUpdate) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === likeUpdate.messageId
            ? { ...msg, likes: likeUpdate.likes }
            : msg
        )
      );
    }
  }, [likeUpdate]);

  const loadMessages = async () => {
    try {
      const data = await messageService.getMessages();
      setMessages(data);
    } catch (error) {
      toast.error('Error cargando mensajes');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !author.trim()) {
      toast.error('Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await messageService.createMessage({
        content: newPostContent,
        author: author.trim()
      });
      setNewPostContent('');
      toast.success('Mensaje publicado');
    } catch (error) {
      toast.error('Error publicando mensaje');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (messageId: number) => {
    const newUserId = generateNewUserId();
    console.log(`👍 Dando like al mensaje ${messageId} con nuevo userId: ${newUserId}`);
    
    try {
      await messageService.likeMessage(messageId, newUserId);
      toast.success('Like registrado!', {
        duration: 1000,
      });
      
      // Opcional: Efecto visual en el botón
      const button = document.getElementById(`like-btn-${messageId}`);
      if (button) {
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 200);
      }
    } catch (error) {
      console.error('Error dando like:', error);
      toast.error('Error dando like');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Interacciones por mensaje</h1>
      <br></br>

      {/* Formulario de publicación */}
      <form onSubmit={handleCreatePost} style={styles.form}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="¿Qué estás pensando?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          style={styles.textarea}
          rows={3}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>

      {/* Feed de mensajes */}
      <div style={styles.feed}>
        {messages.map((message) => (
          <div key={message.id} style={styles.messageCard}>
            <div style={styles.messageHeader}>
              <strong style={styles.author}>👤 {message.author}</strong>
              <span style={styles.date}>
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <p style={styles.content}>{message.content}</p>
            <div style={styles.messageFooter}>
              <button
                id={`like-btn-${message.id}`}
                onClick={() => handleLike(message.id)}
                style={styles.likeButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffebee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ❤️ {message.likes} likes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '20px',
  },
  infoBar: {
    backgroundColor: '#e3f2fd',
    color: '#d21f19',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center' as const,
    marginBottom: '20px',
    fontSize: '14px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  button: {
    backgroundColor: '#ff0000',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  author: {
    color: '#007bff',
  },
  date: {
    color: '#999',
    fontSize: '12px',
  },
  content: {
    fontSize: '16px',
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  messageFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  likeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '5px 15px',
    borderRadius: '20px',
    transition: 'all 0.3s',
    color: '#e74c3c',
  },
};

export default MessageFeed;