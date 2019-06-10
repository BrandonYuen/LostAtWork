import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiaryEntryCreatePage } from './diary-entry-create.page';

const routes: Routes = [
  {
    path: '',
    component: DiaryEntryCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiaryEntryCreatePage]
})
export class DiaryEntryCreatePageModule {}
