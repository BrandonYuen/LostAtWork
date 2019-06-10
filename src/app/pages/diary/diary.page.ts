import { Component, OnInit } from '@angular/core';
import { DiaryEntry } from '../../models/diary-entry.model';
import { DiaryService } from 'src/app/services/diary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diary',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss']
})

export class DiaryPage implements OnInit {
  noEntries: boolean;
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(private diaryService: DiaryService, private authService: AuthService) { }

  ngOnInit() {
    // Subscribe to all entries from datastore
    this.diaryEntries$ = this.diaryService.diaryEntries;
    this.diaryService.fetchAllEntries();


    // Show empty diary text when no entries exist after dataStore update
    this.diaryEntries$.subscribe(entries => this.noEntries = (entries.length < 1));
  }

  logout() {
    this.authService.logout();
  }
}
