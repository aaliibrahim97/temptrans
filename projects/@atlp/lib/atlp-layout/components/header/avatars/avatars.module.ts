import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarsComponent } from './avatars.component';

@NgModule({
  declarations: [AvatarsComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule,
    PortalModule,
  ],
  exports: [AvatarsComponent, MatMenuModule],
})
export class AvatarsModule {}
