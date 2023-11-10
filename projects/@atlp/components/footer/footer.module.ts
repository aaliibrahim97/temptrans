import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    MatTooltipModule,
  ],
  exports: [FooterComponent, TranslateModule],
  declarations: [FooterComponent],
  providers: [],
})
export class AtlpFooterModule {}
