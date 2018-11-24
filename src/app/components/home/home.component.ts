import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material';
import { forkJoin, Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

import { User } from 'src/app/models/user';
import { ApiUsersService } from 'src/app/services/api-users.service';
import { CreateComponent } from '../dialogs/create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  model: User;
  subscription: Subscription;
  isLoggedIn: boolean;
  close: string;
  createDialogRef: MatDialogRef<CreateComponent>;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private apiUsers: ApiUsersService,
    private title: Title,
    private n: NotificationService
  ) { }

  ngOnInit() {
    this.subscription = this.apiUsers.model$.subscribe((user: User) => this.model = user);
    this.title.setTitle(environment.siteName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openCreateDialog() {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    this.createDialogRef = this.dialog.open(CreateComponent, {
      hasBackdrop: false
    });
    this.createDialogRef.afterClosed().subscribe(result => {
      if (result.email && result.password && result.username && result.name) {
        this.n.notifyTrans('Creating...');

        const userCall = this.apiUsers.exists(result.username);
        const mailCall = this.apiUsers.exists(result.email);

        forkJoin([mailCall, userCall]).subscribe((results: any) => {
          this.n.notifyTrans('Username or email already exists');
        }, (err) => {
          if (err && err.status !== 404) {
            this.n.notifyErr(err);
          } else {
            this.afAuth.auth.createUserWithEmailAndPassword(result.email, result.password)
              .then((userOk: any) => {
                this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
                  result.token = userOk.user.uid;
                  this.createApiUser(result);
                });
              });
          }
        });
      }
    });
  }

  createApiUser(model: User) {
    this.apiUsers.create(model).subscribe(user => {
      this.afAuth.auth.signOut().then(() => {
        this.apiUsers.deleteToken();
        this.n.notifyTransObj('User created log in', { username: user.username });
      });
    });
  }
}
