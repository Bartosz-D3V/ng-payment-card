import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validThru',
})
export class ValidThruPipe implements PipeTransform {
  public transform(value: string): string {
    return value && value.length === 7 ? value.substr(0, 3) + value.substr(5) : '';
  }
}
