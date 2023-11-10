import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { QuestionnaireService } from 'projects/@atlp/services/questionnaire.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { AtlpSidebarService } from '../sidebar/sidebar.service';
import { SnakBarService } from '../snak-bars/service/snak-bar-default.component';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  form: FormGroup;
  SidebarName = SidebarName;
  sectorsData = [];
  subSectorsData = [];
  productsData = [];
  selectedLanguage: string;
  SuccessConfirmMsg: boolean;
  adegURL: any;
  ucid: any;
  constructor(
    private formBuilder: FormBuilder,
    private _iconsService: IconsService,
    private _atplSidebarService: AtlpSidebarService,
    private questionnaireService: QuestionnaireService,
    private atlpTranslationService: AtlpTranslationService,
    private portalBridgeService: AtlpPortalBridgeService,
    private defaultSnakBar: SnakBarService,
    private envService: AtlpEnvService,
    private userInfoService: UserInfoService,
    private _atplSidebarV2Service: AtlpSidebarV2Service,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {
    this._iconsService.registerIcons(this.icons);
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      SelectedSector: new FormControl('', [Validators.required]),
      SelectedSubSector: new FormControl('', [Validators.required]),
      SelectedProduct: new FormControl(''),
    });
    this.portalBridgeService.openQuestionaire.subscribe((res) => {
      if (res == 'opened') {
        this.processADEGforuser();
      }
    });
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.ucid = this.userInfoService.getuserUCID();
      }
    });
    this.getAllLookups();
  }

  private get icons(): Array<string> {
    return ['plus-dark', 'soc-icon', 'rejected-icon', 'success-icon'];
  }

  getAllLookups() {
    this.questionnaireService.getAdegSectorType().subscribe((res) => {
      if (res && res?.items?.length > 0) {
        this.sectorsData = this.processLookUpData(res.items);
      }
    });
  }

  processLookUpData(response) {
    const datalist: FilterModel[] = [];
    response.forEach((rec) => {
      let f = new FilterModel();
      f.name = rec.name;
      f.children = rec.children;
      let arabicDesc = rec?.metadata?.find(
        (meta) => meta?.metadata_Type === 'Language'
      )?.data
        ? JSON.parse(
            rec?.metadata?.find((meta) => meta.metadata_Type === 'Language')
              .data
          ).AR
        : rec.description;
      f.description =
        this.selectedLanguage == 'en'
          ? rec.description
          : arabicDesc
          ? arabicDesc
          : rec.description;
      datalist.push(f);
    });

    return datalist;
  }

  onSectorChange(selecteditem) {
    const filteredSubSectors = selecteditem?.children?.filter(
      (x) => x.lookup_Type == 'DEDSubSectors'
    );
    this.subSectorsData = this.processLookUpData(filteredSubSectors);
    const filteredProducts = selecteditem?.children?.filter(
      (x) => x.lookup_Type == 'DEDProducts'
    );
    this.productsData = this.processLookUpData(filteredProducts);
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  toggleV2SidebarOpen(key): void {
    this._atplSidebarV2Service.getSidebar(key).toggleOpen();
  }

  adjustMatSelectOverlay(element): void {
    element?.overlayDir?._overlayRef?.addPanelClass('custom-overlay');
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.questionnaireService.postSubmit(this.form.value).subscribe(
        (res) => {
          if (res?.success) {
            this.SuccessConfirmMsg = true;
            this.form.reset();
          } else {
            this.SuccessConfirmMsg = false;
            this.defaultSnakBar.error(res?.msg);
          }
        },
        (error) => {
          this.defaultSnakBar.error(error?.error?.msg);
        }
      );
    }
  }

  goBack(key) {
    this.toggleV2SidebarOpen(key);
  }

  processADEGforuser() {
    const userData = this.authService.userDataFromToken();
    const userId = userData?.UserId;
    this.ucid = this.userInfoService.getuserUCID();

    if (this.ucid && userId) {
      this.questionnaireService.ADEGService(this.ucid, userId).subscribe(
        (response: any) => {
          if (response && response?.data) {
            if (
              response?.data?.adegQuestionareSubmitted &&
              !response?.data?.accessDetails?.active
            ) {
              this.SuccessConfirmMsg = true;
              this._atplSidebarV2Service
                .getSidebar(SidebarName.questionnaire)
                .toggleOpen();
              this._atplSidebarV2Service.getSidebar(
                SidebarName.navigationSidebarMenu
              );
            } else if (
              response?.data?.adegQuestionareSubmitted &&
              response?.data?.accessDetails?.active
            ) {
              this.adegURL = this.envService.ADEGURL;
              window.open(this.adegURL, '_self');
            } else if (
              !response?.data?.adegQuestionareSubmitted &&
              !response?.data?.accessDetails?.active
            ) {
              this.SuccessConfirmMsg = false;
              this._atplSidebarV2Service
                .getSidebar(SidebarName.questionnaire)
                .toggleOpen();
              this._atplSidebarService.getSidebar(
                SidebarName.navigationSidebarMenu
              );
            }
            this.form.reset();
          }
        },
        (error: any) => {}
      );
    }
  }
}
export class FilterModel {
  name: string;
  description: string;
  type: string;
  children: any;
}
