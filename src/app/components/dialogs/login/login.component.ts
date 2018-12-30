import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  close: string;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<LoginComponent>,
    private n: NotificationService
  ) { }

  submit(form: any) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    } else {
      this.n.notifyTrans('The form has errors');
    }
  }

  resetPassword(form: any) {
    if (form.value.email) {
      this.afAuth.auth.sendPasswordResetEmail(form.value.email).then((result: any) => {
        if (result === undefined) {
          this.n.notifyTrans('Email sent!');
        }
      });
    } else {
      this.n.notifyTrans('You must type your email inside the email field to send you there instructions to reset your password');
    }
  }
}
