import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {
  promptEvent;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      window.location.reload();
    });

    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallpromp fired!');
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('display-mode is standalone');
        this.promptEvent = event;
      }
    });
  }
}