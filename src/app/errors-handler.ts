import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }

  handleError(error: Error | HttpErrorResponse) {

    const router = this.injector.get(Router);
    const n = this.injector.get(NotificationService);
    const errors = this.injector.get(ErrorsService);

    debugger

    if (error instanceof HttpErrorResponse) {

      // Server or connection error happened
      if (!navigator.onLine) {

        // Handle offline error
        return n.notify('No Internet Connection');

      }

      // Handle Http Error (error.status === 403, 404...)
      errors.logout();
      errors.log(error).subscribe();
      return n.notify(`${error.status} - ${error.message}`);

    } else {

      // Handle Client Error (Angular Error, ReferenceError...)
      errors.log(error).subscribe(errorWithContextInfo => {
        debugger
        router.navigate(['/error'], { queryParams: errorWithContextInfo });
      });

    }

    // Log the error anyway
    console.error('ERROR ANYWAY LOGGED: ', error);
  }
}
