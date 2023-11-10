import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { AtlpRichTableMilestoneActionPortalTemplateType } from '../../atlp-rich-table-milestone/models/atlp-rich-table-milestone-action.models';
import { AtlpMileStoneBridgePortalService } from '../../atlp-rich-table-milestone/services/atlp-rich-table-milestone-bridge.service';

@UntilDestroy()
@Component({
  selector: 'atlp-rich-classic-table-control-button-dialog',
  templateUrl: './atlp-rich-classic-table-control-button-dialog.component.html',
  styleUrls: ['./atlp-rich-classic-table-control-button-dialog.component.scss'],
})
export class AtlpRichClassicControlButtonDialogComponent implements OnInit {
  onActionClick = new EventEmitter<string>();
  importRequestData: any;
  atlpRichTableMilestoneActionPortalTemplateType$: Observable<AtlpRichTableMilestoneActionPortalTemplateType>;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AtlpRichClassicControlButtonDialogComponent>,
    private atlpMileStoneBridgePortalService: AtlpMileStoneBridgePortalService
  ) {}

  ngOnInit(): void {
    this.atlpMileStoneBridgePortalService.dialogRef = this.dialogRef;
    this.atlpRichTableMilestoneActionPortalTemplateType$ =
      this.atlpMileStoneBridgePortalService.atlpRichTableMileStoneActionPortal$;
  }

  closeDialog(): void {
    this.atlpMileStoneBridgePortalService.dialogRef = null;
    this.dialogRef.close();
  }
}
