import { Inject, Injectable } from '@angular/core';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { ITokenParseModel } from 'projects/@atlp/auth/interfaces/ITokenParseModel';
import { INavigationSidebarData } from 'projects/@atlp/components/atlp-nav-menu/models/INavigationSidebarData';
import { BehaviorSubject, of } from 'rxjs';

import { PCSMenuService } from 'projects/@atlp/services/pcsmenu.service';
import { PCSSubscriptionService } from 'projects/@atlp/services/pcssubscription.service';
import { AtlpEnvService } from '../environments/env.service';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class PCSSubModuleMenuService {
  enableTruckAppointmentMenu = new BehaviorSubject('no');
  lang: any = 'en';
  adegURL: any = 'test';
  showADEGbutton: boolean = false;
  userInfo: ITokenParseModel;
  landingMenu: INavigationSidebarData[] = [];
  completeDetails: any;
  Profiles: any;
  Permissions: any;
  MainProfile: any;
  PCSMenuReponse: any;
  UFRProcessCodes = ['MG_URCM', 'KZ_URCM', 'CM_URCM', 'LC_URCM', 'DR_URCM'];
  finalPCSMenu = [];
  isrestrictedUser: boolean = false;
  GCAppointmentProfile: any = [];
  constructor(
    private pcsMenuService: PCSMenuService,
    private pcsSubscriptionService: PCSSubscriptionService,
    private userInfoService: UserInfoService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private envService: AtlpEnvService
  ) {}

  GetPCSSubmodules() {
    this.userInfoService.dataUpdated.subscribe((res) => {
      if (res == 'updated') {
        this.userInfo = this.authService.userDataFromToken();
        const userInfoDetails = this.userInfoService.getUserInfoDetails()?.data;
        this.GCAppointmentProfile =
          userInfoDetails.selectedCompany?.profiles?.filter(
            (profile) =>
              profile.code == 'CLA' ||
              profile.code == 'FFW' ||
              profile.code == 'SHP' ||
              profile.code == 'TOP' ||
              profile.code == 'TRC'
          );
        let samplereqjson = {
          UserCode: this.userInfo?.UserCode?.trim()?.toLowerCase(),
        };
        this.pcsMenuService.post(samplereqjson).subscribe(
          (resp) => {
            this.Profiles = resp?.OtherProfiles?.map((x) => x.OtherProfileCode);
            this.Permissions = resp?.GetUserPermissions?.map(
              (x) => x.ProcessCode
            )?.toString();
            if (
              (this.Permissions && this.Permissions.includes('APPT_TVA')) ||
              this.Permissions.includes('GCR_APP') ||
              this.Permissions.includes('APPT_GC')
            ) {
              this.enableTruckAppointmentMenu.next('yes');
            }

            this.MainProfile = resp?.MainProfile?.MainProfileCode;
            this.PCSMenuReponse = resp;
            this.ProcessPCSMenu();
          },
          (error) => {
            this.ProcessPCSMenu(true);
            return of({});
          }
        );
      }
    });
  }

  GetPCSFinalJSON() {
    this.finalPCSMenu = [];
    this.GetPCSSubmodules();
    let finalPCSJson: any;
    if (this.envService?.isPCSSubModule) {
      finalPCSJson = {
        id: 'SeaNavSectionQA',
        iconName: 'sea-nav-icon',
        workingName: 'MENU_SEA',
        active: this.envService?.isPCSSubModule,
        translate: 'MENU_SEA',
        list: this?.finalPCSMenu,
      };
    } else {
      finalPCSJson = {
        id: 'SeaNavSectionProd',
        iconName: 'sea-nav-icon',
        workingName: 'MENU_SEA',
        active: true,
        translate: 'MENU_SEA',
        redirectUrl: this.envService?.PCSPortalURL,
      };
    }
    return finalPCSJson;
  }

  ProcessPCSMenu(isError: boolean = false) {
    if (!isError) {
      if (
        this.Permissions?.includes('VOP') &&
        !JSON.parse(this.userInfo?.IsBorougeDocCenterUser?.toLowerCase()) &&
        !this.PCSMenuReponse?.IsImmigrationUser &&
        !this.PCSMenuReponse?.IsDocCenter
      ) {
        this.finalPCSMenu.push({
          id: 'pcsvesselregistration',
          iconName: 'icon-nav-vessel-registration',
          translate: 'PCS.VESSEL_REGISRTATION',
          workingName: 'Vessel Registration',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Agent/Vessel`
          ),
        });
      }
      if (
        this.Permissions?.includes('VOP') &&
        !this.PCSMenuReponse?.IsImmigrationUser
      ) {
        this.finalPCSMenu.push({
          id: 'pcsvesseloperation',
          iconName: 'sea-nav-icon',
          translate: 'PCS.VESSEL_OPERATION',
          workingName: 'Vessel Operation',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Agent/Home`
          ),
        });
      }
      if (
        this.Permissions?.includes('VOP') &&
        this.PCSMenuReponse?.IsImmigrationUser
      ) {
        this.finalPCSMenu.push({
          id: 'pcsvesseloperation',
          iconName: 'customs-clearence',
          translate: 'PCS.IMMIGRATION_CLEARANCE',
          workingName: 'Immigration Clearance',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Agent/Home`
          ),
        });
      }
      if (
        !this.PCSMenuReponse?.IsShipper &&
        !this.PCSMenuReponse?.IsImmigrationUser
      ) {
        if (this.PCSMenuReponse?.IsShippingAgent) {
          this.finalPCSMenu.push({
            id: 'pcsequipmentcontrol',
            iconName: 'agency-protections',
            translate: 'PCS.EQUIPMENT_CONTROL',
            workingName: 'Equipment Control',
            active: false,
            url: '',
            redirectUrl: constructURLBasedOnLang(
              'en',
              `${this.envService.PCSBaseURL}/Web/Agent/EquipmentControl`
            ),
          });
        }
        this.finalPCSMenu.push({
          id: 'pcsequipmentcontrol',
          iconName: 'icon-nav-information-service',
          translate: 'PCS.INFORMATION_SERVICE',
          workingName: 'Information Service',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/IS/VesselCall`
          ),
        });
      }
      if (
        (this.Profiles?.includes('SHPR') &&
          this.Permissions?.includes('SHI')) ||
        JSON.parse(this.userInfo?.IsPCSSuperUser?.toLowerCase())
      ) {
        this.finalPCSMenu.push({
          id: 'pcsequipmentcontrol',
          iconName: 'sea-nav-icon',
          translate: 'PCS.SHIPPER_PORTAL',
          workingName: 'Shipper Portal',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Agent/ShipperPortal`
          ),
        });
      }
      if (this.PCSMenuReponse.HasSubscription) {
        this.ProcessRestrictedUser();
        if (!this.isrestrictedUser) {
          this.finalPCSMenu.push({
            id: 'pcssubscription',
            iconName: 'subscription',
            translate: 'PCS.SUBSCRIPTION',
            workingName: 'PCS Subscription',
            active: false,
            url: '',
            redirectUrl: constructURLBasedOnLang(
              'en',
              `${this.envService.PCSBaseURL}/Web/Subscription/Subscription`
            ),
          });
        }
      }
      if (this.Permissions?.includes('NA_MA')) {
        this.finalPCSMenu.push({
          id: 'pcsmanagealerts',
          iconName: 'icon-nav-manage-alert',
          translate: 'PCS.MANAGE_ALERTS',
          workingName: 'PCS Manage Alerts',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Notification/Subscription/Index`
          ),
        });
      }
      if (
        this.Permissions?.includes('Self_SVCAdmin') ||
        (JSON.parse(this.userInfo?.IsPCSSuperUser?.toLowerCase()) &&
          (this.PCSMenuReponse?.userRestrictedBusinessProcessCodes?.Count ==
            0 ||
            this.PCSMenuReponse.userRestrictedBusinessProcessCodes?.Any(
              (s) => s == 'Self_SVCAdmin'
            ) == false))
      ) {
        this.finalPCSMenu.push({
          id: 'pcsmanagetickets',
          iconName: 'sea-nav-icon',
          translate: 'PCS.MANAGE_TICKETS',
          workingName: 'PCS Manage Tickets',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/SelfServiceAdmin/ManageTickets`
          ),
        });
      }

      if (this.Permissions?.includes('LIC')) {
        this.finalPCSMenu.push({
          id: 'pcsmlms',
          iconName: 'icon-nav-mlms',
          translate: 'PCS.MLMS',
          workingName: 'Mlms',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/e3b5d734-2e6f-4ff2-9cc4-2d8648017122`
          ),
        });
      }
      if (this.Permissions?.includes('EPAY_MA')) {
        this.finalPCSMenu.push({
          id: 'pcsepay',
          iconName: 'icon-nav-mpay',
          translate: 'PCS.MPAY',
          workingName: 'Mpay',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/54d247fe-bbd8-42bf-ab7f-7cc19c4871da`
          ),
        });
      }

      if (
        this.Permissions?.includes('APPT_TVA') ||
        this.GCAppointmentProfile?.length > 0
      ) {
        this.finalPCSMenu.push({
          id: 'pcs-appointment',
          iconName: 'icon-nav-appointment',
          translate: 'PCS.APPOINTMENTS',
          workingName: 'PCS.APPOINTMENTS',
          active: false,
          content: [
            {
              id: 'Appointments',
              contentName: 'Appointments',
              translate: 'PCS.APPOINTMENTS',
              menuContentList: [
                {
                  description: 'PCS Container Appointment',
                  workingName: 'PCS.CONTAINER_APPOINTMENT',
                  translate: 'PCS.CONTAINER_APPOINTMENT',
                  url: constructURLBasedOnLang(
                    'en',
                    `${this.envService.PCSBaseURL}/Web/Appointment/TruckVisitAppointment/Index`
                  ),
                  isLink: true,
                  hideMenu: !this.Permissions?.includes('APPT_TVA'),
                },
                {
                  description: 'PCS RORO Appointment',
                  workingName: 'PCS.ROROAPPOINTMENT',
                  translate: 'PCS.ROROAPPOINTMENT',
                  url: constructURLBasedOnLang(
                    'en',
                    `${this.envService.PCSBaseURL}/Web/ROROAppointment/ROROAppointment/Index`
                  ),
                  isLink: true,
                  hideMenu: !this.Permissions?.includes('APPT_TVA'),
                },
                {
                  description: 'GC Appointments',
                  workingName: 'PCS.GC_Appointments',
                  translate: 'PCS.GC_Appointments',
                  url: constructURLBasedOnLang(
                    this.lang,
                    `${this.envService.ECZBaseURL}GC/#/list`
                  ),
                  isLink: true,
                  hideMenu:
                    this.GCAppointmentProfile?.length == 0 ? true : false,
                },
              ],
            },
          ],
        });
      }
      if (this.Permissions?.includes('GCR_APP')) {
        this.finalPCSMenu.push({
          id: 'pcs gc operation',
          iconName: 'icon-nav-cargo-logistics',
          translate: 'PCS.GC_CARGO_OPERATIONS',
          workingName: 'GC Cargo Operations',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/GCRevenue/GCRevenue`
          ),
        });
      }
      if (this.Permissions?.includes('TRN_ORD')) {
        this.finalPCSMenu.push({
          id: 'pcs cargo logistics',
          iconName: 'icon-nav-cargo-logistics',
          translate: 'PCS.CARGO_LOGISTICS',
          workingName: 'PCS cargo logistics',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/TransportOrder/TransportOrder/Index`
          ),
        });
      }
      if (
        this.UFRProcessCodes.some((code) => this.Permissions.includes(code))
      ) {
        this.finalPCSMenu.push({
          id: 'pcsunifiedregistration',
          iconName: 'icon-nav-unified-registration',
          translate: 'PCS.UNIFIED_REGISTRATION',
          workingName: 'PCS unified registration',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/Registration/RegistrationRequest`
          ),
        });
      }
      if (
        (this.Permissions.includes('SPTL_HOME') ||
          JSON.parse(this.userInfo?.IsPCSSuperUser?.toLowerCase())) &&
        (!this.PCSMenuReponse?.userRestrictedBusinessProcessCodes?.length ||
          this.PCSMenuReponse?.userRestrictedBusinessProcessCodes?.Any(
            (s) => s == 'Self_SVCAdmin'
          ) == false)
      ) {
        this.finalPCSMenu.push({
          id: 'pcs Support Tool',
          iconName: 'icon-nav-support-tool',
          translate: 'PCS.SUPPORT_TOOL',
          workingName: 'PCS Support Tool',
          active: false,
          url: '',
          redirectUrl: constructURLBasedOnLang(
            'en',
            `${this.envService.PCSBaseURL}/Web/SupportTool/Transaction`
          ),
        });
      }
    } else {
      this.finalPCSMenu = [
        {
          id: 'SeaNavSectionProd',
          iconName: 'sea-nav-icon',
          workingName: 'MENU_SEA',
          active: true,
          translate: 'MENU_SEA',
          redirectUrl: this.envService.PCSPortalURL,
        },
      ];
    }
    if (!this.envService.isHideCFSOperations) {
      this.finalPCSMenu.push({
        id: 'CFS_Operations',
        iconName: 'icon-nav-hse',
        translate: 'MENU_CFS_Operations',
        workingName: 'MENU_CFS_Operations',
        active: false,
        content: [
          {
            id: 'CFS Operations',
            contentName: 'CFS Operations',
            translate: 'MENU_CFS_Operations',
            menuContentList: [
              {
                description: 'De-Stuffing',
                workingName: 'CFS.De_Stuffing',
                translate: 'CFS.De_Stuffing',
                url: `${this.envService.PCSBaseURL}/Web/CFSOperations/CFSOperations#/destuffing`,
                isLink: true,
              },
              {
                description: 'Stuffing',
                workingName: 'CFS.Stuffing',
                translate: 'CFS.Stuffing',
                url: `${this.envService.PCSBaseURL}/Web/CFSOperations/CFSOperations#/stuffing`,
                isLink: true,
              },
              {
                description: 'Loose Cargo Appointment',
                workingName: 'CFS.Loose_Cargo_Appointment',
                translate: 'CFS.Loose_Cargo_Appointment',
                url: `${this.envService.PCSBaseURL}/Web/CFSOperations/CFSOperations#/loose-cargo-appointment`,
                isLink: true,
              },
              {
                description: 'Submanifest',
                workingName: 'CFS.Submanifest',
                translate: 'CFS.Submanifest',
                url: `${this.envService.PCSBaseURL}/CFSOperations/CFSOperations#/submanifest-list`,
                isLink: true,
              },
            ],
          },
        ],
      });
    }
    this.finalPCSMenu.push(
      {
        id: 'EPass',
        iconName: 'customs-clearence',
        workingName: 'MENU_EPass',
        active: false,
        translate: 'MENU_EPass',
        redirectUrl: constructURLBasedOnLang(
          this.lang,
          this.envService.EpassUrl
        ),
      },
      {
        id: 'ADPHSE',
        iconName: 'icon-nav-hse',
        translate: 'MENU_ADPHSE',
        workingName: 'MENU_ADPHSE',
        active: false,
        content: [
          {
            id: 'Worker Residential Cities',
            contentName: 'Worker Residential Cities',
            translate: 'HSE.PERMITS_SERVICES',
            menuContentList: [
              {
                description: 'Marine Permit to Work',
                workingName: 'HSE.Marine_Permit_Work',
                translate: 'HSE.Marine_Permit_Work',
                url: `${this.envService.ADPHSEUrl}/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_MARINE_PTW_NEW`,
                isLink: true,
              },
              {
                description: 'Marine Waste Services',
                workingName: 'HSE.Marine_Waste_Services',
                translate: 'HSE.Marine_Waste_Services',
                url: `${this.envService.ADPHSEUrl}/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_MARINE_WSR_NEW`,
                isLink: true,
              },
              // {
              //   description: 'Land Permit to Work',
              //   workingName: 'HSE.Land_Permit_Work',
              //   translate: 'HSE.Land_Permit_Work',
              //   url: `${this.envService.ADPHSEUrl}/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_PTW`,
              //   isLink: true,
              // },
              // {
              //   description: 'Land Waste Services',
              //   workingName: 'HSE.Land_Waste_Services',
              //   translate: 'HSE.Land_Waste_Services',
              //   url: `${this.envService.ADPHSEUrl}/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_WSR`,
              //   isLink: true,
              // },
              // {
              //   description: 'Incident Management',
              //   workingName: 'HSE.Incident_Management',
              //   translate: 'HSE.Incident_Management',
              //   url: `${this.envService.HSEBaseUrl}#/INCIDENT_MANAGEMENT`,
              //   hideMenu: this.envService.isHideIncidentManagement,
              //   isLink: true,
              // },
            ],
          },
        ],
      }
    );
    return this.finalPCSMenu;
  }

  ProcessRestrictedUser() {
    this.pcsSubscriptionService.get().subscribe(
      (subscriptionStatus) => {
        if (
          (subscriptionStatus.isRestricted &&
            !subscriptionStatus.isSuperUser) ||
          (!subscriptionStatus.isRestricted &&
            !subscriptionStatus.subscriptionRequired &&
            !subscriptionStatus.subscriptionRequired &&
            subscriptionStatus.lastSubscriptionEnd == null)
        ) {
          this.isrestrictedUser = true;
        } else {
          this.isrestrictedUser = false;
        }
      },
      (error) => {
        return this.isrestrictedUser;
      }
    );
    return this.isrestrictedUser;
  }
}

export function constructURLBasedOnLang(lang: string, url: string) {
  return lang == 'en'
    ? url
    : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
}
