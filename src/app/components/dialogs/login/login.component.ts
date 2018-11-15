import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  close: string;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.translate.get('close').subscribe((res: string) => this.close = res);
  }

  submit(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    } else {
      this.translate.get('The form has errors').subscribe((res: string) =>
        this.snackBar.open(res, this.close, { duration: 5000 }));
    }
  }

  resetPassword(form) {
    if (form.value.email) {
      this.afAuth.auth.sendPasswordResetEmail(form.value.email).then((result: any) => {
        if (result === undefined) {
          this.translate.get('Email sent!').subscribe((res: string) => this.snackBar.open(res, this.close, { duration: 5000 }));
        }
      }).catch(this.errorHandler.bind(this));
    } else {
      this.translate.get('You must type your email inside the email field to send you there instructions to reset your password')
        .subscribe((res: string) => this.snackBar.open(res, this.close, { duration: 5000 }));
    }
  }

  errorHandler(err) {
    debugger
    this.snackBar.open(err.message || err.statusText || err.json().message, this.close, { duration: 5000 });
    console.error(err);
  }
}
