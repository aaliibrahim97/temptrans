import { filter } from 'rxjs/operators';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {
  // sidebar
  SidebarName = SidebarName;

  previousfilter: string = '';
  showLoadedFilters: boolean = false;
  selectedSavedFilters = [

    "1",

  ]
  @Input() title: string;
  @Input() sectiontitle1: string;
  @Input() SearchbyOptions1;
  @Input() toggleFilters: () => void;
  @Input() changeFilters: (filter: string) => void;
  @Input() clearfilters: () => void;

  recentFilters = [
    '12:00 12/14/2020',
    '12:00 12/14/2020'
  ]
  savedFilters = [
    {
      id: "1",
      label: 'Saved Filter ABC',
    },
    {
      id: "2",
      label: 'Saved Filter ABC',
    },
    {
      id: "3",
      label: 'Saved Filter ABC',
    },
    {
      id: "4",
      label: 'Saved Filter ABC',
    },

  ]
  @Input() appliedfilters;

  /**
  * Constructor
  * @param {IconsService} _iconsService
  * @param {AtlpSidebarService} _atplSidebarService
  */
  constructor(
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return ['plus-dark', 'x-fill-purple', 'delete-grey', 'data-icon-white'];
  }

  openLoadedFilters = (): void => {
    this.showLoadedFilters = !this.showLoadedFilters;
  }
  changefilters = (filter: string): void => {
    this.changeFilters(filter)
  }
  radioChange = (EVENT, value): void => {

    this.changeFilters(this.previousfilter);
    this.changeFilters(value);
    this.previousfilter = value;
  }
  selectChange = (Event, value): void => {
    this.changeFilters(value);
  }
  clearFilters = (): void => {
    this.clearfilters()
  }
  handleSavedFiltersSelect = (filterSelected): void => {
    if (this.selectedSavedFilters.includes(filterSelected.id)) {
      this.selectedSavedFilters = this.selectedSavedFilters.filter(elem => elem !== filterSelected.id)

    }
    else {
      this.selectedSavedFilters.push(filterSelected.id)
    }
  }
}
