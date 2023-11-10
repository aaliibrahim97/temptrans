import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[regxDynamicRestrict]',
})
export class AtlpRegxDynamicRestrictDirective {
  @Input() filedName = '';
  @Input() regxArray = [];

  constructor(
    private el: ElementRef,
    private defaultSnak: SnakBarService,
    public translateService: TranslateService
  ) {}

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const inputVal = event.target.value + String.fromCharCode(event.charCode);
    const isValid = this.regxArray.some((regXExpression) => {
      let key = Object.keys(regXExpression)[0];
      let regXVal = regXExpression[key];
      return !new RegExp(regXVal).test(inputVal);
    });
    return !isValid;
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    const pasteData = event.clipboardData.getData('text/plain');
    const isValid = this.regxArray.some((regXExpression) => {
      let key = Object.keys(regXExpression)[0];
      let regXVal = regXExpression[key];
      return !new RegExp(regXVal).test(pasteData);
    });
    if (isValid) {
      this.defaultSnak.error(this.translateService.instant('PleasePasteValid'));
    }
    return !isValid;
  }
}
