import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiUsersService } from 'src/app/services/api-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
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
