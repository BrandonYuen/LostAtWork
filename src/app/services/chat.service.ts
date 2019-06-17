import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string;

  constructor(private http: HttpClient, private alertController: AlertController) {
    this.baseUrl = environment.api.url;
  }

  getChats() {
    return this.http.get(`${this.baseUrl}/api/chats`, { })
    .pipe(
      map(chats => {
        for (let chat of (chats as Array<Chat>)) {
          chat.updatedAt = new Date(chat.updatedAt);
          for (let chatMessage of (chat.messages as Array<ChatMessage>)) {
            chatMessage.date = new Date(chatMessage.date);
          }
        }
        return chats;
      })
    );
  }

  getChatById(chatId: string) {
    return this.http.get(`${this.baseUrl}/api/chats/${chatId}`, { })
    .pipe(
      map((chat: Chat) => {
        chat.updatedAt = new Date(chat.updatedAt);
        for (let chatMessage of (chat.messages as Array<ChatMessage>)) {
          chatMessage.date = new Date(chatMessage.date);
        }
        return chat;
      })
    );
  }

  sendChatMessage(chatId: string, chatMessage: any) {
    return this.http.post(`${this.baseUrl}/api/chats/${chatId}/sendMessage`, chatMessage)
    .pipe(
      map((updatedChat: Chat) => {
        updatedChat.updatedAt = new Date(updatedChat.updatedAt);
        for (let chatMessage of (updatedChat.messages as Array<ChatMessage>)) {
          chatMessage.date = new Date(chatMessage.date);
        }
        return updatedChat;
      })
    );
  }

  createNewChat() {
    return this.http.post(`${this.baseUrl}/api/chats`, { });
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
