import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { locale as navigationEnglish } from '../i18n/en';
import { locale as navigationArabic } from '../i18n/ae';
import { AtlpPaginationModel } from '../models/atlp-pagination.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'atlp-mat-pagination',
  templateUrl: './atlp-mat-pagination.component.html',
  styleUrls: ['./atlp-mat-pagination.component.scss'],
})
export class AtlpMatPaginationComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  private _unsubscribeAll$ = new Subject<any>();
  @Output() changePage = new EventEmitter();
  @Input() showFirstLastButtons: boolean = true;
  @Input() TotalItemCount: number;
  @Input() PageNumber: number = 0;
  @Input() PageSize: number = 5;
  @Input() pageSizeOptions?: number[] = [5, 10, 20, 50, 100];
  @ViewChild('matPaginatorRef')
  matPaginatorRef: MatPaginator;
  pageEvent: PageEvent;
  pageModel: AtlpPaginationModel;
  selectedLanguage: string;
  matPaginatorNavigationFirst: HTMLButtonElement;
  matPaginatorNavigationPrevious: HTMLButtonElement;
  matPaginatorNavigationLast: HTMLButtonElement;
  matPaginatorNavigationNext: HTMLButtonElement;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _MatPaginatorIntl: MatPaginatorIntl,
    public translateService: TranslateService,
    private atlpTranslationService: AtlpTranslationService,
    private elmRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.pageModel = {
      PageSize: this.PageSize,
      PageNumber: this.PageNumber,
    };
    this.atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.selectedLanguage = lang || 'en';
        this.atlpTranslationService.setDefaultLanguageSettings(
          this.selectedLanguage,
          navigationEnglish,
          navigationArabic
        );
      });

    this._MatPaginatorIntl.itemsPerPageLabel =
      this.translateService.instant('ITEMS_PER_PAGE');
    this._MatPaginatorIntl.firstPageLabel =
      this.translateService.instant('FIRST_PAGE');
    this._MatPaginatorIntl.lastPageLabel =
      this.translateService.instant('LAST_PAGE');
    this._MatPaginatorIntl.nextPageLabel =
      this.translateService.instant('NEXT_PAGE');
    this._MatPaginatorIntl.previousPageLabel =
      this.translateService.instant('PREVIOUS_PAGE');

    if (this.selectedLanguage != 'en') {
      this._MatPaginatorIntl.getRangeLabel = this.arabicRangeLabel;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.matPaginatorRef && this.matPaginatorNavigationFirst) {
      if (changes?.PageNumber?.currentValue == 0) {
        this.matPaginatorNavigationFirst.disabled = true;
        this.matPaginatorNavigationPrevious.disabled = true;
        this.matPaginatorNavigationLast.disabled = false;
        this.matPaginatorNavigationNext.disabled = false;
        this._changeDetectorRef.detectChanges();
      } else if (
        Math.floor(this.TotalItemCount / this.pageModel.PageSize) ==
        changes?.PageNumber?.currentValue
      ) {
        this.matPaginatorNavigationFirst.disabled = false;
        this.matPaginatorNavigationPrevious.disabled = false;
        this.matPaginatorNavigationLast.disabled = true;
        this.matPaginatorNavigationNext.disabled = true;
        this._changeDetectorRef.detectChanges();
      }
    }
  }

  ngAfterViewInit() {
    this.matPaginatorNavigationFirst = (<HTMLElement>(
      this.elmRef.nativeElement
    )).querySelector('.mat-paginator-navigation-first');
    this.matPaginatorNavigationPrevious = (<HTMLElement>(
      this.elmRef.nativeElement
    )).querySelector('.mat-paginator-navigation-previous');
    this.matPaginatorNavigationLast = (<HTMLElement>(
      this.elmRef.nativeElement
    )).querySelector('.mat-paginator-navigation-last');
    this.matPaginatorNavigationNext = (<HTMLElement>(
      this.elmRef.nativeElement
    )).querySelector('.mat-paginator-navigation-next');
  }

  arabicRangeLabel(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) {
      return `0 من ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} من ${length}`;
  }

  onPageChange(e: PageEvent): any {
    this.PageNumber = e.pageIndex;
    this.pageModel.PageNumber = e.pageIndex;
    this.pageModel.PageSize = e.pageSize;
    this.changePage.emit(this.pageModel);
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
