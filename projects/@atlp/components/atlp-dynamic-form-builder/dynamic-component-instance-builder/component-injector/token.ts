import { ComponentRef, InjectionToken } from '@angular/core';

export interface AtlpDynamicComponentInjector {
  componentRef: ComponentRef<any> | null;
}

export const AtlpDynamicComponentInjectorToken =
  new InjectionToken<AtlpDynamicComponentInjector>('DynamicComponentInjector');
