import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconsService {
  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {}
  public registerIcons(icons: Array<string>): void {
    icons.forEach((icon) => {
      // @ts-ignore
      this._iconRegistry.addSvgIcon(
        icon,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/icons/${icon}.svg`
        )
      );
    });
  }
}
