import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';

import { ContentComponent } from 'projects/@atlp/lib/atlp-layout/components/content/content.component';

@NgModule({
  declarations: [ContentComponent],
  imports: [RouterModule],
  exports: [ContentComponent],
})
export class ContentModule {}
