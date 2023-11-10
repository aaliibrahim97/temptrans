import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AtlpTransTableActionPortalTemplateType } from '../models/atlp-milestone-models';
import { AtlpTransAnimationMetaDataModel } from '../models/atlp-transaction-milestone-table-action-meta-data.model';

@Injectable({
  providedIn: 'root',
})
export class AtlpTransTableActionPortalBridgeService {
  private activeAtlpTransAnimationPortal =
    new BehaviorSubject<AtlpTransTableActionPortalTemplateType>(null);

  readonly AtlpTransAnimationPortalPortal$ =
    this.activeAtlpTransAnimationPortal.asObservable();

  public currentTransactionData$ =
    new BehaviorSubject<AtlpTransAnimationMetaDataModel>(null);

  public dialogRef: MatDialogRef<any> = null;

  constructor() {}

  dialogRefClose() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  setAtlpTransAnimationPortal(
    atlpTransAnimationPortalPortal: AtlpTransTableActionPortalTemplateType
  ) {
    this.activeAtlpTransAnimationPortal.next(atlpTransAnimationPortalPortal);
  }
}
