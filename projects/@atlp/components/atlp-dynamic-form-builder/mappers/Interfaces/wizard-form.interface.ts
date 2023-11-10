export interface WizardRootObject {
  components: Component[];
  display: string;
}

export interface Component {
  title: string;
  label: string;
  type: string;
  key: string;
  components: InternalComponent[];
  input: boolean;
  placeholder: string;
  prefix: string;
  customClass: string;
  suffix: string;
  multiple: boolean;
  defaultValue: any;
  protected: boolean;
  unique: boolean;
  persistent: boolean;
  hidden: boolean;
  clearOnHide: boolean;
  refreshOn: string;
  redrawOn: string;
  tableView: boolean;
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
  widget: any;
  attributes: InternalAttributes;
  validateOn: string;
  validate: InternalValidate;
  conditional: InternalConditional;
  overlay: InternalOverlay;
  allowCalculateOverride: boolean;
  encrypted: boolean;
  showCharCount: boolean;
  showWordCount: boolean;
  properties: InternalProperties;
  allowMultipleMasks: boolean;
  addons: any[];
  tree: boolean;
  lazyLoad: boolean;
  theme: string;
  breadcrumb: string;
  id: string;
}

export interface InternalComponent {
  label: string;
  labelPosition: string;
  placeholder: string;
  description: string;
  tooltip: string;
  prefix: string;
  suffix: string;
  widget: Widget;
  inputMask: string;
  allowMultipleMasks: boolean;
  customClass: string;
  tabindex: string;
  hidden: boolean;
  hideLabel: boolean;
  showWordCount: boolean;
  showCharCount: boolean;
  mask: boolean;
  autofocus: boolean;
  spellcheck: boolean;
  disabled: boolean;
  tableView: boolean;
  modalEdit: boolean;
  multiple: boolean;
  defaultValue: string;
  persistent: boolean;
  inputFormat: string;
  protected: boolean;
  dbIndex: boolean;
  case: string;
  encrypted: boolean;
  redrawOn: string;
  clearOnHide: boolean;
  customDefaultValue: string;
  calculateValue: string;
  calculateServer: boolean;
  allowCalculateOverride: boolean;
  validateOn: string;
  validate: Validate;
  unique: boolean;
  errorLabel: string;
  key: string;
  tags: any[];
  properties: Properties;
  conditional: Conditional;
  customConditional: string;
  logic: any[];
  attributes: Attributes;
  overlay: Overlay;
  type: string;
  input: boolean;
  refreshOn: string;
  inputType: string;
  id: string;
  dataGridLabel: boolean;
  addons: any[];
  displayMask: string;
  truncateMultipleSpaces: boolean;
  autocomplete?: string;
  errors?: string;
  editor?: string;
  autoExpand?: boolean;
  fixedSize?: boolean;
  rows?: number;
  wysiwyg?: boolean;
}

export interface Widget {
  type: string;
}

export interface Validate {
  required: boolean;
  pattern: string;
  customMessage: string;
  custom: string;
  customPrivate: boolean;
  json: string;
  minLength: string;
  maxLength: string;
  strictDateValidation: boolean;
  multiple: boolean;
  unique: boolean;
  minWords?: string;
  maxWords?: string;
}

export interface Properties {}

export interface Conditional {
  show: any;
  when: any;
  eq: string;
  json: string;
}

export interface Attributes {}

export interface Overlay {
  style: string;
  page: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface InternalAttributes {}

export interface InternalValidate {
  required: boolean;
  custom: string;
  customPrivate: boolean;
  strictDateValidation: boolean;
  multiple: boolean;
  unique: boolean;
}

export interface InternalConditional {
  show: any;
  when: any;
  eq: string;
}

export interface InternalOverlay {
  style: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface InternalProperties {}
