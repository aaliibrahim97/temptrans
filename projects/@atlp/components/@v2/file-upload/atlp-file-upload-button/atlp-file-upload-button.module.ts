import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSnakBarModule } from 'projects/@atlp/components/snak-bars/snak-bar.module';
import { AtlpFileUploadButtonComponent } from './components/atlp-file-upload-button.component';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [AtlpFileUploadButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    TranslateModule,
    AtlpSnakBarModule,
  ],
  exports: [AtlpFileUploadButtonComponent],
  providers: [],
})
export class AtlpFileUploadButtonModule {}
