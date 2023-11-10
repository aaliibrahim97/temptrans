import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'atlp-star-rating',
  templateUrl: './atlp-star-rating.component.html',
  styleUrls: ['./atlp-star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpStarRatingComponent),
      multi: true,
    },
  ],
})
export class AtlpStarRatingComponent implements OnInit, ControlValueAccessor {
  /**  How to use this component:
   * <atlp-star-rating
   *    [(ngModel)]="rating"  // or just use model binding
   *    [formControl]="form.controls['controlName']" // access it as any form control
   *    [id]="index"
   *    [disabled]="true">
   * </atlp-star-rating>
   */

  onChange;
  value;
  stars = [5, 4, 3, 2, 1];

  @Input() id: string;
  @Input() disabled: boolean;
  @ViewChildren('atlpStarRatingCheckbox')
  atlpStarRatingCheckbox: QueryList<ElementRef>;

  constructor() {
    if (!this.disabled) {
      this.disabled = false;
    }
  }

  ngOnInit() {}

  rate(rate) {
    if (!this.disabled) {
      this.propagateChange(rate);
    }
  }

  writeValue(value) {
    if (this.atlpStarRatingCheckbox && value === null) {
      this.atlpStarRatingCheckbox.forEach((checkbox: ElementRef) => {
        checkbox.nativeElement.checked = false;
      });
    }
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {}

  private propagateChange = (_: any) => {};
}
