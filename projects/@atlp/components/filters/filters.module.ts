import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FiltersComponent } from './filters.component';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';


@NgModule({
    declarations: [
        FiltersComponent,
    ],
    imports: [
        CommonModule,
        AtlpCoreSharedModule
    ],
    exports     : [
        FiltersComponent
    ],
})
export class FiltersModule { }
