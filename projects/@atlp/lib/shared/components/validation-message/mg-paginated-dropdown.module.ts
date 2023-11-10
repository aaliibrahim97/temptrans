import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedDropdownComponent } from './paginated-dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [PaginatedDropdownComponent],
  imports: [CommonModule, FormsModule, MatSelectModule, ScrollingModule],
  exports: [PaginatedDropdownComponent, CdkVirtualScrollViewport],
})
export class ValidationMessageModule {}
