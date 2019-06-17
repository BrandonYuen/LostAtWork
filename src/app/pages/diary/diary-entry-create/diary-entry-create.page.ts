import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiaryService } from 'src/app/services/diary.service';
import { NavController, AlertController } from '@ionic/angular';
import { HideTabOnInputService } from 'src/app/services/hide-tab-on-input.service';

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
    private alertController: AlertController,
    private hideTabsOnInput: HideTabOnInputService
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.entryForm.controls; }


  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      misconductType: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(20)]]
    });

    // Automatically generate listeners for all inputs to hide tab bar
    this.hideTabsOnInput.createListeners();
  }

  onSubmit() {
    if (!this.entryForm.invalid) {
      this.diaryService.createEntry(this.entryForm.value).subscribe(res => {
        this.navController.navigateBack(['tabs/diary/']);
        this.diaryService.successToast('Gebeurtenis \'' + this.entryForm.value.title + '\' is aangemaakt.');
      });
    }
  }

  back() {
    // Show popup to cancel form creation
    const alert = this.alertController.create({
      message: 'Weet je zeker dat je deze pagina wilt sluiten? Alles wat je hebt opgeschreven zal verdwijnen.',
      header: 'Gebeurtenis verwijderen?',
      buttons: [
        {
          text: 'Nee',
          role: 'cancel'
        },
        {
          text: 'Ja',
          handler: () => {
            this.navController.navigateBack('/tabs/diary');
          }
        }
      ]
    });
    alert.then(alert => alert.present());
  }

}
