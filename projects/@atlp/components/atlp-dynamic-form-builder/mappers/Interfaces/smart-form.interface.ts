export interface FormRootObject {
  components: FormComponent[];
  display: string;
}

export interface FormComponent {
  label: string;
  columns: Column[];
  autoAdjust: boolean;
  customClass: string;
  hidden: boolean;
  hideLabel: boolean;
  modalEdit: boolean;
  key: string;
  tags: any[];
  properties: InternalProperties;
  conditional: InternalConditional;
  customConditional: string;
  logic: any[];
  attributes: InternalAttributes;
  overlay: InternalOverlay;
  type: string;
  input: boolean;
  tableView: boolean;
  placeholder: string;
  prefix: string;
  suffix: string;
  multiple: boolean;
  defaultValue: any;
  protected: boolean;
  unique: boolean;
  persistent: boolean;
  clearOnHide: boolean;
  refreshOn: string;
  redrawOn: string;
  dataGridLabel: boolean;
  labelPosition: string;
  description: string;
  errorLabel: string;
  tooltip: string;
  tabindex: string;
  disabled: boolean;
  autofocus: boolean;
  dbIndex: boolean;
  customDefaultValue: string;
  calculateValue: string;
  calculateServer: boolean;
  widget: any;
  validateOn: string;
  validate: InternalValidate;
  allowCalculateOverride: boolean;
  encrypted: boolean;
  showCharCount: boolean;
  showWordCount: boolean;
  allowMultipleMasks: boolean;
  addons: any[];
  tree: boolean;
  lazyLoad: boolean;
  id: string;
}

export interface Column {
  components: InternalComponent[];
  offset: number;
  push: number;
  pull: number;
  size: string;
  currentWidth: number;
  width: number;
}

export interface InternalComponent {
  isDisabled: boolean;
  value?: string;
  name?: string;
  label: string;
  tableView: boolean;
  validate: Validate;
  key: string;
  type: string;
  input: boolean;
  placeholder: string;
  prefix: string;
  customClass: string;
  suffix: string;
  multiple: boolean;
  defaultValue?: string;
  protected: boolean;
  unique: boolean;
  persistent: boolean;
  hidden: boolean;
  clearOnHide: boolean;
  refreshOn: string;
  redrawOn: string;
  modalEdit: boolean;
  dataGridLabel: boolean;
  labelPosition: string;
  description: string;
  errorLabel: string;
  tooltip: string;
  hideLabel: boolean;
  tabindex: string;
  disabled: boolean;
  autofocus: boolean;
  dbIndex: boolean;
  customDefaultValue: string;
  calculateValue: string;
  calculateServer: boolean;
  widget?: Widget;
  attributes: Attributes;
  validateOn: string;
  conditional: Conditional;
  overlay: Overlay;
  allowCalculateOverride: boolean;
  encrypted: boolean;
  showCharCount: boolean;
  showWordCount: boolean;
  properties: Properties;
  allowMultipleMasks: boolean;
  addons: any[];
  data?: Data;
  mask?: boolean;
  inputType?: string;
  inputFormat?: string;
  inputMask?: string;
  displayMask?: string;
  spellcheck?: boolean;
  truncateMultipleSpaces?: boolean;
  id: string;
  autocomplete?: string;
  case?: string;
  errors?: string;
  tags?: any[];
  customConditional?: string;
  logic?: any[];
  optionsLabelPosition?: string;
  inline?: boolean;
  values?: Value[];
  dataType?: string;
  fieldSet?: boolean;
  displayInTimezone?: string;
  useLocaleSettings?: boolean;
  allowInput?: boolean;
  format?: string;
  shortcutButtons?: any[];
  enableDate?: boolean;
  datePicker?: DatePicker;
  enableTime?: boolean;
  timePicker?: TimePicker;
  defaultDate?: string;
  customOptions?: CustomOptions;
  enableMinDateInput?: boolean;
  enableMaxDateInput?: boolean;
  timezone?: string;
  datepickerMode?: string;
}

export interface Validate {
  required: boolean;
  minLength: any;
  maxLength: any;
  min: any;
  max: any;
  minWords?: number;
  maxWords?: number;
  custom: string;
  customPrivate: boolean;
  strictDateValidation: boolean;
  multiple: boolean;
  unique: boolean;
  pattern?: string;
  customMessage?: string;
  json?: any;
  onlyAvailableItems?: boolean;
}

export interface Widget {
  type: string;
  displayInTimezone?: string;
  locale?: string;
  useLocaleSettings?: boolean;
  allowInput?: boolean;
  mode?: string;
  enableTime?: boolean;
  noCalendar?: boolean;
  format?: string;
  hourIncrement?: number;
  minuteIncrement?: number;
  time_24hr?: boolean;
  minDate: any;
  disabledDates?: string;
  disableWeekends?: boolean;
  disableWeekdays?: boolean;
  disableFunction?: string;
  maxDate: any;
}

export interface Attributes {}
export interface Data {
  values: Value[];
  resource: string;
  json: string;
  url: string;
  custom: string;
}

export interface Conditional {
  show: any;
  when: any;
  eq: string;
  json?: string;
}

export interface Overlay {
  style: string;
  left: string;
  top: string;
  width: string;
  height: string;
  page?: string;
}

export interface Properties {}

export interface Value {
  label: string;
  value: string;
  shortcut: string;
}

export interface DatePicker {
  disable: string;
  disableFunction: string;
  disableWeekends: boolean;
  disableWeekdays: boolean;
  minDate: any;
  maxDate: any;
  showWeeks: boolean;
  startingDay: number;
  initDate: string;
  minMode: string;
  maxMode: string;
  yearRows: number;
  yearColumns: number;
}

export interface TimePicker {
  showMeridian: boolean;
  hourStep: number;
  minuteStep: number;
  readonlyInput: boolean;
  mousewheel: boolean;
  arrowkeys: boolean;
}

export interface CustomOptions {}

export interface InternalProperties {}

export interface InternalConditional {
  show: any;
  when: any;
  eq: string;
  json: string;
}

export interface InternalAttributes {}

export interface InternalOverlay {
  style: string;
  page: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface InternalValidate {
  required: boolean;
  custom: string;
  customPrivate: boolean;
  strictDateValidation: boolean;
  multiple: boolean;
  unique: boolean;
}
