import { Injectable } from '@angular/core';
import { AtlpScriptLoaderService } from './atlp-load-dynamic-script.service';

export interface IAtlpLoadDynamicScriptsConfig {
  name: string;
  type: 'js' | 'css';
  src: string;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AtlpLoadDynamicScriptsResolverService {
  constructor(private atlpScriptLoaderService: AtlpScriptLoaderService) {}

  loadScriptsForAngularCustomElements(
    atlpLoadDynamicScriptsConfig: IAtlpLoadDynamicScriptsConfig[]
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loadScriptsDynamically(atlpLoadDynamicScriptsConfig, resolve);
    });
  }

  loadScriptsDynamically(
    atlpLoadDynamicScriptsConfig: IAtlpLoadDynamicScriptsConfig[],
    resolve
  ) {
    try {
      this.atlpScriptLoaderService
        .load(atlpLoadDynamicScriptsConfig)
        .then((scriptLoaded) => {
          atlpLoadDynamicScriptsConfig.forEach((scriptObj) => {
            scriptObj.loaded = true;
          });
          resolve();
        });
    } catch (ex) {
      resolve();
    }
  }
}
