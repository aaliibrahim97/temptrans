import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtlpslidebarDialogModule } from "../atlp-slidebar.module";
import { AtlpDialogExampleComponent } from "./components/atlp-dialog-example.component";

@NgModule({
  declarations: [AtlpDialogExampleComponent],
  imports: [CommonModule, AtlpslidebarDialogModule],
})
export class AtlpDialogExampleModule {}
