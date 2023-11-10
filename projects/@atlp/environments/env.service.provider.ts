import { AtlpEnvService } from './env.service';

interface AtlpWindowData {
  isLocalHost: boolean;
  loginUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  userInfoUrl: string;
  logoutUrl: string;
  ssoDashBoardUrl: string;
  mPayPaymentBaseUrl: string;
  mPayPaymentBaseUrlV2: string;
  mPayPaymentPlaceholder: string;
  feedbackUrl: string;
  trackingUrl: string;
  wrapperApiBaseUrl: string;
  notificationBaseUrl: string;
  landingBaseUrl: string;
  signalRBaseUrl: string;
  usermanagementbaseUrl: string;
  DocumentMangementApi: string;
  crmFeedBackAPI: string;
  PCSPortalURL: string;
  AirFreightRegistrationUrl: string;
  LandBorderUrl: string;
  DeclarationRegistrationUrl: string;
  ICComplimentaryServiceUrl: string;
  ICDeclarationServiceUrl: string;
  EpassUrl: string;
  ADPHSEUrl: string;
  HSEBaseUrl: string;
  isHideModifyContract: boolean;
  isHideIncidentManagement: boolean;
  TradeFinanceUrl: string;
  kizadEpass: string;
  isECZQA: boolean;
  oldDesignInspectionAndClearence: string;
  // WRCService:string;
  atlpCustomScriptUrl: string;
  AtlpSeaDashboard: string;
  AtlpAirDashboard: string;
  UserManagementAPIVersionOne: string;
  userManagementURL: String;
  isShowUserManagement: boolean;
  SenyarBaseURL: string;
  PCSSubscriptionBaseURL: string;
  baseApiUrl: string;
  isPCSSubModule: boolean;
  PCSHomeURL: string;
  PCSBaseURL: string;
  DashboardViewerURL: string;
  isShowHelp: boolean;
  isShowSetting: boolean;
  lookupbaseUrl: string;
  atlpFooterBaseUrl: string;
  IACDecCashDisclosureUrl: string;
  adegFooterBaseUrl: string;
  IACDecCashDisclosureARUrl: string;
  isFooterCashDisProd: boolean;
  isFooterJosoorProd: boolean;
  companyInfoBaseUrl: string;
  ADEGURL: string;
  josoorSubscribeURL: string;
  enableJosoor: boolean;
  AtlpLandDashboard: string;
  svmURL: string;
  enableSessionTimeout: boolean;
  enableManageCompany: boolean;
  ICDEDUrl: string;
  LandBorderBookingUrl: string;
  ShowTradeFinance: boolean;
  userPreferenceBaseURL: string;
  ADAFSABaseURL: string;
  InformationPortalURL: string;
  kizadEpassURL: string;
  isShowINDKezadLeaseApplication: boolean;
  isShowINDKezadEPass: boolean;
  isShowChat: boolean;
  ECZBaseURL: string;
  AIRBaseURL: string;
  AIRSPBaseURL: string;
  isHideCFSOperations: boolean;
  isHideWRCTenantServices: boolean;
  isHideRFSManagement: boolean;
  isHideICProfileManagement: boolean;
  isHideMobileVerification: boolean;
  isHidePoliceManagement: boolean;
}

export const atlpConfig: AtlpWindowData = {
  isLocalHost: false,
  loginUrl: '',
  tokenKey: '',
  refreshTokenKey: '',
  userInfoUrl: '',
  logoutUrl: '',
  ssoDashBoardUrl: '',
  mPayPaymentBaseUrl: '',
  mPayPaymentBaseUrlV2: '',
  mPayPaymentPlaceholder: '',
  feedbackUrl: '',
  trackingUrl: '',
  wrapperApiBaseUrl: '',
  notificationBaseUrl: '',
  usermanagementbaseUrl: '',
  landingBaseUrl: '',
  signalRBaseUrl: '',
  DocumentMangementApi: '',
  crmFeedBackAPI: '',
  PCSPortalURL: '',
  AirFreightRegistrationUrl: '',
  LandBorderUrl: '',
  DeclarationRegistrationUrl: '',
  ICComplimentaryServiceUrl: '',
  ICDeclarationServiceUrl: '',
  EpassUrl: '',
  ADPHSEUrl: '',
  HSEBaseUrl: '',
  TradeFinanceUrl: '',
  kizadEpass: '',
  isECZQA: false,
  oldDesignInspectionAndClearence: '',
  atlpCustomScriptUrl: '',
  AtlpSeaDashboard: '',
  AtlpAirDashboard: '',
  UserManagementAPIVersionOne: '',
  userManagementURL: '',
  isShowUserManagement: false,
  SenyarBaseURL: '',
  PCSSubscriptionBaseURL: '',
  baseApiUrl: '',
  isPCSSubModule: false,
  PCSHomeURL: '',
  PCSBaseURL: '',
  DashboardViewerURL: '',
  isShowHelp: false,
  isShowSetting: false,
  lookupbaseUrl: '',
  atlpFooterBaseUrl: '',
  IACDecCashDisclosureUrl: '',
  adegFooterBaseUrl: '',
  IACDecCashDisclosureARUrl: '',
  isFooterCashDisProd: true,
  isFooterJosoorProd: true,
  companyInfoBaseUrl: '',
  ADEGURL: '',
  josoorSubscribeURL: '',
  enableJosoor: true,
  AtlpLandDashboard: '',
  svmURL: '',
  enableSessionTimeout: true,
  enableManageCompany: true,
  ICDEDUrl: '',
  LandBorderBookingUrl: '',
  ShowTradeFinance: true,
  userPreferenceBaseURL: '',
  ADAFSABaseURL: '',
  InformationPortalURL: '',
  isHideModifyContract: true,
  isHideIncidentManagement: true,
  kizadEpassURL: '',
  isShowINDKezadLeaseApplication: true,
  isShowINDKezadEPass: true,
  isShowChat: true,
  ECZBaseURL: '',
  AIRBaseURL: '',
  AIRSPBaseURL: '',
  isHideCFSOperations: true,
  isHideWRCTenantServices: true,
  isHideRFSManagement: true,
  isHideICProfileManagement: true,
  isHideMobileVerification: true,
  isHidePoliceManagement: true,
};

if (location.host == '' || location.host.includes('localhost')) {
  atlpConfig.isLocalHost = true;
} else {
  atlpConfig.isLocalHost = false;
}

declare const getAtlpEnvConfig: any;
const atlpEnvConfig = getAtlpEnvConfig();
atlpConfig.loginUrl = atlpEnvConfig.loginUrl;
atlpConfig.tokenKey = atlpEnvConfig.tokenKey;
atlpConfig.refreshTokenKey = atlpEnvConfig.refreshTokenKey;
atlpConfig.userInfoUrl = atlpEnvConfig.userInfoUrl;
atlpConfig.logoutUrl = atlpEnvConfig.logoutUrl;
atlpConfig.ssoDashBoardUrl = atlpEnvConfig.ssoDashBoardUrl;
atlpConfig.mPayPaymentBaseUrl = atlpEnvConfig.mPayPaymentBaseUrl;
atlpConfig.mPayPaymentBaseUrlV2 = atlpEnvConfig.mPayPaymentBaseUrlV2;
atlpConfig.mPayPaymentPlaceholder = atlpEnvConfig.mPayPaymentPlaceholder;
atlpConfig.feedbackUrl = atlpEnvConfig.feedbackUrl;
atlpConfig.trackingUrl = atlpEnvConfig.trackingUrl;
atlpConfig.wrapperApiBaseUrl = atlpEnvConfig.wrapperApiBaseUrl;
atlpConfig.notificationBaseUrl = atlpEnvConfig.notificationBaseUrl;
atlpConfig.usermanagementbaseUrl = atlpEnvConfig.usermanagementbaseUrl;
atlpConfig.landingBaseUrl = atlpEnvConfig.landingBaseUrl;
atlpConfig.signalRBaseUrl = atlpEnvConfig.signalRBaseUrl;
atlpConfig.DocumentMangementApi = atlpEnvConfig.DocumentMangementApi;
atlpConfig.crmFeedBackAPI = atlpEnvConfig.crmFeedBackAPI;
atlpConfig.PCSPortalURL = atlpEnvConfig.PCSPortalURL;
atlpConfig.AirFreightRegistrationUrl = atlpEnvConfig.AirFreightRegistrationUrl;
atlpConfig.LandBorderUrl = atlpEnvConfig.LandBorderUrl;
atlpConfig.DeclarationRegistrationUrl =
  atlpEnvConfig.DeclarationRegistrationUrl;
atlpConfig.ICComplimentaryServiceUrl = atlpEnvConfig.ICComplimentaryServiceUrl;
atlpConfig.ICDeclarationServiceUrl = atlpEnvConfig.ICDeclarationServiceUrl;
atlpConfig.EpassUrl = atlpEnvConfig.EpassUrl;
atlpConfig.ADPHSEUrl = atlpEnvConfig.ADPHSEUrl;
atlpConfig.HSEBaseUrl = atlpEnvConfig.HSEBaseUrl;
atlpConfig.TradeFinanceUrl = atlpEnvConfig.TradeFinanceUrl;
atlpConfig.kizadEpass = atlpEnvConfig.kizadEpass;
atlpConfig.isECZQA = atlpEnvConfig.isECZQA;
atlpConfig.oldDesignInspectionAndClearence =
  atlpEnvConfig.oldDesignInspectionAndClearence;
atlpConfig.atlpCustomScriptUrl = atlpEnvConfig.atlpCustomScriptUrl;
atlpConfig.AtlpSeaDashboard = atlpEnvConfig.AtlpSeaDashboard;
atlpConfig.AtlpAirDashboard = atlpEnvConfig.AtlpAirDashboard;
atlpConfig.UserManagementAPIVersionOne =
  atlpEnvConfig.UserManagementAPIVersionOne;
atlpConfig.userManagementURL = atlpEnvConfig.userManagementURL;
atlpConfig.isShowUserManagement = atlpEnvConfig.isShowUserManagement;
atlpConfig.SenyarBaseURL = atlpEnvConfig.SenyarBaseURL;
atlpConfig.PCSSubscriptionBaseURL = atlpEnvConfig.PCSSubscriptionBaseURL;
atlpConfig.baseApiUrl = atlpEnvConfig.baseApiUrl;
atlpConfig.isPCSSubModule = atlpEnvConfig.isPCSSubModule;
atlpConfig.PCSHomeURL = atlpEnvConfig.PCSHomeURL;
atlpConfig.PCSBaseURL = atlpEnvConfig.PCSBaseURL;
atlpConfig.DashboardViewerURL = atlpEnvConfig.DashboardViewerURL;
atlpConfig.isShowHelp = atlpEnvConfig.isShowHelp;
atlpConfig.isShowSetting = atlpEnvConfig.isShowSetting;
atlpConfig.lookupbaseUrl = atlpEnvConfig.lookupbaseUrl;
atlpConfig.atlpFooterBaseUrl = atlpEnvConfig.atlpFooterBaseUrl;
atlpConfig.IACDecCashDisclosureUrl = atlpEnvConfig.IACDecCashDisclosureUrl;
atlpConfig.adegFooterBaseUrl = atlpEnvConfig.adegFooterBaseUrl;
atlpConfig.IACDecCashDisclosureARUrl = atlpEnvConfig.IACDecCashDisclosureARUrl;
atlpConfig.isFooterCashDisProd = atlpEnvConfig.isFooterCashDisProd;
atlpConfig.isFooterJosoorProd = atlpEnvConfig.isFooterJosoorProd;
atlpConfig.companyInfoBaseUrl = atlpEnvConfig.companyInfoBaseUrl;
atlpConfig.ADEGURL = atlpEnvConfig.ADEGURL;
atlpConfig.josoorSubscribeURL = atlpEnvConfig.josoorSubscribeURL;
atlpConfig.enableJosoor = atlpEnvConfig.enableJosoor;
atlpConfig.AtlpLandDashboard = atlpEnvConfig.AtlpLandDashboard;
atlpConfig.svmURL = atlpEnvConfig.svmURL;
atlpConfig.enableSessionTimeout = atlpEnvConfig.enableSessionTimeout;
atlpConfig.enableManageCompany = atlpEnvConfig.enableManageCompany;
atlpConfig.ICDEDUrl = atlpEnvConfig.ICDEDUrl;
atlpConfig.LandBorderBookingUrl = atlpEnvConfig.LandBorderBookingUrl;
atlpConfig.ShowTradeFinance = atlpEnvConfig.ShowTradeFinance;
atlpConfig.userPreferenceBaseURL = atlpEnvConfig.userPreferenceBaseURL;
atlpConfig.ADAFSABaseURL = atlpEnvConfig.ADAFSABaseURL;
atlpConfig.InformationPortalURL = atlpEnvConfig.InformationPortalURL;
atlpConfig.kizadEpassURL = atlpEnvConfig.kizadEpassURL;
atlpConfig.isShowINDKezadLeaseApplication =
  atlpEnvConfig.isShowINDKezadLeaseApplication;
atlpConfig.isShowINDKezadEPass = atlpEnvConfig.isShowINDKezadEPass;
atlpConfig.isShowChat = atlpEnvConfig.isShowChat;
atlpConfig.ECZBaseURL = atlpEnvConfig.ECZBaseURL;
atlpConfig.AIRBaseURL = atlpEnvConfig.AIRBaseURL;
atlpConfig.AIRSPBaseURL = atlpEnvConfig.AIRSPBaseURL;
atlpConfig.isHideCFSOperations = atlpEnvConfig.isHideCFSOperations;
atlpConfig.isHideWRCTenantServices = atlpEnvConfig.isHideWRCTenantServices;
atlpConfig.isHideRFSManagement = atlpEnvConfig.isHideRFSManagement;
atlpConfig.isHideICProfileManagement = atlpEnvConfig.isHideICProfileManagement;
atlpConfig.isHideModifyContract = atlpEnvConfig.isHideModifyContract;
atlpConfig.isHideIncidentManagement = atlpEnvConfig.isHideIncidentManagement;
atlpConfig.isHideMobileVerification = atlpEnvConfig.isHideMobileVerification;
atlpConfig.isHidePoliceManagement = atlpEnvConfig.isHidePoliceManagement;

if (!window['_atlp_env']) {
  window['_atlp_env'] = {};
}
Object.assign(window['_atlp_env'], atlpConfig);

export const AtlpEnvServiceFactory = () => {
  // Create env
  const env = new AtlpEnvService() as any;

  // Read environment variables from browser window
  const browserWindow = (window || {}) as any;
  const browserWindowEnv = browserWindow._atlp_env || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = (window as any)._atlp_env[key];
    }
  }

  return env;
};

export const AtlpEnvServiceProvider = {
  provide: AtlpEnvService,
  useFactory: AtlpEnvServiceFactory,
  deps: [],
};
