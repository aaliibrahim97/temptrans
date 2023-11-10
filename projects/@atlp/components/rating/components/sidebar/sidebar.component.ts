import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControlName } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { ITokenParseModel } from 'projects/@atlp/auth/interfaces/ITokenParseModel';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { SnakBarService } from 'projects/@atlp/components/snak-bars/service/snak-bar-default.component';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { processErrors } from 'projects/@atlp/core/helpers/process-errors.helper';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { HappinessIndexService } from 'projects/@atlp/services/happiness-index.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserInfoService } from 'projects/@atlp/services/user-info.service';
import { HappinessIndexEnum } from '../happiness-index.enum';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'rating-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @Output() ratingCount = new EventEmitter<any>();
  @ViewChild(CarouselComponent) carouselComponent: CarouselComponent;
  ratingEnum = HappinessIndexEnum;
  SidebarName = SidebarName;
  emojis: Array<any>;
  servicesList: Array<any>;
  selectedEmoji: number;
  submitted: boolean;
  disabled: boolean;
  checked: boolean;
  clicked: boolean;
  feedback: string = '';
  emojiText: string = '';
  selectedLanguage: string = '';
  userInfoFromToken: ITokenParseModel;
  isOpenSuggestion: boolean = false;
  isLastTransaction: boolean = false;
  /**
   * Constructor
   * @param _breakpointObserver
   * @param _changeDetectorRef
   * @param {IconsService} _iconsService
   * @param {AtlpSidebarV2Service} _atplSidebarService
   */
  constructor(
    public defaultSnakBar: SnakBarService,
    public translate: TranslateService,
    private _atplSidebarService: AtlpSidebarV2Service,
    private _iconsService: IconsService,
    private _snackBar: MatSnackBar,
    private userInfoService: UserInfoService,
    private atlpTranslationService: AtlpTranslationService,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface,
    private happinessIndexService: HappinessIndexService
  ) {
    this._iconsService.registerIcons(this.icons);
    this.selectedEmoji = 0;
    this.submitted = false;
    this.disabled = true;
    this.checked = false;
    this.checked = false;
    this.emojis = [
      {
        id: this.ratingEnum.VerySad,
        icon: 'emoji-happiness-1',
        value: 'icon1',
        text: 'Angry',
      },
      {
        id: this.ratingEnum.Sad,
        icon: 'emoji-happiness-2',
        value: 'icon2',
        text: 'Sad',
      },
      // { id: this.ratingEnum.Neutral, icon: "emoji-happiness-3", value: "icon3", text: "Neutral" },
      {
        id: this.ratingEnum.Happy,
        icon: 'emoji-happiness-4',
        value: 'icon4',
        text: 'Happy',
      },
      {
        id: this.ratingEnum.VeryHappy,
        icon: 'emoji-happiness-5',
        value: 'icon5',
        text: 'Very_Happy',
      },
    ];
  }

  ngOnInit(): void {
    this.getLanguage();
    this.userInfoFromToken = this.authService.userDataFromToken();
    this.happinessIndexService.triggerHappinessIndex.subscribe((res) => {
      if (res == 'changed') {
        this.getServiceList();
      }
    });

    setTimeout(() => {
      this.getServiceList();
    }, 5000);
  }

  getLanguage() {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    if (this.carouselComponent) {
      this.carouselComponent.reSizeCarousel();
    }
  }

  getServiceList() {
    let userInfo = null;
    let userName = null;
    let UCID = null;
    const selectedCompanyID = localStorage.getItem('selectedCompanyID');
    if (selectedCompanyID) {
      // this.userInfoService.getUserInfo().subscribe((resp: any) => {
      try {
        if (
          this.userInfoService.getUserInfoDetails() &&
          this.userInfoService.getUserInfoDetails()?.data
        ) {
          userInfo = this.userInfoService.getUserInfoDetails()?.data;
          userName = userInfo?.emailAddress;
          if (!userName) {
            userName =
              this.userInfoFromToken && this.userInfoFromToken.UserName
                ? this.userInfoFromToken.UserName
                : '';
          }
          const company = userInfo.organizations.filter(
            (x: any) => x.id == selectedCompanyID
          );
          UCID =
            company &&
            company.length &&
            company[0]?.contactType?.toUpperCase() == 'INDIVIDUAL'
              ? company[0]?.contactType?.toUpperCase()
              : company[0]?.ucid;
          if (userName && UCID) {
            this.happinessIndexService
              .getAllTranscation(userName, UCID)
              .subscribe(
                (res) => {
                  if (res && res?.data && res?.data?.length > 0) {
                    this.servicesList = res?.data?.length > 0 ? res?.data : [];
                    this.servicesList.forEach((item) => {
                      if (item?.transactionServiceName) {
                        let transactionServiceName = JSON.parse(
                          item?.transactionServiceName
                        );
                        item.transactionName =
                          transactionServiceName &&
                          (this.selectedLanguage == 'en'
                            ? transactionServiceName['en-US']
                            : this.selectedLanguage == 'ar' ||
                              this.selectedLanguage == 'ae'
                            ? transactionServiceName['ar-AE']
                            : '');
                      }
                    });
                  } else {
                    this.servicesList = [];
                  }
                  this.ratingCount.emit(this.servicesList?.length);
                },
                (error) => {
                  const errorMsg =
                    error?.errorlst && error?.errorlst?.length
                      ? processErrors(error?.errorlst)
                      : error?.msg;
                  if (errorMsg) {
                    this.defaultSnakBar.error(errorMsg);
                  }
                }
              );
          } else {
            this.servicesList = [];
            this.ratingCount.emit(this.servicesList?.length);
            throw new Error('no UCID available');
          }
        } else {
          throw new Error('no userInfo available');
        }
      } catch (error) {
        // console.log(error); // will be removed in future
      }
      // });
    }
  }

  public setIsClicked(data: any, index): void {
    this.servicesList[index].rate = data.id;
    this.emojiText = data.text;
    this.submitted = true;
    this.servicesList[index].isFeedback = true;
    if ((data.id == 4 || data.id == 5) && !this.servicesList[index].feedback) {
      this.servicesList[index].disabled = true;
    } else if (
      this.servicesList[index].feedback &&
      this.servicesList[index].feedback.length < 10
    ) {
      this.servicesList[index].disabled = true;
    } else {
      this.servicesList[index].disabled = false;
    }
  }

  validateFeedback(index: any, ele: FormControlName) {
    let controls = ele.control;
    if (
      (this.servicesList[index].rate == 4 ||
        this.servicesList[index].rate == 5) &&
      !this.servicesList[index].feedback
    ) {
      this.servicesList[index].disabled = true;
    } else if (controls?.errors?.minlength) {
      this.servicesList[index].disabled = true;
    } else {
      this.servicesList[index].disabled = false;
    }
  }

  public toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  onSubmit(data: any, index: number) {
    if (
      this.servicesList[index].rate == 4 ||
      this.servicesList[index].rate == 5
    ) {
      if (data?.feedback?.trim()?.length == 0) {
        this.defaultSnakBar.error(
          this.translate.instant('feedback_empty_spaces')
        );
      } else {
        this.updateRating(data);
      }
    } else {
      this.updateRating(data);
    }
  }

  updateRating(data: any) {
    let userInfo = null;
    if (
      this.userInfoService.userInfoDetails &&
      this.userInfoService.userInfoDetails.data != null
    ) {
      userInfo = this.userInfoService.userInfoDetails.data
        ? this.userInfoService.userInfoDetails.data
        : null;
    }
    if (userInfo && userInfo != null) {
      const selectedCompanyID = localStorage.getItem('selectedCompanyID');
      if (selectedCompanyID) {
        const company = userInfo.organizations.filter(
          (x: any) => x.id == selectedCompanyID
        );
        const obj: any = {
          FirstName: userInfo.firstName['en-US']
            ? userInfo.firstName['en-US']
            : '',
          LastName: userInfo.lastName['en-US']
            ? userInfo.lastName['en-US']
            : '',
          EmailAddress: userInfo.emailAddress ? userInfo.emailAddress : '',
          MobileNumber: userInfo.mobileNumber ? userInfo.mobileNumber : '',
          MobileCountryCode: userInfo.mobileNumberCode
            ? userInfo.mobileNumberCode
            : '',
          MobileCountry: '',
          TransactionId: data.transaction_id ? data.transaction_id : '',
          TransactionTypeCode: data.transactionTypeCode
            ? data.transactionTypeCode
            : '',
          Feedback: data.feedback
            ? data?.feedback
                ?.replace(/(\r\n|\n|\r)/gm, ' ')
                ?.replace(/(<([^>]+)>)/gi, '')
            : '',
          Rating: data.rate ? data.rate : '',
          UserName: data.userName ? data.userName : '',
          UCID:
            company &&
            company.length > 0 &&
            company[0]?.contactType?.toUpperCase() == 'INDIVIDUAL'
              ? company[0]?.contactType?.toUpperCase()
              : company[0]?.ucid,
          Company:
            company && company.length > 0 ? company[0].tradeName['en-US'] : '',
        };
        this.happinessIndexService.updateRating(obj).subscribe(
          (res) => {
            if (res) {
              if (this.servicesList && this.servicesList.length > 1) {
                this.defaultSnakBar.success(
                  this.translate.instant('feedback_saved_successfully', {
                    value: this.servicesList?.length - 1,
                  })
                );
              }
              if (this.servicesList && this.servicesList.length == 1) {
                this.isLastTransaction = true;
              } else {
                this.isLastTransaction = false;
              }
              this.getServiceList();
              if (this.carouselComponent) {
                if (this.carouselComponent.currentSlide > 0) {
                  this.carouselComponent.currentSlide -= 1;
                } else {
                  this.carouselComponent.currentSlide = 0;
                }
                this.carouselComponent.reSizeCarousel();
              }
            }
          },
          (error) => {
            const errorMobileNumberMsg = this.translate.instant(
              'Happiness_Index_Missing_Mobile_number'
            );
            const errorMsg =
              error?.error?.errors && error?.error?.errors?.length
                ? processErrors(error?.error?.errors?.length)
                : error?.error?.title;
            if (errorMsg) {
              this.defaultSnakBar.error(errorMsg);
            } else {
              if (error?.error?.msg && error?.error?.msg == 'ERR_MN_01') {
                this.defaultSnakBar.error(errorMobileNumberMsg);
              }
            }
          }
        );
      }
    }
  }
  openSuggestion(index: number) {
    this.servicesList[index].isOpenSuggestion =
      !this.servicesList[index].isOpenSuggestion;
    //this.servicesList[index].feedback = '';
  }

  openSnackBar() {
    this._snackBar.openFromComponent(FeedbackComponent, {
      duration: 5000,
    });
  }

  private get icons(): Array<string> {
    return [
      'emoji-happiness-1',
      'emoji-happiness-2',
      'emoji-happiness-3',
      'emoji-happiness-4',
      'emoji-happiness-5',
      'emoji-happiness-1-active',
      'emoji-happiness-2-active',
      'emoji-happiness-3-active',
      'emoji-happiness-4-active',
      'emoji-happiness-5-active',
      'suggestion',
      'success-icon',
    ];
  }
}

@Component({
  selector: 'snack-bar-feedback-component',
  template: `<span
    class="feedback fxLayoutGap-row-1vw"
    fxFlex
    fxLayout="row"
    fxLayoutAlign="space-around center"
  >
    <mat-icon
      class="icon"
      svgIcon="status-icon-completed"
      aria-hidden="false"
    ></mat-icon>
    {{ 'FEEDBACK_SUCCESS' | translate }}
  </span>`,
  styles: [
    `
      .feedback {
        font: normal normal normal 18px/22px Museo Sans;
        letter-spacing: 0px;
        color: #0f1930;
        opacity: 1;
      }
    `,
  ],
})
export class FeedbackComponent {
  /**
   * Constructor
   * @param {IconsService} _iconsService
   */
  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }
  private get icons(): Array<string> {
    return ['status-icon-completed', 'icon-close-black'];
  }
}
