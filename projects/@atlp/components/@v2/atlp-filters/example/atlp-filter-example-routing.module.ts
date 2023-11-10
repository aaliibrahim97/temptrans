import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtlpSidebarModule } from "projects/@atlp/components";
import { AtlpExampleFilterExampleComponent } from "./components/atlp-filter-example.component";

const routes = [
  {
    path: "",
    component: AtlpExampleFilterExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AtlpSidebarModule],
  exports: [RouterModule],
})
export class AtlpFilterExampleRoutingModule {}
