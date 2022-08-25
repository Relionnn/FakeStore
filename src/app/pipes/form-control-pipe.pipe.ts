import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControlPipe',
})
export class FormControlPipePipe implements PipeTransform {
  transform(
    abstractControl: AbstractControl
  ): FormControl<typeof abstractControl['value']> {
    return abstractControl as FormControl<typeof abstractControl['value']>;
  }
}
