import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AtlpSearchBarModule,
  AtlpShortcutsModule,
} from 'projects/@atlp/components';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { HeaderComponent } from 'projects/@atlp/lib/atlp-layout/components/header/header.component';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BidiModule } from '@angular/cdk/bidi';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    AtlpCoreSharedModule,
    AtlpSharedModule,
    AtlpSearchBarModule,
    AtlpShortcutsModule,
    MatDividerModule,
    ToastrModule.forRoot({ preventDuplicates: true, maxOpened: 1 }),
    TranslateModule.forChild(),
    BidiModule,
  ],
  exports: [HeaderComponent],
  providers: [ToastrService],
})
export class HeaderModule {}
