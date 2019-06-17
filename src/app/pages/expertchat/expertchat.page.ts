import { Component, AfterContentInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-expertchat',
  templateUrl: 'expertchat.page.html',
  styleUrls: ['expertchat.page.scss']
})
export class ExpertchatPage implements AfterContentInit {
  loading = true;
  chats: any[];

  constructor(
    private chatService: ChatService
  ) { }

  ngAfterContentInit() {
    this.loadChats();
  }

  loadChats() {
    this.loading = true;
    this.chatService.getChats().subscribe(chats => {
      console.log('chats: ', chats);
      this.chats = chats as any[];
      this.loading = false;
    });
  }
}
