import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiaryService } from 'src/app/services/diary.service';
import { DiaryEntry } from '../../../models/diary-entry.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-diary-entry-detail',
  templateUrl: './diary-entry-detail.page.html',
  styleUrls: ['./diary-entry-detail.page.scss'],
})

export class DiaryEntryDetailPage implements OnInit {
  diaryEntry$: Observable<DiaryEntry>;

  constructor(
    private diaryService: DiaryService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // If for some reason no diaryId is available, redirect to main diary page.
      if (!paramMap.has('diaryId')) {
        console.log('no paramMap found for diaryId');
        this.navController.navigateBack('/diary');
        return;
      }

      const entryId = paramMap.get('diaryId');

      // Subscribe to all entries, but map it to the single entry we need.
      this.diaryEntry$ = this.diaryService.diaryEntries.pipe(
        map(entries => entries.find(e => e._id === entryId)),
        tap(entry => {
          // Go back to diary page if the single entry could not be loaded immediately
          if (!entry) { this.navController.navigateBack('/tabs/diary'); }
        })
      );

      this.diaryService.fetchOneEntry(entryId);
    });
  }

  delete(entry) {
    console.log('Deleting entry: ', entry._id);
    this.diaryService.removeEntry(entry).subscribe(res => {
      console.log('Successfully deleted entry with id', entry._id)
      this.navController.navigateBack(['tabs/diary']);
      this.diaryService.successToast('Gebeurtenis \'' + entry.title + '\' is verwijderd.');
    });
  }

}
