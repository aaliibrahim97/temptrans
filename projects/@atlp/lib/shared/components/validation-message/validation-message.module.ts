import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationMessageComponent } from './validation-message.component';

@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [ValidationMessageComponent],
})
export class ValidationMessageModule {}
