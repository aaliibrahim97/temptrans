import { InjectionToken } from "@angular/core";
import { AtlpFilterRef } from "./atlp-filter-ref.interface";

export const ATLP_FILTER_TOKEN = new InjectionToken<AtlpFilterRef>(
  "AtlpFilterRef"
);

