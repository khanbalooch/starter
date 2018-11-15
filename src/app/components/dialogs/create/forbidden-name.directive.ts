import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: forbiddenNameValidatorDirective,
      multi: true
    }
  ]
})
export class ForbiddenNameValidatorDirective { }

export function forbiddenNameValidatorDirective(control: FormControl) {
  const value = control.value;
  if (value && value.indexOf(' ') !== -1) {
    return {
      'forbiddenName': true
    };
  }
  return null;
}
