import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class AtlpCheckColumnVisibility implements PipeTransform {
  transform(arrInput: any, fn: Function = (item) => item.isVisible): any {
    return arrInput.filter(fn);
  }
}
