import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { UiKitComponent } from './ui-kit.component';

import {
  ButtonsComponent,
  TablesComponent,
  FieldsComponent,
  DropdownComponent,
  SidenavComponent,
  CheckboxOverviewExample,
  ExpansionPanelComponent,
  VoyageTableComponent,
} from './components';

import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { StepperComponent } from './components/stepper/stepper.component';

const routes = [
  { path: '/ui-kit', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: UiKitComponent,
  },
];

@NgModule({
  declarations: [
    UiKitComponent,
    ButtonsComponent,
    CheckboxOverviewExample,
    TablesComponent,
    FieldsComponent,
    DropdownComponent,
    SidenavComponent,
    ExpansionPanelComponent,
    StepperComponent,
    VoyageTableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    AtlpCoreSharedModule,
    AtlpSharedModule,
  ],
  exports: [UiKitComponent, AtlpCoreSharedModule],
})
export class UiKitModule {}
