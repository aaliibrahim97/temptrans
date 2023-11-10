import { InlineGridEditFieldTypes } from 'projects/@atlp/components/@v2/atlp-inline-edit-grid/models/inline-grid-edit-field-types';

// export type AtlpInlineFormInputType =
//   | 'autoComplete'
//   | 'date'
//   | 'lookup'
//   | 'autoComplete'
//   | 'number'
//   | 'text'
//   | 'multi-validation-text'
//   | 'actions'
//   | 'button'
//   | 'select'
//   | 'password'
//   | 'checkbox'
//   | 'textarea'
//   | 'fileUpload';

export interface IcolumnProps {
  inputType: InlineGridEditFieldTypes;
  inputProps: any;
}
export class AtlpInlineGridEditColumnDefinition<T = any> {
  columnDef: string;
  header: string;
  validations?: any[];
  fieldType?: InlineGridEditFieldTypes;
  regxValidators?: any[];
  className?: string;
  isDisabled?: string;
  placeholder?: string;
  sortOrder?: number;
  colProps?: {
    sticky?: string;
    textAlign?: string;
    left?: string;
    headerClassList?: string;
    minWidth?: string;
    headerBg?: string;
    width?: string;
    maxWidth?: string;
  };
  /** Tool Tip */
  toolTip?: (element: T) => string;
  /** mat Icon */
  matIcon?: (element: T) => string;
  /** Cell */
  cell?: (element: T) => any;
  columnProps?: IcolumnProps;
  constructor(_columnDef: string, _header: string, _cell: any) {
    this.columnDef = _columnDef;
    this.header = _header;
    this.cell = _cell;
  }
}
