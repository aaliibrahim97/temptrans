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
import { IAtlpFileUploadDropProps } from '../../models/dynamic-form-file-drop-props';
import { AtlpFileDocumentDetails } from 'projects/@atlp/components/@v2/file-upload/models/atlp-file-doc-details.model';

@Component({
  selector: 'dynamic-file-drop-field',
  templateUrl: './dynamic-file-drop-field.component.html',
  styleUrls: ['./dynamic-file-drop-field.component.scss'],
})
export class DynamicFileDropFieldComponent
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
  atlpFileDrop: IAtlpFileUploadDropProps;
  @Output()
  onDocumentUploadEvent: EventEmitter<AtlpFileDocumentDetails> =
    new EventEmitter<AtlpFileDocumentDetails>();

  constructor() {}

  ngOnInit() {
    this.atlpFileDrop = this.field.fileDropProps;
    this.setFileUploadbuttonProps();
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  setFileUploadbuttonProps() {
    if (this.inputs?.atlpFileDrop) {
      this.atlpFileDrop = {
        isRequired: this.inputs.atlpFileDrop.isRequired,
        fileTypes: this.inputs.atlpFileDrop.fileTypes,
        disabled: this.inputs.atlpFileDrop.disabled,
        source: this.mapServiceSource(this.inputs.atlpFileDrop.sourceType),
      };
    }
  }

  private mapServiceSource(sourceType: string) {
    switch (sourceType) {
      case 'serviceRef': {
        return this.inputs.atlpFileDrop.source;
      }
      case 'dataFnRef': {
        return this.parentSliderInstance[this.inputs.atlpFileDrop.sourceFnName];
      }
    }
  }

  onDocumentUpload(fileUploadResponse: AtlpFileDocumentDetails) {
    this.onDocumentUploadEvent.emit(fileUploadResponse);
  }

  ngOnDestroy(): void {}
}
