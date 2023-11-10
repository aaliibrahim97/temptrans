import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  VoyageCardComponent,
  VoyageInfoComponent,
  VoyageStatusComponent,
} from './components';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    VoyageCardComponent,
    VoyageInfoComponent,
    VoyageStatusComponent,
  ],
  imports: [CommonModule, MatTableModule, MatIconModule, FlexLayoutModule],
  exports: [VoyageCardComponent, VoyageInfoComponent, VoyageStatusComponent],
})
export class VoyageModule {}
