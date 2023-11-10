import { OnInit } from '@angular/core';
import { locale as navigationEnglish } from '../../i18n/en';
import { locale as navigationArabic } from '../../i18n/ae';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AtlpDialogRef } from '../../injectors/atlp-dialog-ref';
import { AtlpDialogInsertionDirective } from '../../directives/atlp-insertion.directive';
import { AtlpSlideBarDialogConfig } from '../../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'atlp-slidebar-dialog',
  templateUrl: './atlp-slidebar-dialog.component.html',
  styleUrls: ['./atlp-slidebar-dialog.component.scss'],
})
export class AtlpSlideBarDialogComponent implements OnInit, AfterViewInit {
  selectedLanguage = 'en';
  componentRef: ComponentRef<any>;
  @ViewChild(AtlpDialogInsertionDirective)
  insertionPoint: AtlpDialogInsertionDirective;
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();
  childComponentType: Type<any>;

  constructor(
    private atlpTranslationService: AtlpTranslationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: AtlpDialogRef,
    public atplSidebarService: AtlpSidebarV2Service,
    public config: AtlpSlideBarDialogConfig
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
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
    setTimeout(() => {
      this.atplSidebarService
        .getSidebar(this.config.keyToCloseSlider)
        .toggleOpen();
    }, 10);
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // okClick = (args: any): void => {
  //   this.notifyDialogBtnClickStatus.emit("OK");
  //   this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  // };

  // confirmWithReason = (reason: string, aptId: string): void => {
  //   const msgData = {
  //     status: "CONFIRM",
  //     data: reason,
  //     aptId: aptId,
  //   };
  //   this.notifyDialogBtnClickStatus.emit(msgData);
  //   this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  // };

  // confirmWithdata = (reason): void => {
  //   const msgData = {
  //     status: "CONFIRM",
  //     data: reason,
  //   };
  //   this.notifyDialogBtnClickStatus.emit(msgData);
  //   this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  // };

  // toggleSidebarOpen(key): void {
  //   this.atlpSidebarService.getSidebar(key).toggleOpen();
  // }

  // cancelClick = (args: any): void => {
  //   this.notifyDialogBtnClickStatus.emit("CANCEL");
  //   this.toggleSidebarOpen(this.messageDetails.keyToCloseSlider);
  // };
}
