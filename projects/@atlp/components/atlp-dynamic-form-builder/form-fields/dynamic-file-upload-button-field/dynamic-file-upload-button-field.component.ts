import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import {
  IDynamicControlsInputModel,
  IDynamicControlsOutputModel,
} from '../../models/dynamic-controls-io-models';
import { AtlpFileUploadButtonResponseModel } from 'projects/@atlp/components/@v2/file-upload/atlp-file-upload-button/models/atlp-file-upload-button.model';
import { IAtlpFileUploadButtonProps } from '../../models/dynamic-form-file-button-props';
import { AtlpFileDocumentDetails } from 'projects/@atlp/components/@v2/file-upload/models/atlp-file-doc-details.model';

@Component({
  selector: 'dynamic-file-upload-button-field',
  templateUrl: './dynamic-file-upload-button-field.component.html',
  styleUrls: ['./dynamic-file-upload-button-field.component.scss'],
})
export class DynamicFileUploadButtonFieldComponent
  implements OnInit, IDynamicFieldComponent, IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  isHidden: boolean = false;
  isVisible: boolean = true;
  @ViewChild('elementRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;
  @Output() outputs: IDynamicControlsOutputModel;
  atlpFileUploadButton: IAtlpFileUploadButtonProps;
  @Output()
  onDocumentUploadEvent: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();

  constructor() {}

  ngOnInit() {
    this.atlpFileUploadButton = this.field.fileUploadButtonProps;
    this.setFileUploadButtonProps();
  }

  setFileUploadButtonProps() {
    if (this.inputs?.atlpFileUploadButton) {
      this.atlpFileUploadButton = {
        isRequired: this.inputs.atlpFileUploadButton.isRequired,
        extendedParams: this.inputs.atlpFileUploadButton.extendedParams,
        label: this.inputs.atlpFileUploadButton.label,
        allowedFileTypes: this.inputs.atlpFileUploadButton.allowedFileTypes,
        disabled: this.inputs.atlpFileUploadButton.disabled,
        maxFileSize: this.inputs.atlpFileUploadButton.maxFileSize,
        templateRef: this.inputs.atlpFileUploadButton.templateRef,
        headers: this.inputs.atlpFileUploadButton.headers,
      };
    }
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  onDocumentUpload(fileUploadResponse: AtlpFileDocumentDetails) {
    this.onDocumentUploadEvent.emit(fileUploadResponse);
  }

  ngOnDestroy(): void {}
}
