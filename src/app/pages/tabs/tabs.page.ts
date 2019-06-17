import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HideTabOnInputService } from 'src/app/services/hide-tab-on-input.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  hideTabBar$: Observable<boolean>;

  userIsExpert = false;

  constructor(
    private hideTabService: HideTabOnInputService,
    private authService: AuthService
  ) {
    // Subscribe to hide tab bar subject from hide tab service (to hide tab bar on keyboard shown)
    this.hideTabBar$ = this.hideTabService.hideTabBar;
    this.userIsExpert = authService.user.isExpert;
  }
}
