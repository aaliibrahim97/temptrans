import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appInsertion]",
})
export class AtlpDialogInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
