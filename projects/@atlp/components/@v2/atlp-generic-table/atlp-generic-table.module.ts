import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtlpGenericTableComponent } from './atlp-generic-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AtlpGenericTableInlineFilter } from './shared/inline-filter/atlp-generic-table-inline-filter.component';
import { PortalModule } from '@angular/cdk/portal';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpMatPaginationModule } from '../atlp-pagination-components/atlp-mat-pagination/atlp-mat-pagination.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AtlpSearchBarModule } from '../../search-bar/search-bar.module';

@NgModule({
  declarations: [AtlpGenericTableComponent, AtlpGenericTableInlineFilter],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    CdkTableModule,
    DragDropModule,
    PortalModule,
    TranslateModule,
    AtlpMatPaginationModule,
    MatProgressBarModule,
    AtlpSearchBarModule,
  ],
  exports: [AtlpGenericTableComponent, AtlpGenericTableInlineFilter],
  entryComponents: [AtlpGenericTableInlineFilter],
})
export class AtlpGenericTableModule {}
