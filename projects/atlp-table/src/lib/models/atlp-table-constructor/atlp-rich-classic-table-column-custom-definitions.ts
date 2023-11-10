import { TemplateRef } from '@angular/core';
import {
  AtlpRichClassicTableCellTemplate,
  AtlpRichClassicTableColumnTemplate,
  AtlpRichClassicTableMode,
} from '../atlp-rich-classic-table-enum';

export interface AtlpRichClassicTableColumnCustomDefinition<T = any> {
  /** Column name */
  columnDef: string;
  /** Header */
  header: string;
  /** Tool Tip */
  /** mat Icon */
  toolTip?: (element: T) => string;
  matIcon?: (element: T) => string;
  /** Cell */
  cell?: (element: T) => any;
  /** Rich Cell */
  cellRich?: (element: T) => any;
  /** extraClass with condition */
  conditionalClasses?: (element: T) => string[];
  /** Column template */
  columnTemplate?: AtlpRichClassicTableColumnTemplate;
  /** Cell tempelate  */
  cellTemplate?: AtlpRichClassicTableCellTemplate;
  /** extraClass */
  extraClass?: string[];
  /** disable sorting */
  matSortHeader?: boolean;
  /** add HTML string */
  innerHtml?: string;
  /** add HTML template id for dynamic render string */
  innerHtmlProps?: { templateId: string; data: any };
  /** classic view cell tempelate reference  */
  classicViewCellTemplateRef?: TemplateRef<any>;
}

/** Use for a table TableModeSelection */
export interface AtlpRichClassicTableColumnModeDefinition<T = any>
  extends AtlpRichClassicTableColumnCustomDefinition<T> {
  /** Column that is displayed on a specific tablemode */
  columnShowInMode:
    | AtlpRichClassicTableMode
    | AtlpRichClassicTableMode[]
    | 'all';

  rowNavigation?: boolean;
  /* Cell clicked boolean */
  cellClicked?: boolean;
  dragDisabled?: boolean;
  previewClass?: string;
}
