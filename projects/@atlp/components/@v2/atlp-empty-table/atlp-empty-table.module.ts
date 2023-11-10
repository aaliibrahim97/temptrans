import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AtlpEmptyTableComponent } from "./components/atlp-empty-table.component";

@NgModule({
  declarations: [AtlpEmptyTableComponent],
  imports: [CommonModule, TranslateModule],
  exports: [AtlpEmptyTableComponent],
})
export class AtlpEmptyTableModule {}
