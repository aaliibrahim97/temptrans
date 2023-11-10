import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormFieldDirective } from './directives/dynamic-form-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicButtonFieldComponent } from './form-fields/dynamic-button-field/dynamic-button-field.component';
import { DynamicCheckboxFieldComponent } from './form-fields/dynamic-checkbox-field/dynamic-checkbox-field.component';
import { DynamicDateFieldComponent } from './form-fields/dynamic-date-field/dynamic-date-field.component';
import { DynamicTimeFieldComponent } from './form-fields/dynamic-time-field/dynamic-time-field.component';
import { DynamicInputFieldComponent } from './form-fields/dynamic-input-field/dynamic-input-field.component';
import { DynamicRadiobuttonFieldComponent } from './form-fields/dynamic-radiobutton-field/dynamic-radiobutton-field.component';
import { DynamicSelectFieldComponent } from './form-fields/dynamic-select-field/dynamic-select-field.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { DynamicAutoCompleteFieldComponent } from './form-fields/dynamic-auto-complete-field/dynamic-auto-complete-field.component';
import { DynamicInputLookupFieldComponent } from './form-fields/dynamic-input-lookup-field/dynamic-input-lookup-field.component';
import { DynamicTextareaFieldComponent } from './form-fields/dynamic-textarea-field/dynamic-textarea-field.component';
import { AtlpMatAutocompleteModule } from '../@v2/atlp-input-autocomplete/atlp-input-autocomplete.module';
import { AtlpLookUpModule } from '../@v2/atlp-lookup/atlp-lookup.module';
import { DynamicInputNumberFieldComponent } from './form-fields/dynamic-input-number-field/dynamic-input-number-field.component';
import { DynamicHiddenComponent } from './form-fields/dynamic-hidden.component';
import { DynamicMessageComponent } from './form-fields/dynamic-message.component';
import { DynamicNoneComponent } from './form-fields/dynamic-none.component';
import { DynamicCmpFieldComponent } from './form-fields/dynamic-component-field/dynamic-component-field.component';
import { DynamicTemplateFieldComponent } from './form-fields/dynamic-template-field/dynamic-template-field.component';
import { DynamicClassSelector } from './pipes/dynamic-form-class-selector.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { DisableControlDirective } from './directives/disable-control.directive';
import {
  DynamicLogService,
  DynamicDefaultLogService,
} from './services/dynamic-log.service';
import { DefaultWidgetSelectorRegistry } from './layout-selector/services/default-widget-selector-registry.service';
import { WidgetSelectorRegistry } from './layout-selector/services/widget-selector-registry.service';
import { DynamicComponentInstanceBuilderModule } from './dynamic-component-instance-builder';
import { DynamicComCreatorComponent } from './dynamic-com-creator/dynamic-com-creator.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMaskModule } from 'ngx-mask';
import { DynamicHapinessFieldComponent } from './form-fields/dynamic-hapiness-field/dynamic-hapiness-field.component';
import { DynamicStarRatingFieldComponent } from './form-fields/dynamic-star-field/dynamic-star-rating-field.component';
import { DynamicSnakbarFeedbackComponent } from './form-fields/dynamic-hapiness-field/helpers/dynamic-snakbar-feedback.component';
import { DynamicCarouselComponent } from './form-fields/dynamic-hapiness-field/helpers/dynamic-carousel/dynamic-carousel.component';
import { AtlpStarRatingModule } from '../@v2/atlp-star-rating/atlp-star-rating.module';
import { DynamicDateRangeFieldComponent } from './form-fields/dynamic-date-range-field/dynamic-date-range-field.component';
import { DynamicFileDropFieldComponent } from './form-fields/dynamic-file-drop-field/dynamic-file-drop-field.component';
import { DynamicFileUploadButtonFieldComponent } from './form-fields/dynamic-file-upload-button-field/dynamic-file-upload-button-field.component';
import { AtlpFileUploadButtonModule } from '../@v2/file-upload/atlp-file-upload-button/atlp-file-upload-button.module';
import { AtlpFileDropModule } from '../@v2/file-upload/atlp-file-drop/atlp-file-drop.module';

const dynamicComponents = [
  DynamicInputFieldComponent,
  DynamicButtonFieldComponent,
  DynamicSelectFieldComponent,
  DynamicDateFieldComponent,
  DynamicRadiobuttonFieldComponent,
  DynamicCheckboxFieldComponent,
  DynamicFormFieldDirective,
  DisableControlDirective,
  DynamicFormComponent,
  DynamicAutoCompleteFieldComponent,
  DynamicInputLookupFieldComponent,
  DynamicTextareaFieldComponent,
  DynamicInputNumberFieldComponent,
  DynamicCmpFieldComponent,
  DynamicNoneComponent,
  DynamicHiddenComponent,
  DynamicMessageComponent,
  DynamicTemplateFieldComponent,
  DynamicComCreatorComponent,
  DynamicTimeFieldComponent,
  DynamicHapinessFieldComponent,
  DynamicStarRatingFieldComponent,
  DynamicSnakbarFeedbackComponent,
  DynamicCarouselComponent,
  DynamicDateRangeFieldComponent,
  DynamicFileUploadButtonFieldComponent,
  DynamicFileDropFieldComponent,
];

@NgModule({
  declarations: [...dynamicComponents, DynamicClassSelector],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    AtlpSharedModule,
    FlexLayoutModule,
    AtlpCoreSharedModule,
    AtlpMatAutocompleteModule,
    AtlpLookUpModule,
    TranslateModule.forChild(),
    DynamicComponentInstanceBuilderModule,
    NgxMaterialTimepickerModule,
    AtlpStarRatingModule,
    NgxMaskModule.forRoot(),
    AtlpFileUploadButtonModule,
    AtlpFileDropModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    NgxMaskModule,
    AtlpFileUploadButtonModule,
    AtlpFileDropModule,
    ...dynamicComponents,
  ],
  entryComponents: [...dynamicComponents],
  providers: [
    {
      provide: DynamicLogService,
      useClass: DynamicDefaultLogService,
    },
    {
      provide: WidgetSelectorRegistry,
      useClass: DefaultWidgetSelectorRegistry,
    },
  ],
})
export class AtlpDynamicFormBuilderModule {}
