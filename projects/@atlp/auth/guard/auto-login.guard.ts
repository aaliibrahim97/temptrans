import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IAuthServiceInterface } from '../interfaces';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { decode } from '../utils/authHelper';
import { ContactsService } from 'projects/@atlp/services/contacts.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService,
    private userInfoService: UserInfoService,
    private atlpTranslationService: AtlpTranslationService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    try {
      const decodedUrl = decode(window.location.href);
      let theme = localStorage.getItem('selectedTheme') || 'dark';
      this.atlpTranslationService.handleTheamChange(theme);

      if (decodedUrl.includes('?rtk=')) {
        const returnToken = decodedUrl.split('?')[1]?.split('=')[1];
        const originalUrl =
          decodedUrl.split('?')[0]?.split('=')[0] || state.url;
        if (returnToken) {
          this.authService.setTokenFromReturnUrl(returnToken);
        }
        this.navigateToReturnUrl(originalUrl);
      }
    } catch (ex) {
      console.log('Return URL Token not found');
    }

    const isAuthorized$ = new Subject<boolean>();
    this.authService
      .checkIsUserAuthorizedAndSetUserData()
      .then((isAuthorized) => {
        if (isAuthorized) {
          // let userInfo = this.userInfoService.getUserInfoDetails();
          // if (userInfo && userInfo.data && userInfo.data.id) {
          // this.contactService
          //   .getSaveduserPreference(userInfo.data.id)
          //   .subscribe(
          //     (res) => {
          //       let userPreference = res?.data;
          //       if (
          //         userPreference.selectedTheme &&
          //         userPreference.selectedTheme != ''
          //       ) {
          //         this.atlpTranslationService.handleTheamChange(
          //           userPreference.selectedTheme
          //         );
          //       }
          //     },
          //     (err) => {
          //       console.log(err);
          //     }
          //   );
          // }
          return isAuthorized$.next(true);
        }
        this.authService.login();
        return isAuthorized$.next(false);
      });

    return isAuthorized$;
    // return this.authService.getIsAuthorized().pipe(
    //   map((isAuthorized: boolean) => {
    //     if (isAuthorized) {
    //       return true;
    //     }
    //     this.authService.login();
    //     return false;
    //   })
    // );
  }

  navigateToReturnUrl(url): void {
    window.location.href = url; // navigate to remove query param is not working on angular 13
    // this.router.navigate([url], { relativeTo: this.route, queryParams: {} });
  }
}
