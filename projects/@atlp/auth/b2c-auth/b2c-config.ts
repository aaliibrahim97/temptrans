import { OidcConfigService } from 'angular-auth-oidc-client';

export function configureAuth(
  oidcConfigService: OidcConfigService
): () => Promise<any> {
  return () =>
    oidcConfigService.withConfig({
      stsServer:
        '"https://login.microsoftonline.com/9de96492-2575-4a91-a8e3-9af9042dd6a5/v2.0"',
      authWellknownEndpoint:
        'https://testatlp.b2clogin.com/testatlp.onmicrosoft.com/B2C_1_atlp_user_login_flow/v2.0/.well-known/openid-configuration',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'efd06149-12b2-49c9-a713-c154a82593b1',
      scope: 'openid profile offline_access', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenewUrl: window.location.origin + '/silient-renew.html',
      silentRenew: true,
      useRefreshToken: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: false,
      autoUserinfo: false,
      customParams: {
        prompt: 'login', // login, consent
        customUserInfoUrl: '',
      },
    });
}
