import { Injectable } from '@angular/core';
import { DynamicFormAutoCompleteInputProps } from '../models/dynamic-form-auto-complete-input-props';
import { DynamicFormInputLookupProps } from '../models/dynamic-form-input-lookup-props';
import { DynamicSelectProps } from '../models/dynamic-select-props';
import { IAtlpFileUploadButtonProps } from '../models/dynamic-form-file-button-props';
import { IAtlpFileUploadDropProps } from '../models/dynamic-form-file-drop-props';

export enum FieldPropTypes {
  'dynamicAutoCompleteProps' = 'dynamicAutoCompleteProps',
  'dynamicInputLookupProps' = 'dynamicInputLookupProps',
  'dynamicSelectProps' = 'dynamicSelectProps',
  'fileUploadButtonProps' = 'fileUploadButtonProps',
  'fileDropProps' = 'fileDropProps',
}

export type DynamicFieldPropTypes =
  | DynamicFormAutoCompleteInputProps
  | DynamicFormInputLookupProps
  | DynamicSelectProps
  | IAtlpFileUploadDropProps
  | IAtlpFileUploadButtonProps;

@Injectable({
  providedIn: 'root',
})
export class DynamicFormPropService {
  dynamicFiledsProps: Map<
    string,
    Map<FieldPropTypes, Map<string, DynamicFieldPropTypes>>
  > = new Map<
    string,
    Map<FieldPropTypes, Map<string, DynamicFieldPropTypes>>
  >();

  constructor() {}

  // Add data to the map
  setDynamicFieldProps(
    dynamicFormName: string,
    fieldPropTypes: FieldPropTypes,
    fieldName: string,
    value: DynamicFieldPropTypes
  ): void {
    // Check if dynamicFormName exists in the map
    if (!this.dynamicFiledsProps.has(dynamicFormName)) {
      this.dynamicFiledsProps.set(
        dynamicFormName,
        new Map<FieldPropTypes, Map<string, DynamicFieldPropTypes>>()
      );
    }
    // Check if fieldName exists in the inner map
    if (!this.dynamicFiledsProps.get(dynamicFormName)?.has(fieldPropTypes)) {
      this.dynamicFiledsProps
        .get(dynamicFormName)
        ?.set(fieldPropTypes, new Map<string, DynamicFieldPropTypes>());
    }
    // Add the value to the Map
    this.dynamicFiledsProps
      .get(dynamicFormName)
      ?.get(fieldPropTypes)
      ?.set(fieldName, value);
  }

  // Edit data in the map
  editDynamicFieldProps(
    dynamicFormName: string,
    fieldPropTypes: FieldPropTypes,
    filedName: string,
    value: DynamicFieldPropTypes
  ): void {
    // Check if the keys exist in the map
    if (
      this.dynamicFiledsProps.has(dynamicFormName) &&
      this.dynamicFiledsProps.get(dynamicFormName)?.has(fieldPropTypes) &&
      this.dynamicFiledsProps
        .get(dynamicFormName)
        ?.get(fieldPropTypes)
        .has(filedName)
    ) {
      // Update the value in the Map
      this.dynamicFiledsProps
        .get(dynamicFormName)
        ?.get(fieldPropTypes)
        ?.set(filedName, value);
    }
  }

  // Delete data from the map
  deleteDynamicFieldProps(
    dynamicFormName: string,
    fieldPropType: FieldPropTypes,
    feildName: string
  ): void {
    // Check if the keys exist in the map
    if (
      this.dynamicFiledsProps.has(dynamicFormName) &&
      this.dynamicFiledsProps.get(dynamicFormName)?.has(fieldPropType)
    ) {
      // Remove the value from the Map
      if (this.dynamicFiledsProps.get(dynamicFormName)?.get(fieldPropType)) {
        this.dynamicFiledsProps
          .get(dynamicFormName)
          ?.get(fieldPropType)
          ?.delete(feildName);
      }
      // Remove the outer map if it's empty
      if (
        this.dynamicFiledsProps.get(dynamicFormName)?.get(fieldPropType)
          .size === 0
      ) {
        this.dynamicFiledsProps.get(dynamicFormName).delete(fieldPropType);
      }
    }
  }

  getDynamicFieldProps(
    dynamicFormName: string,
    fieldPropTypes: FieldPropTypes,
    fieldName: string
  ): DynamicFieldPropTypes | undefined {
    if (
      this.dynamicFiledsProps.has(dynamicFormName) &&
      this.dynamicFiledsProps.get(dynamicFormName)?.has(fieldPropTypes)
    ) {
      return this.dynamicFiledsProps
        .get(dynamicFormName)
        ?.get(fieldPropTypes)
        .get(fieldName);
    }
    return undefined;
  }

  deleteAllDynamicFieldProps(): boolean {
    this.dynamicFiledsProps = new Map<
      string,
      Map<FieldPropTypes, Map<string, DynamicFieldPropTypes>>
    >();
    return true;
  }
}
