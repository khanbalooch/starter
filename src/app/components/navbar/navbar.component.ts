import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ApiUsersService } from 'src/app/services/api-users.service';
import { LoginComponent } from 'src/app/components/dialogs/login/login.component';
import { NotificationService } from 'src/app/services/notification.service';

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
    private afAuth: AngularFireAuth,
    private apiUsers: ApiUsersService,
    private router: Router,
    private n: NotificationService
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {

      if (auth !== null && this.apiUsers.isAuthenticated()) {
        this.readUserData(auth.uid);
        return;
      }

      this.setLoginOff();
      this.apiUsers.deleteToken();
    });
  }

  private readUserData(uid: string) {
    this.apiUsers.read(uid).subscribe((user: User) => {
      if (user) {
        this.model = user;
        this.apiUsers.updateModel(user);
        const role = this.apiUsers.getRole();
        this.isAdmin = role === 'Admin';
        this.isSuperAdmin = role === 'SuperAdmin';
        this.isLoggedIn = true;
      }
    });
  }

  openLoginDialog() {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    this.loginDialogRef = this.dialog.open(LoginComponent, {
      hasBackdrop: false
    });
    this.loginDialogRef.afterClosed().subscribe(result => {

      localStorage.setItem('tokenBE', 'sdfbeuifw');
      this.router.navigate(['/dashboard']);
      /*if (result.email && result.password) {
        this.n.notifyTrans('Loading...');

        this.afAuth.auth.signInWithEmailAndPassword(result.email, result.password).then((userFB: any) => {
          result.token = userFB.user.uid;

          this.apiUsers.auth(result).subscribe((authRes: any) => {

            localStorage.setItem('tokenBE', authRes.token);
            this.readUserData(this.apiUsers.getUId());
            this.n.notifyTrans('Logged in');
            this.router.navigate(['/dashboard']);

          });

        });
      }*/
    });
  }

  loginOut() {
    this.apiUsers.logout(() => {
      this.setLoginOff();
      this.router.navigate(['/']);
    });
  }

  private setLoginOff() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.model = null;
    this.apiUsers.updateModel(this.model);
  }
}
