import * as _ from 'lodash';
import { FieldConfig } from './dynamic-form-field.interface';

export type dynamicLayout = dynamicLayoutList[];

export interface dynamicLayoutList {
  row: dynamicRow;
}

export interface dynamicRowProps {
  classList: string[];
}

export interface dynamicRow {
  columns: dynamicColumn[];
  props?: dynamicRowProps;
}

export interface dynamicColumn {
  components: FieldConfig[];
  props: dynamicColumnProps;
}

export interface dynamicColumnProps {
  classList: string[];
}

const colDef: dynamicColumn = {
  components: [],
  props: {
    classList: [],
  },
};

export const defaultColumnDef: dynamicColumn = _.cloneDeep({ ...colDef });

export const defaultRowDef: dynamicLayoutList = _.cloneDeep({
  row: {
    columns: [{ ...colDef }],
  },
});

// export type dynamicRowType = dynamicRow;
// export type dynamicColumnType = dynamicColumn;
// export type FieldConfigType = FieldConfig;
// export type dynamicColumnPropsType = dynamicColumnProps;
