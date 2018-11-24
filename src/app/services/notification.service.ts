import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  close: string;

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.translate.get('close').subscribe((res: string) => this.close = res);
  }

  notify(message: string) {
    this.snackBar.open(message, this.close, { duration: 5000 });
  }

  notifyTrans(message: string) {
    this.translate.get(message).subscribe((res: string) => this.notify(res));
  }

  notifyErr(err: any) {
    this.notify(err.message || err.statusText || err.json().message);
  }

  notifyTransObj(message: string, object: any) {
    this.translate.get(message, object).subscribe((res: string) => this.notify(res));
  }
}
