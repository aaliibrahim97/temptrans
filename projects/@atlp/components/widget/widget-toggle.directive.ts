import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[atlpWidgetToggle]',
})
export class AtlpWidgetToggleDirective {
  constructor(public elementRef: ElementRef) {}
}
