import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-guide',
  templateUrl: 'guide.page.html',
  styleUrls: ['guide.page.scss']
})

export class GuidePage {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
