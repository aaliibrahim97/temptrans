import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { PcsSecurityService } from 'projects/@atlp/auth/pcs-auth/services/pcs-security.service';
import { Observable } from 'rxjs';
import { ITokenParseModel } from '../auth/interfaces/ITokenParseModel';
import { PcsConfigService } from '../auth/pcs-auth/services/pcs-config.service';
import { parseJwt } from '../auth/utils/authHelper';
import { IAnnouncementModel } from '../components/user-announcement/user-announcement';
import { UserAnnouncementComponent } from '../components/user-announcement/user-announcement.component';
import { AtlpEnvService } from '../environments/env.service';

@Injectable({
  providedIn: 'root',
})
export class SessionTimeoutService {
  events = ['mousemove', 'scroll', 'keydown'];
  logoutTimer: any;
  private _eventHanlders: any;
  interval: NodeJS.Timeout;
  timeout = 900000;
  eventTimeout = 150; //miliseconds
  sessionTimer: any;
  private _updateGuard: any;
  userIdle: boolean = false;
  dialogRef: any;

  constructor(
    private api: AtlpEnvService,
    private PcsSecurityService: PcsSecurityService,
    private http: HttpClient,
    public dialog: MatDialog,
    private translate: TranslateService,
    private pcsConfigService: PcsConfigService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    this._eventHanlders = this._updateTimeout.bind(this);
    this._start();
  }

  public sessionTimeout() {
    const now = new Date();
    const token = localStorage.getItem(this.pcsConfigService.getTokenKey());
    const tokenData: ITokenParseModel = parseJwt(token);
    const tokenExp: Date = new Date(tokenData?.pcsExp);
    const utcDate = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    const expiryTime = tokenExp?.getTime() - utcDate?.getTime() - 240000;
    if (expiryTime && expiryTime > 3000) {
      this.sessionTimer = setInterval(() => {
        if (this.userIdle) {
          this.showExpiryMessage(tokenExp);
        } else {
          this.extendSession();
        }
      }, expiryTime);
    } else {
      this.authService.logout();
    }
  }

  showExpiryMessage(expiredToken: any) {
    const token = this.PcsSecurityService.getToken();
    const tokenData: ITokenParseModel = parseJwt(token);
    const tokenExp: Date = new Date(tokenData?.pcsExp);

    if (tokenExp.getTime() == expiredToken.getTime()) {
      this.logoutTimer = setInterval(() => {
        const latestToken = this.PcsSecurityService.getToken();
        const latestTokenData: ITokenParseModel = parseJwt(latestToken);
        const latestTokenExp: Date = new Date(latestTokenData?.pcsExp);
        if (latestTokenExp.getTime() == expiredToken.getTime()) {
          this.authService.logout();
        } else {
          this.dialogRef.close();
          clearInterval(this.logoutTimer);
          clearInterval(this.sessionTimer);
          this.sessionTimeout();
        }
      }, 240000);
      let announcementData: IAnnouncementModel = {
        title: this.translate.instant('Session_Timeout_Title'),
        message: this.translate.instant('Session_Timeout_Msg'),
        showConfirmButton: true,
        confirmButtonText: this.translate.instant('Continue'),
        showRejectButton: true,
        rejectButtonText: this.translate.instant('LOGOUT'),
        hideShowIcon: true,
        showTimer: true,
      };
      this.dialogRef = this.dialog.open(UserAnnouncementComponent, {
        disableClose: true,
        data: announcementData,
      });
      this.dialogRef.afterClosed().subscribe((result) => {
        if (result && result == 'accept') {
          clearInterval(this.logoutTimer);
          this.extendSession();
        } else if (result && result == 'reject') {
          this.authService.logout();
        }
      });
    } else {
      clearInterval(this.sessionTimer);
      this.sessionTimeout();
    }
  }

  extendSession() {
    this.refreshTokenAPI().subscribe(
      (res) => {
        this._start();
        if (res && res?.token) this.handleLoginData(res?.token);
      },
      (err) => {
        this.authService.logout();
      }
    );
  }

  refreshTokenAPI(): Observable<any> {
    return this.http.get(
      `${this.api.usermanagementbaseUrl}usermanagement/refreshtoken`
    );
  }

  private handleLoginData(token): void {
    localStorage.setItem(this.pcsConfigService.getTokenKey(), token);
    clearInterval(this.sessionTimer);
    this.sessionTimeout();
  }

  _start() {
    this._updateTimeout();
    this._tracker();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem('session-time'));
      const currentTime = Date.now();
      if (expiredTime < currentTime) {
        this.clear();
        this.userIdle = true;
      } else {
        this.userIdle = false;
      }
    }, 1000);
  }

  _updateTimeout() {
    if (this._updateGuard) {
      clearTimeout(this._updateGuard);
    }

    this._updateGuard = setTimeout(() => {
      localStorage.setItem(
        'session-time',
        (Date.now() + this.timeout).toString()
      );
    }, this.eventTimeout);
  }

  _tracker() {
    for (let event of this.events) {
      window.addEventListener(event, this._eventHanlders);
    }
  }

  _clearTracker() {
    for (let event of this.events) {
      window.removeEventListener(event, this._eventHanlders);
    }
  }

  clear() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this._updateGuard) {
      clearTimeout(this._updateGuard);
    }

    this._clearTracker();
  }
}
