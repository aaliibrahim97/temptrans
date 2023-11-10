import { Route, Router, Routes } from '@angular/router';
import { AutoLoginGuard } from 'projects/@atlp/auth/guard/auto-login.guard';

export class DynamicRoutes {
  constructor(private router: Router) {}

  processDynamicRoutes() {
    let routes = [];

    // userPreference
    let userPreferenceRoutes: Route = {
      path: 'user-preference',
      loadChildren: () =>
        import('../../components/user-preference/user-preference.module').then(
          (m) => m.UserPreferenceModule
        ),
      canActivate: [AutoLoginGuard],
    };
    routes.push(userPreferenceRoutes);

    //manageCompany
    let manageCompanyRoutes: Route = {
      path: 'manage-account',
      loadChildren: () =>
        import('../../components/manage-account/manage-account.module').then(
          (m) => m.ManageAccountModule
        ),
      canActivate: [AutoLoginGuard],
    };
    routes.push(manageCompanyRoutes);

    //faq
    let faqRoutes: Route = {
      path: 'faq',
      loadChildren: () =>
        import('../../components/atlp-faq/atlp-faq.module').then(
          (m) => m.AtlpFaqModule
        ),
      canActivate: [AutoLoginGuard],
    };
    routes.push(faqRoutes);

    this.injectDynamicRoutes(routes);
  }

  injectDynamicRoutes(routes) {
    let currentRoutes = this.router.config;
    currentRoutes.splice(1, 0, ...routes);
    let newRoutes: Routes = [...this.router.config];
    this.router.resetConfig(newRoutes);
  }
}
