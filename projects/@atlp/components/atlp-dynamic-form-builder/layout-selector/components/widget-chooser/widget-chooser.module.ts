import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpDynamicFormBuilderModule } from '../../../dynamic-form-builder.module';
import { DefaultWidgetSelectorRegistry } from '../../services/default-widget-selector-registry.service';
import { DynamicErrorHandlerService } from '../../services/dynaic-error-handler.service';
import { DynamicProgressBarService } from '../../services/dynamic-progressbar.service';
import { WidgetSelectorRegistry } from '../../services/widget-selector-registry.service';
import { WidgetSelectorTerminatorService } from '../../services/widget-terminator.service';
import { DynamicExpansionPanelModule } from '../expansion-panel-widget/expansion-panel.module';
import { DynamicFieldsetModule } from '../fieldset-widget/fieldset-widget.module';
import { DynamicStepperWidgetModule } from '../stepper-widget/stepper-widget.module';
import { DynamicTabWidgetModule } from '../tab-widget/tab-widget.module';
import { DynamicWidgetChooserComponent } from './components/widget-chooser.component';

const importExportModules = [
  DynamicTabWidgetModule,
  DynamicStepperWidgetModule,
  DynamicFieldsetModule,
  DynamicExpansionPanelModule,
];

@NgModule({
  declarations: [DynamicWidgetChooserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    TranslateModule,
    AtlpDynamicFormBuilderModule,
    ...importExportModules,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    AtlpDynamicFormBuilderModule,
    DynamicWidgetChooserComponent,
    ...importExportModules,
  ],
  entryComponents: [],
  providers: [
    {
      provide: WidgetSelectorRegistry,
      useClass: DefaultWidgetSelectorRegistry,
    },
    WidgetSelectorTerminatorService,
    DynamicProgressBarService,
    DynamicErrorHandlerService,
  ],
})
export class DynamicWidgetChooserModule {}
