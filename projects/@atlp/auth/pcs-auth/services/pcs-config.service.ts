import { Injectable } from '@angular/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { PcsAuthConfiguration } from '../../interfaces/PcsAuthConfiguration';

@Injectable({
  providedIn: 'root',
})
export class PcsConfigService {
  private pcsAuthConfig: PcsAuthConfiguration = {
    loginUrl: '',
    tokenKey: '',
    userInfoUrl: '',
    refreshTokenKey: '',
    refreshTokenUrl: '',
    logOutUrl: '',
    ssoDashBoardUrl: '',
  };

  constructor(private atlpEnvService: AtlpEnvService) {}

  withConfig(config: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.pcsAuthConfig.loginUrl = config.loginUrl;
      this.pcsAuthConfig.tokenKey = config.tokenKey;
      this.pcsAuthConfig.userInfoUrl = config.userInfoUrl;
      this.pcsAuthConfig.refreshTokenKey = config.refreshTokenKey;
      this.pcsAuthConfig.refreshTokenUrl = config.refreshTokenUrl;
      this.pcsAuthConfig.logOutUrl = config.logoutUrl;
      this.pcsAuthConfig.ssoDashBoardUrl = config.ssoDashBoardUrl;
      resolve();
    });
  }

  getUserInfoUrl(): string {
    return this.pcsAuthConfig.userInfoUrl || this.atlpEnvService.userInfoUrl;
  }

  getLogoutUrl(selectedLang?: string): string {
    return (
      `${this.pcsAuthConfig.logOutUrl}` || `${this.atlpEnvService.logoutUrl}`
    );
  }

  getRefreshTokenUrl(): string {
    return (
      this.pcsAuthConfig.refreshTokenUrl || this.atlpEnvService.refreshTokenUrl
    );
  }

  getSsoDashbordUrl(): string {
    return (
      this.pcsAuthConfig.ssoDashBoardUrl || this.atlpEnvService.ssoDashBoardUrl
    );
  }

  getLoginUrl(): string {
    return this.pcsAuthConfig.loginUrl || this.atlpEnvService.loginUrl;
  }

  getTokenKey(): string {
    return this.pcsAuthConfig.tokenKey || this.atlpEnvService.tokenKey;
  }

  getRefreshTokenKey(): string {
    return (
      this.pcsAuthConfig.refreshTokenKey || this.atlpEnvService.refreshTokenKey
    );
  }
}
