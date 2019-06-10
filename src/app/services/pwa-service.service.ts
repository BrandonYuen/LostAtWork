import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable()
export class PwaService {
  promptEvent;

  constructor(private swUpdate: SwUpdate, public toastController: ToastController, public alertController: AlertController) {
    const navigator: any = window.navigator;

    // Listen for possible service worker update (new version of pwa)
    swUpdate.available.subscribe(event => {
      // TODO: Ask user with alert if he wants to reload page / update
      this.presentAlertUpdateApp();
    });

    // Listen for browser install prompt event (Chrome / Firefox / Android Only)
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      console.log('beforeinstallpromp fired!');
      this.promptEvent = event;
      this.presentToastForAndroid();
    });

    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in navigator) && (navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.presentToastForIos();
    }
  }

  async presentAlertUpdateApp() {
    const alert = await this.alertController.create({
      header: 'New update available!',
      message: 'Do you want to refresh the page to load the new version?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Update',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastForAndroid() {
    const toast = await this.toastController.create({
      message: 'Install as fullscreen WebApp?',
      position: 'bottom',
      color: 'light',
      buttons: [
        {
          side: 'start',
          icon: 'close'
        }, {
          text: 'Install',
          handler: () => {
            this.promptEvent.prompt();
          }
        }
      ]
    });
    toast.present();
  }

  async presentToastForIos() {
    const toast = await this.toastController.create({
      message: 'Install this webapp: tap the \'Share\' button in the toolbar below and then \'Add to Homescreen\'.',
      position: 'bottom',
      color: 'light',
      buttons: [
        {
          side: 'start',
          icon: 'close'
        },
        {
          side: 'end',
          icon: 'shareios',
          handler: () => {
            this.presentToastForIos();
          }
        }
      ]
    });
    toast.present();
  }
}