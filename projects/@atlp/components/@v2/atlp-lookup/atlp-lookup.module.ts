import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { RouterModule } from '@angular/router';
import { AtlpInputLookUpComponent } from './components/atlp-input-lookup/atlp-input-lookup.component';
import { AtlpMatPaginationModule } from '../atlp-pagination-components/atlp-mat-pagination/atlp-mat-pagination.module';
import { AtlpLookupSliderComponent } from './components/atlp-lookup-slider/atlp-lookup-slider.component';
import { AtlpCheckColumnVisibility } from './pipes/atlp-lookup-coloumn-visible.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtlpNoTotalCountPaginationModule } from '../atlp-pagination-components/atlp-pagination-no-total-count/atlp-no-total-count-pagination.module';
import { AtlpLookUpEmptyTableComponent } from './components/atlp-empty-table/atlp-lookup-empty-table.component';
import { AtlpOnlyNumberDirective } from 'projects/@atlp/directives/@v2/onlynumber.directive';
import { AtlpSidebarV2Module } from '../atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [
    AtlpLookUpEmptyTableComponent,
    AtlpLookupSliderComponent,
    AtlpInputLookUpComponent,
    AtlpCheckColumnVisibility,
    AtlpOnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    AtlpSharedModule,
    AtlpSidebarV2Module,
    AtlpCoreSharedModule,
    AtlpMatPaginationModule,
    AtlpNoTotalCountPaginationModule,
    MatTooltipModule,
  ],
  exports: [
    RouterModule,
    AtlpLookUpEmptyTableComponent,
    AtlpLookupSliderComponent,
    AtlpInputLookUpComponent,
    AtlpMatPaginationModule,
    AtlpNoTotalCountPaginationModule,
    AtlpCheckColumnVisibility,
  ],
})
export class AtlpLookUpModule {}
