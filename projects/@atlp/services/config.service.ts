import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

// Create the injection token for the custom settings
export const ATLP_CONFIG = new InjectionToken('ATLPCustomConfig');

@Injectable({
  providedIn: 'root',
})
export class AtlpConfigService {
  // Private
  private _configSubject: BehaviorSubject<any>;
  private readonly _defaultConfig: any;
  public readonly _app: string;
  private messageSource = new BehaviorSubject('false');
  isRegisteredUser = this.messageSource.asObservable();

  constructor(
    private _platform: Platform,
    private _router: Router,
    @Inject(ATLP_CONFIG) private _config
  ) {
    // Set the default config from the user provided config (from forRoot)
    this._defaultConfig = _config;
    this._app =
      this._router && this._router.config && this._router.config.length > 0
        ? this._router.config[0].redirectTo
        : '';

    // this._app = (window.location && window.location.href && window.location.href.includes("iac/complementary-service")) ? this._app : '';
    // Initialize the service
    this._init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set and get the config
   */
  set config(value) {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this._configSubject.next(config);
  }

  get config(): any | Observable<any> {
    return this._configSubject.asObservable();
  }

  /**
   * Get default config
   *
   * @returns {any}
   */
  get defaultConfig(): any {
    return this._defaultConfig;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Initialize
   *
   * @private
   */
  private _init(): void {
    /**
     * Disable custom scrollbars if browser is mobile
     */
    if (this._platform.ANDROID || this._platform.IOS) {
      this._defaultConfig.customScrollbars = false;
    }

    // Set the config from the default config
    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this._router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(() => {
        if (
          !_.isEqual(
            this._configSubject.getValue().layout,
            this._defaultConfig.layout
          )
        ) {
          // Clone the current config
          const config = _.cloneDeep(this._configSubject.getValue());

          // Reset the layout from the default config
          config.layout = _.cloneDeep(this._defaultConfig.layout);

          // Set the config
          this._configSubject.next(config);
        }
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set config
   *
   * @param value
   * @param {{emitEvent: boolean}} opts
   */
  setConfig(value, opts = { emitEvent: true }): void {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this._configSubject.next(config);
    }
  }

  /**
   * Get config
   *
   * @returns {Observable<any>}
   */
  getConfig(): Observable<any> {
    return this._configSubject.asObservable();
  }

  /**
   * Reset to the default config
   */
  resetToDefaults(): void {
    // Set the config from the default config
    this._configSubject.next(_.cloneDeep(this._defaultConfig));
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
