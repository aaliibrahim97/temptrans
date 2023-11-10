import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AtlpMatchMediaService {
  activeMediaQuery: string = '';
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _mediaObserver: MediaObserver) {
    this._init();
  }

  // private _init(): void {
  //   this._mediaObserver.media$
  //     .pipe(debounceTime(500), distinctUntilChanged())
  //     .subscribe((change: MediaChange) => {
  //       if (this.activeMediaQuery !== change.mqAlias) {
  //         this.activeMediaQuery = change.mqAlias;
  //         this.onMediaChange.next(change.mqAlias);
  //       }
  //     });
  // }

  private _init(): void {
    this._mediaObserver
      .asObservable()
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((change: MediaChange[]) => {
        if (this.activeMediaQuery !== change[0].mqAlias) {
          this.activeMediaQuery = change[0].mqAlias;
          this.onMediaChange.next(change[0].mqAlias);
        }
      });
  }
}
