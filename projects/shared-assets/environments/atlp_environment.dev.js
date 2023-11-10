function getAtlpEnvConfig() {
  return {
    loginUrl: "http://10.0.131.21/SingleSignOnLBA/Account/Login",
    tokenKey: "PCS_TOKEN",
    refreshTokenKey: "",
    userInfoUrl: "https://6065a187b8fbbd0017566e59.mockapi.io/api/v1/user/1",
    logoutUrl:
      "http://10.0.131.21/ATLP/Main/userManagementAPI/logout?application=ATLP",
    ssoDashBoardUrl: "http://10.0.131.21/SingleSignOnLBA/Account/Dashboard",
    mPayPaymentBaseUrl: "https://staging.maqta.ae/QA_MPayAPI/",
    mPayPaymentPlaceholder: "/qa_mpayapi/",
    feedbackUrl: "http://10.0.131.21/ATLP/EN/Support/#/feedback",
    trackingUrl: "http://10.0.131.21/ATLP/EN/Support/#/feedback/tracking",
    wrapperApiBaseUrl: "http://10.0.131.21/ATLP/Main/PaymentwrapperAPI/",
    notificationBaseUrl: "http://10.0.131.21/MGCore/BaseGateway/",
    usermanagementbaseUrl:
      "http://10.0.131.21/ATLP/Main/UserManagementAPI/api/v2/",
    landingBaseUrl: "http://10.0.131.21/ATLP/EN/Web/#/",
    signalRBaseUrl:
      "http://10.0.131.21/MGCore/BaseGateway/notification/apihub/NotificationHub",
    DocumentMangementApi:
      "http://10.0.131.21/ATLP/Main/DocumentManagementApi/api/",
    crmFeedBackAPI: "http://10.0.131.21/CRMFeedbackAPI/api/v1/",
    PCSPortalURL:
      "http://10.0.131.21/SingleSignOnUAEPass/Account/RedirectToPCSFromAtlp",
    AirFreightRegistrationUrl: "http://10.0.131.21/ATLP/Main/AIRWeb/EN/#",
    LandBorderUrl: "http://10.0.131.21/ATLP/EN/LBAWeb/#/lba/appointments",
    DeclarationRegistrationUrl: "http://10.0.131.21/ATLP/IC/V2/Web",
    ICDeclarationServiceUrl: "http://10.0.131.21/ATLP/EN/IACWeb/DEC/",
    ICComplimentaryServiceUrl: "http://10.0.131.21/ATLP/EN/IACWeb/COM/",
    EpassUrl: "https://pcs.maqta.ae/ePass/Web/#/",
    ADPHSEUrl:
      "https://loginstaging.atlp.ae/Account/RedirectToSenyarFromAtlp?returnUrl=/Senyar/PCS",
    HSEBaseUrl: "http://10.0.131.21/ATLP/EN/SENYAR/",
    TradeFinanceUrl: "http://10.0.131.21/ATLP/EN/VASTFIN/#/tfinnew",
    kizadEpass: "http://10.0.131.21/MGEpass/Web/#/",
    oldDesignInspectionAndClearence:
      "http://10.0.131.21/ATLP/IC/V2/Web/Home/Index#/dashboard",
    atlpCustomScriptUrl: "",
    AtlpAirDashboard:
      "http://10.0.131.21/ATLP/EN/Dashboard/PBI/#/Trade_Facilitation/air",
    AtlpSeaDashboard:
      "http://10.0.131.21/ATLP/EN/Dashboard/PBI/#/Trade_Facilitation/sea",
    UserManagementAPIVersionOne:
      "http://10.0.131.21/ATLP/Main/userManagementAPI/api/v1/",
    SenyarBaseURL: "http://10.0.131.21/ATLPSea/",
    PCSSubscriptionBaseURL: " http://10.0.131.21/SubscriptionFeeService/api/",
    baseApiUrl: "http://10.0.131.21/ATLP/Main/UserManagementAPI/api/v1/",
    PCSSubscriptionBaseURL: " http://10.0.131.21/SubscriptionFeeService/api/",
    DashboardViewerURL:
      "http://10.0.131.21/ATLP/EN/Dashboard/UI/#/ATLPDashboard/viewer",
    lookupbaseUrl: "http://10.0.131.21/ATLP/Main/MasterDataManagementAPI/api/",
    atlpFooterBaseUrl: "https://staging.atlp.ae",
    IACDecCashDisclosureUrl:
      "http://10.0.131.21/ATLP/EN/IACWeb/DEC/#/iac/customs/com/request-for-cash-disclosure",
    adegFooterBaseUrl: "http://adeg.atlp.ae",
    IACDecCashDisclosureARUrl:
      "http://10.0.131.21/ATLP/AR/IACWeb/DEC/#/iac/customs/com/request-for-cash-disclosure",
    companyInfoBaseUrl: "http://10.0.131.21/MGCore/CompanyInfoAPI/api",
    ADEGURL: "https://adegstaging.atlp.ae",
    AtlpLandDashboard:
      "http://10.0.131.21/ATLP/EN/Dashboard/PBI/#/Trade_Facilitation/land",
    svmURL:
      "http://10.0.131.21/MGCore/AtlpPortalBaseGateway/atlpdynamicforms/api/",
    ICDEDUrl: "http://10.0.131.21/ATLP/EN/IACWeb/DED/",
    mPayPaymentBaseUrlV2: "https://staging.maqta.ae/QA_MPayAPI_V2/",
    LandBorderBookingUrl:
      "http://10.0.131.21/ATLP/EN/LBAWeb/#/lba/land-booking",
    josoorSubscribeURL:
      "http://10.0.131.21/ATLP/EN/Support/#/feedback?pageType=josoor",
    userPreferenceBaseURL: "http://atlpqa/Main/UserPreferenceAPI/api/",
    InformationPortalURL: "http://Staging.atlp.ae/en",
    kizadEpassURL:
      "http://10.0.131.21/SingleSignOnUAEPass/en/Account/RedirectToEPassKizadFromAtlp",
    userManagementURL:
      "http://10.0.131.21/ATLP/EN/UMG/#/user-management/user-details-grid",
    PCSBaseURL:
      "http://10.0.131.21/SingleSignOnUAEPass/Account/RedirectToPCSFromAtlpWithRedirect?returnUrl=/ATLPSea",
    PCSHomeURL: "http://10.0.131.21/ATLPSea/Web/",
    ADAFSABaseURL: "http://10.0.131.21/ATLP/EN/IACWeb/ADAFSA/",
    ECZBaseURL: "http://10.0.131.21/ATLP/EN/eczWeb/",
    AIRBaseURL: "http://10.0.131.21/ATLP/EN/AIRWeb/",
    AIRSPBaseURL: "http://10.0.131.21/ATLP/EN/AIRSPWeb/",
    // Boolean
    isECZQA: false,
    isShowHelp: false,
    isShowSetting: true,
    isFooterCashDisProd: true,
    isFooterJosoorProd: true,
    enableJosoor: true,
    enableSessionTimeout: true,
    enableManageCompany: true,
    isShowINDKezadLeaseApplication: true,
    isShowINDKezadEPass: true,
    isShowChat: false,
    ShowTradeFinance: true,
    isPCSSubModule: true,
    isShowUserManagement: true,
    isHideCFSOperations: false,
    isHideWRCTenantServices: false,
    isHideRFSManagement: false,
    isHideICProfileManagement: false,
    isHideModifyContract: false,
    isHideIncidentManagement: false,
    isHideMobileVerification: false,
    isHidePoliceManagement: false,
  };
}
