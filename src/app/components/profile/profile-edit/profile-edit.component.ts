import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { ApiUsersService } from 'src/app/services/api-users.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
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
