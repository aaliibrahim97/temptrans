import { DynamicWidgetLibraryService } from '../../services/dynamic-widget-library.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class DynamicFormExternalLoaders {
  constructor(
    protected _dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    protected _sanitizer: DomSanitizer
  ) {}

  protected resetScriptsAndStyleSheets(uniqueDynamicFormComponentId: string) {
    document
      .querySelectorAll(`${uniqueDynamicFormComponentId}-atlpForm`)
      .forEach((element) => element.remove());
  }

  protected loadScripts(uniqueDynamicFormComponentId: string) {
    const scripts = this._dynamicWidgetLibraryService.getFromBuilderScripts(
      uniqueDynamicFormComponentId
    );
    scripts.map((script) => {
      const scriptTag: HTMLScriptElement = document.createElement('script');
      scriptTag.src = script;
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.setAttribute(
        'class',
        `${uniqueDynamicFormComponentId}-atlpForm`
      );
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    });
  }

  protected loadStyleSheets(uniqueDynamicFormComponentId: string) {
    const stylesheets =
      this._dynamicWidgetLibraryService.getFromBuilderStylesheets(
        uniqueDynamicFormComponentId
      );
    stylesheets.map((stylesheet) => {
      const linkTag: HTMLLinkElement = document.createElement('link');
      linkTag.rel = 'stylesheet';
      linkTag.href = stylesheet;
      linkTag.setAttribute('class', `${uniqueDynamicFormComponentId}-atlpForm`);
      document.getElementsByTagName('head')[0].appendChild(linkTag);
    });
  }

  protected loadInlineStyles(inlineStyles: string): SafeHtml {
    const inlineStylesSanitized =
      this._sanitizer.bypassSecurityTrustHtml(inlineStyles);
    return inlineStylesSanitized;
  }
}
