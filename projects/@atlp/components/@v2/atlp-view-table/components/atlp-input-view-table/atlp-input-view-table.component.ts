import {
  Component,
  OnInit,
  forwardRef,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AtlpCheckHelper } from 'projects/@atlp/utils/atlp-check-utils';
import {
  AtlpViewTablePaginationModel,
  AtlpViewTablePaginationDefault,
} from '../../models/atlp-view-table-pagination.model';

@Component({
  selector: 'atlp-input-view-table',
  templateUrl: './atlp-input-view-table.component.html',
  styleUrls: ['./atlp-input-view-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlpInputViewTableComponent),
      multi: true,
    },
  ],
})
export class AtlpInputViewTableComponent
  implements OnInit, ControlValueAccessor
{
  /**  How to use this component:
   * <atlp-input-view-table
   *    [(ngModel)]="tableSelectModel"  // or just use model binding
   *    [formControl]="form.controls['controlName']" // access it as any form control
   *    [data]="data$ | async"
   *    [isSingleSelection]="true"
   *    [isViewMode]="isViewMode"
   *    (onSelectRows)="selectedRows($event)">
   * </atlp-input-view-table>
   */

  onChange;
  @Output() onSelectRows = new EventEmitter();
  @Input() paginationData?: AtlpViewTablePaginationModel = {
    ...AtlpViewTablePaginationDefault,
  };
  @Input() isSingleSelection?: boolean = false;
  selectedRows: any[] = [];
  value: any;
  // @Input() set setSelectedRows(data: any[]) {
  //   this.selectedRows = data || [];
  // }
  @Input() data: any[] = [];
  @Input() isViewMode: boolean = false;

  constructor() {
    if (!this.isViewMode) {
      this.isViewMode = false;
    }
  }

  ngOnInit() {}

  onSelectRowsEvent(selectedRows) {
    if (!this.isViewMode) {
      this.propagateChange(selectedRows);
      this.onSelectRows.emit(selectedRows);
    }
  }

  writeValue(value) {
    if (AtlpCheckHelper.isObject(value)) {
      this.selectedRows = [value];
    } else if (AtlpCheckHelper.isNullOrEmpty(value)) {
      this.selectedRows = [];
    } else {
      this.selectedRows = value || [];
    }

    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {}

  private propagateChange = (_: any) => {};
}
