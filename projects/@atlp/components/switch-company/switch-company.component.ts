import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { Observable } from 'rxjs';

import { CdkPortal } from '@angular/cdk/portal';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { HappinessIndexService } from 'projects/@atlp/services/happiness-index.service';
import { UserPreferenceModel } from './company-selection/company-selection.component';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'app-switch-company',
  templateUrl: './switch-company.component.html',
  styleUrls: ['./switch-company.component.scss'],
})
export class SwitchCompanyComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  Sidebar = SidebarName;
  currentCompanyID: any;
  isIndScreen: boolean = false;
  isdefaultScreen: boolean = true;
  ContactID: any;
  profileDetails: any;
  userStatus: any;
  companyDetails: any;
  completeDetails: any;
  companyPreferencedetails: UserPreferenceModel;
  indContactType: any;
  contactDetails: any;
  selectedLanguage: any = 'en';
  ispostDashboard: any;
  selectedForm = '';

  quickLinks$: Observable<any>;
  individualQuickLinks$: Observable<any>;
  postregLinks$: Observable<any>;
  loading: any;
  companyList: any;
  templatePortal: any;
  @ViewChild(CdkPortal, { static: true })
  portalContent: CdkPortal;
  @ViewChild('companyTemplate', { static: true })
  companyInfo: TemplateRef<any>;

  constructor(
    public atlpSidebarService: AtlpSidebarV2Service,
    private atlpIconService: IconsService,
    private ngxService: NgxUiLoaderService,
    public atlpTranslationService: AtlpTranslationService,
    private atlpPortalBridge: AtlpPortalBridgeService,
    private happinessIndexService: HappinessIndexService
  ) {
    this.atlpIconService.registerIcons(this.icons);

    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }
  ngOnInit() {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.atlpPortalBridge.removecompanyInformation();
    this.atlpPortalBridge.switchCompany(null);
  }

  onCancelCompanySelection() {
    if (!this.companyPreferencedetails?.CurrentCompanyOrganizationId) {
      this.onRefreshDashboard();
    }
  }

  onRefreshDashboard(companyId?: any) {
    if (companyId) {
      localStorage.setItem('selectedCompanyID', companyId);
      this.currentCompanyID = companyId;
      this.happinessIndexService.triggerHappinessIndex.next('changed');
    }
  }
  private get icons(): Array<string> {
    return [
      'plus-white',
      'land-btn-icon',
      'file-arrow-down-fill',
      'btn-right',
      'delete-grey',
      'switch-user',
      'organization',
    ];
  }

  switchCompany() {
    this.atlpSidebarService.getSidebar(this.Sidebar.switchCompany).toggleOpen();
  }
}
