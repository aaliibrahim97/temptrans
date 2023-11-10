import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { arValidationMessages } from '../validators/locale/ar-validation-messages';
import { enValidationMessages } from '../validators/locale/en-validation-messages';

@Injectable({ providedIn: 'root' })
export class DynamiFieldValidationService {
  language = 'en';
  validationMessages: any = {};
  customValidationMessages: any = {};

  constructor() {
    this.setLanguage(this.language);
  }

  setLanguage(language: string = 'en') {
    this.language = language;
    const languageValidationMessages = {
      ar: arValidationMessages,
      en: enValidationMessages,
    };
    const languageCode = language.slice(0, 2);

    const validationMessages = languageValidationMessages[languageCode];

    this.validationMessages = cloneDeep(validationMessages);
  }

  get(uniqueDynamicFormComponentId: string): object {
    return this.customValidationMessages[uniqueDynamicFormComponentId];
  }

  add(entry: object, uniqueDynamicFormComponentId: string): void {
    this.customValidationMessages[uniqueDynamicFormComponentId] = entry;
  }

  delete(uniqueDynamicFormComponentId: string): void {
    delete this.customValidationMessages[uniqueDynamicFormComponentId];
  }
}
