export interface Message {
  id: number;
  content: string;
  author: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}

export interface Like {
  id: number;
  message_id: number;
  user_id: string;
  created_at: Date;
}

export interface CreateMessageDTO {
  content: string;
  author: string;
}

export interface LikeMessageDTO {
  message_id: number;
  user_id: string;
}