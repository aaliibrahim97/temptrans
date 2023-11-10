import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchCompanyComponent } from './switch-company.component';
import { CompanySelectionComponent } from './company-selection/company-selection.component';
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
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [SwitchCompanyComponent, CompanySelectionComponent],
  imports: [
    CommonModule,
    CommonModule,
    TranslateModule,
    MatIconModule,
    AtlpSidebarV2Module,
    AtlpSharedModule,
    AtlpSearchBarModule,
    StepperModule,
    KeyValueColumnModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    // MatRadioGroup,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AtlpCoreSharedModule,
    CoreModule,
  ],
  exports: [SwitchCompanyComponent, CompanySelectionComponent],
})
export class SwitchCompanyModule {}
