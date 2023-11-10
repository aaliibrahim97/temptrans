import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlpSubHeaderComponent } from './components/atlp-sub-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [AtlpSubHeaderComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule,
    FlexLayoutModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    PortalModule,
  ],
  exports: [AtlpSubHeaderComponent],
})
export class AtlpSubHeaderModule {}
