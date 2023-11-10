import {
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout/breakpoints-observer';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BreakpointListener } from './breakpoint.model';

export class ColumnListenerByBreakpoints {
  columnsDisplay$ = new BehaviorSubject<string[]>([]);

  /**
   * ColumnListenerByBreakpoints
   * @param breakpointsListener - BreakpointListener
   * @param breakpointObserver - BreakpointObserver
   * @param allColumns - string[]
   * @param unsubscribe - need to unsubscribe from BreakPointObserver
   */
  constructor(
    breakpointsListener: BreakpointListener[],
    breakpointObserver: BreakpointObserver,
    allColumns: string[],
    unsubscribe: Subject<never>
  ) {
    breakpointObserver
      .observe(breakpointsListener.map(({ breakpoint }) => breakpoint))
      .pipe(takeUntil(unsubscribe))
      .subscribe(({ breakpoints }: BreakpointState) => {
        breakpointsListener.forEach(({ breakpoint, countSlice }) => {
          if (!breakpoints[`${breakpoint}`]) {
            return;
          }
          this.columnsDisplay$.next(
            countSlice ? allColumns.slice(0, countSlice) : allColumns
          );
        });
      });
  }
}

/**
 * Create column listener by breakpoints
 * @param breakpointsListener - type BreakpointListener[]
 * @param breakpointObserver - BreakpointObserver
 * @param allColumns - string[]
 * @param unsubscribe - need to unsubscribe from BreakPointObserver
 */
export function createColumnListenerByBreakpoints(
  breakpointsListener: BreakpointListener[],
  breakpointObserver: BreakpointObserver,
  allColumns: string[],
  unsubscribe: Subject<never>
): ColumnListenerByBreakpoints {
  return new ColumnListenerByBreakpoints(
    breakpointsListener,
    breakpointObserver,
    allColumns,
    unsubscribe
  );
}
