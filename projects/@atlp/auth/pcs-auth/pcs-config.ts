import { PcsConfigService } from './services/pcs-config.service';

export function configureAuth(
  pcsConfigService: PcsConfigService
): () => Promise<any> {
  return () =>
    pcsConfigService.withConfig({
      loginUrl: window['_atlp_env'].loginUrl,
      tokenKey: window['_atlp_env'].tokenKey || 'PCS_TOKEN',
      refreshTokenKey: '',
      userInfoUrl: window['_atlp_env'].userInfoUrl,
      logoutUrl: window['_atlp_env'].logoutUrl,
    });
}
