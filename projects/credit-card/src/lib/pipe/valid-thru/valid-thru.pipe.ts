import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validThru',
})
export class ValidThruPipe implements PipeTransform {
  /**
   * Transform month and year into card format
   */
  public transform(value: string): string {
    return value && value.length === 7 ? value.substr(0, 3) + value.substr(5) : '/';
  }
}
