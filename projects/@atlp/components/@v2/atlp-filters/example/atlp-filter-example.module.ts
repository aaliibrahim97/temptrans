import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { HeaderModule } from 'projects/@atlp/lib/atlp-layout/components/header/header.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpFiltersV2Module } from '../atlp-filters.module';
import { AtlpExampleFilterExampleComponent } from './components/atlp-filter-example.component';
import { AtlpFilterExampleRoutingModule } from './atlp-filter-example-routing.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AtlpContentFilterComponent } from './components/filter-content/atlp-filter-example-content.component';

@NgModule({
  declarations: [AtlpExampleFilterExampleComponent, AtlpContentFilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    HeaderModule,
    HttpClientModule,
    AtlpFilterExampleRoutingModule,
    AtlpFiltersV2Module,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [],
  providers: [],
})
export class AtlpFilterExampleModule {}
