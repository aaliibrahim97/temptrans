import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AtlpTransAnimationService } from '../services/atlp-transaction-milestone-animation.service';
import { AtlpTransTableActionPortalBridgeService } from '../services/atlp-transaction-milestone-bridge.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtlpGraphResponseModel } from '../models/atlp-transaction-milestone-graph-response.model';
import { AtlpAnimations } from 'projects/@atlp/animations';
import { AtlpTransTableActionPortalTemplateType } from '../models/atlp-milestone-models';
import { AtlpTransAnimationMetaDataModel } from '../models/atlp-transaction-milestone-table-action-meta-data.model';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@UntilDestroy({ checkProperties: true, arrayName: 'subscriptions' })
@Component({
  selector: 'atlp-trans-animation',
  templateUrl: './atlp-trans-animation.component.html',
  styleUrls: ['./atlp-trans-animation.component.scss'],
  animations: AtlpAnimations,
})
export class AtlpCommonTransactionsAnimationComponent implements OnInit {
  SidebarNameIac = SidebarName;
  subscriptions: Subscription[] = [];
  @Input() transctionAnimationtypes: any;
  @Input() transactionsCardData: any;
  @Output() statusClose = new EventEmitter();
  selection = new SelectionModel(true, []);
  currentObject: any;
  selectedLanguage = 'en';
  graphData: Observable<AtlpGraphResponseModel>;
  graphDataObj: Observable<AtlpGraphResponseModel>;
  AtlpTransAnimationPortalPortal$: Observable<AtlpTransTableActionPortalTemplateType>;
  isReadOnly: boolean = false;
  majorSteps: number[] = [];
  percentageValue: number = 0;
  hasProgressBarVisible: boolean = true;

  constructor(
    private _iconsService: IconsService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private atlpAnimationService: AtlpTransAnimationService,
    private atlpTranslationService: AtlpTranslationService,
    private atlpTransTableActionPortalBridgeService: AtlpTransTableActionPortalBridgeService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    // this.ngxService.start();
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this.AtlpTransAnimationPortalPortal$ =
      this.atlpTransTableActionPortalBridgeService.AtlpTransAnimationPortalPortal$;
    this.subscriptions.push(
      this.selection.changed.subscribe((data) => {
        this.statusClose.emit('true');
      })
    );
    this.initSubscription();
  }

  initSubscription() {
    this.subscriptions.push(
      this.atlpTransTableActionPortalBridgeService.currentTransactionData$.subscribe(
        (transData: AtlpTransAnimationMetaDataModel) => {
          if (transData) {
            this.transactionsCardData = this.atlpAnimationService.getGraphData(
              this.transctionAnimationtypes,
              this.selectedLanguage
            );
            this.setMajorSteps();
          }
        }
      )
    );
  }

  async setMajorSteps(): Promise<void> {
    await this.graphDataObj
      .pipe(
        map((graphDataItem) => {
          if (graphDataItem?.graph.data?.length > 0) {
            this.majorSteps = [
              ...Array(graphDataItem.graph.data.length - 1).keys(),
            ];
          }
          setTimeout(() => {
            this.graphData = this.graphDataObj;
            this.hasProgressBarVisible = false;
            this.percentageValue = graphDataItem.percentageComplete || 0;
            this.changeDetectorRef.markForCheck();
          }, 1000);
        })
      )
      .toPromise();
  }

  private get icons(): Array<string> {
    return [
      'close-block',
      'calendar-date-svg',
      'voyage-icon-two',
      'approval-icon',
      'schedule-icon',
      'document-icon',
      'edit-icon',
      'soc-icon',
      'save-animation-icon',
      'graph-cancel-icon',
      'graph-amend-icon',
      'graph-payment-icon',
    ];
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.length > 0
      ? this.subscriptions.forEach((sub) => sub.unsubscribe())
      : null;
  }
}
