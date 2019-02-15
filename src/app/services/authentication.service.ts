import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  authenticationState = new BehaviorSubject(false);

  constructor() {}


  async login(credentials: any) {
    try {
      const token = await  localStorage.set(environment.tokenKey, 'ttoken');
      this.authenticationState.next(true); // user authenticated
      return Promise.resolve(); // user found and authenticated
    } catch (error) {
      return Promise.reject(1); // some error occured, authentication failed
    }
  }

  async logout() {
    try {
      localStorage.remove(environment.tokenKey);
      this.authenticationState.next(false);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    localStorage.get(environment.tokenKey).then(res => {
      if (res) {
          this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }
}
