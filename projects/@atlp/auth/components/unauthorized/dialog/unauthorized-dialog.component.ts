import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-atlp-unauthorized-dialog',
  templateUrl: './unauthorized-dialog.component.html',
  styleUrls: ['./unauthorized-dialog.component.scss'],
})
export class AtlpUnauthorizedDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AtlpUnauthorizedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  toSsoPage(action: string): void {
    this.dialogRef.close(action);
  }

  ngOnInit(): void {}
}
