import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter',
})
export class FirstLetter implements PipeTransform {
  transform(value: string, slice: boolean = false): any {
    if (!slice) {
      return value;
    }
    return value
      .split(' ')
      .map((word) => (word.length < 1 ? word : word.slice(0, 1)).toUpperCase())
      .join('');
  }
}
