import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AtlpHijriMatDatepickerComponent } from './component/atlp-hijri-mat-datepicker.component';
import { NgxAngularMaterialHijriAdapterService } from './adapter/ngx-angular-material-hijri-adapter.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  exports: [AtlpHijriMatDatepickerComponent],
  declarations: [AtlpHijriMatDatepickerComponent],
  providers: [NgxAngularMaterialHijriAdapterService],
})
export class AtlpHijriMatDatepickerModule {}
