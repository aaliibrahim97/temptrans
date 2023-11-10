import { Locale } from 'projects/@atlp/services/translation-loader.service';

const translations = {
  FORM_CRTL_ERROR: 'Form control errors',
  ErrorMsg: 'Please fix the following errors in the form',
  LIST_SEC_ERROR: 'List section errors',
};

export const locale: Locale = {
  lang: 'en',
  data: translations,
};
