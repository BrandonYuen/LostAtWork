import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiaryPage } from './diary.page';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DiaryPage }])
  ],
  declarations: [DiaryPage, DiaryEntryComponent]
})

export class DiaryPageModule {}
