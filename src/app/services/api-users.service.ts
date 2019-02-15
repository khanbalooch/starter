import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';

import { ApiDalService } from './api-dal.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService extends ApiDalService<User> {
  private jwtHelper = new JwtHelperService();
  private _modelSource = new BehaviorSubject<User>(null);
  model$ = this._modelSource.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    protected translate: TranslateService,
    protected httpClient: HttpClient
  ) { super(translate, httpClient); }

  updateModel(user: User) {
    this._modelSource.next(user);
  }

  create(model: User): Observable<User> {
    return this.postJson('users', model);
  }

  updateLocation(model: User): Observable<User> {
    return this.put('users/location', model);
  }

  read(uid: string): Observable<User> {
    return this.get('users/' + uid);
  }

  search(lat: number, lng: number): Observable<User[]> {
    return this.getAll(`users/search/${lat}/${lng}/20`);
  }

  profile(model: User): Observable<User> {
    return this.put('users/', model);
  }

  exists(username: string): Observable<User> {
    return this.get('users/exists/' + username);
  }

  auth(model: User): Observable<User> {
    return this.postJson('auth', model);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.tokenKey);
    return token === 'trppliania';
  }

  getUId(): string {
    const token = localStorage.getItem('tokenBE');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return tokenPayload.jti;
  }

  getRole(): string {
    const token = localStorage.getItem('tokenBE');
    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      return tokenPayload.Role;
    } else {
      return '';
    }
  }

  getEmail(): string {
    const token = localStorage.getItem('tokenBE');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return tokenPayload.sub;
  }

  logout(func) {
    this.deleteToken();
    this.afAuth.auth.signOut().then(func);
  }

  deleteToken() {
    localStorage.removeItem('tokenBE');
  }

  readLastOnes(): Observable<User[]> {
    return this.getAll('users/getlastones');
  }
}
