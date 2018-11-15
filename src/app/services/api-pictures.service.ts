import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPicturesService {
  private url: string;

  constructor(
    protected http: HttpClient
  ) {
    this.url = environment.apiUrl;
  }

  fileUpload(data: File, type: string) {
    const input = new FormData();
    input.append('file', data, `${type}`);

    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('tokenBE')}`
    };
    const options = { headers: new HttpHeaders(headers) };
    return this.http.post(`${this.url}files`, input, options)
      .pipe(map((res: Response) => res.json()),
        catchError((err: any) => {
          // console.error(details);
          return throwError(err || 'Server error');
        }));
  }
}
