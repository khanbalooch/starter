import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiDalService<T> {
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
    return this.http.post<T>(this.url + path, body);
  }

  post(path: string, object: T): Observable<T> {
    const body = JSON.stringify(object);
    return this.http.post<T>(this.url + path, body);
  }

  put(path: string, object: T): Observable<T> {
    const body = JSON.stringify(object);
    return this.http.put<T>(this.url + path, body);
  }

  delete(path: string, id: string): Observable<number> {
    return this.http.delete<number>(`${this.url}${path}/${id}`);
  }

  getAll(path: string): Observable<T[]> {
    return this.http.get<T[]>(this.url + path);
  }
}
