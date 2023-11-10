import 'reflect-metadata';
import { AtlpViewTableColumnModel } from '../models/atlp-view-table-column.model';
import { AtlpViewTableModel } from '../models/atlp-view-table.model';

export const tableSymbol = Symbol('column');

export function AtlpViewTableColumnDecorator(
  options: Partial<AtlpViewTableColumnModel> = {}
) {
  return function (target: any, propertyKey: string) {
    // console.log('decorator column for', propertyKey);
    if (!target[tableSymbol]) {
      target[tableSymbol] = new AtlpViewTableModel();
    }
    options.key = options.key || propertyKey;
    const propType = Reflect.getMetadata('design:type', target, propertyKey);
    options.propertyType = propType?.name || options.propertyType || String;
    options.translate = options.translate || options.key;
    options.keyField = options.keyField || false;
    const columnOptions = new AtlpViewTableColumnModel(options);
    target[tableSymbol].addColumn(columnOptions);
  };
}
