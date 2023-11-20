import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'app',
  standalone: true
})
export class AppPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
