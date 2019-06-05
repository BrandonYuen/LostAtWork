import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'diary',
        children: [
          {
            path: '',
            loadChildren: '../diary/diary.module#DiaryPageModule'
          },
          {
            path: ':diaryId',
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
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/diary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
