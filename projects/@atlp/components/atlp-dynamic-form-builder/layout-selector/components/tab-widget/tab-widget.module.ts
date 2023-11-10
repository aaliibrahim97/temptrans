import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpDynamicFormBuilderModule } from '../../../dynamic-form-builder.module';
import { DynamicTabWidgetComponent } from './components/tab-widget.component';

@NgModule({
  declarations: [DynamicTabWidgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    TranslateModule,
    AtlpDynamicFormBuilderModule,
  ],
  exports: [
    DynamicTabWidgetComponent,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    AtlpDynamicFormBuilderModule,
  ],
})
export class DynamicTabWidgetModule {}
