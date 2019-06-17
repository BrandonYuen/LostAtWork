import { ChatMessage } from './chat-message';

export interface Chat {
  _id: string;
  updatedAt: Date;
  messages: ChatMessage[];
}
