import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { DateLocaleKeys } from '../adapter/entities';

export const ATLP_MOMENT_HIJRI_DATE_FORMATS = {
  parse: {
    dateInput: 'iDD iMMMM, iYYYY',
  },
  display: {
    dateInput: 'iDD/iMM/iYYYY',
    monthYearLabel: 'iYYYY',
    dateA11yLabel: 'iDD iMMMM, iYYYY',
    monthYearA11yLabel: 'iYYYY',
    monthLabel: 'iMMM',
  },
};

export const langServiceFactory = (
  atlpTranslationService: AtlpTranslationService
) => {
  let localLang: string = atlpTranslationService.getCurrentLang();
  return localLang === 'ae' || localLang == DateLocaleKeys.AR
    ? DateLocaleKeys.AR_SA
    : DateLocaleKeys.EN_US;
};
