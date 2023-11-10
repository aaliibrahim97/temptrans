import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicClassSelector',
})
export class DynamicClassSelector implements PipeTransform {
  transform(classList: string[] | undefined, args: string[]): string {
    if (classList?.length > 0) {
      return Array.from(classList).join(' ');
    }
    return '';
  }
}
