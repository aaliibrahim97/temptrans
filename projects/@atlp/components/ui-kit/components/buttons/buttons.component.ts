import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtlpTranslationLoaderService } from 'projects/@atlp/services/translation-loader.service';

import { locale as english } from '../../i18n/en';

import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
    selector: 'buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
    /**
     * Constructor
     * @param {IconsService} _iconsService
     * @param {AtlpTranslationLoaderService} _atlpTranslationLoaderService
     */
    constructor(
        private _iconsService: IconsService,
        private _atlpTranslationLoaderService: AtlpTranslationLoaderService,
        private _snackBar: MatSnackBar
    ) {
        this._iconsService.registerIcons(this.icons);
        this._atlpTranslationLoaderService.loadTranslations(english);
    }

    openSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            duration: 5000,
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register icon for current component
     */
    private get icons(): Array<string> {
        return ['minimize-arrows', 'icon-plus', 'copy-icon', 'print-icon', 'tel-icon', 'email-icon', 'soc-icon', 'download-icon', 'plus-white', 'plus-dark', 'remove', 'save-icon', 'open-icon', 'plus-disabled', 'delete-button'];
    }
}

@Component({
    selector: 'snack-bar-component-example-snack',
    template: `<span>123</span>`,
    styles: [`
      .example-pizza-party {
        color: hotpink;
      }
    `],
})
export class PizzaPartyComponent { }