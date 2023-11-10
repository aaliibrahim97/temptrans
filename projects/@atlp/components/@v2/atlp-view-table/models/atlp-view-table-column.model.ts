export class AtlpViewTableColumnModel {
  /** List of options */
  key: string;
  order: number;
  propertyType: any;
  canSort: boolean;
  translate: string;
  keyField?: boolean;
  isFilterEnabled?: boolean;
  isNotVisible?: boolean;
  width?: string;

  constructor(options: Partial<AtlpViewTableColumnModel> = {}) {
    this.key = options.key;
    this.order = options.order || 0;
    this.propertyType = options.propertyType;
    this.canSort = options.canSort || false;
    this.translate = options.translate;
    this.keyField = options.keyField;
    this.isFilterEnabled = options.isFilterEnabled;
    this.isNotVisible = options.isNotVisible;
    this.width = options.width;
  }
}
