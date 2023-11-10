import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoLoginGuard } from './guard/auto-login.guard';

/** PCS Auth module */
import { PcsAuthModule } from './pcs-auth/pcs-auth.module';
import { PcsAuthService } from './services/pcs-auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoAuthGuard } from './guard/no-auth.guard';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AtlpEnvServiceProvider } from '../environments/env.service.provider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AtlpNotInRoleComponent } from './components/unauthorized/not-in-role/not-in-role.component';
import { AtlpUnauthorizedDialogComponent } from './components/unauthorized/dialog/unauthorized-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

/** Azure B2c Auth Module */
// import { B2cAuthService } from './services/b2c-auth.service';;
// import { B2cAuthModule } from './b2c-auth/b2c-auth.module';

@NgModule({
  declarations: [AtlpUnauthorizedDialogComponent, AtlpNotInRoleComponent],
  providers: [
    // {provide: "IAuthServiceInterface", useClass: B2cAuthService},
    {
      provide: 'IAuthServiceInterface',
      useClass: PcsAuthService,
    },
    AtlpEnvServiceProvider,
    AutoLoginGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    // B2cAuthModule,
    PcsAuthModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [],
})
export class AtlpAuthModule {}
