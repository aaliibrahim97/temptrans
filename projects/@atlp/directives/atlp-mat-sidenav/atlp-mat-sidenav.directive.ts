import {
  Directive,
  Input,
  OnInit,
  HostListener,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AtlpMatchMediaService } from 'projects/@atlp/services/match-media.service';
import { AtlpMatSidenavHelperService } from 'projects/@atlp/directives/atlp-mat-sidenav/atlp-mat-sidenav.service';

@Directive({
  selector: '[atlpMatSidenavHelper]',
})
export class AtlpMatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.mat-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  atlpMatSidenavHelper: string;

  @Input()
  matIsLockedOpen: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AtlpMatchMediaService} _atlpMatchMediaService
   * @param {AtlpMatSidenavHelperService} _atlpMatSidenavHelperService
   * @param {MatSidenav} _matSidenav
   * @param {MediaObserver} _mediaObserver
   */
  constructor(
    private _atlpMatchMediaService: AtlpMatchMediaService,
    private _atlpMatSidenavHelperService: AtlpMatSidenavHelperService,
    private _matSidenav: MatSidenav,
    private _mediaObserver: MediaObserver
  ) {
    // Set the defaults
    this.isLockedOpen = true;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Register the sidenav to the service
    this._atlpMatSidenavHelperService.setSidenav(
      this.atlpMatSidenavHelper,
      this._matSidenav
    );

    if (
      this.matIsLockedOpen &&
      this._mediaObserver.isActive(this.matIsLockedOpen)
    ) {
      this.isLockedOpen = true;
      this._matSidenav.mode = 'side';
      this._matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this._matSidenav.mode = 'over';
      this._matSidenav.toggle(false);
    }

    this._atlpMatchMediaService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        if (
          this.matIsLockedOpen &&
          this._mediaObserver.isActive(this.matIsLockedOpen)
        ) {
          this.isLockedOpen = true;
          this._matSidenav.mode = 'side';
          this._matSidenav.toggle(true);
        } else {
          this.isLockedOpen = false;
          this._matSidenav.mode = 'over';
          this._matSidenav.toggle(false);
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[atlpMatSidenavToggler]',
})
export class AtlpMatSidenavTogglerDirective {
  @Input()
  atlpMatSidenavToggler: string;

  /**
   * Constructor
   *
   * @param {AtlpMatSidenavHelperService} _atlpMatSidenavHelperService
   */
  constructor(
    private _atlpMatSidenavHelperService: AtlpMatSidenavHelperService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On click
   */
  @HostListener('click')
  onClick(): void {
    this._atlpMatSidenavHelperService
      .getSidenav(this.atlpMatSidenavToggler)
      .toggle();
  }
}
