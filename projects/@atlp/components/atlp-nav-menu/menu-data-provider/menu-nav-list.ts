import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { INavigationSidebarData } from '../models/INavigationSidebarData';

export function MenuData(lang: string, env: AtlpEnvService) {
  const NAVIGATION_FIELD_DATA_MENU: INavigationSidebarData[] = [
    {
      id: 'AirNavSection',
      iconName: 'air-nav-icon',
      workingName: 'MENU_AIR',
      active: false,
      translate: 'MENU_AIR',
      list: [
        {
          id: 'AirNavImportsSection',
          iconName: 'customs-clearence',
          translate: 'AIR.APPOINTMENTS',
          workingName: 'Appointments',
          active: false,
          permission: ['FF'],
          content: [
            {
              id: 'Appointments',
              translate: 'AIR.APPOINTMENTS',
              contentName: 'Appointments',
              menuContentList: [
                {
                  description: 'Import Shipments',
                  workingName: 'Import Shipments',
                  translate: 'AIR.IMPORTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRBaseURL}#/air/imports`
                  ),
                  isLink: true,
                },
                {
                  description: 'Export Airway Bill',
                  workingName: 'Export Airway Bill',
                  translate: 'AIR.EXPORTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRBaseURL}#/air/exports`
                  ),
                  isLink: true,
                },
                {
                  description: 'Appointments List',
                  workingName: 'Appointments List',
                  translate: 'AIR.APPOINTMENTLIST',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRBaseURL}#/air/appointmentList`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'AirNavImportsSection',
          iconName: 'customs-clearence',
          translate: 'AIR.APPOINTMENTS',
          workingName: 'Appointments',
          active: false,
          permission: [],
          content: [
            {
              id: 'Appointments',
              translate: 'AIR.APPOINTMENTS',
              contentName: 'Appointments',
              menuContentList: [
                {
                  description: 'Import Shipments',
                  workingName: 'Import Shipments',
                  translate: 'AIR.IMPORTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/imports`
                  ),
                  isLink: true,
                },
                {
                  description: 'Export Airway Bill',
                  workingName: 'Export Airway Bill',
                  translate: 'AIR.EXPORTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/exports`
                  ),
                  isLink: true,
                },
                {
                  description: 'Appointments List',
                  workingName: 'Appointments List',
                  translate: 'AIR.APPOINTMENTLIST',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/appointmentList`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'AirNavScheduleSection',
          iconName: 'air-nav-icon',
          workingName: 'Flight Schedule',
          translate: 'AIR.SCHEDULES',
          active: false,
          permission: ['FF'],
          url: constructURLBasedOnLang(lang, `${env.AIRBaseURL}#/air/schedule`),
          isLink: true,
        },
        {
          id: 'AirNavScheduleSection',
          iconName: 'air-nav-icon',
          translate: 'AIR.SCHEDULES',
          workingName: 'Flight Schedule',
          active: false,
          permission: [],
          url: constructURLBasedOnLang(
            lang,
            `${env.AIRSPBaseURL}#/airsp/schedule`
          ),
          isLink: true,
        },
        {
          id: 'AirNavTrackSection',
          iconName: 'icon-track-&-trace',
          translate: 'AIR.TRACK_AND_TRACE',
          workingName: 'Track Cargo',
          active: false,
          permission: [],
          url: constructURLBasedOnLang(
            lang,
            `${env.AIRSPBaseURL}#/airsp/track`
          ),
          isLink: true,
        },
        {
          id: 'AirNavTrackSection',
          iconName: 'icon-track-&-trace',
          workingName: 'Track Cargo',
          translate: 'AIR.TRACK_AND_TRACE',
          active: false,
          permission: ['FF'],
          url: constructURLBasedOnLang(lang, `${env.AIRBaseURL}#/air/track`),
          isLink: true,
        },
        {
          id: 'AirNavConfigurationSection',
          iconName: 'nav-configuration-icon',
          translate: 'AIR.CONFIGURATIONS',
          workingName: 'Configuration',
          active: false,
          permission: [],
          content: [
            {
              id: 'EAS Configuration',
              contentName: 'EAS Configuration',
              translate: 'AIR.EAS_CONFIGURATION',
              menuContentList: [
                {
                  description: 'Import Appointment',
                  translate: 'AIR.IMPORTAPPOINTMENT',
                  workingName: 'Import Appointment',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/configListImport`
                  ),
                  isLink: true,
                },
                {
                  description: 'Export Appointment',
                  translate: 'AIR.EXPORTAPPOINTMENT',
                  workingName: 'Export Appointment',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/configListExport`
                  ),
                  isLink: true,
                },
                {
                  description: 'Charges',
                  translate: 'AIR.EASCHARGESCONFIG',
                  workingName: 'Charges',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/configChargesList`
                  ),
                  isLink: true,
                },
                {
                  description: 'Special Handling Codes',
                  translate: 'AIR.SPACIALHANDLINGCODES',
                  workingName: 'Special Handling Codes',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/configShcCodesList`
                  ),
                  isLink: true,
                },
                {
                  description: 'Integration Messages Entries',
                  translate: 'AIR.INTEGRATIONMESSAGESENTRIES',
                  workingName: 'Integration Messages Entries',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.AIRSPBaseURL}#/airsp/messagesflow`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'RFS-Management',
          iconName: 'land-nav-icon',
          translate: 'AIR.RFS_Management',
          workingName: 'RFS Management',
          active: false,
          permission: [],
          url: constructURLBasedOnLang(lang, `${env.AIRSPBaseURL}#/airsp/rfs`),
          isLink: true,
          hideMenu: env.isHideRFSManagement,
        },
        {
          id: 'Police-Management',
          iconName: 'default-icon-menu',
          translate: 'AIR.POLICE',
          workingName: 'Police Management',
          active: false,
          permission: ['PO'],
          url: constructURLBasedOnLang(
            lang,
            `${env.AIRSPBaseURL}#/airsp/police`
          ),
          isLink: true,
          hideMenu: env.isHidePoliceManagement,
        },
      ],
    },
    {
      id: 'LandNavSection',
      iconName: 'land-nav-icon',
      workingName: 'Value Added Services',
      translate: 'MENU_LAND',
      active: false,
      list: [
        {
          id: 'EczNavVasDlsSection',
          iconName: 'land-nav-icon',
          workingName: 'Digital Labor Services',
          translate: 'MENU_LAND_APPOINTMENTS',
          active: false,
          url: constructURLBasedOnLang(lang, env.LandBorderUrl),
          isLink: true,
        },
        {
          id: 'EczNavVasDlsSection',
          iconName: 'icon-nav-transit-booking',
          workingName: 'Digital Labor Services',
          translate: 'MENU_LAND_BOOKINGS',
          active: false,
          url: constructURLBasedOnLang(lang, env.LandBorderBookingUrl),
          isLink: true,
        },
      ],
    },
    {
      id: 'ICSection',
      iconName: 'inspection',
      workingName: 'MENU_Inspection_and_Clearance',
      active: false,
      translate: 'MENU_Inspection_and_Clearance',
      list: [
        {
          id: 'customs-clearence',
          iconName: 'customs-clearence',
          workingName: 'Customs Clearence',
          translate: 'MENU_Customs_Clearance',
          active: false,
          content: [
            {
              id: 'Clearance_of_Goods',
              contentName: 'Request for Clearance of Goods',
              translate: 'IC.Clearance_of_Goods',
              menuContentList: [
                {
                  description: 'Air Declaration',
                  translate: 'IC.Air_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/AIR`
                  ),
                  isLink: true,
                },
                {
                  description: 'Land Declaration',
                  translate: 'IC.Land_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/ROAD`
                  ),
                  isLink: true,
                },
                {
                  description: 'Sea Declaration',
                  translate: 'IC.Sea_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/SEA`
                  ),
                  isLink: true,
                },
                {
                  description: 'Free Zone Declaration',
                  translate: 'IC.Free_Zone_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/transaction-list/fz`
                  ),
                  isLink: true,
                },
                {
                  description: 'Private WareHouse Declaration',
                  translate: 'IC.Private_WareHouse_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/transaction-list/bw`
                  ),
                  isLink: true,
                },
                {
                  description: 'Re Export ADNT (Maqasa)',
                  translate: 'IC.Re_Export_ADNT',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/maqasa-create-job`
                  ),
                  isLink: true,
                },
              ],
            },
            {
              id: 'Enquiry Service',
              contentName: 'Enquiry Service',
              translate: 'IC.Enquiry_Service',
              menuContentList: [
                {
                  description: 'FZ Balance Enquiry',
                  translate: 'IC.FZ_Balance_Enquiry',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/fz-balance-enquiry`
                  ),
                  isLink: true,
                },
                {
                  description: 'BW Balance Enquiry',
                  translate: 'IC.BW_Balance_Enquiry',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/bw-balance-enquiry`
                  ),
                  isLink: true,
                },
                {
                  description: 'Customs Declaration Enquiry',
                  translate: 'IC.Customs_Declaration_Enquiry',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/previous-job-declaration`
                  ),
                  isLink: true,
                },
              ],
            },
            {
              id: 'Other_Services',
              contentName: 'Other Services',
              translate: 'IC.Other_Services',
              menuContentList: [
                {
                  description:
                    'Request for Entry/Exit Certificate to Customs Centre',
                  translate: 'IC.Certificate_Customs_Centre',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/entry-exit-certificate`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Entry/Exit Release Certificate',
                  translate: 'IC.Release_Certificate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/entry-exit-release-certificate`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for a Permit for Goods to Enter/Exit the Customs Center',
                  translate: 'IC.Permit_for_Goods',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/gate-pass`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Duties Refund',
                  translate: 'IC.Duties_Refund',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/duty-refund`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for the Refund of Deposits',
                  translate: 'IC.Refund_of_Deposits',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/deposit-refund`
                  ),
                  isLink: true,
                },
                {
                  description: 'Issuing Customs Representative Card',
                  translate: 'IC.Issuing_Customs_Representative_Card',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/issue`
                  ),
                  isLink: true,
                },
                {
                  description: 'Renewal Customs Representative Card',
                  translate: 'IC.Renewal_Customs_Representative_Card',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/card-renewal`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Replacement of Lost Customs Representative Card',
                  translate: 'IC.Lost_Customs_Representative_Card',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/card-replacement`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Access on Clearing System',
                  translate: 'IC.Access_on_Clearing_System',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/access-clearing-system`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Release Certificate',
                  translate: 'IC.Request_for_Release_Certificate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/request-release-certificate`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request to Open a Facilities Account',
                  translate: 'IC.Open_a_Facilities_Account',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/facilities-account`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Facilities Statement Services',
                  translate: 'IC.Facilities_Statement_Services',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/modify-cancel-facility-statement`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Deposit Period Extension',
                  translate: 'IC.Deposit_Period_Extension',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/deposit-period-extension`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Goods Inspection Outside Customs Premises',
                  translate: 'IC.Goods_Inspection_Outside_Customs_Premises',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/outside-customs-premises`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Accompanying the Goods',
                  translate: 'IC.Accompanying_Goods',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/request-accompany-goods`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Customs Seal',
                  translate: 'IC.Request_for_Customs_Seal',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/request-for-seal`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request For Modification of  Vehicle Customs - Clearance Certificate',
                  translate: 'IC.Modification_of_Vehicle_Customs',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/modification-vehicle-customs`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Vehicle Customs (Clearance Certificate)',
                  translate: 'IC.Request_for_Vehicle_Customs',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/vehicle-customs`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request To Reissue a Ships Manifest',
                  translate: 'IC.Reissue_a_Ships_Manifest',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/reissue-ship-manifest`
                  ),
                  isLink: true,
                },
                {
                  description: `Request for Issuance of a Ship's Manifest`,
                  translate: 'IC.Issuance_of_a_Ship_Manifest',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/issuance-ship-manifest`
                  ),
                  isLink: true,
                },
                {
                  description: 'Cash Disclosure',
                  translate: 'IC.Cash_Disclosure',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/request-for-cash-disclosure`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Registration-Licensing',
          iconName: 'customs-clearence',
          workingName: 'Registration and Licensing',
          translate: 'MENU_Registration_Licensing',
          active: false,
          content: [
            {
              id: 'Importer-Registration',
              contentName: 'Importer Registration',
              translate: 'IC.Importer_Registration',
              menuContentList: [
                {
                  description: 'Issuance of Importer Number Request',
                  translate: 'IC.Issuance_of_Importer_Number_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/importer`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Broker Permit on Private Goods for a Particular Company',
                  translate: 'IC.Broker_Permit_on_Private_Goods',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/agent-delegation`
                  ),
                  isLink: true,
                },
                {
                  description: 'Updating Importer Information',
                  translate: 'IC.Updating_Importer_Information',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/importer/update`
                  ),
                  isLink: true,
                },
                {
                  description: 'Renewing Importer Information',
                  translate: 'IC.Renewing_Importer_Information',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/renewal`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Customs-Report-Issuance',
          iconName: 'customs-clearence',
          workingName: 'Customs Report Issuance',
          translate: 'MENU_Customs_Report_Issuance',
          active: false,
          content: [
            {
              id: 'CUSTOM_CLEARNCE',
              contentName: 'Importer Registration',
              translate: 'MENU_Customs_Report_Issuance',
              menuContentList: [
                {
                  description: 'Financial Facilities',
                  translate: 'IC.Financial_Facilities',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/statistical-reports`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Company Statement (Statistical Report)',
                  translate: 'IC.Request_for_Company_Statement',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/company-statement`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for True Copy Certificate',
                  translate: 'IC.Request_for_True_Copy_Certificate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/true-copy-certificate`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Intellectual-Property-Brands',
          iconName: 'customs-clearence',
          workingName: 'Intellectual Property Brands',
          translate: 'MENU_Intellectual_Property_Brands',
          active: false,
          content: [
            {
              id: 'CUSTOM_CLEARNCE',
              contentName:
                'Intellectual Property Brands and Commercial Agencies Protection',
              translate: 'IC.Intellectual_Property_Brands',
              menuContentList: [
                {
                  description: 'Request for Commercial Agency Registration',
                  translate: 'IC.Commercial_Agency_Registration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/commercial-agency-registration`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Trademark Registration',
                  translate: 'IC.Trademark_Registration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/trademark-registration`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Notification of Trademark/Intellectual Property Infringement',
                  translate: 'IC.Notification_Trademark_Property_Infringement',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/trademark-infringement`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Financial-Facilities',
          iconName: 'customs-clearence',
          workingName: 'Financial Facilities',
          translate: 'MENU_Financial_Facilities',
          active: false,
          content: [
            {
              id: 'CUSTOM_CLEARNCE',
              contentName: 'Financial Facilities',
              translate: 'MENU_Financial_Facilities',
              menuContentList: [
                {
                  description: 'Request for Bank Guarantee Services',
                  translate: 'IC.Bank_Guarantee_Services',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/bank-guarantee`
                  ),
                  isLink: true,
                },
                {
                  description: 'Request for Updating Bank Account Information',
                  translate: 'IC.Updating_Bank_Account_Information',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/updating-bank-account`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Registering Bank Account Information',
                  translate: 'IC.Registering_Bank_Account_Information',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/registering-bank-account`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Customs-Warehouse-Licensing',
          iconName: 'customs-clearence',
          workingName: 'Customs Warehouse Licensing',
          translate: 'IC.Customs_Warehouse_Licensing',
          active: false,
          content: [
            {
              id: 'CUSTOM_CLEARNCE',
              contentName: 'Request for Licensing a Private Customs Warehouse',
              translate: 'IC.Licensing_Private_Customs_Warehouse',
              menuContentList: [
                {
                  description:
                    'Request for Licensing a Private Customs Warehouse',
                  translate: 'IC.Licensing_Private_Customs_Warehouse',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/pw-licence`
                  ),
                  isLink: true,
                },
                {
                  description:
                    'Request for Issuance of a Temporary Vehicle Entry Plate',
                  translate: 'IC.Issuance_Temporary_Vehicle_Entry_Plate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/com/temp-vehicle-entry-plate`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Profile-Management',
          iconName: 'customs-clearence',
          workingName: 'Profile Management',
          translate: 'MENU_Profile_Management',
          active: false,
          hideMenu: env.isHideICProfileManagement,
          content: [
            {
              id: 'Request-for-Profile-Management',
              contentName: 'Request for Profile Management',
              translate: 'IC.Request_for_Profile_Management',
              menuContentList: [
                {
                  description: 'My Profile',
                  translate: 'IC.My_Profile',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/my-profile`
                  ),
                  isLink: true,
                },
                {
                  description: 'Manage Company and User Profile',
                  translate: 'IC.Manage_Company_and_User_Profile',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/company-profile`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'RegulationNavSection',
      iconName: 'regulatory-nav-icon',
      workingName: 'Regulatory Authorities',
      translate: 'MENU_RegulatoryAuthorities',
      active: true,
      list: [
        {
          id: 'RegulationNavMohapSection',
          iconName: 'assets/images/mohap.png',
          workingName: 'MOHAP',
          translate: 'MENU_MOHAP',
          active: false,
          useImgPng: true,
          content: [
            {
              id: 'PERMITS',
              contentName: 'PERMITS',
              translate: 'PERMITS',
              menuContentList: [
                {
                  description: 'MOHAP Permit Enquiry',
                  workingName: 'MOHAP Permit Enquiry',
                  translate: 'PERMITENQUIRY',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/permit-enquiry`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },

        {
          id: 'RegulationNavADCCISection',
          iconName: 'assets/images/logo-adcci.svg',
          workingName: 'ADCCI',
          translate: 'MENU_ADCCI',
          active: false,
          useImgPng: true,
          content: [
            {
              id: 'PERMITS',
              contentName: 'PERMITS',
              translate: 'PERMITS',
              menuContentList: [
                {
                  description: 'ADCCI COO Enquiry',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/certificate-origin-enquiry`
                  ),
                  isLink: true,
                  workingName: 'ADCCI COO Enquiry',
                  translate: 'COOENQUIRY',
                },
              ],
            },
          ],
        },
        {
          id: 'RegulationNavAdafsaSection',
          iconName: 'assets/images/adafsa.png',
          workingName: 'ADAFSA',
          translate: 'MENU_ADAFSA',
          active: false,
          useImgPng: true,
          content: [
            {
              id: 'SERVICES',
              contentName: 'SERVICES',
              translate: 'SERVICES',
              menuContentList: [
                {
                  description: 'Food Registration',
                  translate: 'ADAFSA.Food_Registration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/food-registration`
                  ),
                  isLink: true,
                },
                {
                  description: 'Import Request',
                  translate: 'ADAFSA.Import_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/import-request`
                  ),
                  isLink: true,
                },
                {
                  description: 'Disposal Request',
                  translate: 'ADAFSA.Disposal_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/disposal-request`
                  ),
                  isLink: true,
                },
                {
                  description: 'Retest Request',
                  translate: 'ADAFSA.Retest_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/retest-request`
                  ),
                  isLink: true,
                },
                {
                  description: 'Export Health Certificate',
                  translate: 'ADAFSA.Export_Health_Certificate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/export-health-certificate`
                  ),
                  isLink: true,
                },
                {
                  description: 'Book Appointment',
                  translate: 'ADAFSA.Book_Appointment',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/book-appointment`
                  ),
                  isLink: true,
                },
                {
                  description: 'Letter of Undertaking',
                  translate: 'ADAFSA.Letter_of_Undertaking',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/letter-of-undertaking`
                  ),
                  isLink: true,
                },
                {
                  description: 'Transferred Food Shipment',
                  translate: 'ADAFSA.Transferred_Food_Shipment',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/transfer-shipment`
                  ),
                  isLink: true,
                },
                {
                  description: 'Food Recall Notification',
                  translate: 'ADAFSA.Food_Recall_Notification',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/recall-product`
                  ),
                  isLink: true,
                },
                {
                  description: 'Return to Origin',
                  translate: 'ADAFSA.Return_to_Origin',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/return-to-origin`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'RegulationNavDEDSection',
          iconName: 'assets/images/adafsa.png',
          workingName: 'DED',
          translate: 'MENU_DED',
          active: false,
          useImgPng: true,
          content: [
            {
              id: 'MAIN_SERVICES',
              contentName: 'MAIN SERVICES',
              translate: 'DED.MAIN_SERVICES',
              menuContentList: [
                {
                  description: 'Product Registration',
                  translate: 'DED.Product_Registration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDEDUrl}#/iac/ded/product-registration`
                  ),
                  isLink: true,
                },
                {
                  description: 'Excise Tax and Busines Incentive',
                  translate: 'DED.Excise_Tax_Busines_Incentive',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/taxes-and-busines-incentive`
                  ),
                  isLink: true,
                },
                {
                  description: 'Review Product Registration',
                  translate: 'DED.Review_Product_Registration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDEDUrl}#/iac/ded/review-product-registration`
                  ),
                  isLink: true,
                },
                {
                  description: 'Business Incentive Approval',
                  translate: 'DED.Business_Incentive_Approval',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/business-incentive-approval`
                  ),
                  isLink: true,
                },
                {
                  description: 'Payment of Business Incentive',
                  translate: 'DED.Payment_Business_Incentive',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/payment-for-business-incentive`
                  ),
                  isLink: true,
                },
              ],
            },
            {
              id: 'CUSTOM_CLEARNCE',
              contentName: 'CUSTOM CLEARNCE',
              translate: 'DED.CUSTOM_CLEARNCE',
              menuContentList: [
                {
                  description: 'Sea Declaration',
                  translate: 'DED.Sea_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/SEA`
                  ),
                  isLink: true,
                },
                {
                  description: 'Air Declaration',
                  translate: 'DED.Air_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/AIR`
                  ),
                  isLink: true,
                },
                {
                  description: 'Land Declaration',
                  translate: 'DED.Land_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/sal/transaction-list/ROAD`
                  ),
                  isLink: true,
                },
                {
                  description: 'Free Zone Declaration',
                  translate: 'DED.Free_Zone_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/transaction-list/fz`
                  ),
                  isLink: true,
                },
                {
                  description: 'Private WareHouse Declaration',
                  translate: 'DED.Private_WareHouse_Declaration',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ICDeclarationServiceUrl}#/iac/customs/fz-bw/transaction-list/bw`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'EczNavSection',
      iconName: 'economic-nav-icon',
      workingName: 'Economic Zones',
      translate: 'MENU_Economic_Zones',
      active: false,
      list: [
        {
          id: 'EczNavWrcSection',
          iconName: 'icon-wrc',
          translate: 'ECZ.WRC.TITLE',
          workingName: 'Worker Residential Cities',
          active: false,
          content: [
            {
              id: 'Worker Residential Cities',
              contentName: 'Worker Residential Cities',
              translate: 'ECZ.WRC.TITLE',
              menuContentList: [
                {
                  description: 'Tenants',
                  workingName: 'ECZ.WRC.TENANTS',
                  translate: 'ECZ.WRC.TENANTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}WRC/#/tenants`
                  ),
                  isLink: true,
                },

                {
                  description: 'Tenant Contract',
                  workingName: 'ECZ.WRC.CONTRACTS',
                  translate: 'ECZ.WRC.CONTRACTS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}WRC/#/contracts`
                  ),
                  isLink: true,
                },
                {
                  description: 'Audit',
                  workingName: 'ECZ.WRC.AUDITS',
                  translate: 'ECZ.WRC.AUDITS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}WRC/#/audit`
                  ),
                  isLink: true,
                },
                {
                  description: 'Inspections',
                  workingName: 'ECZ.WRC.INSPECTIONS',
                  translate: 'ECZ.WRC.INSPECTIONS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}WRC/#/inspections`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'EczNavLlsSection',
          iconName: 'icon-properties',
          translate: 'ECZ.Properties.MENU',
          workingName: 'Properties',
          active: false,
          content: [
            {
              id: 'New Lease Services',
              contentName: 'New Lease Services',
              translate: 'ECZ.Properties.NEW',
              menuContentList: [
                {
                  description: 'Leasing Service',
                  translate: 'ECZ.LLS.LEASING',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}Leasing/#/property/NewLease`
                  ),
                  isLink: true,
                },
                {
                  description: 'Applications Overview',
                  translate: 'ECZ.LLS.PROPERTY',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}Leasing/#/property`
                  ),
                  isLink: true,
                },

                {
                  description: 'Invoice',
                  translate: 'ECZ.LLS.PROPERTY_INVOICE',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}Leasing/#/invoice`
                  ),
                  isLink: true,
                },
              ],
            },
            {
              id: 'Planning Service',
              contentName: 'Planning Service',
              translate: 'ECZ.LLS.PLANNING',
              menuContentList: [
                {
                  description: 'Detailed Planning Service',
                  translate: 'ECZ.LLS.DETAIL_PLANNING',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}LLS/#/leasing/planningService/detail`
                  ),
                  isLink: true,
                },
                {
                  description: 'Amend Detailed Planning Service',
                  translate: 'ECZ.LLS.AMEND_PLANNING',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}LLS/#/leasing/planningService/amend`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'nocServiceRequest',
          iconName: 'icon-noc-service-requests',
          translate: 'ECZ.NOC.MENU',
          workingName: 'NOC & Service Requests',
          active: false,
          content: [
            {
              id: 'Common_Services',
              contentName: 'Common Services',
              translate: 'ECZ.NOC.CS',
              menuContentList: [
                {
                  description: 'Service Requests',
                  translate: 'ECZ.NOC.SR',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}ciz/#/commonservices`
                  ),
                  isLink: true,
                },
              ],
            },
            {
              id: 'Freezone_Services',
              contentName: 'Freezone Services',
              translate: 'ECZ.NOC.FS',
              menuContentList: [
                {
                  description: 'Initial Approvals',
                  translate: 'ECZ.NOC.APPROVALS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/initialApprovals`
                  ),
                  isLink: true,
                },
                {
                  description: 'Business Setup',
                  translate: 'ECZ.NOC.BS',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/businessSetup`
                  ),
                  isLink: true,
                },
                {
                  description: 'Company Registry Extract',
                  translate: 'ECZ.NOC.CRE',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/companyRegistery`
                  ),
                  isLink: true,
                },
                {
                  description: 'License Amendment',
                  translate: 'ECZ.NOC.LICENSE',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/license`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'EczNavDlsSection',
          iconName: 'icon-employee-services',
          workingName: 'Employee Services',
          translate: 'VAS.EMP_SERVICES',
          active: false,
          content: [
            {
              id: 'Free Zone Employee Services',
              contentName: 'Free Zone Employee Services',
              translate: 'VAS.FREE_ZONE',
              menuContentList: [
                {
                  description: 'Residence Visas',
                  translate: 'VAS.RESIDENT_VISA',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/visa/requestsummary`
                  ),
                  isLink: true,
                },
                {
                  description: 'ID / Access Card',
                  translate: 'VAS.ID_CARD',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/idcard/requestsummary`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'SharedNavSubSection',
          iconName: 'icon-nav-establishment-card',
          workingName: 'Establishment Cards',
          translate: 'VAS.EST_CARD',
          active: false,
          content: [
            {
              id: 'Est_CARD',
              contentName: 'Establishment Cards Services',
              translate: 'VAS.EST_CARD',
              menuContentList: [
                {
                  description: 'Establishment Cards',
                  translate: 'VAS.EST_CARD',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}DLS/#/estcards`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'economiczoneInvoices',
          iconName: 'icon-invoices',
          translate: 'ECZ.LLS.LLS_INVOICES',
          workingName: 'Invoices',
          active: false,
          url: constructURLBasedOnLang('en', `${env.ECZBaseURL}LLS/#/invoices`),
          isLink: true,
        },
        {
          id: 'economiczoneReceipts',
          iconName: 'icon-receipts',
          translate: 'ECZ.LLS.LLS_RECEIPTS',
          workingName: 'Receipts',
          active: false,
          url: constructURLBasedOnLang('en', `${env.ECZBaseURL}LLS/#/receipts`),
          isLink: true,
        },
        {
          id: 'economiczoneEpass',
          iconName: 'icon-epass',
          translate: 'ECZ.LLS.EPASS',
          workingName: 'EPASS-KIZAD',
          active: false,
          url: constructURLBasedOnLang('en', env.kizadEpass),
          isLink: true,
        },
        {
          id: 'economiczoneFZTruckAppoint',
          iconName: 'icon-nav-truck-appointments',
          workingName: 'FZ_TRUCK_APPOINTMENT',
          active: false,
          translate: 'FZ_TRUCK_APPOINTMENT',
          url: constructURLBasedOnLang(lang, `${env.ECZBaseURL}KTA`),
          isLink: true,
        },
        {
          id: 'WRCTenantServices',
          iconName: 'icon-nav-tenant-services',
          workingName: 'WRC Tenant Services',
          translate: 'ECZ.WRC.WRC_Tenant_Services',
          active: false,
          hideMenu: env.isHideWRCTenantServices,
          content: [
            {
              id: 'TenantServices',
              contentName: 'TenantServices',
              translate: 'ECZ.WRC.Tenant_Services',
              menuContentList: [
                {
                  description: 'WRC NOC Request',
                  translate: 'ECZ.WRC.NOC_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}WRC/#/noc`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
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
                  description: 'Land Permit to Work',
                  workingName: 'HSE.Land_Permit_Work',
                  translate: 'HSE.Land_Permit_Work',
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_PTW',
                  isLink: true,
                },
                {
                  description: 'Land Waste Services',
                  workingName: 'HSE.Land_Waste_Services',
                  translate: 'HSE.Land_Waste_Services',
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_WSR',
                  isLink: true,
                },
                {
                  description: 'Incident Management',
                  workingName: 'HSE.Incident_Management',
                  translate: 'HSE.Incident_Management',
                  url: `${env.HSEBaseUrl}#/INCIDENT_MANAGEMENT`,
                  hideMenu: env.isHideIncidentManagement,
                  isLink: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'SharedServiceNavSection',
      iconName: 'shared-nav-icon',
      workingName: 'Value Added Services',
      translate: 'VAS.MENU',
      active: false,
      list: [
        {
          id: 'EczNavVasDlsSection',
          iconName: 'icon-nav-dls',
          workingName: 'Digital Labor Services',
          translate: 'VAS.DLS',
          active: false,
          content: [
            {
              id: 'Worker Residential Cities',
              contentName: 'VAS.DLS',
              menuContentList: [
                {
                  description: 'All Requests',
                  workingName: 'VAS.VAS_ALL',
                  translate: 'VAS.VAS_ALL',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list`
                  ),
                  isLink: true,
                },
                {
                  description: 'New Requests',
                  workingName: 'VAS.NEW_REQUEST',
                  translate: 'VAS.NEW_REQUEST',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/new`
                  ),
                  isLink: true,
                },
                {
                  description: 'Renew Requests',
                  workingName: 'VAS.RENEW_REQUEST',
                  translate: 'VAS.RENEW_REQUEST',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/renew`
                  ),
                  isLink: true,
                },
                {
                  description: 'Cancel Requests',
                  workingName: 'VAS.CANCEL_REQUEST',
                  translate: 'VAS.CANCEL_REQUEST',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/cancel`
                  ),
                  isLink: true,
                },
                {
                  description: 'Emirates ID Requests',
                  workingName: 'VAS.EMID',
                  translate: 'VAS.EMID',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/emiratesid`
                  ),
                  isLink: true,
                },
                {
                  description: 'Modify Person Info Requests',
                  workingName: 'VAS.MPI',
                  translate: 'VAS.MPI',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/modifypersoninfo`
                  ),
                  isLink: true,
                },
                {
                  description: 'Quota Request',
                  workingName: 'VAS.Quota_Request',
                  translate: 'VAS.Quota_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/quotaRequest`
                  ),
                  isLink: true,
                },
                {
                  description: 'Modify Contract',
                  workingName: 'VAS.Modify_Contract',
                  translate: 'VAS.Modify_Contract',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/list/modifyContract`
                  ),
                  isLink: true,
                  hideMenu: env.isHideModifyContract,
                },
                {
                  description: 'Invoices',
                  workingName: 'VAS.INVOICE',
                  translate: 'VAS.INVOICE',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/invoices`
                  ),
                  isLink: true,
                },
                {
                  description: 'Labour History',
                  workingName: 'VAS.LABOUR_HISTORY',
                  translate: 'VAS.LABOUR_HISTORY',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ECZBaseURL}VASDLS/#/vasdls/labour-history-list`
                  ),
                  isLink: true,
                },
              ],
            },
          ],
        },
        {
          id: 'Finance',
          iconName: 'icon-nav-financial-services',
          workingName: 'MENU_TRADE_FINANCE',
          active: false,
          translate: 'MENU_TRADE_FINANCE',
          hideMenu: !env.ShowTradeFinance,
          url: constructURLBasedOnLang(lang, env.TradeFinanceUrl),
          isLink: true,
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
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_MARINE_PTW_NEW',
                  isLink: true,
                },
                {
                  description: 'Marine Waste Services',
                  workingName: 'HSE.Marine_Waste_Services',
                  translate: 'HSE.Marine_Waste_Services',
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_MARINE_WSR_NEW',
                  isLink: true,
                },
                {
                  description: 'Land Permit to Work',
                  workingName: 'HSE.Land_Permit_Work',
                  translate: 'HSE.Land_Permit_Work',
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_PTW',
                  isLink: true,
                },
                {
                  description: 'Land Waste Services',
                  workingName: 'HSE.Land_Waste_Services',
                  translate: 'HSE.Land_Waste_Services',
                  url:
                    env.ADPHSEUrl +
                    '/Web/Senyar/Senyar/#/permit-request/dashboard/SENYAR_LAND_WSR',
                  isLink: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'CustomNavSection',
      iconName: 'customs-nav-icon',
      workingName: 'Customs',
      translate: 'MENU_Customs',
      active: true,
    },
    {
      id: 'ADEGSection',
      iconName: 'adeg-icon',
      workingName: 'MENU_Export_Gateway',
      active: true,
      translate: 'MENU_Export_Gateway',
      url: constructURLBasedOnLangEnd(lang, env.ADEGURL),
      isLink: true,
    },
    {
      id: 'Josoor',
      iconName: 'icon-nav-josoor-logo',
      workingName: 'Josoor',
      active: false,
      translate: 'JOSOOR.Title',
      hideMenu: !env.enableJosoor,
      list: [
        {
          id: 'Josoor-Join_Now',
          iconName: 'economic-nav-icon',
          translate: 'JOSOOR.Title',
          workingName: 'JOSOOR',
          active: false,
          openSideBar: 'josoor',
        },
        {
          id: 'Josoor-subscribe',
          iconName: 'economic-nav-icon',
          translate: 'JOSOOR.SUBSCRIBE',
          workingName: 'Josoor Subscribe',
          active: false,
          url: constructURLBasedOnLang(lang, env.josoorSubscribeURL),
          isLink: true,
        },
      ],
    },
    {
      id: 'Information_Portal',
      iconName: 'Informational-services-nav-icon',
      workingName: 'Information_Portal',
      active: true,
      translate: 'MENU_Information_Portal',
      url: constructURLBasedOnLangEnd(lang, env.InformationPortalURL),
      isLink: true,
    },
  ];

  return NAVIGATION_FIELD_DATA_MENU;
}

export function constructURLBasedOnLang(lang: string, url: string) {
  return lang == 'en'
    ? url
    : url?.replace('/en/', '/AR/')?.replace('/EN/', '/AR/');
}

export function constructURLBasedOnLangEnd(lang: string, url: string) {
  return lang == 'en' ? url : url?.replace('/en', '/ar')?.replace('/EN', '/AR');
}
