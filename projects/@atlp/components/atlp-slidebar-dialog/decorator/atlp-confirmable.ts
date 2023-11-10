import { Injectable } from '@angular/core';
import { AtlpSlideBarDialogConfig } from '../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpSlideBarCommonMessagesComponent } from '../components/atlp-slidebar-messages/atlp-slidebar-common-message/atlp-slidebar-common-message.component';
import { AtlpSlideBarConfirmationComponent } from '../components/atlp-slidebar-messages/atlp-slidebar-confirmation-message/atlp-slidebar-confirmation-message.component';
import { AtlpDialogRef } from '../injectors/atlp-dialog-ref';
import { AtlpDialogRole } from '../models/atlp-slidebar-dialog.models';
import { AtlpSlideBarDialogSidebarName } from '../models/sidebar-name.enum';
import { AtlpSlideBarDialogService } from '../services/atlp-slidebar-dialog.service';

@Injectable({ providedIn: 'root' })
export class AtlpConfirmableDecoratorMessageService {
  public static message: string = '';
  public static getMessage(): string {
    if (!AtlpConfirmableDecoratorMessageService.message) {
      throw new Error('Message not provided...!');
    }
    return AtlpConfirmableDecoratorMessageService.message;
  }

  public setMessage(message): void {
    AtlpConfirmableDecoratorMessageService.message = message;
  }
}

@Injectable()
export class AtlpConfirmableDecoratorService {
  private static atlpSlideBarDialogService:
    | AtlpSlideBarDialogService
    | undefined = undefined;
  public constructor(atlpSlideBarDialogService: AtlpSlideBarDialogService) {
    AtlpConfirmableDecoratorService.atlpSlideBarDialogService =
      atlpSlideBarDialogService;
  }

  public static getService(): AtlpSlideBarDialogService {
    if (!AtlpConfirmableDecoratorService.atlpSlideBarDialogService) {
      throw new Error('Atlp Confirmable Decorator Service not initialized');
    }
    return AtlpConfirmableDecoratorService.atlpSlideBarDialogService;
  }
}

// Confirmation Method Decorator
export function atlpConfirmable(
  message: string,
  okButtonText: string = 'Confirm',
  cancelButtonText: string = 'Cancel'
) {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const atlpSlideBarDialogService =
        AtlpConfirmableDecoratorService.getService();
      let atlpSliderDialogConfig: AtlpSlideBarDialogConfig = null;
      atlpSliderDialogConfig = {
        atlpDialogRole: 'confirm',
        keyToCloseSlider:
          AtlpSlideBarDialogSidebarName.slideBarConfirmationDialog,
        data: {},
        atlpConfirmationSliderDialogData: {
          confirmationMsg:
            message === 'DYNAMIC_MSG_SERVICE'
              ? AtlpConfirmableDecoratorMessageService.getMessage()
              : message,
          cancelButtonText,
          okButtonText,
        },
      };

      const ref: AtlpDialogRef = atlpSlideBarDialogService.open(
        AtlpSlideBarConfirmationComponent,
        atlpSliderDialogConfig
      );

      ref.afterClosed.subscribe((result) => {
        if (result === 'ok') {
          const result = original.apply(this, args);
          return result;
        } else {
          return null;
        }
      });
    };

    return descriptor;
  };
}

// Confirmation Method Decorator
export function atlpMessageDialog(
  message: string,
  atlpSlideBarDialogSidebarName: AtlpSlideBarDialogSidebarName,
  atlpDialogRole: AtlpDialogRole = 'success',
  okButtonText: string = 'Ok',
  isHtml: boolean = false
) {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const atlpSlideBarDialogService =
        AtlpConfirmableDecoratorService.getService();
      let atlpSliderDialogConfig: AtlpSlideBarDialogConfig = null;
      atlpSliderDialogConfig = {
        atlpDialogRole: atlpDialogRole,
        keyToCloseSlider: atlpSlideBarDialogSidebarName,
        data: {},
        atlpCommonSliderDialogData: {
          msg:
            message === 'DYNAMIC_MSG_SERVICE'
              ? AtlpConfirmableDecoratorMessageService.getMessage()
              : message,
          okButtonText: okButtonText,
          isHtml: isHtml,
        },
      };

      const ref: AtlpDialogRef = atlpSlideBarDialogService.open(
        AtlpSlideBarCommonMessagesComponent,
        atlpSliderDialogConfig
      );

      ref.afterClosed.subscribe((result) => {
        if (result === 'ok') {
          const result = original.apply(this, args);
          return result;
        } else {
          return null;
        }
      });
    };

    return descriptor;
  };
}

// Confirmation Method Decorator
export function atlpMessageDialogConfirm(
  message: string,
  isHtml: boolean = false,
  okButtonText: string = 'Confirm',
  cancelButtonText: string = 'Cancel'
) {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    let apiLanguage = localStorage.getItem("selectedLang");
    if (apiLanguage === 'ar') {
        okButtonText = 'موافق',
        cancelButtonText = 'إلغاء'
    }

    descriptor.value = function (...args: any[]) {
      const atlpSlideBarDialogService =
        AtlpConfirmableDecoratorService.getService();
      let atlpSliderDialogConfig: AtlpSlideBarDialogConfig = null;

      atlpSliderDialogConfig = {
        atlpDialogRole: 'confirm',
        keyToCloseSlider:
          AtlpSlideBarDialogSidebarName.slideBarConfirmationDialog,
        data: {},
        atlpConfirmationSliderDialogData: {
          confirmationMsg:
            message === 'DYNAMIC_MSG_SERVICE'
              ? AtlpConfirmableDecoratorMessageService.getMessage()
              : message,
          cancelButtonText,
          okButtonText,
          isHtml: isHtml,
        },
      };

      const ref: AtlpDialogRef = atlpSlideBarDialogService.open(
        AtlpSlideBarConfirmationComponent,
        atlpSliderDialogConfig
      );

      ref.afterClosed.subscribe((result) => {
        if (result === 'ok') {
          args.push({ selected: 'ok' });
          const result = original.apply(this, args);
          return result;
        } else {
          args.push({ selected: 'cancel' });
          const result = original.apply(this, args);
          return result;
        }
      });
    };

    return descriptor;
  };
}
