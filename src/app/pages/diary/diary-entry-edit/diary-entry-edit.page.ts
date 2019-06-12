import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiaryService } from 'src/app/services/diary.service';
import { NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DiaryEntry } from 'src/app/models/diary-entry.model';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-diary-entry-edit',
  templateUrl: './diary-entry-edit.page.html',
  styleUrls: ['./diary-entry-edit.page.scss'],
})
export class DiaryEntryEditPage implements OnInit {

  isSubmit = false;
  entryForm: FormGroup;
  diaryEntry$: Observable<DiaryEntry>;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private diaryService: DiaryService,
    private navController: NavController,
    private alertController: AlertController
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.entryForm.controls; }


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
          if (!entry) { 
            this.navController.navigateBack('/tabs/diary'); 
            return;
          }

          // Fill the form input value's with current entry data
          this.entryForm.patchValue({
            _id: entry._id,
            date: entry.date,
            title: entry.title,
            content: entry.content,
            misconductType: entry.misconductType
          });
        })
      );

      this.diaryService.fetchOneEntry(entryId);
    });

    this.entryForm = this.formBuilder.group({
      _id: '',
      date: '',
      title: ['', [Validators.required, Validators.minLength(3)]],
      misconductType: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (!this.entryForm.invalid) {
      this.diaryService.updateEntry(this.entryForm.value).subscribe(updatedEntry => {
        this.navController.navigateBack(['tabs/diary/entry', updatedEntry._id]);
      });
    }
  }

  back() {
    // Show popup to cancel form creation
    const alert = this.alertController.create({
      message: 'Are you sure you want to dismiss the current diary entry? Input will not be saved.',
      header: 'Delete this entry?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.navController.navigateBack('/tabs/diary');
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }

}
