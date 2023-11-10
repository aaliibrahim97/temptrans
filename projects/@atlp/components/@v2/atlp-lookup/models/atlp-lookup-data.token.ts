import { InjectionToken } from '@angular/core';
import { IAtlpLookupConstant } from './atlp-lookup-constants.model';

export interface AtlpLookUpConfig {
  AtlpLookUpConstantsToken: {
    [name: string]: IAtlpLookupConstant;
  };
}

export const AtlpLookUpConstantsToken = new InjectionToken<{
  [name: string]: IAtlpLookupConstant;
}>('AtlpLookUpConstantsToken');
