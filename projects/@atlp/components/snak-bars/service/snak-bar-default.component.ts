import { Component, Injectable, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AtlpCustomSnakBarComponent } from '../custom-snak-bar/custom-snak-bar.component';
import {
  ISnakBarModelData,
  SnakBarHorizontalPosition,
  SnakBarInfoType,
  SnakBarModelDefaultErrorData,
  SnakBarModelDefaultInfoData,
  SnakBarModelDefaultSuccessData,
  SnakBarModelDefaultWarningData,
  SnakBarVerticalPosition,
} from '../models/snak-bar.models';
import * as _ from 'lodash';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Injectable({
  providedIn: 'root',
})
export class SnakBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  defaultDuration: number = 15000;
  selectedLanguage: string = 'en';

  constructor(
    public snackBar: MatSnackBar,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang?.toLowerCase();
      if (this.selectedLanguage === 'en') {
        this.horizontalPosition = SnakBarHorizontalPosition.right;
      } else {
        this.horizontalPosition = SnakBarHorizontalPosition.left;
      }
    });
  }

  successWithOptions(
    snakBarModelData: ISnakBarModelData = SnakBarModelDefaultSuccessData
  ) {
    snakBarModelData = _.merge(
      {},
      SnakBarModelDefaultSuccessData,
      snakBarModelData
    );
    let { snakBarHorizontalPosition, snakBarVerticalPosition } =
      this.changeDirectionBasedOnLang(snakBarModelData);
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['success-snackbar'],
      duration: snakBarModelData.duration
        ? snakBarModelData.duration
        : this.defaultDuration,
      horizontalPosition: snakBarHorizontalPosition,
      verticalPosition: snakBarVerticalPosition,
    });
  }

  errorWithOptions(
    snakBarModelData: ISnakBarModelData = SnakBarModelDefaultErrorData
  ) {
    snakBarModelData = _.merge(
      {},
      SnakBarModelDefaultErrorData,
      snakBarModelData
    );
    let { snakBarHorizontalPosition, snakBarVerticalPosition } =
      this.changeDirectionBasedOnLang(snakBarModelData);
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['error-snackbar'],
      duration: snakBarModelData.duration
        ? snakBarModelData.duration
        : this.defaultDuration,
      horizontalPosition: snakBarHorizontalPosition,
      verticalPosition: snakBarVerticalPosition,
    });
  }

  private changeDirectionBasedOnLang(snakBarModelData: ISnakBarModelData) {
    let snakBarHorizontalPosition = snakBarModelData.snakBarHorizontalPosition
      ? snakBarModelData.snakBarHorizontalPosition
      : this.horizontalPosition;
    let snakBarVerticalPosition = snakBarModelData.snakBarVerticalPosition
      ? snakBarModelData.snakBarVerticalPosition
      : this.verticalPosition;

    if (this.selectedLanguage == 'ae') {
      if (snakBarHorizontalPosition === SnakBarHorizontalPosition.left) {
        snakBarHorizontalPosition = SnakBarHorizontalPosition.right;
      } else if (
        snakBarHorizontalPosition === SnakBarHorizontalPosition.right
      ) {
        snakBarHorizontalPosition = SnakBarHorizontalPosition.left;
      }
    }
    return { snakBarHorizontalPosition, snakBarVerticalPosition };
  }

  warningWithOptions(
    snakBarModelData: ISnakBarModelData = SnakBarModelDefaultWarningData
  ) {
    snakBarModelData = _.merge(
      {},
      SnakBarModelDefaultWarningData,
      snakBarModelData
    );
    let { snakBarHorizontalPosition, snakBarVerticalPosition } =
      this.changeDirectionBasedOnLang(snakBarModelData);
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['warning-snackbar'],
      duration: snakBarModelData.duration
        ? snakBarModelData.duration
        : this.defaultDuration,
      horizontalPosition: snakBarHorizontalPosition,
      verticalPosition: snakBarVerticalPosition,
    });
  }

  infoWithOptions(
    snakBarModelData: ISnakBarModelData = SnakBarModelDefaultWarningData
  ) {
    snakBarModelData = _.merge(
      {},
      SnakBarModelDefaultWarningData,
      snakBarModelData
    );
    let { snakBarHorizontalPosition, snakBarVerticalPosition } =
      this.changeDirectionBasedOnLang(snakBarModelData);
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['warning-snackbar'],
      duration: snakBarModelData.duration
        ? snakBarModelData.duration
        : this.defaultDuration,
      horizontalPosition: snakBarHorizontalPosition,
      verticalPosition: snakBarVerticalPosition,
    });
  }

  success(message: string, subMsg?: string) {
    const snakBarModelData = SnakBarModelDefaultSuccessData;
    snakBarModelData.message = message;
    snakBarModelData.subMessage = subMsg;
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['success-snackbar'],
      duration: this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string, subMsg?: string) {
    const snakBarModelData = SnakBarModelDefaultErrorData;
    snakBarModelData.message = message;
    snakBarModelData.subMessage = subMsg;
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['error-snackbar'],
      duration: this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  warning(message: string, subMsg?: string) {
    const snakBarModelData = SnakBarModelDefaultWarningData;
    snakBarModelData.message = message;
    snakBarModelData.subMessage = subMsg;
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['warning-snackbar'],
      duration: this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  info(message: string, subMsg?: string) {
    const snakBarModelData = SnakBarModelDefaultInfoData;
    snakBarModelData.message = message;
    snakBarModelData.subMessage = subMsg;
    this.snackBar.openFromComponent(AtlpCustomSnakBarComponent, {
      data: snakBarModelData,
      panelClass: ['info-snackbar'],
      duration: this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
