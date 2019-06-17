import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  @Input() user: any;
  @Input() clientEmail: any;

  constructor() { }

  ngOnInit() {}

  getReadableDayFromDate(date: Date) {
    switch (date.getDay()) {
      case 0: return 'Zondag';
      case 1: return 'Maandag';
      case 2: return 'Dinsdag';
      case 3: return 'Woensdag';
      case 4: return 'Donderdag';
      case 5: return 'Vrijdag';
      case 6: return 'Zaterdag';
    }
  }
}
