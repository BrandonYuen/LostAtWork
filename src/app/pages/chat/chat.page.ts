import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HideTabOnInputService } from 'src/app/services/hide-tab-on-input.service';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit, AfterContentInit {
  loading = true;
  chatForm: FormGroup;
  chat: any;
  user = null;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private hideTabsOnInput: HideTabOnInputService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user = authService.user;
  }

  // convenience getter for easy access to form fields
  get f() { return this.chatForm.controls; }

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngAfterContentInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // If for some reason no diaryId is available, redirect to main diary page.
      if (!paramMap.has('chatId')) {
        console.log('no paramMap found for chatId');
        // Request chat data
        this.loadChat();
        return;
      }

      const chatId = paramMap.get('chatId');
      // Request chat data by id
      this.loadChatById(chatId);
    });
  }

  loadChat() {
    this.loading = true;
    this.chatService.getChats().subscribe(chats => {
      console.log('chat: ', chats[0]);
      this.chat = chats[0];
      setTimeout(() => {
        this.content.scrollToBottom(300);

        // Automatically generate listeners for all inputs to hide tab bar
        this.hideTabsOnInput.createListeners();
      }, 300);
      this.loading = false;
    });
  }

  loadChatById(chatId: string) {
    this.loading = true;
    this.chatService.getChatById(chatId).subscribe(chat => {
      console.log('chat: ', chat);
      this.chat = chat;
      setTimeout(() => {
        this.content.scrollToBottom(300);

        // Automatically generate listeners for all inputs to hide tab bar
        this.hideTabsOnInput.createListeners();
      }, 300);
      this.loading = false;
    });
  }

  onSubmit() {
    if (!this.chatForm.invalid) {
      const msg = {...this.chatForm.value};
      this.chatService.sendChatMessage(this.chat._id, msg).subscribe(updatedChat => {
        this.chat.messages.push(updatedChat.messages.pop());
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 300);
      }, err => this.handleError(err));

      this.chatForm.reset();
    }
  }

  async requestExpert(confirmed: boolean = false) {
    // Show confirmation alert if not confirmed
    if (!confirmed) {
      const alert = await this.alertController.create({
        header: 'Expert Inschakelen?',
        message: 'Je zal in een chat komen met een echt persoon die je zal helpen. Ook zal onze expert je dagboek kunnen inzien.',
        buttons: [
          {
            text: 'Annuleren',
            role: 'cancel'
          },
          {
            text: 'Ja',
            handler: () => {
              this.requestExpert(true);
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    // Create new chatroom
    this.chatService.createNewChat().subscribe((res ) => {
      console.log('created chat');
      this.loading = true;
      setTimeout(() => {
        this.loadChat();
      }, 2000);
    }, err => this.handleError(err));
  }

  handleError(e: any) {
    switch (e.status) {
      case 400 || 404:
        this.chatService.showAlert(e.error.msg);
        break;
      default:
        this.chatService.showAlert('Can\'t connect to server.');
        break;
    }
  }
}
