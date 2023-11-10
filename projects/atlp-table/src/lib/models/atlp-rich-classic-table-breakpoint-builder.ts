import {
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout/breakpoints-observer';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtlpRichClassicTableBreakpointListener } from './atlp-rich-classic-table-breakpoint.model';

export class AtlpRichClassicTableColumnListenerByBreakpoints {
  columnsDisplay$ = new BehaviorSubject<string[]>([]);

  constructor(
    breakpointsListener: AtlpRichClassicTableBreakpointListener[],
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
export function atlpRichClassicTableCreateColumnListenerByBreakpoints(
  breakpointsListener: AtlpRichClassicTableBreakpointListener[],
  breakpointObserver: BreakpointObserver,
  allColumns: string[],
  unsubscribe: Subject<never>
): AtlpRichClassicTableColumnListenerByBreakpoints {
  return new AtlpRichClassicTableColumnListenerByBreakpoints(
    breakpointsListener,
    breakpointObserver,
    allColumns,
    unsubscribe
  );
}
