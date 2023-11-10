import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AtlpSidebarModule } from 'projects/@atlp/components';
import { FileUploadModule } from 'projects/@atlp/components/file-upload/file-upload.module';
import { AtlpDirectivesModule } from 'projects/@atlp/directives/directives';
import { MgPaginatedDropdownModule } from 'projects/@atlp/lib/shared/components/paginated-dropdown/mg-paginated-dropdown.module';
import { ValidationMessageModule } from 'projects/@atlp/lib/shared/components/validation-message/validation-message.module';
import { FileUploadService } from 'projects/@atlp/services/file-upload.service';
import { AtlpSidebarV2Module } from '../@v2/atlp-sidebar/atlp-sidebar.module';
import { MACompanyAddressComponent } from './ma-company-address/ma-company-address.component';
import { MATradeLicenseComponent } from './ma-trade-license-info/ma-trade-license-info.component';
import { MAVatInfoComponent } from './ma-vat-info/ma-vat-info.component';
import { ManageAccountComponent } from './manage-account.component';
import { ManageAccountRoutingModule } from './manage-account.routing';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ManageAccountComponent,
    MACompanyAddressComponent,
    MAVatInfoComponent,
    MATradeLicenseComponent,
  ],
  imports: [
    CommonModule,
    AtlpSidebarModule,
    MatIconModule,
    TranslateModule,
    ManageAccountRoutingModule,
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
    // HttpClientModule,
    FlexLayoutModule,
    CoreModule,
    MatSelectModule,
    FileUploadModule,
    NgxMatIntlTelInputModule,
    MatDatepickerModule,
    MgPaginatedDropdownModule,
    ValidationMessageModule,
    MatAutocompleteModule,
    AtlpSidebarV2Module,
    MatTabsModule,
    MatSnackBarModule,
    AtlpDirectivesModule,
    NgxUiLoaderModule,
    MatDividerModule,
  ],
  providers: [FileUploadService],
  exports: [ManageAccountComponent],
})
export class ManageAccountModule {}
