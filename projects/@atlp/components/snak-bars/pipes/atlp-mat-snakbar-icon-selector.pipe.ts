import { Pipe, PipeTransform } from '@angular/core';
import { SnakBarInfoType } from '../models/snak-bar.models';

@Pipe({
  name: 'matSnakbarIconSelector',
})
export class AtlpSnakBarMatIconSelectorPipe implements PipeTransform {
  transform(atlpSnakBarIconSelector: SnakBarInfoType, ...args: any[]): string {
    switch (atlpSnakBarIconSelector) {
      case 'success':
        return 'success-icon';
      case 'error':
        return 'error-icon';
      case 'warning':
      case 'info':
        return 'messages-exclamation';
      default:
        return null;
    }
  }
}
