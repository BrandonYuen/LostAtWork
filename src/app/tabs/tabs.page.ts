import { Component } from '@angular/core';
import { PwaService } from '../pwa-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(public pwaService: PwaService) {}
}
