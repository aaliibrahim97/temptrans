import { catchError } from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FilterServices } from './interfaces/filterServices.interface';
import { AtlpFiltersService } from './services/atlpfilters.service';
import { Observable, of } from 'rxjs';
import { FilterCommunicationService } from './services/filter-communication.service';
import { SavedFilter } from './interfaces/savedFilter';
enum FormControlItemEnum {
  GROUP = 'group',
  TEXT = 'text',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}
interface FormComponentItem {
  type: FormControlItemEnum;
  group?: string;
  field?: string;
  fields: any[];
  control: AbstractControl;
}
interface SelectedFilterFields {
  group: string;
  field: string;
  value: any;
}

@Component({
  selector: 'atlp-filters',
  templateUrl: './atlp-filters.component.html',
  styleUrls: ['./atlp-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtlpFiltersComponent implements OnInit {
  // sidebar
  SidebarName = SidebarName;
  @Input() openbyDefault;
  FormControlItemEnum = FormControlItemEnum;
  form = new FormGroup({});
  sessionFilters = [];
  previousfilter: string = '';
  showLoadedFilters: boolean = false;
  valueArray: SelectedFilterFields[];
  @Input() title: string;
  @Input() filtersFields: any[] = [];
  @Output() setFiltersData = new EventEmitter<any>();
  @Input() toggleFilters: () => void;
  @Input() showLoadSavedButton: boolean = true;
  @Input() showSavedFilter: boolean = true;

  @Input() sectiontitle1: string;
  selectedSavedFilters = ['1'];

  @Output() onSearch = new EventEmitter<any>();
  @Output() onSaveSearch = new EventEmitter();
  @Output() onSelectFilter = new EventEmitter<any>();
  @Input() filterServices: FilterServices;
  // recentFilters$: Observable<any>;
  savedFilters$: Observable<any>;
  @Input() key: string;
  @Input() dataType: 'service' | 'object';
  @Input() savedFiltersData: SavedFilter[];

  @Output() onResetFilter = new EventEmitter<any>();

  filterInput = '';

  /**
   * Constructor
   * @param {IconsService} _iconsService
   * @param {AtlpSidebarService} _atplSidebarService
   */
  constructor(
    private atlpFiltersService: AtlpFiltersService,
    private _iconsService: IconsService,
    private _fb: FormBuilder,
    private _atplSidebarService: AtlpSidebarService,
    private communicationService: FilterCommunicationService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.valueArray = [];
  }

  ngOnInit(): void {
    this.updateSessionFilters();
    if (this.openbyDefault === 'true') {
      this.toggleSidebarOpen(SidebarName.filtersSidebar);
    }
    this.loadFilters();
  }

  updateSessionFilters(){
    this.sessionFilters =
      this.key && sessionStorage.getItem(this.key)
        ? JSON.parse(sessionStorage.getItem(this.key))
        : [];
  }

  saveFilter(filterName) {
    if (!filterName) return;
    this.atlpFiltersService
      .saveFilter(
        this.filterServices.saveFilterURL,
        filterName,
        this.communicationService.filter
      )
      .pipe(
        catchError((e) => {
          return [];
        })
      )
      .subscribe((response) => {});
    this.filterInput = '';
  }

  selectFilter(item) {
    this.onSelectFilter.emit(item);
  }

  onDestroy() {}

  onSavedFilterDelete(id) {
    this.atlpFiltersService
      .deleteSelectedFilter(this.filterServices.onDeleteURL, id)
      .subscribe((response: any) => {
        response.status;
      });
  }

  handleFiltersSelect(filter) {
    this.onSelectFilter.emit(filter);
  }

  loadFilters() {
    switch (this.dataType) {
      case 'service':
        this.savedFilters$ = this.atlpFiltersService
          .getFiltersList(this.filterServices.savedFiltersListURL, {})
          .pipe(catchError((error) => []));
        break;
      case 'object':
        this.savedFilters$ = of(this.savedFiltersData);
        break;
      default:
        this.savedFilters$ = of([]);
        break;
    }
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  sessionSave(filters) {
    if (filters && Array.isArray(filters) && filters.length < 1) return;
    const filter = filters
      ? {
          name: new Date().toISOString(),
          filters: filters,
        }
      : { name: new Date().toISOString(), filters: [] };

      if(this.sessionFilters.length >= 5) {
        this.sessionFilters = this.sessionFilters.slice(1);
      }

    this.sessionFilters.push(filter);
    sessionStorage.setItem(this.key, JSON.stringify(this.sessionFilters));
    this.updateSessionFilters();
  }

  getSession() {
    sessionStorage.getItem(this.key);
  }

  submitFilters(): void {
    // this.sessionSave();
    this.onSearch.emit();
  }

  resetFilters(): void {
    this.form.reset();
    this.valueArray = [];
    this.communicationService.filter = null;
    this.setFiltersData.emit(this.valueArray);
    this.onResetFilter.emit();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  get icons(): Array<string> {
    return ['plus-dark', 'x-fill-purple', 'delete-grey', 'data-icon-white'];
  }

  openLoadedFilters = (): void => {
    this.showLoadedFilters = !this.showLoadedFilters;
  };
}
