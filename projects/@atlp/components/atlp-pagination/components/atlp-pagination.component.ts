import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { Subscription } from 'rxjs';
import {
  IAtlpPageResponseModel,
  IAtlpInputPaginator,
  IAtlpPaginatorModel,
  atlpPaginatorModelDefaultData,
} from '../models/altp-paginator.model';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';

@Component({
  selector: 'atlp-pagination',
  templateUrl: './atlp-pagination.component.html',
  styleUrls: ['./atlp-pagination.component.scss'],
})
export class AtlpPaginationComponent implements OnInit, OnChanges {
  @Output() changePage: EventEmitter<IAtlpPageResponseModel> =
    new EventEmitter();
  @Input() atlpInputPaginator: IAtlpInputPaginator;
  pageSizeOptions: number[] = [];
  @Input() paginationOptions: number[] = [];
  defaultPaginationOptions: number[] = [10, 20, 30, 40, 50];
  paginationDropDownList: number[] = [];
  paginatorModel: IAtlpPaginatorModel = { ...atlpPaginatorModelDefaultData };
  currentPageToGo: number;
  totalPageNumber: number;
  subscriptions: Subscription[] = [];
  selectedLanguage: string = 'en';
  @Input() pageOptionSize?: number = 10;

  constructor(
    private toaster: ToastrService,
    private translateService: TranslateService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconsService: IconsService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
        this.selectedLanguage = lang;
        this.atlpTranslationService.setDefaultLanguageSettings(
          this.selectedLanguage,
          navigationEnglish,
          navigationArabic
        );
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePageModelFromParent();
    this._changeDetectorRef.detectChanges();
  }

  updatePageModelFromParent() {
    this.currentPageToGo = this.paginatorModel.currentPage = Number(
      this.atlpInputPaginator?.currentPage
    );
    this.paginatorModel.pageSize = Number(this.atlpInputPaginator?.pageSize);
    this.paginatorModel.totalCount = Number(
      this.atlpInputPaginator?.totalCount
    );
    this.getNumberOptions();
    this.calculatePageStartAndEndIndex();
    this.createPageOptions();
  }

  calculatePageStartAndEndIndex() {
    this.paginatorModel.pageStartIndex =
      (this.paginatorModel.currentPage - 1) * this.paginatorModel.pageSize + 1;
    this.paginatorModel.pageEndIndex =
      this.paginatorModel.pageStartIndex + this.paginatorModel.pageSize - 1;
    if (this.paginatorModel.pageEndIndex > this.paginatorModel.totalCount) {
      this.paginatorModel.pageEndIndex = this.paginatorModel.totalCount;
    }
  }

  gotoPreviousPage() {
    if (this.paginatorModel.currentPage <= 1) {
      return;
    }
    this.currentPageToGo = this.paginatorModel.currentPage =
      this.paginatorModel.currentPage - 1;
    this.onPaginationChange(
      this.paginatorModel.currentPage,
      this.paginatorModel.pageSize
    );
  }

  gotoNextPage() {
    if (this.paginatorModel.pageEndIndex == this.paginatorModel.totalCount) {
      return;
    }
    this.paginatorModel.currentPage = this.paginatorModel.currentPage + 1;
    this.currentPageToGo = this.paginatorModel.currentPage;
    this.onPaginationChange(
      this.paginatorModel.currentPage,
      this.paginatorModel.pageSize
    );
  }

  goToPage() {
    if (!this.currentPageToGo) {
      this.toaster.error(
        this.translateService.instant('PLEASE_ENTER_VALID_PAGE_NUMBER')
      );
      return;
    }
    if (
      this.currentPageToGo <= this.totalPageNumber ||
      this.currentPageToGo < 1
    ) {
      if (this.paginatorModel.currentPage != this.currentPageToGo) {
        this.paginatorModel.currentPage = this.currentPageToGo;
        this.onPaginationChange(
          this.currentPageToGo,
          this.paginatorModel.pageSize
        );
        this.getNumberOptions();
      }
    } else {
      this.toaster.error(
        this.translateService.instant('PLEASE_ENTER_VALID_PAGE_NUMBER')
      );
    }
  }

  createPageOptions() {
    if (
      this.paginationOptions == undefined ||
      this.paginationOptions == null ||
      this.paginationOptions.length === 0
    ) {
      this.paginationDropDownList = this.defaultPaginationOptions;
      return;
    }
    let totalPageCount: number = Math.floor(
      this.paginatorModel.totalCount / this.pageOptionSize
    );
    let paginationDropDownList = [];
    for (let i = 1; i < totalPageCount + 2; i++) {
      const optionVal = i * this.pageOptionSize;
      paginationDropDownList.push(optionVal);
    }
    this.paginationDropDownList = paginationDropDownList;
  }

  pageOptionsChange(pageEvent) {
    const selectedPageSize = pageEvent.value;
    this.paginatorModel.pageSize = selectedPageSize;
    this.currentPageToGo = 1;
    this.onPaginationChange(this.currentPageToGo, this.paginatorModel.pageSize);
    this.getNumberOptions();

    // const selectedPageSize = pageEvent.value;
    // const pageNumber = Math.floor(
    //   selectedPageSize / this.paginatorModel.pageSize
    // );
    // this.currentPageToGo = pageNumber;
    // this.goToPage();
  }

  onPaginationChange(currentPage, pageSize) {
    const atlpPageModel: IAtlpPageResponseModel = {
      currentPage: currentPage,
      pageSize: pageSize,
    };
    this.changePage.emit(atlpPageModel);
    this.calculatePageStartAndEndIndex();
    this.getNumberOptions();
  }

  getNumberOptions() {
    let items: any[] = [];
    this.setTotalPages();
    let pageRange = 0;
    if (this.totalPageNumber > 3) {
      pageRange = this.paginatorModel.currentPage + 3;
      for (let i = this.paginatorModel.currentPage; i < pageRange; i++) {
        if (i >= this.totalPageNumber) {
          break;
        }
        items.push(i);
      }
    } else {
      pageRange = this.paginatorModel.currentPage + 2;
      for (let i = 1; i < this.totalPageNumber; i++) {
        items.push(i);
      }
    }

    this.pageSizeOptions = items;
  }

  setTotalPages() {
    let totalPage =
      this.paginatorModel.totalCount / this.paginatorModel.pageSize;
    if (totalPage % 1 != 0) {
      totalPage = Math.floor(totalPage) + 1;
    }
    this.totalPageNumber = totalPage;
  }

  goToSpecificPage(pageNo) {
    this.currentPageToGo = pageNo;
    this.goToPage();
  }

  calculatePageLength() {
    let pageLength = this.totalPageNumber - this.paginatorModel.currentPage;
    return pageLength;
  }

  gotoFirstPage() {
    this.currentPageToGo = 1;
    this.goToPage();
  }

  gotoLastPage() {
    this.currentPageToGo = Math.ceil(
      this.paginatorModel.totalCount / this.paginatorModel.pageSize
    );
    this.goToPage();
  }

  isLastPage() {
    return this.paginatorModel.currentPage == this.totalPageNumber;
  }

  private get icons(): Array<string> {
    return [
      'next-table',
      'prev-table',
      'last-page',
      'first-page',
      'next-page',
      'previous-page',
    ];
  }
}
