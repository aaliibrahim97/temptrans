import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { AtlpNavigationItem } from 'projects/@atlp/types';

@Injectable({
  providedIn: 'root',
})
export class AtlpNavigationService {
  onItemCollapsed: Subject<any>;
  onItemCollapseToggled: Subject<any>;

  // Private
  private _onNavigationChanged: BehaviorSubject<any>;
  private _onNavigationRegistered: BehaviorSubject<any>;
  private _onNavigationUnregistered: BehaviorSubject<any>;
  private _onNavigationItemAdded: BehaviorSubject<any>;
  private _onNavigationItemUpdated: BehaviorSubject<any>;
  private _onNavigationItemRemoved: BehaviorSubject<any>;

  private _currentNavigationKey: string;
  private _registry: { [key: string]: any } = {};

  /**
   * Constructor
   */
  constructor() {
    // Set the defaults
    this.onItemCollapsed = new Subject();
    this.onItemCollapseToggled = new Subject();

    // Set the private defaults
    this._currentNavigationKey = null;
    this._onNavigationChanged = new BehaviorSubject(null);
    this._onNavigationRegistered = new BehaviorSubject(null);
    this._onNavigationUnregistered = new BehaviorSubject(null);
    this._onNavigationItemAdded = new BehaviorSubject(null);
    this._onNavigationItemUpdated = new BehaviorSubject(null);
    this._onNavigationItemRemoved = new BehaviorSubject(null);
  }

  get onNavigationChanged(): Observable<any> {
    return this._onNavigationChanged.asObservable();
  }

  get onNavigationRegistered(): Observable<any> {
    return this._onNavigationRegistered.asObservable();
  }

  get onNavigationUnregistered(): Observable<any> {
    return this._onNavigationUnregistered.asObservable();
  }

  get onNavigationItemAdded(): Observable<any> {
    return this._onNavigationItemAdded.asObservable();
  }

  get onNavigationItemUpdated(): Observable<any> {
    return this._onNavigationItemUpdated.asObservable();
  }

  get onNavigationItemRemoved(): Observable<any> {
    return this._onNavigationItemRemoved.asObservable();
  }

  register(key, navigation): void {
    // Check if the key already being used
    if (this._registry[key]) {
      console.error(
        `The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`
      );

      return;
    }

    // Add to the registry
    this._registry[key] = navigation;

    // Notify the subject
    this._onNavigationRegistered.next([key, navigation]);
  }

  unregister(key): void {
    // Check if the navigation exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );
    }

    // Unregister the sidebar
    delete this._registry[key];

    // Notify the subject
    this._onNavigationUnregistered.next(key);
  }

  getNavigation(key): any {
    // Check if the navigation exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );

      return;
    }

    // Return the sidebar
    return this._registry[key];
  }

  getFlatNavigation(
    navigation,
    flatNavigation: AtlpNavigationItem[] = []
  ): any {
    for (const item of navigation) {
      if (item.type === 'item') {
        flatNavigation.push(item);

        continue;
      }

      if (item.type === 'collapsable' || item.type === 'group') {
        if (item.list) {
          this.getFlatNavigation(item.list, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  getCurrentNavigation(): any {
    if (!this._currentNavigationKey) {
      console.warn(`The current navigation is not set.`);

      return;
    }

    return this.getNavigation(this._currentNavigationKey);
  }

  setCurrentNavigation(key): void {
    // Check if the sidebar exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );

      return;
    }

    // Set the current navigation key
    this._currentNavigationKey = key;

    // Notify the subject
    this._onNavigationChanged.next(key);
  }

  getNavigationItem(id, navigation = null): any | boolean {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
    }
    if (navigation) {
      for (const item of navigation) {
        if (Array.isArray(item.matchUrl) && item.matchUrl.includes(id)) {
          return item;
        } else if (item.url == id || `/${item.url}` == id) {
          return item;
        }

        if (item.list) {
          const childItem = this.getNavigationItem(id, item.list);

          if (childItem) {
            return childItem;
          }
        }
        if (item.content) {
          const childItemContent = this.getNavigationItem(id, item.content);

          if (childItemContent) {
            return childItemContent;
          }
        }
        if (item.menuContentList) {
          const childItemMenuContentList = this.getNavigationItem(
            id,
            item.menuContentList
          );

          if (childItemMenuContentList) {
            return childItemMenuContentList;
          }
          // for (const grandContent of item.menuContentList) {
          //   const grandChild = this.getNavigationItem(
          //     id,
          //     grandContent.contentList
          //   );
          //   if (grandChild) {
          //     return grandChild;
          //   }
          // }
        }
      }
    }
    return false;
  }

  getNavigationItemParent(id, navigation = null, parent = null): any {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
      parent = navigation;
    }

    for (const item of navigation) {
      if (item.url === id) {
        return parent;
      }

      if (item.list) {
        const childItem = this.getNavigationItemParent(id, item.list, item);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  addNavigationItem(item, id): void {
    // Get the current navigation
    const navigation: any[] = this.getCurrentNavigation();

    // Add to the end of the navigation
    if (id === 'end') {
      navigation.push(item);

      // Trigger the observable
      this._onNavigationItemAdded.next(true);

      return;
    }

    // Add to the start of the navigation
    if (id === 'start') {
      navigation.unshift(item);

      // Trigger the observable
      this._onNavigationItemAdded.next(true);

      return;
    }

    // Add it to a specific location
    const parent: any = this.getNavigationItem(id);

    if (parent) {
      // Check if parent has a children entry,
      // and add it if it doesn't
      if (!parent.list) {
        parent.list = [];
      }

      // Add the item
      parent.list.push(item);
    }

    // Trigger the observable
    this._onNavigationItemAdded.next(true);
  }

  updateNavigationItem(id, properties): void {
    // Get the navigation item
    const navigationItem = this.getNavigationItem(id);

    // If there is no navigation with the give id, return
    if (!navigationItem) {
      return;
    }

    // Merge the navigation properties
    _.merge(navigationItem, properties);

    // Trigger the observable
    this._onNavigationItemUpdated.next(true);
  }

  removeNavigationItem(id): void {
    const item = this.getNavigationItem(id);

    // Return, if there is not such an item
    if (!item) {
      return;
    }

    // Get the parent of the item
    let parent = this.getNavigationItemParent(id);

    // This check is required because of the first level
    // of the navigation, since the first level is not
    // inside the 'children' array
    parent = parent.list || parent;

    // Remove the item
    parent.splice(parent.indexOf(item), 1);

    // Trigger the observable
    this._onNavigationItemRemoved.next(true);
  }
}
