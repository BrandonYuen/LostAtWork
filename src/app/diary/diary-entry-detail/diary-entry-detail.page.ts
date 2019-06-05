import { Component, OnInit } from '@angular/core';
import { DiaryEntry } from '../diary-entry/diary-entry.model';
import { DiaryEntriesService } from '../diary-entries.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diary-entry-detail',
  templateUrl: './diary-entry-detail.page.html',
  styleUrls: ['./diary-entry-detail.page.scss'],
})

export class DiaryEntryDetailPage implements OnInit {
  loadedDiaryEntry: DiaryEntry;

  constructor(
    private diaryEntriesService: DiaryEntriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // If for some reason no diaryId is available, redirect to main diary page.
      if (!paramMap.has('diaryId')) {
        this.router.navigate(['diary']);
        return;
      }

      // Load detail diary
      const diaryId = paramMap.get('diaryId');
      this.loadedDiaryEntry = this.diaryEntriesService.getEntry(diaryId);
    });
  }

}
