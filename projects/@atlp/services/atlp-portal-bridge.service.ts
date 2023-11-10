import {
  TemplatePortal,
  ComponentPortal,
  DomPortal,
} from '@angular/cdk/portal';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export type AtlpPortalTemplateType =
  | TemplatePortal
  | ComponentPortal<any>
  | DomPortal;

export interface IHeaderDetails {
  logo?: {
    svgIcon: string;
    customClass?: string;
  };
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AtlpPortalBridgeService {
  updateMFAQRImage = new BehaviorSubject('');
  selectedCompanyChanged = new BehaviorSubject('default');
  openJosoor = new BehaviorSubject('default');
  openQuestionaire = new BehaviorSubject('default');
  headerDetailsChanged = new BehaviorSubject<IHeaderDetails>(
    <IHeaderDetails>{}
  );

  private activePortal = new Subject<AtlpPortalTemplateType>();
  private companySwitch = new Subject<AtlpPortalTemplateType>();
  private companyInfo = new Subject<AtlpPortalTemplateType>();
  private pageLoaderPortal = new BehaviorSubject<AtlpPortalTemplateType>(null);

  readonly atlpPortal$ = this.activePortal.asObservable();
  readonly companySwitch$ = this.companySwitch.asObservable();
  readonly companyInfo$ = this.companyInfo.asObservable();
  readonly pageLoaderPortal$ = this.pageLoaderPortal.asObservable();

  constructor() {}

  setPortal(atlpPortal: AtlpPortalTemplateType) {
    this.activePortal.next(atlpPortal);
  }

  setPageLoaderPortal(loaderPortal: AtlpPortalTemplateType) {
    this.pageLoaderPortal.next(loaderPortal);
  }

  setHeaderDetails(hedearDetails: IHeaderDetails) {
    this.headerDetailsChanged.next(hedearDetails);
  }

  switchCompany(companySwitch: AtlpPortalTemplateType) {
    this.companySwitch.next(companySwitch);
  }

  companyInformation(companyInfo: AtlpPortalTemplateType) {
    this.companyInfo.next(companyInfo);
  }

  removecompanyInformation() {
    this.companyInfo.next(null);
  }
}
