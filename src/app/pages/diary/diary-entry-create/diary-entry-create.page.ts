import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiaryService } from 'src/app/services/diary.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-diary-entry-create',
  templateUrl: './diary-entry-create.page.html',
  styleUrls: ['./diary-entry-create.page.scss'],
})
export class DiaryEntryCreatePage implements OnInit {

  entryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private diaryService: DiaryService,
    private navController: NavController,
    private alertController: AlertController
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.entryForm.controls; }


  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      misconductType: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit() {
    if (!this.entryForm.invalid) {
      this.diaryService.createEntry(this.entryForm.value).subscribe(res => {
        this.navController.navigateBack(['tabs/diary/']);
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
