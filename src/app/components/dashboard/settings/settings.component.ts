import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { ApiUsersService } from 'src/app/services/api-users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  model: User;
  subscription: Subscription;

  constructor(
    private apiUsers: ApiUsersService
  ) { }

  ngOnInit() {
    this.subscription = this.apiUsers.model$.subscribe((user: User) => {
      this.model = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
