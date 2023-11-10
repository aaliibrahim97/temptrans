import { AtlpLoadDynamicScriptsResolverService } from '../services/atlp-load-dynamic-scripts-resolver.service';
import { IAtlpLoadDynamicScriptsConfig } from '../services/atlp-load-dynamic-scripts-resolver.service';

export function atlpLoadDynamicScriptsServiceConfig(
  _loadDynamicScriptsService: AtlpLoadDynamicScriptsResolverService
): () => Promise<any> {
  let atlpCommonScriptconfig: IAtlpLoadDynamicScriptsConfig[] = [
    {
      name: 'atlp-angular-elements-ui',
      type: 'js',
      src: './assets/angular-elements/atlp-angular-elements-ui.js',
      loaded: false,
    },
  ];
  return () =>
    _loadDynamicScriptsService.loadScriptsForAngularCustomElements(
      atlpCommonScriptconfig
    );
}
