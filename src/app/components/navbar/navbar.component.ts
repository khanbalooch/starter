import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

import { ApiUsersService } from 'src/app/services/api-users.service';
import { LoginComponent } from '../dialogs/login/login.component';

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
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private translate: TranslateService,
    private apiUsers: ApiUsersService,
    private router: Router
  ) {
    this.translate.get('close').subscribe((res: string) => this.close = res);
  }

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
    }, this.errorHandlerToken);
  }

  openLoginDialog() {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }
    this.loginDialogRef = this.dialog.open(LoginComponent, {
      hasBackdrop: false
    });
    this.loginDialogRef.afterClosed().subscribe(result => {
      if (result.email && result.password) {
        let text;
        this.translate.get('Loading...').subscribe((res: string) => text = res);
        this.snackBar.open(text, this.close, { duration: 5000 });

        this.afAuth.auth.signInWithEmailAndPassword(result.email, result.password).then((userFB: any) => {
          result.token = userFB.user.uid;

          this.apiUsers.auth(result).subscribe((authRes: any) => {

            localStorage.setItem('tokenBE', authRes.token);
            this.readUserData(this.apiUsers.getUId());
            let logged;
            this.translate.get('Logged in').subscribe((res: string) => logged = res);
            this.snackBar.open(logged, this.close, { duration: 5000 });
            this.router.navigate(['/']);

          }, this.errorHandlerToken.bind(this));

        }).catch(this.errorHandlerToken.bind(this));
      }
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
