import { Injectable } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs.page';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideTabOnInputService {

  _hideTabBar: BehaviorSubject<boolean>;

  get hideTabBar() {
    return this._hideTabBar.asObservable();
  }

  constructor() {
    this._hideTabBar = new BehaviorSubject(false);
  }

  createListeners() {
    let inputs = document.querySelectorAll('ion-input, ion-textarea');
    for (let i = 0; i < inputs.length; i++) {
      console.log('input: ', inputs[i]);
      inputs[i].addEventListener('focusin', (e) => {
        console.log('FOCUS IN');
        this._hideTabBar.next(true);
      });
      inputs[i].addEventListener('focusout', (e) => {
        console.log('FOCUS OUT', e);
        this._hideTabBar.next(false);
      });
    }
  }
}
