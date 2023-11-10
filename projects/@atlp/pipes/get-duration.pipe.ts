import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getDuration',
})
export class GetDurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      const hours = Math.floor(value / 60 / 60);
      const minutes = Math.floor(value / 60) % 60;
      // tslint:disable-next-line:max-line-length
      return `${hours > 0 ? `<span>${hours}h</span>` : null}${
        minutes > 0 ? `<span>${minutes}m</span>` : null
      }`;
    }
    return null;
  }
}
