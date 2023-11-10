import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { ISnakBarModelData, SnakBarInfoType } from '../models/snak-bar.models';

@UntilDestroy()
@Component({
  selector: 'app-custom-snak-bar',
  templateUrl: './custom-snak-bar.component.html',
  styleUrls: ['./custom-snak-bar.component.scss'],
})
export class AtlpCustomSnakBarComponent implements OnInit {
  public snakBarInfoType = SnakBarInfoType;
  constructor(
    public snackBarRef: MatSnackBarRef<AtlpCustomSnakBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public snakBarModelData: ISnakBarModelData,
    private _iconsService: IconsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.snakBarModelData.duration = 1500;
  }

  private get icons(): Array<string> {
    return [
      'messages-exclamation',
      'success-icon',
      'error-icon',
      'error-circle',
      'info-icon',
    ];
  }
}
