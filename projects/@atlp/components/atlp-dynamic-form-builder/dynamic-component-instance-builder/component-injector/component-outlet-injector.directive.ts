import { NgComponentOutlet } from '@angular/common';
import { ComponentRef, Directive, Host } from '@angular/core';

import {
  AtlpDynamicComponentInjector,
  AtlpDynamicComponentInjectorToken,
} from './token';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngComponentOutlet]',
  exportAs: 'ndcComponentOutletInjector',
  providers: [
    {
      provide: AtlpDynamicComponentInjectorToken,
      useExisting: ComponentOutletInjectorDirective,
    },
  ],
})
export class ComponentOutletInjectorDirective
  implements AtlpDynamicComponentInjector
{
  get componentRef(): ComponentRef<any> {
    // NOTE: Accessing private APIs of Angular
    return (this.componentOutlet as any)._componentRef;
  }

  constructor(@Host() private componentOutlet: NgComponentOutlet) {}
}
