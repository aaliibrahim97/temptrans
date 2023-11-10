import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@Component({
  selector: 'atlp-example-filter-content',
  templateUrl: './atlp-filter-example-content.component.html',
  styleUrls: ['./atlp-filter-example-content.component.scss'],
})
export class AtlpContentFilterComponent implements OnInit {
  title = 'FILTER EXPORTS SHIPMENTS';
  selectedSavedFilters: any[];
  SidebarName = SidebarName;
  filterForm: FormGroup;
  statusList: any;
  fullStatusList: any;
  statusTypeList: any;
  onSearch: EventEmitter<any> = new EventEmitter<any>();
  statusTypeList$: Observable<any>;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      awbReferenceNumber: '',
      carrierCode: '',
      origin: '',
      destination: '',
      flightNumber: '',
      fromDate: '',
      toDate: '',
      terminalCode: null,
      status: null,
      statusType: null,
      appointmentDate: null,
      appointmentno: null,
      appointmentFromDate: null,
      appointmentToDate: null,
      consignee: null,
    });
    this.submitted = false;
  }

  onSelectFilter(filterData) {
    console.log(filterData);
    this.filterForm.patchValue({
      awbReferenceNumber: filterData.filters.filter(
        (c) => c.filterBy === 'awbReferenceNumber'
      )[0].value,
      carrierCode: '',
      origin: '',
      destination: '',
      flightNumber: '',
      fromDate: '',
      toDate: '',
      terminalCode: null,
      status: null,
      statusType: null,
      appointmentDate: null,
      appointmentno: null,
      appointmentFromDate: null,
      appointmentToDate: null,
      consignee: null,
    });
    //throw new Error("Method not implemented.");
  }

  get formValidator() {
    return this.filterForm.controls;
  }

  search() {
    this.submitted = true;
  }

  onResetFilter(): void {
    this.filterForm.get('terminalCode').reset(null);
    this.statusTypeList = null;
    this.submitted = false;
  }

  onStatusSelect(event: any): any {
    this.filterForm.get('statusType').reset(null);
    const selectedStatus = this.filterForm.value.status;
    this.statusTypeList = this.fullStatusList.filter(
      (item) =>
        item.parentId === selectedStatus.referenceID && item.parentId !== null
    );
  }
}
