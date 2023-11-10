import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AtlpConfirmDialogComponent } from 'projects/@atlp/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AtlpConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class AtlpConfirmDialogModule
{
}
