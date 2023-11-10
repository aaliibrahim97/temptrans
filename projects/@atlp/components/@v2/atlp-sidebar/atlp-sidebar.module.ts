import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AtlpSidebarV2Component } from './atlp-sidebar.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [AtlpSidebarV2Component],
  exports: [AtlpSidebarV2Component],
})
export class AtlpSidebarV2Module {}
