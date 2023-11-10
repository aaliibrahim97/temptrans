import { Injectable } from '@angular/core';
import { SnakBarService } from '../components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(
    private defaultSnakBar: SnakBarService,
    private translate: TranslateService
  ) {}

  addOrRemoveValidators(
    form: any,
    action: string,
    fields: string[],
    validators?: any[]
  ) {
    fields.forEach((field: string) => {
      switch (action) {
        case 'add':
          form?.get(field).addValidators(validators);
          form?.get(field).updateValueAndValidity();
          break;
        case 'remove':
          form?.get(field).removeValidators(validators);
          form?.get(field).updateValueAndValidity();
          break;
        case 'set':
          form?.get(field).setValidators(validators);
          form?.get(field).updateValueAndValidity();
          break;
        case 'reset':
          form?.get(field).reset();
          break;
        case 'clear':
          form?.get(field).clearValidators();
          form?.get(field).updateValueAndValidity();
          break;
        default:
          break;
      }
    });
  }

  checkNumberOnSubmit(number: any, isForeignCompany: boolean = false) {
    //number =  number?.replace(/[^\w\s]/gi, '')
    if (number && !number?.startsWith('+')) {
      number = '+' + number; //?.substring(1);
    } else if (number && !isForeignCompany && !number?.startsWith('+971')) {
      number = '+971' + number;
    }
    return number;
  }

  processPhoneNumber(phoneNumber: any, isICA?: boolean) {
    phoneNumber = phoneNumber?.replace(/[^\w\s]/gi, '');
    if (
      isICA &&
      phoneNumber &&
      !(phoneNumber.startsWith('971') || phoneNumber.startsWith('+971'))
    ) {
      phoneNumber = '+971' + phoneNumber;
    }
    if (phoneNumber && phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1); //phoneNumber.replace(phoneNumber.substring(0, 1) , "+971");
    } else if (phoneNumber && !phoneNumber.startsWith('+')) {
      phoneNumber = '+' + phoneNumber;
    }

    return phoneNumber;
  }

  processAPIError(error) {
    const errorMsg =
      error?.error?.errorlst && error?.error?.errorlst.length
        ? this.processErrors(error?.error?.errorlst)
        : error?.error?.msg;
    if (errorMsg) this.defaultSnakBar.error(errorMsg);
    else {
      if (error?.status === 401) {
        this.defaultSnakBar.error(this.translate.instant('Session_Timed_Out'));
      } else {
        this.defaultSnakBar.error(
          this.translate.instant('Something_Went_Wrong')
        );
      }
    }
  }

  processErrors(errorList) {
    let concatenatedErrorMessage = '';
    errorList?.forEach((val) => {
      if (val.value != null && val.value != '') {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error + '(' + val.value + ')') +
          ' ,';
      } else {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error) + ' ,';
      }
    });
    return concatenatedErrorMessage?.substring(
      0,
      concatenatedErrorMessage.length - 1
    );
  }
}
