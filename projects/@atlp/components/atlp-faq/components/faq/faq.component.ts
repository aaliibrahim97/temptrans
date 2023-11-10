import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AtlpFaqService } from '../../services/atlp-faq.service';

@Component({
  selector: 'atlp-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class AtlpFaqComponent implements OnInit {
  faqList: any = [];
  constructor(
    private atlpFaqService: AtlpFaqService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  PageIndex: number = 1;
  pageSize: number = 50;
  filter: any = [];
  search = '';
  filterData: any = [];

  ngOnInit(): void {
    this.filterData = this.atlpFaqService.filters;
    this.getAllFaq();
  }

  getAllFaq() {
    this.atlpFaqService
      .getFaqList(this.search, this.filter, this.pageSize, this.PageIndex)
      .subscribe((res) => {
        if (res && res.data) {
          this.faqList = res.data;
          this._changeDetectorRef.detectChanges();
        }
      });
  }

  onSelectFilter(data: string) {
    this.PageIndex = 1;
    if (data) {
      this.filter = [data];
    } else {
      this.filter = [];
    }
    this.getAllFaq();
  }
  onLoadMore() {
    this.PageIndex += 1;
    this.getAllFaq();
  }
}
