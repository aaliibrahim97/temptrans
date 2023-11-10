import { HttpHeaders } from '@angular/common/http';

export const createDescriptorHeader: (
  descriptor: any,
  lang: any
) => HttpHeaders = (descriptor, lang = null) => {
  return new HttpHeaders()
    .set('x-descriptor', JSON.stringify(descriptor))
    .set('selectedLanguage', lang);
};

export const createLanguageHeader: (lang: any) => HttpHeaders = (lang) => {
  return new HttpHeaders().set('selectedLanguage', lang);
};
