import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AtlpSidebarModule } from '../sidebar/sidebar.module';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpSearchBarModule } from '../search-bar/search-bar.module';
import { StepperModule } from '../stepper/stepper.module';
import { KeyValueColumnModule } from '../key-value-column/key-value-column.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { MatBadgeModule } from '@angular/material/badge';




@NgModule({
  declarations: [
    QuestionnaireComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    AtlpSidebarModule,
    AtlpSharedModule,
    AtlpSearchBarModule,
    StepperModule,
    KeyValueColumnModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AtlpCoreSharedModule,
    CoreModule,
    MatBadgeModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[QuestionnaireComponent]
})
export class QuestionnaireModule { }
