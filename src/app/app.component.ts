import { Component } from '@angular/core';

import { Platform, NavController,  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { PwaService } from './services/pwa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private navController: NavController,
    private pwaService: PwaService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(state => {
        if (!state) {
          console.log('[app.component] authenticationState = false');
          this.navController.navigateBack('/login');
        }
      });
    });
  }
}
