import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtlpSharedModule } from "projects/@atlp/atlp-shared.module";
import { AtlpCoreSharedModule } from "projects/@atlp/lib/shared/core-shared.module";
import { AtlpMatPaginationComponent } from "./components/atlp-mat-pagination.component";

@NgModule({
  declarations: [AtlpMatPaginationComponent],
  imports: [CommonModule, AtlpSharedModule, AtlpCoreSharedModule],
  exports: [AtlpMatPaginationComponent],
})
export class AtlpMatPaginationModule {}
