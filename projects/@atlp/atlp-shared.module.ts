import { AtlpGraphSelectionModule } from './components/atlp-graph-selection/atlp-graph-selection.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtlpDirectivesModule } from 'projects/@atlp/directives/directives';
import { AtlpPipesModule } from 'projects/@atlp/pipes/pipes.module';

import {
  FieldNumberModule,
  FileModule,
  HeaderUserModule,
  FiltersModule,
  AtlpSidebarModule,
  EmptyTableModule,
  AtlpProgressBarModule,
  StepperModule,
  AtlpSearchBarModule,
} from './components';
import { AtlpEnvServiceProvider } from './environments/env.service.provider';
import { AvatarsModule } from './lib/atlp-layout/components/header/avatars/avatars.module';
import { AtlpFiltersModule } from './components/atlp-filters/atlp-filters.module';
import { AtlpTableModule } from './components/table/table.module';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSnakBarModule } from './components/snak-bars/snak-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AtlpDirectivesModule,
    AtlpPipesModule,
    AtlpSidebarModule,
    AvatarsModule,
    FiltersModule,
    FieldNumberModule,
    FileModule,
    HeaderUserModule,
    EmptyTableModule,
    StepperModule,
    AtlpProgressBarModule,
    AtlpSearchBarModule,
    AtlpFiltersModule,
    FormsModule,
    ReactiveFormsModule,
    AtlpTableModule,
    AtlpSnakBarModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    AtlpDirectivesModule,
    AtlpPipesModule,
    AtlpSidebarModule,
    AvatarsModule,
    FiltersModule,
    FieldNumberModule,
    FileModule,
    HeaderUserModule,
    EmptyTableModule,
    StepperModule,
    AtlpProgressBarModule,
    AtlpSearchBarModule,
    AtlpFiltersModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AtlpGraphSelectionModule,
    AtlpTableModule,
    AtlpSnakBarModule,
  ],
  providers: [
    AtlpEnvServiceProvider,
  ],
})
export class AtlpSharedModule {}
