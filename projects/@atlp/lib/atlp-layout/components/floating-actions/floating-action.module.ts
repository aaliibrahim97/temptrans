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
import { FloatingActionComponent } from 'projects/@atlp/lib/atlp-layout/components/floating-actions/floating-action.component';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BidiModule } from '@angular/cdk/bidi';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RatingModule } from 'projects/@atlp/components/rating/rating.module';

@NgModule({
  declarations: [FloatingActionComponent],
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
    ToastrModule.forRoot({ preventDuplicates: true, maxOpened: 1 }),
    TranslateModule.forChild(),
    BidiModule,
    RatingModule
  ],
  exports: [FloatingActionComponent],
  providers: [ToastrService]
})
export class FloatingActionModule {}
