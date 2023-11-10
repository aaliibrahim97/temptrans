import { Injectable } from '@angular/core';
import {
  componentMapper,
  DynamicComponentType,
} from '../models/dynamic-widget-types';
import { hasOwn } from '../utils/utility.functions';

@Injectable()
export class DynamicFormAssets {
  stylesheets?: string[] = [];
  scripts?: string[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class DynamicWidgetLibraryService {
  stylesheets: (HTMLStyleElement | HTMLLinkElement)[];
  scripts: HTMLScriptElement[];
  loadExternalAssets = true;
  dynamicFormAssets: Map<string, DynamicFormAssets> = null;

  widgetLibrary: any = componentMapper;
  defaultWidget = 'text';

  registeredWidgets: any = {};
  activeWidgets: any = {};

  constructor() {
    this.setActiveWidgets();
  }

  public setLoadExternalAssets(loadExternalAssets = true): void {
    this.loadExternalAssets = !!loadExternalAssets;
  }

  setActiveWidgets(): boolean {
    this.activeWidgets = Object.assign(
      {},
      this.widgetLibrary,
      this.registeredWidgets
    );
    return true;
  }

  setDefaultWidget(type: string): boolean {
    if (!this.hasWidget(type)) {
      return false;
    }
    this.defaultWidget = type;
    return true;
  }

  hasWidget(type: string, widgetSet = 'activeWidgets'): boolean {
    if (!type || typeof type !== 'string') {
      return false;
    }
    return hasOwn(this[widgetSet], type);
  }

  hasDefaultWidget(type: string): boolean {
    return this.hasWidget(type, 'widgetLibrary');
  }

  registerWidget(type: string, widget: any): boolean {
    if (!type || !widget || typeof type !== 'string') {
      return false;
    }
    this.registeredWidgets[type] = widget;
    return this.setActiveWidgets();
  }

  unRegisterWidget(type: string): boolean {
    if (!hasOwn(this.registeredWidgets, type)) {
      return false;
    }
    delete this.registeredWidgets[type];
    return this.setActiveWidgets();
  }

  unRegisterAllWidgets(unRegisterFrameworkWidgets = true): boolean {
    this.registeredWidgets = {};
    if (unRegisterFrameworkWidgets) {
    }
    return this.setActiveWidgets();
  }

  getWidget(type?: string, widgetSet = 'activeWidgets'): any {
    if (this.hasWidget(type, widgetSet)) {
      return this[widgetSet][type];
    } else if (this.hasWidget(this.defaultWidget, widgetSet)) {
      return this[widgetSet][this.defaultWidget];
    } else {
      return null;
    }
  }

  getAllWidgets(): any {
    return {
      widgetLibrary: this.widgetLibrary,
      registeredWidgets: this.registeredWidgets,
      activeWidgets: this.activeWidgets,
    };
  }

  registerFormAssests(
    type: string,
    dynamicFormAssets: Map<string, DynamicFormAssets>
  ): boolean {
    if (!type || !dynamicFormAssets || typeof type !== 'string') {
      return false;
    }
    this.registeredWidgets.set(type, dynamicFormAssets);
    return true;
  }

  unRegisterFormAssests(type: string): boolean {
    if (!hasOwn(this.dynamicFormAssets, type)) {
      return false;
    }
    this.dynamicFormAssets.delete(type);
    return true;
  }

  unRegisterAllFormAssests(): boolean {
    this.dynamicFormAssets = null;
    return true;
  }

  public getFromBuilderStylesheets(
    dynamicFormName: string,
    load: boolean = this.loadExternalAssets
  ): string[] {
    return (
      (load &&
        this.dynamicFormAssets &&
        this.dynamicFormAssets.has(dynamicFormName) &&
        this.dynamicFormAssets.get(dynamicFormName).stylesheets) ||
      []
    );
  }

  public getFromBuilderScripts(
    dynamicFormName: string,
    load: boolean = this.loadExternalAssets
  ): string[] {
    return (
      (load &&
        this.dynamicFormAssets &&
        this.dynamicFormAssets.has(dynamicFormName) &&
        this.dynamicFormAssets.get(dynamicFormName).scripts) ||
      []
    );
  }
}
