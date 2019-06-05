import { Component, OnInit } from '@angular/core';
import { DiaryEntry } from './diary-entry/diary-entry.model';
import { DiaryEntriesService } from './diary-entries.service';

@Component({
  selector: 'app-diary',
  templateUrl: 'diary.page.html',
  styleUrls: ['diary.page.scss']
})

export class DiaryPage implements OnInit{
  diaryEntries: DiaryEntry[];

  constructor(private diaryEntryService: DiaryEntriesService) {
    this.diaryEntries = diaryEntryService.getAllEntries();
  }

  ngOnInit() {}
}
