import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { FileUploadModule } from 'projects/@atlp/components/file-upload/file-upload.module';
import { AtlpSidebarModule } from '../sidebar/sidebar.module';
import { JosoorComponent } from './josoor.component';
import { SocialMediaComponent } from './social-media/social-media.component';

@NgModule({
  declarations: [JosoorComponent, SocialMediaComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    AtlpSidebarModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    CoreModule,
    MatSelectModule,
    FileUploadModule,
    NgxMatIntlTelInputModule,
  ],
  exports: [JosoorComponent],
})
export class JosoorModule {}
