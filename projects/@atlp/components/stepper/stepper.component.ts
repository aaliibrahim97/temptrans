import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { StepperData } from './interfaces';

@Component({
    selector: 'atlp-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AtlpStepperComponent implements OnInit {
    // Input params
    @Input() stepperData: StepperData[];
    @Output() onClick = new EventEmitter()

    /**
     * Constructor
     * @param {IconsService} _iconsService
     */
    constructor(
        private _iconsService: IconsService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.stepperData
        this.stepperData.forEach(element => {
            this._iconsService.registerIcons([element.icon]);
        });
    }

    onClickHandler(event){
        this.onClick.emit(event)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
}
