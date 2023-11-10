import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpConfigService } from 'projects/@atlp/services/config.service';
import { AtlpMatchMediaService } from 'projects/@atlp/services/match-media.service';
import { AtlpSidebarService } from './sidebar.service';

@Component({
  selector: 'atlp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtlpSidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string;

  // Key
  @Input()
  key: string;

  // Position
  @Input()
  position: 'left' | 'right';

  // Open
  @HostBinding('class.open')
  opened: boolean;

  // Locked Open
  @Input()
  lockedOpen: string;

  // isLockedOpen
  @HostBinding('class.locked-open')
  isLockedOpen: boolean;

  // Folded width
  @Input()
  foldedWidth: number;

  // Folded auto trigger on hover
  @Input()
  foldedAutoTriggerOnHover: boolean;

  @Input()
  superimposed: boolean;

  // Folded unfolded
  @HostBinding('class.unfolded')
  unfolded: boolean;

  // Invisible overlay
  @Input()
  invisibleOverlay: boolean;

  // Folded changed
  @Output()
  foldedChanged: EventEmitter<boolean>;

  // Opened changed
  @Output()
  openedChanged: EventEmitter<boolean>;

  timeOpened: number;
  // Private
  private _folded: boolean;
  private _atlpConfig: any;
  private _wasActive: boolean;
  private _wasFolded: boolean;
  private _backdrop: HTMLElement | null = null;
  private _player: AnimationPlayer;
  private _unsubscribeAll: Subject<any>;

  currentLightMode: boolean;
  // Invisible overlay
  @Input()
  lightMode: boolean;

  // Invisible overlay
  @Input()
  hideThemeSwitcher: boolean;
  destroySideBar: boolean = false;

  @HostBinding('class.animations-enabled')
  private _animationsEnabled: boolean;
  // @ContentChild(TemplateRef) tplRef;
  @ContentChild('AtlpSidebarComponentContent', { static: true })
  tplRef: TemplateRef<any>;
  @Input() isTemplate?: boolean = false;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _iconsService: IconsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _atlpConfigService: AtlpConfigService,
    private _atlpMatchMediaService: AtlpMatchMediaService,
    private _atlpSidebarService: AtlpSidebarService,
    private _mediaObserver: MediaObserver,
    private _renderer: Renderer2
  ) {
    // Set the defaults
    this.foldedAutoTriggerOnHover = true;
    this.foldedWidth = 64;
    this.foldedChanged = new EventEmitter();
    this.openedChanged = new EventEmitter();
    this.opened = false;
    this.position = 'left';
    this.invisibleOverlay = false;
    this.superimposed = false;

    // Set the private defaults
    this._animationsEnabled = false;
    this._folded = false;
    this._unsubscribeAll = new Subject();
    this.currentLightMode = this.setInitialMode();
    if (!this.hideThemeSwitcher) {
      this.hideThemeSwitcher = false;
    }
    this._iconsService.registerIcons(this.icons);
  }

  @Input()
  set folded(value: boolean) {
    // Set the folded
    this._folded = value;

    // Return if the sidebar is closed
    if (!this.opened) {
      return;
    }

    // Programmatically add/remove padding to the element
    // that comes after or before based on the position
    let sibling, styleRule;

    const styleValue = this.foldedWidth + 'px';

    // Get the sibling and set the style rule
    if (this.position === 'left') {
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = 'padding-left';
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = 'padding-right';
    }

    // If there is no sibling, return...
    if (!sibling) {
      return;
    }

    // If folded...
    if (value) {
      // Fold the sidebar
      this.fold();

      // Set the folded width
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'width',
        styleValue
      );
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'min-width',
        styleValue
      );
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'max-width',
        styleValue
      );

      // Set the style and class
      this._renderer.setStyle(sibling, styleRule, styleValue);
      this._renderer.addClass(this._elementRef.nativeElement, 'folded');
    }
    // If unfolded...
    else {
      // Unfold the sidebar
      this.unfold();

      // Remove the folded width
      this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
      this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
      this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');

      // Remove the style and class
      this._renderer.removeStyle(sibling, styleRule);
      this._renderer.removeClass(this._elementRef.nativeElement, 'folded');
    }

    // Emit the 'foldedChanged' event
    this.foldedChanged.emit(this.folded);
  }

  get folded(): boolean {
    return this._folded;
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._atlpConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this._atlpConfig = config;
      });

    // Register the sidebar
    this._atlpSidebarService.register(this.name, this);

    // Setup visibility
    this._setupVisibility();

    // Setup position
    this._setupPosition();

    // Setup lockedOpen
    this._setupLockedOpen();

    // Setup folded
    this._setupFolded();

    // Update timeOpened
    this._upateTimeOpened();
  }

  ngOnDestroy(): void {
    // If the sidebar is folded, unfold it to revert modifications
    if (this.folded) {
      this.unfold();
    }

    // Unregister the sidebar
    this._atlpSidebarService.unregister(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleLightMode = () => {
    this.currentLightMode = !this.currentLightMode;
    localStorage.setItem('atlp-prefs-mode', this.currentLightMode.toString());
  };

  setInitialMode = () => {
    if (!this.lightMode) {
      if (localStorage.getItem('atlp-prefs-mode')) {
        return JSON.parse(localStorage.getItem('atlp-prefs-mode'));
      }
      return false;
    }
    return this.lightMode;
  };

  private _setupVisibility(): void {
    // Remove the existing box-shadow
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'box-shadow',
      'none'
    );

    // Make the sidebar invisible
    if (!this.isTemplate) {
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'display',
        'none'
      );
    }
    this.destroySideBar = false;
    this._changeDetectorRef.detectChanges();
    // if (this.tplRef && this.isTemplate) {
    //   this.tplRef.elementRef.nativeElement.removeChild(this._elementRef);
    // }
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   'visibility',
    //   'hidden'
    // );
  }

  private _setupPosition(): void {
    // Add the correct class name to the sidebar
    // element depending on the position attribute
    if (this.position === 'right') {
      this._renderer.addClass(
        this._elementRef.nativeElement,
        'right-positioned'
      );
    } else {
      this._renderer.addClass(
        this._elementRef.nativeElement,
        'left-positioned'
      );
    }
  }
  private get icons(): Array<string> {
    return ['dark-light'];
  }

  private _setupLockedOpen(): void {
    // Return if the lockedOpen wasn't set
    if (!this.lockedOpen) {
      // Return
      return;
    }

    // Set the wasActive for the first time
    this._wasActive = false;

    // Set the wasFolded
    this._wasFolded = this.folded;

    // Show the sidebar
    this._showSidebar();

    // Act on every media change
    this._atlpMatchMediaService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Get the active status
        const isActive = this._mediaObserver.isActive(this.lockedOpen);

        // If the both status are the same, don't act
        if (this._wasActive === isActive) {
          return;
        }

        // Activate the lockedOpen
        if (isActive) {
          // Set the lockedOpen status
          this.isLockedOpen = true;

          // Show the sidebar
          this._showSidebar();

          // Force the the opened status to true
          this.opened = true;

          // Emit the 'openedChanged' event
          this.openedChanged.emit(this.opened);

          // If the sidebar was folded, forcefully fold it again
          if (this._wasFolded) {
            // Enable the animations
            this._enableAnimations();

            // Fold
            this.folded = true;

            // Mark for check
            this._changeDetectorRef.markForCheck();
          }

          // Hide the backdrop if any exists
          this._hideBackdrop();
        }
        // De-Activate the lockedOpen
        else {
          // Set the lockedOpen status
          this.isLockedOpen = false;

          // Unfold the sidebar in case if it was folded
          this.unfold();

          // Force the the opened status to close
          this.opened = false;

          // Emit the 'openedChanged' event
          this.openedChanged.emit(this.opened);

          // Hide the sidebar
          this._hideSidebar();
        }

        // Store the new active status
        this._wasActive = isActive;
      });
  }

  private _setupFolded(): void {
    // Return, if sidebar is not folded
    if (!this.folded) {
      return;
    }

    // Return if the sidebar is closed
    if (!this.opened) {
      return;
    }

    // Programmatically add/remove padding to the element
    // that comes after or before based on the position
    let sibling, styleRule;

    const styleValue = this.foldedWidth + 'px';

    // Get the sibling and set the style rule
    if (this.position === 'left') {
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = 'padding-left';
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = 'padding-right';
    }

    // If there is no sibling, return...
    if (!sibling) {
      return;
    }

    // Fold the sidebar
    this.fold();

    // Set the folded width
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'width',
      styleValue
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'min-width',
      styleValue
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'max-width',
      styleValue
    );

    // Set the style and class
    this._renderer.setStyle(sibling, styleRule, styleValue);
    this._renderer.addClass(this._elementRef.nativeElement, 'folded');
  }

  private _showBackdrop(): void {
    // Create the backdrop element
    this._backdrop = this._renderer.createElement('div');

    // Add a class to the backdrop element
    this._backdrop.classList.add('atlp-sidebar-overlay');

    // Add a class depending on the invisibleOverlay option
    if (this.invisibleOverlay) {
      this._backdrop.classList.add('atlp-sidebar-overlay-invisible');
    }

    // Append the backdrop to the parent of the sidebar
    this._renderer.appendChild(
      this._elementRef.nativeElement.parentElement,
      this._backdrop
    );

    // Create the enter animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms ease', style({ opacity: 1 }))])
      .create(this._backdrop);

    // Play the animation
    this._player.play();

    // Add an event listener to the overlay
    this._backdrop.addEventListener('click', () => {
      this.close();
    });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  private _hideBackdrop(): void {
    if (!this._backdrop) {
      return;
    }

    // Create the leave animation and attach it to the player
    this._player = this._animationBuilder
      .build([animate('300ms ease', style({ opacity: 0 }))])
      .create(this._backdrop);

    // Play the animation
    this._player.play();

    // Once the animation is done...
    this._player.onDone(() => {
      // If the backdrop still exists...
      if (this._backdrop) {
        // Remove the backdrop
        this._backdrop.parentNode.removeChild(this._backdrop);
        this._backdrop = null;
      }
    });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  private _showSidebar(): void {
    // Remove the box-shadow style
    this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');

    // Make the sidebar invisible
    // this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');
    if (!this.isTemplate) {
      this._renderer.removeStyle(this._elementRef.nativeElement, 'display');
    }
    this.destroySideBar = true;
    // this._changeDetectorRef.detectChanges();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  private _hideSidebar(delay = true): void {
    const delayAmount = delay ? 300 : 0;

    // Add a delay so close animation can play
    setTimeout(() => {
      // Remove the box-shadow
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'box-shadow',
        'none'
      );

      // Make the sidebar invisible
      // this._renderer.setStyle(
      //   this._elementRef.nativeElement,
      //   'visibility',
      //   'hidden'
      // );
      if (!this.isTemplate) {
        this._renderer.setStyle(
          this._elementRef.nativeElement,
          'display',
          'none'
        );
      }
      this.destroySideBar = false;
      this._changeDetectorRef.detectChanges();
      // if (this.tplRef && this.isTemplate) {
      //   this.tplRef.elementRef.nativeElement.removeChild(this._elementRef);
      // }
    }, delayAmount);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  private _enableAnimations(): void {
    // Return if animations already enabled
    if (this._animationsEnabled) {
      return;
    }

    // Enable the animations
    this._animationsEnabled = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  private _upateTimeOpened(): number {
    return (this.timeOpened = new Date().getTime());
  }

  open(): void {
    this.currentLightMode = this.setInitialMode();
    if (this.opened || this.isLockedOpen) {
      return;
    }

    // Enable the animations
    this._enableAnimations();
    // Show the sidebar
    this._showSidebar();

    // Show the backdrop
    this._showBackdrop();

    // Set the opened status
    this.opened = true;

    // Emit the 'openedChanged' event
    this.openedChanged.emit(this.opened);

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Update timeOpened
    this._upateTimeOpened();

    // Refrash z-index for sidebars superimposed = true
    this._refrashIndex();

    this.addClassActiveSidbar();

    // Set the sidebar isopen status
    this._atlpSidebarService.changeSideBarOpenStatus(true);
  }

  close(): void {
    if (!this.opened || this.isLockedOpen) {
      return;
    }
    // remove class superimposed
    // The method must be called before the sidebar enters this.opened = false;
    this.removeClassSuperimposedSidbar();
    // Enable the animations
    this._enableAnimations();

    // Hide the backdrop
    this._hideBackdrop();

    // Set the opened status
    this.opened = false;

    // Emit the 'openedChanged' event
    this.openedChanged.emit(this.opened);

    // Hide the sidebar
    this._hideSidebar();

    // Mark for check
    this._changeDetectorRef.markForCheck();

    this._refrashIndex();
    // Remove z-index for sidebars superimposed = true
    this.removeIndex();

    // Set the sidebar isopen status
    if (this._atlpSidebarService.allOpenedSuperimposedSidebar.length < 1) {
      this._atlpSidebarService.changeSideBarOpenStatus(false);
    }
  }

  toggleOpen(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Only work if the auto trigger is enabled
    if (!this.foldedAutoTriggerOnHover) {
      return;
    }

    this.unfoldTemporarily();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // Only work if the auto trigger is enabled
    if (!this.foldedAutoTriggerOnHover) {
      return;
    }

    this.foldTemporarily();
  }

  fold(): void {
    // Only work if the sidebar is not folded
    if (this.folded) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Fold
    this.folded = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  unfold(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Unfold
    this.folded = false;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  toggleFold(): void {
    if (this.folded) {
      this.unfold();
    } else {
      this.fold();
    }
  }

  foldTemporarily(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Fold the sidebar back
    this.unfolded = false;

    // Set the folded width
    const styleValue = this.foldedWidth + 'px';

    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'width',
      styleValue
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'min-width',
      styleValue
    );
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'max-width',
      styleValue
    );

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  unfoldTemporarily(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Unfold the sidebar temporarily
    this.unfolded = true;

    // Remove the folded width
    this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
    this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
    this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Method to update z-index for sidebars with superimposed = true
   * Works when opening the sidebar (method open())
   */
  private _refrashIndex(): void {
    this._atlpSidebarService.refrashIndex();
  }

  setIndex(index): void {
    // if the sidebar is not overlay then we shouldn't remove the z-index
    if (!this.superimposed) {
      return;
    }
    // set style z-index
    this._backdrop.classList.add(`z-index-${index}`);
    this._renderer.setStyle(this._elementRef.nativeElement, 'z-index', index);
  }

  removeIndex(): void {
    // if the sidebar is not overlay then we shouldn't remove the z-index
    if (!this.superimposed) {
      return;
    }
    // remove style z-index
    this._renderer.removeStyle(this._elementRef.nativeElement, 'z-index');
  }

  addClassSuperimposedSidbar(index): void {
    this._renderer.addClass(
      this._elementRef.nativeElement,
      `${this._atlpConfig.superimposed.class}-${index}`
    );
  }

  addClassActiveSidbar(): void {
    this._renderer.addClass(this._elementRef.nativeElement, `active`);
  }

  removeClassSuperimposedSidbar(): void {
    this._atlpSidebarService.allOpenedSuperimposedSidebar.forEach(
      (item, index) => {
        this._renderer.removeClass(
          this._elementRef.nativeElement,
          `${this._atlpConfig.superimposed.class}-${index}`
        );
      }
    );
  }

  removeClassActiveSidbar(): void {
    this._renderer.removeClass(this._elementRef.nativeElement, `active`);
  }
}
