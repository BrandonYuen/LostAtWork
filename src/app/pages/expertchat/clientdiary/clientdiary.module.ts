import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientdiaryPage } from './clientdiary.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ClientdiaryPage }])
  ],
  declarations: [ClientdiaryPage]
})

export class ClientdiaryPageModule {}
