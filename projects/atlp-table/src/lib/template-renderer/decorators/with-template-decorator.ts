const withTemplateSearchRegExpDoubleQuote = /"/gi;
const withTemplateReplaceWithSingleQuote = "'";

export function AtlpClassWithTemplate() {
  return function <
    T extends {
      new (...args: any[]): {
        data: any;
        template?: string;
        templateId?: string;
      };
    }
  >(originalConstructor: T) {
    return class TemplateClass extends originalConstructor {
      constructor(..._params: any[]) {
        super(_params[0], _params[1], _params[2]);
        if (this.templateId) {
          if ('content' in document.createElement('template')) {
            let templateContent: HTMLTemplateElement = document.querySelector(
              `#${this.templateId}`
            );
            let templateDiv: HTMLDivElement =
              templateContent.querySelector('div');
            let unformattedInnerHtml = templateDiv.innerHTML;
            let formattedInnerHtml = unformattedInnerHtml.replace(
              withTemplateSearchRegExpDoubleQuote,
              withTemplateReplaceWithSingleQuote
            );
            this.template = formattedInnerHtml;
          } else {
            console.log(
              'HTML templating not supported. Please update your browser.'
            );
          }
        }
      }
    };
  };
}
