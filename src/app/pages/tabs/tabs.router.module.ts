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
            children: [
              {
                path: '',
                loadChildren: '../diary/diary-entry-detail/diary-entry-detail.module#DiaryEntryDetailPageModule'
              },
              {
                path: 'edit',
                loadChildren: '../diary/diary-entry-edit/diary-entry-edit.module#DiaryEntryEditPageModule'
              }
            ]
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
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: '../chat/chat.module#ChatPageModule'
          }
        ]
      },
      {
        path: 'expert',
        children: [
          {
            path: '',
            loadChildren: '../expertchat/expertchat.module#ExpertchatPageModule'
          },
          {
            path: 'chat/:chatId',
            children: [
              {
                path: '',
                loadChildren: '../chat/chat.module#ChatPageModule'
              }
            ]
          },
          {
            path: 'user/:userId/diary',
            children: [
              {
                path: '',
                loadChildren: '../expertchat/clientdiary/clientdiary.module#ClientdiaryPageModule'
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/guide',
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
