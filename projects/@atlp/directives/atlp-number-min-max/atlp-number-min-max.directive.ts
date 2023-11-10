import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[atlpForNumbersMinMax]',
})
export class AtlpForNumbersMinMaxDirective {
  @Input() minVal: number;
  @Input() maxVal: number;
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^0-9,]*/g, '');
    if(this._el.nativeElement.value < this.minVal || this._el.nativeElement.value > this.maxVal){
      this._el.nativeElement.value = '';
    }

    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
