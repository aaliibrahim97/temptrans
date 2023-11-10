import { Injectable, OnDestroy } from '@angular/core';
import { ProgressBarCalc } from 'projects/@atlp/utils/progress-bar-calc';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class DynamicProgressBarService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private _unsubscribeAll: Subject<any>;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  setProgressForaccordion($this, progressName, formGroupName) {
    $this[progressName] = $this[formGroupName].valid
      ? 100
      : Math.round(ProgressBarCalc.getCalculation($this[formGroupName]));
  }

  setTopLevelProgress($this, progressBarsList: string[]) {
    let totalProgress = 0;
    const totalAccordions = progressBarsList.length;
    progressBarsList.forEach((progressName) => {
      totalProgress += $this[progressName];
    });
    totalProgress = Math.round(totalProgress / totalAccordions);
    $this.topLevelProgress = totalProgress;
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
