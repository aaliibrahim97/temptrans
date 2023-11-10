import { AtlpCoreSharedModule } from './../../lib/shared/core-shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AtlpSharedModule } from './../../atlp-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpNavigationSidebarMenuComponent } from './components/navigation-sidebar-menu/navigation-sidebar-menu.component';
import { AtlpSidebarContentMobileComponent } from './components/sidebar-content-mobile/sidebar-content-mobile.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AtlpNavigationSidebarMenuComponent,
    AtlpSidebarContentMobileComponent,
  ],
  imports: [
    CommonModule,
    AtlpSharedModule,
    MatIconModule,
    RouterModule,
    AtlpCoreSharedModule,
    TranslateModule,
  ],
  exports: [
    AtlpNavigationSidebarMenuComponent,
    AtlpSidebarContentMobileComponent,
  ],
})
export class AtlpNavMenuModule {}
