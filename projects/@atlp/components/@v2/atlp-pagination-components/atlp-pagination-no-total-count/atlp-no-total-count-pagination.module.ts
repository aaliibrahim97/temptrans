import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtlpNoTotalCountPaginationComponent } from "./component/atlp-no-total-count-pagination.component";
import { AtlpSharedModule } from "projects/@atlp/atlp-shared.module";
import { AtlpCoreSharedModule } from "projects/@atlp/lib/shared/core-shared.module";

@NgModule({
  declarations: [AtlpNoTotalCountPaginationComponent],
  imports: [CommonModule, AtlpSharedModule, AtlpCoreSharedModule],
  exports: [AtlpNoTotalCountPaginationComponent],
})
export class AtlpNoTotalCountPaginationModule {}
