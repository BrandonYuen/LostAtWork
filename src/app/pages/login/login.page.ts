import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe(res => {
      this.navController.navigateForward('/tabs');
    }, err => {
      if (err instanceof HttpErrorResponse) {
        this.authService.showAlert('Can\'t connect to server.')
      }
    });
  }

  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe(res => {
        this.navController.navigateForward('/tabs');
      });
    }, err => this.handleError(err));
  }

  handleError(e: any) {
    switch (e.status) {
      case 400:
        this.authService.showAlert(e.error.msg);
        break;
      default:
        this.authService.showAlert('Can\'t connect to server.');
        break;
    }
  }
}
