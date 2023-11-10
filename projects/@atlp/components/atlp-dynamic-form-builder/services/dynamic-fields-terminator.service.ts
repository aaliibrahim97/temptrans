import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicFieldsSelectorTerminatorService {
  public onDestroy: Subject<boolean>;

  constructor() {
    this.onDestroy = new Subject();
  }

  destroy() {
    this.onDestroy.next(true);
  }
}
