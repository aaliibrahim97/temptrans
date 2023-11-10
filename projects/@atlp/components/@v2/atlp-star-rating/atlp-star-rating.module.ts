import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtlpStarRatingComponent } from "./components/atlp-star-rating.component";

@NgModule({
  declarations: [AtlpStarRatingComponent],
  imports: [CommonModule],
  exports: [AtlpStarRatingComponent],
})
export class AtlpStarRatingModule {}
