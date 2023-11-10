import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { ATLP_CONFIG } from 'projects/@atlp/services/config.service';

@NgModule()
export class AtlpModule {
  constructor(@Optional() @SkipSelf() parentModule: AtlpModule) {
    if (parentModule) {
      throw new Error(
        'AtlpModule is already loaded. Import it in the AppModule only!'
      );
    } 
  }

  static forRoot(config): ModuleWithProviders<AtlpModule> {
    return {
      ngModule: AtlpModule,
      providers: [
        {
          provide: ATLP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
