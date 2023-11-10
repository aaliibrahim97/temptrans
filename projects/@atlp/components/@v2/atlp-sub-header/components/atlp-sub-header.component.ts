import { CdkPortal } from '@angular/cdk/portal';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { Subscription } from 'rxjs';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpSidebarV2Service } from '../../atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'atlp-sub-header',
  templateUrl: './atlp-sub-header.component.html',
  styleUrls: ['./atlp-sub-header.component.scss'],
})
export class AtlpSubHeaderComponent implements OnInit {
  @Input() subModules: any[];
  settingsAvatar = {
    round: false,
    size: 'medium',
  };
  SidebarName = SidebarName;
  @Input()
  filterTemplate: TemplateRef<any>;
  @Input()
  atlpCommonButtonSection: TemplateRef<any>;
  @Input()
  atlpTableSwitchHeaderSection: TemplateRef<any>;
  @Input()
  atlpTableMultiSelectionActions: TemplateRef<any>;
  @Input()
  tableContentTemplate: TemplateRef<any>;
  transctionMode: string = '';
  @Input()
  isDeclarationModule: boolean;
  @Input()
  subModuleTitle: string;
  subscriptions: Subscription[] = [];
  @ViewChild(CdkPortal, { static: true })
  portalContent: CdkPortal;
  selectedLanguage: string;
  @Input() isReadOnly: boolean;
  navigationService: any;

  constructor(
    private _iconsService: IconsService,
    public atplSidebarService: AtlpSidebarV2Service,
    private router: Router,
    private route: ActivatedRoute,
    private atlpPortalBridge: AtlpPortalBridgeService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpPortalBridge.setPortal(this.portalContent);
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang || 'en';
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });
  }

  isActive(transctionMode) {
    return this.transctionMode.toLowerCase() == transctionMode.toLowerCase()
      ? 'active'
      : '';
  }

  navigateToPage(selection) {
    this.navigationService.navigateToPage(selection);
  }

  openAnnouncement(key) {
    this.toggleSidebarOpen(key);
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  private get icons(): Array<string> {
    return [
      'logout',
      'profile-svg',
      'switch-user',
      'profile-settings',
      'selected-profile',
    ];
  }

  ngOnDestroy() {
    this.portalContent.detach();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
