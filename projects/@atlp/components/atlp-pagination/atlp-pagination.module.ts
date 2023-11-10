import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpPaginationComponent } from './components/atlp-pagination.component';
import { AtlpForNumbersMinMaxDirective } from 'projects/@atlp/directives/atlp-number-min-max/atlp-number-min-max.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AtlpPaginationComponent, AtlpForNumbersMinMaxDirective],
  imports: [
    CommonModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    MatTooltipModule,
  ],
  exports: [AtlpPaginationComponent, AtlpForNumbersMinMaxDirective],
})
export class AtlpPaginationModule {}
