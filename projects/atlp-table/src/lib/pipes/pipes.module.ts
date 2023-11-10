import { NgModule } from '@angular/core';
import { AtlpRichClassicSafeHtmlPipe } from './atlp-rich-classic-safe-html.pipe';
import { AtlpRichClassicTableFirstLetter } from './atlp-rich-classic-table-first-letter.pipe';

@NgModule({
  declarations: [AtlpRichClassicTableFirstLetter, AtlpRichClassicSafeHtmlPipe],
  imports: [],
  exports: [AtlpRichClassicTableFirstLetter, AtlpRichClassicSafeHtmlPipe],
})
export class AtlpRichClassicTablePipesModule {}
