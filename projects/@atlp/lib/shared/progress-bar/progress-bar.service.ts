import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { concatMap, delay, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProgressBarService implements OnDestroy {
  isLoading$ = new Subject<boolean>();
  private _unsubscribeAll: Subject<any>;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
    //   from(this.isLoading$).pipe(
    //   delay(100000),
    //   takeUntil(of(this.isLoading$.next(false)))
    // );
    // of(this.isLoading$).pipe(
    //   delay(100000),
    //   takeUntil(of(this.isLoading$.next(false)))
    // );
    // from(this.isLoading$)
    //   .pipe(concatMap((item) => of(item).pipe(delay(1000))))
    //   .subscribe((timedItem) => {
    //     this.isLoading$.next(false);
    //   });

    // this.isLoading$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
    //   this.isLoading$.next(false);
    // });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
