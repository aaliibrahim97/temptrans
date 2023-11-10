import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';
@Directive({
  selector: '[regxRestrict]',
})
export class AtlpRegxRestrictDirective {
  @Input() regexStr = '';

  constructor(
    private el: ElementRef,
    private defaultSnak: SnakBarService,
    public translateService: TranslateService
  ) {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    const pasteData = event.clipboardData.getData('text/plain');
    const isValid = new RegExp(this.regexStr).test(pasteData);
    if (!isValid) {
      this.defaultSnak.error(this.translateService.instant('PleasePasteValid'));
    }
    return isValid;
  }
}
