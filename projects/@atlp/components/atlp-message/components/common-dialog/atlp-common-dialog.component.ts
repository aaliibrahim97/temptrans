import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { locale as navigationEnglish } from '../../i18n/en';
import { locale as navigationArabic } from '../../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { AtlpCommonDialogEnum } from '../../models/enums/common-dialog.enum';
import { AtlpCommonDialogService } from '../../services/common-dialog.service';
import {
  AtlpCommonMessageDialog,
  AtlpCommonMessageDialogDefault,
} from '../../models/common-message.model';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@Component({
  selector: 'atlp-common-dialog',
  templateUrl: './atlp-common-dialog.component.html',
  styleUrls: ['./atlp-common-dialog.component.scss'],
})
export class AtlpCommonDialogComponent implements OnInit {
  SidebarName = SidebarName;
  selectedLanguage = 'en';
  buttonOkText: string = AtlpCommonDialogEnum.ok;
  buttonCancelText: string = AtlpCommonDialogEnum.cancel;
  rejectAbortButtonText: string = AtlpCommonDialogEnum.cancel;
  messageDetails: AtlpCommonMessageDialog = AtlpCommonMessageDialogDefault;
  @Output() notifyDialogBtnClickStatus: EventEmitter<any> = new EventEmitter();
  @Input() showMessage: boolean;

  constructor(
    private _atplSidebarService: AtlpSidebarService,
    private atlpTranslationService: AtlpTranslationService,
    private atlpCommonDialogService: AtlpCommonDialogService,
    public atplSidebarService: AtlpSidebarService
  ) {}

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });

    this.atlpCommonDialogService.commonDialogMessage$.subscribe((msgObj) => {
      this.messageDetails = msgObj;
    });
  }

  okClick = (args: any): void => {
    this.notifyDialogBtnClickStatus.emit('OK');
    this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  };

  confirmWithReason = (reason: string, aptId: string): void => {
    const msgData = {
      status: 'CONFIRM',
      data: reason,
      aptId: aptId,
    };
    this.notifyDialogBtnClickStatus.emit(msgData);
    this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  };
  confirmWithdata = (reason): void => {
    const msgData = {
      status: 'CONFIRM',
      data: reason,
    };
    this.notifyDialogBtnClickStatus.emit(msgData);
    this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  };

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }

  cancelClick = (args: any): void => {
    this.notifyDialogBtnClickStatus.emit('CANCEL');
    this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  };
}
