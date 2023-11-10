import {
  Required,
  TypeOfObject,
  TypeOfString,
  decoratorValidator,
} from './decorators/required-decorator';
import { AtlpClassWithTemplate } from './decorators/with-template-decorator';

@AtlpClassWithTemplate()
export class AtlpTemplateRenderer {
  @TypeOfString
  template: string = '';

  @TypeOfObject
  @Required
  data: any;

  @TypeOfString
  templateId?: string = '';

  constructor(data: any, template?: string, templateId?: string) {
    this.template = template || '';
    this.data = data;
    this.templateId = templateId;
    if (!template && !templateId) {
      console.log('Invalid input, please try again!');
      throw new Error('Invalid input, please try again!');
    }
    if (!decoratorValidator(this)) {
      console.log('Invalid input, please try again!');
      throw new Error('Invalid input, please try again!');
    }
  }

  renderTemplate = () => {
    return this.compile(this.parse(this.template));
  };

  private parse(template) {
    let result = /\[\[(.*?)\]\]/g.exec(template);
    const arr = [];
    let firstPos;

    while (result) {
      firstPos = result.index;
      if (firstPos !== 0) {
        arr.push(template.substring(0, firstPos));
        template = template.slice(firstPos);
      }

      arr.push(result[0]);
      template = template.slice(result[0].length);
      result = /\[\[(.*?)\]\]/g.exec(template);
    }

    if (template) arr.push(template);
    return arr;
  }

  private compileToString(template) {
    const ast = template;
    let fnStr = '';

    ast.map((t) => {
      // checking to see if it is an interpolation
      if (t.startsWith('[[') && t.endsWith(']]')) {
        fnStr +=
          this.data[
            `${t
              .split(/\[\[|\]\]/)
              .filter(Boolean)[0]
              .trim()}`
          ];
      } else {
        fnStr += t;
      }
    });

    return fnStr;
  }

  compile = (template) => {
    const templateGenerated = this.compileToString(template);
    return templateGenerated;
  };
}
