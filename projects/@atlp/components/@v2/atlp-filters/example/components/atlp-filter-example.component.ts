import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { Observable } from 'rxjs';
import { AtlpMockFilterService } from '../services/mock/atlp-mock-filter-service';
import { AtlpContentFilterComponent } from './filter-content/atlp-filter-example-content.component';

@Component({
  selector: 'atlp-filter-example-component',
  templateUrl: './atlp-filter-example.component.html',
  styleUrls: ['./atlp-filter-example.component.scss'],
})
export class AtlpExampleFilterExampleComponent implements OnInit {
  @ViewChild(AtlpContentFilterComponent)
  exportsFilter: AtlpContentFilterComponent;
  // sidebar
  SidebarNameAtlp = SidebarName;
  showFilters: boolean;
  appliedfilters = ['Accepted'];
  errorsPayload$: Observable<any>;
  errorsPayload: any;
  driverDetails = new SelectionModel(true, []);
  truckDetails = new SelectionModel(true, []);
  typeDictionary = {
    awbReferenceNumber: 'contain',
    docType: 'equal',
    origin: 'contain',
    destination: 'contain',
    carrierCode: 'equal',
    flightNumber: 'contain',
    fromDate: 'equal',
    toDate: 'equal',
    terminalCode: 'equal',
    status: 'equal',
    statusType: 'equal',
  };

  constructor(
    private _iconsService: IconsService,
    public atplSidebarService: AtlpSidebarService,
    public mockFilterService: AtlpMockFilterService
  ) {
    this.showFilters = true;
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {}

  showFilter() {
    this.atplSidebarService.getSidebar(SidebarName.filtersSidebar).toggleOpen();
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleFilters = (args: any): void => {
    // callback code here
    this.showFilters = !this.showFilters;
  };

  onSelectFilter(filterData) {
    this.exportsFilter.onSelectFilter(filterData);
  }

  changeFilters = (filter: string): void => {
    if (filter !== '') {
      // callback code here
      if (this.appliedfilters.includes(filter)) {
        this.appliedfilters = this.appliedfilters.filter(
          (elem) => elem !== filter
        );
      } else {
        this.appliedfilters.push(filter);
      }
    }
  };

  clearfilters = (): void => {
    this.appliedfilters = [];
    //clear filter code
    this.exportsFilter.filterForm.reset();
    this.exportsFilter.onResetFilter();
  };

  setDriverDetails = (selectedDetails) => {
    this.driverDetails = selectedDetails;
  };
  setTruckDetails = (selectedDetails) => {
    this.truckDetails = selectedDetails;
  };

  getFilterDataFn = () => {
    if (this.validateSearch() || true) {
      const filterData = [];
      Object.keys(this.exportsFilter.filterForm.controls).forEach((key) => {
        if (
          this.exportsFilter.filterForm.get(key).value !== '' &&
          this.exportsFilter.filterForm.get(key).value !== null
        ) {
          if (key === 'status' || key === 'statusType') {
            if (key === 'statusType') {
              filterData.push({
                filterBy:
                  this.exportsFilter.filterForm.value.status.description,
                filterType: this.typeDictionary[key] || 'equal',
                value: this.exportsFilter.filterForm.value.statusType,
              });
            }
          } else if (
            key === 'appointmentFromDate' ||
            key === 'appointmentToDate'
          ) {
            filterData.push({
              filterBy: key,
              filterType: this.typeDictionary[key] || 'contain',
              value:
                key === 'appointmentFromDate' || key === 'appointmentToDate'
                  ? this.formatMomentDate(
                      this.exportsFilter.filterForm.get(key).value
                    )
                  : this.exportsFilter.filterForm.get(key).value,
            });
          } else if (key !== 'appointmentDate') {
            filterData.push({
              filterBy: key,
              filterType: this.typeDictionary[key] || 'contain',
              value:
                key === 'fromDate' || key === 'toDate'
                  ? this.formatDate(
                      this.exportsFilter.filterForm.get(key).value
                    )
                  : this.exportsFilter.filterForm.get(key).value,
            });
          }
        }
      });
      return filterData;
    } else {
      return [];
    }
  };

  search(): void {
    // this.importsFilter.search(this.importsFilter.filterForm.value);
    if (this.validateSearch()) {
      const filterData = [];
      Object.keys(this.exportsFilter.filterForm.controls).forEach((key) => {
        if (
          this.exportsFilter.filterForm.get(key).value !== '' &&
          this.exportsFilter.filterForm.get(key).value !== null
        ) {
          if (key === 'status' || key === 'statusType') {
            if (key === 'statusType') {
              filterData.push({
                filterBy:
                  this.exportsFilter.filterForm.value.status.description,
                filterType: this.typeDictionary[key] || 'equal',
                value: this.exportsFilter.filterForm.value.statusType,
              });
            }
          } else if (
            key === 'appointmentFromDate' ||
            key === 'appointmentToDate'
          ) {
            filterData.push({
              filterBy: key,
              filterType: this.typeDictionary[key] || 'contain',
              value:
                key === 'appointmentFromDate' || key === 'appointmentToDate'
                  ? this.formatMomentDate(
                      this.exportsFilter.filterForm.get(key).value
                    )
                  : this.exportsFilter.filterForm.get(key).value,
            });
          } else if (key !== 'appointmentDate') {
            filterData.push({
              filterBy: key,
              filterType: this.typeDictionary[key] || 'contain',
              value:
                key === 'fromDate' || key === 'toDate'
                  ? this.formatDate(
                      this.exportsFilter.filterForm.get(key).value
                    )
                  : this.exportsFilter.filterForm.get(key).value,
            });
          }
        }
      });
      //assign filterData data
    }
    this.exportsFilter.search();
  }

  validateSearch(): boolean {
    let fromDate = this.formatDate(
      this.exportsFilter.filterForm.get('fromDate').value
    );
    let toDate = this.formatDate(
      this.exportsFilter.filterForm.get('toDate').value
    );

    if (fromDate && toDate && fromDate > toDate) {
      this.exportsFilter.filterForm
        .get('toDate')
        .setErrors({ notGreaterthan: true });
      return false;
    }

    if (
      this.exportsFilter.filterForm.get('fromDate').value ||
      this.exportsFilter.filterForm.get('toDate').value
    ) {
      this.exportsFilter.filterForm
        .get('toDate')
        .setValidators(Validators.required);
      this.exportsFilter.filterForm
        .get('fromDate')
        .setValidators(Validators.required);
    } else {
      this.exportsFilter.filterForm.get('toDate').clearValidators();
      this.exportsFilter.filterForm.get('fromDate').clearValidators();
    }

    // Validate status type
    if (this.exportsFilter.filterForm.value.status) {
      this.exportsFilter.filterForm
        .get('statusType')
        .setValidators(Validators.required);
    } else {
      this.exportsFilter.filterForm.get('statusType').clearValidators();
    }

    // validate Appointment Start & End dates
    let appntFromDate = this.formatMomentDate(
      this.exportsFilter.filterForm.get('appointmentFromDate').value
    );
    let appntToDate = this.formatMomentDate(
      this.exportsFilter.filterForm.get('appointmentToDate').value
    );

    if (appntFromDate && appntToDate && appntFromDate > appntToDate) {
      this.exportsFilter.filterForm
        .get('appointmentToDate')
        .setErrors({ notGreaterthan: true });
      return false;
    }
    if (
      this.exportsFilter.filterForm.get('appointmentFromDate').value ||
      this.exportsFilter.filterForm.get('appointmentToDate').value
    ) {
      this.exportsFilter.filterForm
        .get('appointmentToDate')
        .setValidators(Validators.required);
      this.exportsFilter.filterForm
        .get('appointmentFromDate')
        .setValidators(Validators.required);
    } else {
      this.exportsFilter.filterForm.get('appointmentToDate').clearValidators();
      this.exportsFilter.filterForm
        .get('appointmentFromDate')
        .clearValidators();
    }

    this.exportsFilter.filterForm
      .get('appointmentToDate')
      .updateValueAndValidity();
    this.exportsFilter.filterForm
      .get('appointmentFromDate')
      .updateValueAndValidity();
    this.exportsFilter.filterForm.get('toDate').updateValueAndValidity();
    this.exportsFilter.filterForm.get('fromDate').updateValueAndValidity();
    this.exportsFilter.filterForm.get('statusType').updateValueAndValidity();
    return this.exportsFilter.filterForm.valid;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return [
      'x-fill-purple',
      'data-icon-white',
      'next-table',
      'prev-table',
      'close-white-icon',
      'minimize-arrows',
      'table-icon-two',
      'mob-open-menu',
      'table-icon-one',
      'open-icon',
      'plus-white',
      'open-table-icon-active',
      'open-table-icon',
      'filter-icon',
      'small-close-btn',
      'soc-icon',
      'download-icon',
      'print-icon',
      'credit-card-fill',
      'back-arrow',
    ];
  }

  private formatDate(date: any): string {
    return date ? date.format('YYYY-MM-DD') : null;
  }

  private formatMomentDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
}
