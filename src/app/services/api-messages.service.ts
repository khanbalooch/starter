import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { ApiDalService } from './api-dal.service';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class ApiMessagesService extends ApiDalService<Message> {

  constructor(
    protected translate: TranslateService,
    protected http: HttpClient
  ) { super(translate, http); }

  send(model: Message) {
    return this.postJson('messages', model);
  }

  // deleteMe(model: Message){
  //   return this.delete(model);
  // }
}
