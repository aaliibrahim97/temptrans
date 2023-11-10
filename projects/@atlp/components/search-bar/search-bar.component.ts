import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'atlp-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class AtlpSearchBarComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  atlpConfig: any;

  @Output()
  inputSearch: EventEmitter<any>;
  @Input() searchValue: string = '';
  private _unsubscribeAll: Subject<any>;
  @Input() placeholder: string = 'Global_Search';
  @Input() autocomplete: string = 'off';

  constructor(
    private _atlpConfigService: AtlpConfigService,
    private translateService: TranslateService,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
    // Set the defaults
    this.inputSearch = new EventEmitter();
    this.collapsed = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._atlpConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.atlpConfig = config;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  collapse(): void {
    this.collapsed = true;
  }

  expand(): void {
    this.collapsed = false;
  }

  search($event): void {
    this.inputSearch.emit($event.target.value);
  }

  reset() {
    this.searchValue = '';
  }
  get icons(): Array<string> {
    return ['icon-search'];
  }
}
