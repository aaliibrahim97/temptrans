import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpSidebarV2Service } from '../atlp-sidebar/atlp-sidebar.service';
import { FormBuilder } from '@angular/forms';

@UntilDestroy({ checkProperties: true, arrayName: 'subscriptions' })
@Component({
  selector: 'atlp-terms-and-conditions',
  templateUrl: './atlp-terms-and-conditions.component.html',
  styleUrls: ['./atlp-terms-and-conditions.component.scss'],
})
export class AtlpTermsAndConditionsComponent implements OnInit {
  @Input() service: any;
  @Input() serviceType: string;
  @Input() public set language(language: string) {
    this.currentLanguage = language;
    this.createTermsAndConditions();
  }

  public SidebarNameAtlp = SidebarName;
  isEditMode: boolean;
  currentLanguage: string;
  accountCode: string;
  serviceTypeCode: string;
  selectedLanguage = 'en';
  acceptFlag: boolean = false;
  description: any;
  termsAndConditions: any;
  @Output()
  acceptStatus: EventEmitter<any> = new EventEmitter();

  constructor(
    private atplSidebarService: AtlpSidebarV2Service,
    private _formBuilder: FormBuilder,
    private atlpTranslationService: AtlpTranslationService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxServiceLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.getCurrentLanguage();
    this.createTermsAndConditions();
  }

  getCurrentLanguage() {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  createTermsAndConditions() {
    this.getTermsAndConditions();
  }

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  onAccept() {
    this.acceptFlag = true;
    this.acceptStatus.emit(this.acceptFlag);
    this.toggleSidebarOpen(SidebarName.termsAndConditions);
  }

  getTermsAndConditions() {
    this.ngxServiceLoader.start();
    var payload = {
      CustomsRegistrationNumber: this.accountCode,
      ServiceTypeCode: this.serviceTypeCode,
      ServiceSubType: '',
    };

    this.service.GetTermsAndConditions(payload).subscribe((res) => {
      this.ngxServiceLoader.stop();
      this.termsAndConditions = res.Data.TermsAndConditions;
      if (this.currentLanguage == 'en') {
        this.description = this.termsAndConditions[0].Description;
      } else if (this.currentLanguage == 'ae') {
        this.description = this.termsAndConditions[1].Description;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
