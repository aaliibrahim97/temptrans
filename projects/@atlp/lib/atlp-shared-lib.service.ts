import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INavigationSidebarData } from '../components/atlp-nav-menu/models/INavigationSidebarData';
import { AtlpMenuService } from '../components/atlp-nav-menu/services/atlp-menu.service';

@Injectable({
  providedIn: 'root',
})
export class AtlpSharedLibService {
  constructor(private atlpMenuService: AtlpMenuService) {}

  getApplicationMenu(): Observable<INavigationSidebarData[]> {
    return of(this.atlpMenuService.navigation_field_data_menu);
    // return this.http
    //   .get(this.pcsConfigService.getMenuInfoUrl(), {
    //     headers: this.getHeaders(),
    //   })
    //   .pipe(
    //     map(
    //       (menuData: any): AtlpNavigation[] => {
    //         return navigation;
    //       }
    //     )
    //   );
  }
}
