import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { GetDurationPipe } from './get-duration.pipe';
import { FirstLetter } from './firstLetter.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    GetDurationPipe,
    FirstLetter,
    SafeHtmlPipe,
  ],
  imports: [],
  exports: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    GetDurationPipe,
    FirstLetter,
    SafeHtmlPipe,
  ],
})
export class AtlpPipesModule {}
