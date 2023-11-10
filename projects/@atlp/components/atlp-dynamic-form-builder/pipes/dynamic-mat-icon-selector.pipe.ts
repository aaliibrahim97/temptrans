import { Pipe, PipeTransform } from '@angular/core';

export type DynamicDialogRole =
  | 'success'
  | 'error'
  | 'warning'
  | 'confirm'
  | 'rejectWithReason';

@Pipe({
  name: 'dynamicMatIconSelector',
})
export class DynamicMatIconSelectorPipe implements PipeTransform {
  transform(atlpDialogRole: DynamicDialogRole, ...args: any[]): string {
    switch (atlpDialogRole) {
      case 'success':
        return 'success-icon';
      case 'error':
        return 'error-icon';
      case 'warning':
        return 'messages-exclamation';
      case 'confirm':
        return 'messages-exclamation';
      case 'rejectWithReason':
        return 'rejected-icon';
      default:
        break;
    }
    return null;
  }
}
