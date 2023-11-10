import { Injectable } from '@angular/core';
import { AtlpRichClassicTable } from '../models/atlp-table-constructor/atlp-rich-classic-table';
import { AtlpRichClassicTableCustom } from '../models/atlp-table-constructor/atlp-rich-classic-table-custom';
import { AtlpRichClassicTableModeSelection } from '../models/atlp-table-constructor/atlp-rich-classic-table-mode-selection';
import { AtlpRichClassicTableModeSelectionDrag } from '../models/atlp-table-constructor/atlp-rich-classic-table-mode-selection-drag';
import { AtlpRichClassicTableSelection } from '../models/atlp-table-constructor/atlp-rich-classic-table-selection';

@Injectable({
  providedIn: 'root',
})
export class AtlpRichClassicTableService {
  // Private
  private _registry: {
    [key: string]:
      | AtlpRichClassicTable
      | AtlpRichClassicTableCustom
      | AtlpRichClassicTableSelection
      | AtlpRichClassicTableModeSelection
      | AtlpRichClassicTableModeSelectionDrag;
  } = {};

  constructor() {}

  register(key, table): void {
    // Check if the key is already in use
    if (this._registry[key]) {
      console.error(
        `The table with the key '${key}' already exists. Either unregister it first or use a unique key.`
      );

      return;
    }

    // Add to registry
    this._registry[key] = table;
  }

  unregister(key): void {
    // Check if the table exists
    if (!this._registry[key]) {
      console.warn(
        `The table with the key '${key}' doesn't exist in the registry.`
      );
    }

    // Unregister a table
    delete this._registry[key];
  }

  getTable(
    key
  ):
    | AtlpRichClassicTable
    | AtlpRichClassicTableCustom
    | AtlpRichClassicTableSelection
    | AtlpRichClassicTableModeSelection
    | AtlpRichClassicTableModeSelectionDrag {
    // Check if the table exists
    if (!this._registry[key]) {
      console.warn(
        `The Table with the key '${key}' doesn't exist in the registry.`
      );
      return null;
    }

    return this._registry[key];
  }
}
