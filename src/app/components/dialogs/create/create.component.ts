import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateComponent>
  ) { }

  submit(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    } else {
      let close;
      this.translate.get('close').subscribe((res: string) => close = res);
      this.translate.get('The form has errors').subscribe((res: string) => this.snackBar.open(res, close, { duration: 5000 }));
    }
  }
}
