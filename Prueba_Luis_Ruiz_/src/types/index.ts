export interface Message {
  id: number;
  content: string;
  author: string;
  likes: number;
  created_at: string;
}

export interface CreateMessageDTO {
  content: string;
  author: string;
}