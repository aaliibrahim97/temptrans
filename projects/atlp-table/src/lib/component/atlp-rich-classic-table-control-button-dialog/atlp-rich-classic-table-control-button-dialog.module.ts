import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AtlpRichClassicControlButtonDialogComponent } from './components/atlp-rich-classic-table-control-button-dialog.component';

@NgModule({
    declarations: [AtlpRichClassicControlButtonDialogComponent],
    imports: [
        CommonModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatMenuModule,
        TranslateModule.forChild(),
        AtlpSharedModule,
        PortalModule,
        MatDialogModule,
    ],
    exports: [AtlpRichClassicControlButtonDialogComponent]
})
export class AtlpRichClassicControlButtonDialogModule {}
