import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiDalService<T> {
  private contentType = { 'Content-type': 'application/json' };
  private headers = new Headers(this.contentType);
  private options = { headers: new HttpHeaders(this.contentType) };
  private url: string;

  constructor(
    protected translate: TranslateService,
    protected http: HttpClient
  ) {
    this.url = environment.apiUrl;
  }

  get(path: string): Observable<T> {
    return this.http.get<T>(this.url + path);
  }

  postJson(path: string, object: T): Observable<T> {
    const body = JSON.stringify(object);
    this.authenticationToken();

    return this.http.post<T>(this.url + path, body, this.options);
  }

  post(path: string, object: T): Observable<T> {
    const body = JSON.stringify(object);

    return this.http.post<T>(this.url + path, body, this.options);
  }

  put(path: string, object: T): Observable<T> {
    const body = JSON.stringify(object);
    this.authenticationToken();

    return this.http.put<T>(this.url + path, body, this.options);
  }

  delete(path: string, id: string): Observable<number> {
    this.authenticationToken();

    return this.http.delete<number>(`${this.url}${path}/${id}`, this.options);
  }

  getAll(path: string): Observable<T[]> {
    this.authenticationToken();

    return this.http.get<T[]>(this.url + path, this.options);
  }

  private authenticationToken() {
    const token = localStorage.getItem('tokenBE');
    if (this.headers.has('Authorization')) {
      this.headers.delete('Authorization');
    }
    if (token) {
      this.headers.append('Authorization', `Bearer ${token}`);
    }
  }
}
