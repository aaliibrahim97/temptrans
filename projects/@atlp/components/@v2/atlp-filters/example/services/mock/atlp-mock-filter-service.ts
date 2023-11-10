import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AtlpSavedFilter } from '../../../interfaces/atlp-saved-filter';
import { IAtlpFilterService } from '../../../services/atlp-filter.interface';

const appointmentsSavedFilterData: AtlpSavedFilter[] = [
  {
    id: '101',
    filterName: 'Filter 1',
    FilterTypeName: 'DO_TRANSACTION_FILTER',
    searchDate: new Date().toDateString(),
    filters: [
      {
        filterBy: 'awbReferenceNumber',
        filterType: 'contains',
        value: 'AWB1',
      },
      {
        filterBy: 'Appointment No',
        filterType: 'like',
        value: 'app1',
      },
    ],
  },
  {
    id: '102',
    FilterTypeName: 'DO_TRANSACTION_FILTER',
    filterName: 'Filter 2',
    searchDate: new Date().toDateString(),
    filters: [
      {
        filterBy: 'awbReferenceNumber',
        filterType: 'contains',
        value: 'AWB1',
      },
    ],
  },
  {
    id: '103',
    FilterTypeName: 'DO_TRANSACTION_FILTER',
    filterName: 'Filter 3',
    searchDate: new Date().toDateString(),
    filters: [
      {
        filterBy: 'awbReferenceNumber',
        filterType: 'like',
        value: 'app1',
      },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class AtlpMockFilterService implements IAtlpFilterService {
  appointments: AtlpSavedFilter[] = appointmentsSavedFilterData;

  constructor() {}

  saveFilter(name: string, filters: any) {
    const filterId = (
      Number(this.appointments[this.appointments.length - 1].id) + 1
    ).toString();
    const data: AtlpSavedFilter = {
      id: filterId,
      FilterTypeName: 'DO_TRANSACTION_FILTER',
      filterName: 'Filter ' + filterId,
      searchDate: new Date().toDateString(),
      filters: filters,
    };
    this.appointments.push(data);
    return of(this.appointments);
  }

  deleteFilter(id: any) {
    const removeIndex = this.appointments
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);

    // remove object
    this.appointments.splice(removeIndex, 1);
    return of(this.appointments);
  }

  getFiltersList() {
    return of(this.appointments);
  }
}
