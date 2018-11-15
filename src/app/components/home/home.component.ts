import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { forkJoin, Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from 'src/app/models/user';
import { ApiUsersService } from 'src/app/services/api-users.service';
import { CreateComponent } from '../dialogs/create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model: User;
  subscription: Subscription;
  private url: string;
  isLoggedIn: boolean;
  close: string;
  createDialogRef: MatDialogRef<CreateComponent>;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private apiUsers: ApiUsersService,
    private title: Title
  ) {
    this.url = environment.storageUrl;
    this.translate.get('close').subscribe((res: string) => this.close = res);
  }

  ngOnInit() {

    // if (this.apiUsers.isAuthenticated()) {
    //   this.apiUsers.read(this.apiUsers.getUId()).subscribe((user: User) => {
    //     if (user) {
    //       this.isLoggedIn = true;
    //     }
    //   }, this.errorHandlerToken.bind(this));
    // }

    this.subscription = this.apiUsers.model$
      .subscribe((user: User) => this.model = user);
    this.title.setTitle(environment.siteName);
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
        let text;
        this.translate.get('Creating...').subscribe((res: string) => text = res);
        this.snackBar.open(text, this.close, { duration: 5000 });

        const userCall = this.apiUsers.exists(result.username);
        const mailCall = this.apiUsers.exists(result.email);

        forkJoin([mailCall, userCall]).subscribe((results: any) => {
          this.translate.get('Username or email already exists').subscribe(
            (res: string) => this.snackBar.open(res, this.close, { duration: 5000 }));
        }, (err) => {
          if (err && err.status !== 404) {
            this.snackBar.open(err.message || err.statusText || err.json().message, this.close, { duration: 5000 });
          } else {
            this.afAuth.auth.createUserWithEmailAndPassword(result.email, result.password)
              .then((userOk: any) => {
                this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
                  result.token = userOk.user.uid;
                  this.createApiUser(result);
                }).catch(this.errorHandler);
              }).catch(this.errorHandler.bind(this));
          }
        });
      }
    });
  }

  createApiUser(model: User) {
    this.apiUsers.create(model).subscribe(user => {
      this.afAuth.auth.signOut().then(() => {
        this.apiUsers.deleteToken();
        this.translate.get('User created log in', { username: user.username }).subscribe(
          (res: string) => this.snackBar.open(res, this.close, { duration: 5000 }));
      }).catch(this.errorHandler);
    }, this.errorHandler.bind(this));
  }

  errorHandler(err) {
    debugger
    this.snackBar.open(err.message || err.statusText || err.json().message, this.close, { duration: 5000 });
    console.error(err);
  }

  errorHandlerToken(err) {
    debugger
    this.apiUsers.logout(() => {
      this.errorHandler(err);
    });
  }
}
