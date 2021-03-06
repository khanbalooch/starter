import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ApiUsersService } from 'src/app/services/api-users.service';
import { LoginComponent } from 'src/app/components/dialogs/login/login.component';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  model: User = new User();
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  close: string;
  loginDialogRef: MatDialogRef<LoginComponent>;

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private router: Router,
    private n: NotificationService
  ) { }

  ngOnInit() {
    /*this.afAuth.authState.subscribe(auth => {

      if (auth !== null && this.apiUsers.isAuthenticated()) {
        this.readUserData(auth.uid);
        return;
      }

      this.setLoginOff();
      this.apiUsers.deleteToken();
    });*/
  }

  async openLoginDialog() {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    this.loginDialogRef = this.dialog.open(LoginComponent, {
      hasBackdrop: false
    });
    this.loginDialogRef.afterClosed().subscribe(result => {

      if (result.email && result.password) {
        this.n.notifyTrans('Loading...');

      this.auth.login({
          username: result.email,
          password: result.password
        });
        this.setLoginOn();

        this.n.notifyTrans('Logged in');
        this.router.navigate(['/dashboard']);

      }
    });
  }

  loginOut() {
    this.auth.logout();
    this.setLoginOff();
    this.router.navigate(['/']);
  }

  private setLoginOff() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.model = null;
  }
  private setLoginOn() {
    this.isLoggedIn = true;
    this.isAdmin = true;
    this.isSuperAdmin = true;
  }
}
