import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtlpNoTotalCountPaginationModel } from '../models/atlp-no-total-count-pagination.model';

@Component({
  selector: 'atlp-no-total-count-pagination',
  templateUrl: './atlp-no-total-count-pagination.component.html',
  styleUrls: ['./atlp-no-total-count-pagination.component.scss'],
})
export class AtlpNoTotalCountPaginationComponent implements OnInit {
  pageModel: AtlpNoTotalCountPaginationModel;
  @Output() changePageNoCount =
    new EventEmitter<AtlpNoTotalCountPaginationModel>();

  @Input() nextArrowColor: string = 'white';
  whichButtonClicked: string = '';
  @Input() pageSize: number = 5;
  pageNumber: number = 0;
  selectedLanguage: string = 'en';
  private _unsubscribeAll$ = new Subject<any>();

  constructor(private atlpTranslationService: AtlpTranslationService) {}

  ngOnInit(): void {
    this.atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.selectedLanguage = lang || 'en';
      });
  }

  onPageChange(keyType: string): any {
    if (this.nextArrowColor === 'black' && keyType === 'next') {
      return;
    }
    if (this.pageNumber === 0 && keyType == 'previous') {
      return;
    }
    this.pageNumber =
      keyType == 'next' ? this.pageNumber + 1 : this.pageNumber - 1;
    this.whichButtonClicked = keyType;
    this.pageModel = {
      whichButtonClicked: this.whichButtonClicked,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this.changePageNoCount.emit(this.pageModel);
  }
}
