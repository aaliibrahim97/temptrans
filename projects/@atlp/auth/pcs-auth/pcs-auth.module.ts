import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcsConfigService } from './services/pcs-config.service';
import { configureAuth } from './pcs-config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [PcsConfigService],
      multi: true,
    },
  ],
  exports: [],
})
export class PcsAuthModule {}
