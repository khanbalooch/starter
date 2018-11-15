import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ApiDalService } from './api-dal.service';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class ApiFeedbackService extends ApiDalService<Feedback> {

  constructor(
    protected translate: TranslateService,
    protected http: HttpClient
  ) { super(translate, http); }

  sendFeedback(model: Feedback): Observable<Feedback> {
    return this.postJson('email/feedback', model);
  }
}
