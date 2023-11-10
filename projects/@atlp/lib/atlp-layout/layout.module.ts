import { AtlpNavMenuModule } from './../../components/atlp-nav-menu/atlp-nav-menu.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AtlpSidebarModule } from 'projects/@atlp/components';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { ContentModule } from 'projects/@atlp/lib/atlp-layout/components/content/content.module';
import { QuickPanelModule } from 'projects/@atlp/lib/atlp-layout/components/quick-panel/quick-panel.module';
import { HeaderModule } from 'projects/@atlp/lib/atlp-layout/components/header/header.module';
import { LayoutComponent } from 'projects/@atlp/lib/atlp-layout/layout.component';
import { AtlpCoreSharedModule } from '../shared/core-shared.module';
import { ProgressBarInterceptorModule } from '../shared/progress-bar/progress-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingActionModule } from './components/floating-actions/floating-action.module';
import { SwitchCompanyModule } from 'projects/@atlp/components/switch-company/switch-company.module';
import { JosoorModule } from 'projects/@atlp/components/josoor/josoor.module';
import { AtlpSidebarV2Module } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.module';
import { MatBadgeModule } from '@angular/material/badge';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    RouterModule,
    AtlpSharedModule,
    AtlpSidebarModule,
    ContentModule,
    QuickPanelModule,
    HeaderModule,
    FloatingActionModule,
    AtlpCoreSharedModule,
    ProgressBarInterceptorModule,
    AtlpNavMenuModule,
    TranslateModule.forRoot(),
    SwitchCompanyModule,
    JosoorModule,
    AtlpSidebarV2Module,
    MatBadgeModule,
    PortalModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
