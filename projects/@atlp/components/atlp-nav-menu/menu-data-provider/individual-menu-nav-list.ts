import { INavigationSidebarData } from 'projects/@atlp/components/atlp-nav-menu/models/INavigationSidebarData';

export function IndividualMenuData(lang: any = 'en', env: any) {
  const NAVIGATION_FIELD_DATA_MENU: INavigationSidebarData[] = [
    {
      id: 'SeaNavSectionQA',
      iconName: 'sea-nav-icon',
      workingName: 'MENU_SEA',
      active: true,
      translate: 'MENU_SEA',
      list: [
        {
          id: 'GC-Appointments',
          workingName: 'GC Appointments',
          iconName: 'icon-nav-appointment',
          active: false,
          translate: 'PCS.GC_Appointments',
          url: constructURLBasedOnLang(lang, `${env.ECZBaseURL}GC/#/list`),
          isLink: true,
        },
        {
          id: 'EPass',
          iconName: 'customs-clearence',
          workingName: 'MENU_EPass',
          active: false,
          translate: 'MENU_EPass',
          url: constructURLBasedOnLang(lang, env.EpassUrl),
          isLink: true,
          isIndividual: true,
        },
        {
          id: 'Loose_Cargo_Appointment',
          iconName: 'land-nav-icon',
          workingName: 'CFS.Loose_Cargo_Appointment',
          active: false,
          translate: 'CFS.Loose_Cargo_Appointment',
          url: constructURLBasedOnLang(
            'en',
            `${env.PCSBaseURL}/Web/CFSOperations/CFSOperations#/loose-cargo-appointment`
          ),
          isLink: true,
          isIndividual: true,
          hideMenu: env.isHideCFSOperations,
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
          id: 'LandNavSection',
          iconName: 'land-nav-icon',
          workingName: 'MENU_LAND_APPOINTMENTS',
          active: false,
          translate: 'MENU_LAND_APPOINTMENTS',
          url: constructURLBasedOnLang(lang, env.LandBorderUrl),
          isLink: true,
          isIndividual: true,
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
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Import Request',
                  translate: 'ADAFSA.Import_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/import-request`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Disposal Request',
                  translate: 'ADAFSA.Disposal_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/disposal-request`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Retest Request',
                  translate: 'ADAFSA.Retest_Request',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/retest-request`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Export Health Certificate',
                  translate: 'ADAFSA.Export_Health_Certificate',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/export-health-certificate`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Book Appointment',
                  translate: 'ADAFSA.Book_Appointment',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/book-appointment`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Letter of Undertaking',
                  translate: 'ADAFSA.Letter_of_Undertaking',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/letter-of-undertaking`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
                },
                {
                  description: 'Return to Origin',
                  translate: 'ADAFSA.Return_to_Origin',
                  url: constructURLBasedOnLang(
                    lang,
                    `${env.ADAFSABaseURL}#/customs/regulatory-service/adafsa/return-to-origin`
                  ),
                  isLink: true,
                  isProfileInfoRequired: true,
                  isIndividual: true,
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
          id: 'KEZAD-Lease-Application',
          iconName: 'customs-clearence',
          workingName: 'MENU_KEZAD_Lease_Application',
          active: false,
          translate: 'MENU_KEZAD_Lease_Application',
          url: constructURLBasedOnLang(
            lang,
            `${env.ECZBaseURL}Leasing/#/property`
          ),
          isProfileInfoRequired: true,
          isLink: true,
          isIndividual: true,
        },
        {
          id: 'economiczoneFZTruckAppoint-ind',
          workingName: 'FZ Truck Appointment',
          iconName: 'icon-nav-truck-appointments',
          active: false,
          translate: 'FZ_TRUCK_APPOINTMENT',
          url: constructURLBasedOnLang(lang, `${env.ECZBaseURL}KTA`),
          isLink: true,
        },
        {
          id: 'KEZAD-EPass',
          iconName: 'icon-epass',
          translate: 'ECZ.LLS.EPASS',
          workingName: 'EPASS-KIZAD',
          active: false,
          url: constructURLBasedOnLang(lang, env.kizadEpassURL),
          isLink: true,
          isIndividual: true,
        },
        {
          id: 'WRC-NOC_Request',
          iconName: 'icon-nav-tenant-services',
          workingName: 'NOC Request',
          active: false,
          translate: 'ECZ.WRC.NOC_Request',
          url: constructURLBasedOnLang('en', `${env.ECZBaseURL}WRC/#/noc`),
          isLink: true,
          isIndividual: true,
          hideMenu: env.isHideWRCTenantServices,
        },
      ],
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
