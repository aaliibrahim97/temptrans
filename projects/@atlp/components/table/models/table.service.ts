import { Injectable } from '@angular/core';
import { Table } from './table-constructor/table';
import { TableCustom } from './table-constructor/table-custom';
import { TableModeSelection } from './table-constructor/table-mode-selection';
import { TableModeSelectionDrag } from './table-constructor/table-mode-selection-drag';
import { TableSelection } from './table-constructor/table-selection';

@Injectable({
  providedIn: 'root',
})
export class AtlpTableService {
  // Private
  private _registry: {
    [key: string]:
      | Table
      | TableCustom
      | TableSelection
      | TableModeSelection
      | TableModeSelectionDrag;
  } = {};

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Add the table to the registry
   *
   * @param key
   * @param table
   */
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

  /**
   * Remove table from registry
   *
   * @param key
   */
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

  /**
   * Return a table with a given key
   *
   * @param key
   * @returns { Table | TableCustom | TableSelection | TableModeSelection | TableModeSelectionDrag }
   */
  getTable(
    key
  ):
    | Table
    | TableCustom
    | TableSelection
    | TableModeSelection
    | TableModeSelectionDrag {
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
