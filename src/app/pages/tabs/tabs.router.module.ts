import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'diary',
        children: [
          {
            path: '',
            loadChildren: '../diary/diary.module#DiaryPageModule'
          },
          {
            path: 'newEntry',
            loadChildren: '../diary/diary-entry-create/diary-entry-create.module#DiaryEntryCreatePageModule'
          },
          {
            path: 'entry/:diaryId',
            loadChildren: '../diary/diary-entry-detail/diary-entry-detail.module#DiaryEntryDetailPageModule'
          }
        ]
      },
      {
        path: 'guide',
        children: [
          {
            path: '',
            loadChildren: '../guide/guide.module#GuidePageModule'
          }
        ]
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            loadChildren: '../help/help.module#HelpPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/diary',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
