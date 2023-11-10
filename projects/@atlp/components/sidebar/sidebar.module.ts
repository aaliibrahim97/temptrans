import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AtlpSidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [AtlpSidebarComponent],
  exports: [AtlpSidebarComponent],
})
export class AtlpSidebarModule {}
