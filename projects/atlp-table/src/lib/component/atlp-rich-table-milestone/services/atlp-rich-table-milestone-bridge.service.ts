import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AtlpRichTableMilestoneActionPortalTemplateType } from '../models/atlp-rich-table-milestone-action.models';
import { AtlpGraphResponseModel } from '../models/atlp-rich-table-milestone-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AtlpMileStoneBridgePortalService {
  private atlpRichTableMileStoneActionPortal =
    new BehaviorSubject<AtlpRichTableMilestoneActionPortalTemplateType>(null);

  readonly atlpRichTableMileStoneActionPortal$ =
    this.atlpRichTableMileStoneActionPortal.asObservable();

  public atlpMileStoneActionPortalData$ =
    new BehaviorSubject<any>(null);

  public dialogRef: MatDialogRef<any> = null;

  constructor() {}

  dialogRefClose() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  setAtlpRichTableMileStoneActionPortal(
    atlpRichTableMileStoneActionPortal: AtlpRichTableMilestoneActionPortalTemplateType
  ) {
    this.atlpRichTableMileStoneActionPortal.next(
      atlpRichTableMileStoneActionPortal
    );
  }
}
