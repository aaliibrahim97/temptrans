import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Graph } from 'projects/@atlp/components/atlp-graph-selection/models/graph';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpMileStoneBridgePortalService } from '../services/atlp-rich-table-milestone-bridge.service';
import { AtlpRichTableMilestoneActionPortalTemplateType } from '../models/atlp-rich-table-milestone-action.models';
import {
  AtlpGraphResponseModel,
  IAtlpRichTableMileStoneService,
} from '../models/atlp-rich-table-milestone-service.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AtlpAnimations } from 'projects/@atlp/animations';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@UntilDestroy()
@Component({
  selector: 'atlp-rich-table-milestone',
  templateUrl: './atlp-rich-table-milestone.component.html',
  styleUrls: ['./atlp-rich-table-milestone.component.scss'],
  animations: AtlpAnimations,
})
export class AtlpRichTableMileStoneComponent implements OnInit {
  SidebarName = SidebarName;
  subscriptions: Subscription[] = [];
  @Input() transactionsCardData: any;
  @Output() statusClose = new EventEmitter();
  selection = new SelectionModel(true, []);
  currentObject: any;
  selectedLanguage = 'en';
  graphDataObj: Observable<AtlpGraphResponseModel>;
  atlpRichTableMilestonePortal$: Observable<AtlpRichTableMilestoneActionPortalTemplateType>;
  isSuperUser: boolean = false;
  majorSteps: number[] = [];
  percentageValue: number = 0;
  public atlpRichTableMileStoneService?: IAtlpRichTableMileStoneService;
  hasProgressBarVisible: boolean = true;

  @Input() set source(
    atlpRichTableMileStoneService: IAtlpRichTableMileStoneService | any[]
  ) {
    if (this.isAtlpRichTableMilestoneService(atlpRichTableMileStoneService)) {
      this.atlpRichTableMileStoneService =
        atlpRichTableMileStoneService as IAtlpRichTableMileStoneService;
    } else {
      throw new Error(
        "Service not provided...! Please pass service to which we get graph Data of type 'IAtlpRichTableMileStoneService'."
      );
    }
  }

  constructor(
    private _iconsService: IconsService,
    public dialog: MatDialog,
    public atplSidebarService: AtlpSidebarService,
    public datepipe: DatePipe,
    private atlpTranslationService: AtlpTranslationService,
    private atlpRichTableMileStoneActionPortalBridgeService: AtlpMileStoneBridgePortalService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxService: NgxUiLoaderService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
    this.initSubscription();
    this.atlpRichTableMilestonePortal$ =
      this.atlpRichTableMileStoneActionPortalBridgeService.atlpRichTableMileStoneActionPortal$;
    this.subscriptions.push(
      this.selection.changed.subscribe((data) => {
        this.statusClose.emit('true');
      })
    );
  }

  initSubscription() {
    this.subscriptions.push(
      this.atlpRichTableMileStoneActionPortalBridgeService.atlpMileStoneActionPortalData$.subscribe(
        (transData: AtlpGraphResponseModel) => {
          if (transData) {
            this.transactionsCardData = transData;
            this.graphDataObj = this.atlpRichTableMileStoneService.getGraphData(
              transData,
              this.selectedLanguage
            );
            this.setMajorSteps();
          }
        }
      )
    );
  }

  private isAtlpRichTableMilestoneService(
    object: any
  ): object is IAtlpRichTableMileStoneService {
    return object && 'getGraphData' in object;
  }

  async setMajorSteps(): Promise<void> {
    await this.graphDataObj
      ?.pipe(
        map((graphDataItem) => {
          if (graphDataItem?.graph?.data?.length > 0) {
            this.majorSteps = [
              ...Array(graphDataItem.graph.data.length - 1).keys(),
            ];
          }
          setTimeout(() => {
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
    ];
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.length > 0
      ? this.subscriptions.forEach((sub) => sub.unsubscribe())
      : null;
  }
}
