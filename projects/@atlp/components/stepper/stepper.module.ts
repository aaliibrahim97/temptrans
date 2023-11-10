import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AtlpStepperComponent } from './stepper.component';

@NgModule({
    declarations: [
        AtlpStepperComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports     : [
        AtlpStepperComponent
    ],
})
export class StepperModule
{
}