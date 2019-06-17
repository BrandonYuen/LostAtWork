import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { AuthService } from 'src/app/services/auth.service';
import { DiaryEntry } from 'src/app/models/diary-entry.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientdiary',
  templateUrl: 'clientdiary.page.html',
  styleUrls: ['clientdiary.page.scss']
})

export class ClientdiaryPage implements OnInit {
  noEntries: boolean;
  diaryEntries: DiaryEntry[];
  clientEmail: string;

  constructor(private diaryService: DiaryService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // If for some reason no diaryId is available, redirect to main diary page.
      if (!paramMap.has('userId')) {
        console.log('no paramMap found for userId');
        return;
      }

      const userId = paramMap.get('userId');
      // Request chat data by id
      this.loadDiaryByUserId(userId);
    });
  }

  loadDiaryByUserId(userId: string) {
    this.diaryService.getAllEntriesByUserId(userId).subscribe(entries => {
      this.diaryEntries = entries as DiaryEntry[];
      console.log('diaryEntries: ', this.diaryEntries);
    });
  }
}
