import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private n: NotificationService
  ) { }

  submit(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    } else {
      this.n.notifyTrans('The form has errors');
    }
  }
}
