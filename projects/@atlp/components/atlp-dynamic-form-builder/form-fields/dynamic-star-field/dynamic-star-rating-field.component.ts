import {
  Component,
  ComponentRef,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';

@Component({
  selector: 'dynamic-star-rating-field',
  templateUrl: './dynamic-star-rating-field.component.html',
  styleUrls: ['./dynamic-star-rating-field.component.scss'],
})
export class DynamicStarRatingFieldComponent implements IDynamicFieldComponent {
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  rating: number;
  isHidden: boolean = false;
  isVisible: boolean = true;
  @ViewChild('inputRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;

  constructor() {}

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  get formValidator() {
    return this.group.get(this.field.name);
  }
}
