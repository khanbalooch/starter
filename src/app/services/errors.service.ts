import { Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import * as StackTraceParser from 'error-stack-parser';
import { ApiUsersService } from './api-users.service';

@Injectable()
export class ErrorsService {

  constructor(
    private injector: Injector,
    private apiUsers: ApiUsersService,
    private router: Router
  ) {
    // Listen to the navigation errors
    this.router.events.subscribe((event: any) => {
      // Redirect to the ErrorComponent
      if (event instanceof NavigationError) {
        if (!navigator.onLine) { return; }
        // Redirect to the ErrorComponent
        this.log(event.error).subscribe((errorWithContext) => {
          this.router.navigate(['/error'], { queryParams: errorWithContext });
        });
      }
    });
  }

  logout() {
    this.apiUsers.logout(() => console.log('logged out'));
    return new Observable((observer) => {
      observer.next('logged out');
      observer.complete();
    });
  }

  log(error) {
    // Log the error to the console
    console.error(error);
    // Send error to server
    const errorToSend = this.addContextInfo(error);
    return new Observable((observer) => {
      observer.next(errorToSend);
      observer.complete();
    });
  }

  private addContextInfo(error: any) {
    const name = error.name || null;
    const time = new Date().getTime();
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    try {
      const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);
      return { name, time, url, status, message, stack };
    } catch (error) {
      return { name, time, url, status, message, stack: null };
    }
  }
}
