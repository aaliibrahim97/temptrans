import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyARecord } from 'dns';
import { BehaviorSubject } from 'rxjs';
import {
  AtlpCommonMessageDialog,
  AtlpCommonMessageDialogDefault,
} from '../models/common-message.model';

@Injectable({
  providedIn: 'root',
})
export class AtlpCommonDialogService {
  commonDialogMessage$ = new BehaviorSubject<AtlpCommonMessageDialog>(
    AtlpCommonMessageDialogDefault
  );

  constructor() {}

  commonDialogSetMessage(msgObj: AtlpCommonMessageDialog) {
    this.commonDialogMessage$.next(msgObj);
  }
}
