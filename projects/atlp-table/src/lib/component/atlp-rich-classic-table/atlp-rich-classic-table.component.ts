import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  IAtlpInputPaginator,
  IAtlpPageResponseModel,
} from 'projects/@atlp/components/atlp-pagination/models/altp-paginator.model';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AtlpRichClassicTableActionDropColumn,
  AtlpRichClassicTableCellTemplate,
  AtlpRichClassicTableColumnTemplate,
  AtlpRichClassicTableMode,
} from '../../models/atlp-rich-classic-table-enum';
import {
  AtlpRichClassicTableEmitElInfoTable,
  AtlpRichClassicTableEmitElTable,
} from '../../models/atlp-rich-classic-table-interfaces';
import { AtlpRichClassicTransTablePortalTemplateType } from '../../models/atlp-rich-classic-table.types';
import { AtlpRichClassicTableModeSelectionDrag } from '../../models/atlp-table-constructor/atlp-rich-classic-table-mode-selection-drag';
import { AtlpRichClassicTransTablePortalBridgeService } from '../../services/atlp-rich-classic-bridge.service';
import { AtlpRichClassicTransTableIconsService } from '../../services/atlp-rich-classic-table-icons.service';
import { AtlpRichClassicTableService } from '../../services/atlp-rich-classic-table.service';
import { AtlpRichClassicControlButtonDialogComponent } from '../atlp-rich-classic-table-control-button-dialog/components/atlp-rich-classic-table-control-button-dialog.component';
import { AtlpRichTableMileStoneComponent } from '../atlp-rich-table-milestone/components/atlp-rich-table-milestone.component';
import { AtlpRichTableMilestoneActionPortalTemplateType } from '../atlp-rich-table-milestone/models/atlp-rich-table-milestone-action.models';
import {
  IAtlpRichTableCellCreatorService,
  IAtlpRichTableMileStoneService,
} from '../atlp-rich-table-milestone/models/atlp-rich-table-milestone-service.interface';
import {
  AtlpTableConfig,
  defaultAtlpTableConfig,
} from '../atlp-rich-table-milestone/models/atlp-table-config';
import { AtlpMileStoneBridgePortalService } from '../atlp-rich-table-milestone/services/atlp-rich-table-milestone-bridge.service';
import { locale as navigationEnglish } from '../../i18n/en';
import { locale as navigationArabic } from '../../i18n/ae';
import { AtlpRichClassicTableColumnModeDefinition } from '../../models/atlp-table-constructor/atlp-rich-classic-table-column-custom-definitions';
import { AtlpTemplateRenderer } from '../../template-renderer/dynamic-html-renderer';
import { IAnnouncementActionRef } from '../../models/atlp-rich-classic-table-parent-ref';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';

@UntilDestroy()
@Component({
  selector: 'atlp-rich-classic-table',
  templateUrl: './atlp-rich-classic-table.component.html',
  styleUrls: ['./atlp-rich-classic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlpRichClassicTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AtlpRichTableMileStoneComponent) atlpRichTableMilestone;
  @Input() table: AtlpRichClassicTableModeSelectionDrag;
  @Input() atlpTableConfig: AtlpTableConfig = defaultAtlpTableConfig;
  @Input() clickedRow = false;
  @Input() isMultiSelect = false;
  @Input() isMilestoneEnabled = true;

  @Output() onClickedRow = new EventEmitter<AtlpRichClassicTableEmitElTable>();
  @Output() onClickedCell = new EventEmitter<AtlpRichClassicTableEmitElTable>();
  @Output() onClickedInfo = new EventEmitter<AtlpRichClassicTableEmitElTable>();
  @Output() onClickedInfoSelection =
    new EventEmitter<AtlpRichClassicTableEmitElTable>();
  @Output() onMasterToggle = new EventEmitter<any>();

  /** Available templates */
  columnTemplate = AtlpRichClassicTableColumnTemplate;
  selection = new SelectionModel(true, []);

  /** Available templates of cells */
  cellTemplate = AtlpRichClassicTableCellTemplate;

  actionDropColumn = AtlpRichClassicTableActionDropColumn;
  atlpRichTableInfoPortal$: Observable<
    AtlpRichClassicTransTablePortalTemplateType[]
  >;
  atlpRichTableCardPortal$: Observable<
    AtlpRichClassicTransTablePortalTemplateType[]
  >;
  atlpRichTableInfoPortalsCollection: AtlpRichClassicTransTablePortalTemplateType[];
  atlpRichTableCardPortalCollection: AtlpRichClassicTransTablePortalTemplateType[];
  @Output() onPageChange = new EventEmitter<IAtlpPageResponseModel>();
  selectedRowindex: number;
  totalRichColumnDefs: number;
  public atlpRichTableMileStoneService?: IAtlpRichTableMileStoneService;
  dialogRef: MatDialogRef<any, any>;
  atlpRichTableMilestonePortal$: Observable<AtlpRichTableMilestoneActionPortalTemplateType>;
  @Input() isSelectEnabled: boolean = true;
  selectedLanguage: string = 'en';
  atlpRichTableCellCreatorService: IAtlpRichTableCellCreatorService;
  selectedElementData: any;
  selectedCol: any;
  richColumnDefs: AtlpRichClassicTableColumnModeDefinition<any>[] = [];
  @Input() parentComponentRef: IAnnouncementActionRef;
  dynamicComponents = {};

  @Input() set source(
    atlpRichTableMileStoneService: IAtlpRichTableMileStoneService | any[]
  ) {
    if (this.isAtlpRichTableMilestoneService(atlpRichTableMileStoneService)) {
      this.atlpRichTableMileStoneService =
        atlpRichTableMileStoneService as IAtlpRichTableMileStoneService;
    }
  }

  totalPages: number = 0;
  tablePaginatorOptions: IAtlpInputPaginator;
  @Input() set tablePaginator(val: IAtlpInputPaginator) {
    this.tablePaginatorOptions = val;
    this.totalPages = this.tablePaginatorOptions.totalCount;
  }

  @Input() set cellCreateService(
    atlpRichTableCellCreatorService: IAtlpRichTableCellCreatorService
  ) {
    if (this.isAtlpRichTableCellService(atlpRichTableCellCreatorService)) {
      this.atlpRichTableCellCreatorService =
        atlpRichTableCellCreatorService as IAtlpRichTableCellCreatorService;
    }
  }

  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(['(max-width: 599.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isHandsetLandscape$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 600px) and (max-width: 767.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isTablet$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 768px) and (max-width: 1023.98px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );
  isWeb$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 1024px)'])
    .pipe(
      map((result) => result.matches),
      tap(() => this._changeDetectorRef.detectChanges())
    );

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public atlpTableService: AtlpRichClassicTableService,
    private _iconsService: AtlpRichClassicTransTableIconsService,
    private atlpRichClassicTransTablePortalBridgeService: AtlpRichClassicTransTablePortalBridgeService,
    private atlpMileStoneBridgePortalService: AtlpMileStoneBridgePortalService,
    private _breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private atlpRichTableMileStoneActionPortalBridgeService: AtlpMileStoneBridgePortalService,
    private atlpTranslationService: AtlpTranslationService,
    private translateService: TranslateService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.richColumnDefs = this.table.columnDefs.filter((column) => {
      return (
        column.columnShowInMode === 'all' ||
        column.columnShowInMode === 'rich' ||
        column.columnShowInMode.includes('rich' as AtlpRichClassicTableMode)
      );
    });
    this.totalRichColumnDefs = this.richColumnDefs.length;
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });
    // Registering a table in service
    this.atlpTableService.register(this.atlpTableConfig.name, this.table);
    this.atlpRichTableMilestonePortal$ =
      this.atlpRichTableMileStoneActionPortalBridgeService.atlpRichTableMileStoneActionPortal$;
    this.atlpRichTableInfoPortal$ =
      this.atlpRichClassicTransTablePortalBridgeService.atlpRichTableInfoPortal$;
    this.atlpRichTableCardPortal$ =
      this.atlpRichClassicTransTablePortalBridgeService.atlpRichTableCardPortal$;
    this.initSubscriptions();
  }

  ngAfterViewInit(): void {
    this.table.dataSource.paginator = this.paginator;
    this.table.dataSource.sort = this.sort;
    // setTimeout(() => {
    //   this.changeDetectorRef.markForCheck();
    // }, 100);
  }

  ngAfterContentInit() {
    setInterval(() => {
      this.table.dataSource.data.forEach((elem) => {
        if (elem?.info?.new) {
          elem.info.new = false;
        }
      });
    }, 10000);
  }

  initSubscriptions() {
    this.atlpRichTableInfoPortal$.subscribe(
      (
        atlpRichTableInfoPortalsCollections: AtlpRichClassicTransTablePortalTemplateType[]
      ) => {
        this.atlpRichTableInfoPortalsCollection =
          atlpRichTableInfoPortalsCollections;
      }
    );
    this.atlpRichTableCardPortal$.subscribe(
      (
        atlpRichTableCardPortalCollections: AtlpRichClassicTransTablePortalTemplateType[]
      ) => {
        this.atlpRichTableCardPortalCollection =
          atlpRichTableCardPortalCollections;
      }
    );
    this.isWeb$.subscribe((isWeb) => {
      if (isWeb) {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      }
    });
  }

  drop(
    $event: CdkDragDrop<string[]>,
    show: AtlpRichClassicTableActionDropColumn
  ) {
    // if ($event.currentIndex == 0) {
    //   return false;
    // }
    if (this.table.modeIsRich) {
      $event.previousIndex += 1;
    }

    this.table.drop($event, show);
    return true;
  }

  private isAtlpRichTableMilestoneService(
    object: any
  ): object is IAtlpRichTableMileStoneService {
    return object && 'getGraphData' in object;
  }

  private isAtlpRichTableCellService(
    object: any
  ): object is IAtlpRichTableCellCreatorService {
    return object && 'attachCellPortal' in object;
  }

  getDynamicTemplate(col, element, index): any {
    if (!element.uniqueRowId) {
      console.error(
        'For rendering DynamicTemplate uniqueRowId needs to assign in each mapped row'
      );
      return;
    }
    let uniqueColumnName = `${element.uniqueRowId}_${col.columnDef}`;
    if (this.dynamicComponents[uniqueColumnName]) {
      return this.dynamicComponents[uniqueColumnName];
    }
    const dynamiccomponent =
      this.atlpRichTableCellCreatorService.attachCellPortal(col, element, null);
    this.dynamicComponents[uniqueColumnName] = dynamiccomponent;
    return dynamiccomponent;
    // return this.atlpRichTableCellCreatorService.attachCellPortal(
    //   col,
    //   element,
    //   null
    // );
  }

  setCardTemplateData(
    ref: CdkPortalOutletAttachedRef,
    index: number,
    cellData: any
  ) {
    ref = ref as ComponentRef<any>;
    ref.instance.cardData = cellData;
  }

  public changeSort(event: Event) {
    this.table.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': {
          return item.info.title;
        }
        default:
          return item[property];
      }
    };
  }

  emitClickedRow(rowData: any, { target }: any): void {
    const row: AtlpRichClassicTableEmitElTable = {
      data: rowData,
      htmlEl: target.closest('.mat-row'),
    };

    this.onClickedRow.emit(row);
  }

  emitClickedCell(col, element, $event): void {
    const elementData = this.table.modeIsRich
      ? col.cellRich(element)
      : col.cell(element);
    const cell: AtlpRichClassicTableEmitElTable = {
      col: col,
      data: elementData,
      rowData: element,
      htmlEl: $event.target.closest('.mat-cell'),
      event: $event,
    };

    this.onClickedCell.emit(cell);
  }

  trackByFn(index: number): number {
    return index;
  }

  onCellClicked(col, element, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    col.cellClicked
      ? this.emitClickedCell(col, element, $event)
      : $event.preventDefault();
  }

  onRowClicked(row: any, event: { preventDefault?: any; target?: any }): void {
    this.clickedRow ? this.emitClickedRow(row, event) : event.preventDefault();
  }

  isRowSelected(table: AtlpRichClassicTableModeSelectionDrag, row): boolean {
    if (this.isSelectEnabled) {
      return !table.modeIsRich && table.selection.isSelected(row);
    }
    return false;
  }

  isShowControls(table: AtlpRichClassicTableModeSelectionDrag, row): boolean {
    return (
      !table.modeIsRich &&
      table.selection.isSelected(row) &&
      table.selection.selected.length === 1
    );
  }

  isMatSortAvailable(matSortHeader: boolean): boolean {
    return !this.table.customize || !matSortHeader;
  }

  /** Check that you need to select only the disclaim letters */
  firstLetterNameColStatus(name: AtlpRichClassicTableColumnTemplate): boolean {
    return (
      this.table &&
      !this.table.modeIsRich &&
      !this.table.modeIsCollapse &&
      name === AtlpRichClassicTableColumnTemplate.status
    );
  }

  closeSelection($event) {
    const cell: AtlpRichClassicTableEmitElInfoTable = {
      col: this.selectedCol,
      data: this.selectedElementData,
      htmlEl: null,
      event: null,
      index: this.selectedRowindex,
      isSelected: false,
    };
    this.onClickedInfoSelection.emit(cell);
    this.atlpMileStoneBridgePortalService.atlpMileStoneActionPortalData$.next(
      null
    );
    this.selectedRowindex = undefined;
    this.selectedCol = null;
    this.selectedElementData = null;
    this.table.selection.clear();
  }

  singleSelection(col, ele, $event, index) {
    this.table.selection.clear();
    // this.table.selection.toggle(obj);
    if ($event.checked) {
      const currentTransData: any = {
        transactionsCardData: ele,
      };
      this.atlpMileStoneBridgePortalService.atlpMileStoneActionPortalData$.next(
        currentTransData
      );
      this.selectedRowindex = index;
      this.selectedCol = col;
      this.table.selection.isSelected(ele);
      this.table.selection.selected.push(ele);
      this._changeDetectorRef.markForCheck();
    } else {
      this.atlpMileStoneBridgePortalService.atlpMileStoneActionPortalData$.next(
        null
      );
      this.selectedRowindex = undefined;
    }
    this.onCheckBoxSelectEvent(col, ele, $event, index);
  }

  multipleSelection(col, ele, $event, index) {
    this.selection.toggle(ele);
    if ($event.checked) {
      this.selectedCol = col;
      this.selection.isSelected(ele);
      this._changeDetectorRef.markForCheck();
    }
    this.onCheckBoxSelectEvent(col, ele, $event, index);
  }

  private onCheckBoxSelectEvent(
    col: any,
    ele: any,
    $event: any,
    index: number
  ) {
    if (!this.isMultiSelect) {
      //const elementData = col.cellRich ? col.cellRich(ele) : col.cell(ele);
      const elementData = ele;
      this.selectedElementData = elementData;
      const cell: AtlpRichClassicTableEmitElInfoTable = {
        col: col,
        data: elementData,
        htmlEl: null, //$event?.target?.closest('.mat-cell') || null,
        event: null, //$event,
        index: index,
        isSelected: $event.checked,
      };
      this.onClickedInfoSelection.emit(cell);
    } else {
      let multipleData: any = [];
      if (this.selection.selected && this.selection.selected?.length > 0) {
        this.selection.selected.forEach((item, i) => {
          const elementData = item;
          const cell: AtlpRichClassicTableEmitElInfoTable = {
            col: null,
            data: elementData,
            htmlEl: null, //$event?.target?.closest('.mat-cell') || null,
            event: null, //$event,
            index: i,
            isSelected: true,
          };
          multipleData.push(cell);
        });
      }
      this.onClickedInfoSelection.emit(multipleData);
    }
  }

  onInfoClicked(col, element, $event, index, isSelected) {
    $event.preventDefault();
    const elementData = col.cellRich(element);

    const cell: AtlpRichClassicTableEmitElInfoTable = {
      col: col,
      data: elementData,
      htmlEl: $event.target.closest('.mat-cell'),
      event: $event,
      index: index,
      isSelected: isSelected,
    };
    this.onClickedInfo.emit(cell);
  }

  pageChange(paginationResult: IAtlpPageResponseModel) {
    this.selectedRowindex = undefined;
    this.table.selection.clear();
    this.onPageChange.emit(paginationResult);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(
      AtlpRichClassicControlButtonDialogComponent,
      {
        panelClass: 'custom-dialog-container',
      }
    );
    this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef = null;
      console.log(`Dialog result: ${result}`);
    });
  }

  renderHtmlTemplate(col, element) {
    const templateId = col.innerHtmlProps.templateId;
    const innerHtmlData = col.innerHtmlProps.data.getColData(element);
    const data = innerHtmlData || {};
    const atlpTemplateRendererInstance: AtlpTemplateRenderer =
      new AtlpTemplateRenderer(data, null, templateId);

    const resultHtml = atlpTemplateRendererInstance.renderTemplate();
    return resultHtml;
  }

  getColumnHeader(colDef: string): string {
    let hearderName = colDef;
    this.table.columnDefs.forEach((item) => {
      if (item.columnDef == colDef) {
        hearderName = item.header;
      }
    });
    hearderName = this.translateService.instant(hearderName);
    return hearderName;
  }

  private get icons(): Array<string> {
    return ['sort-ascending-fill', 'x-fill-purple-dark', 'plus-white'];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.table.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    let multipleData: any = [];

    if (this.isAllSelected()) {
      this.selection.clear();
      this.onMasterToggle.emit('deselect-all');
      this.onClickedInfoSelection.emit(multipleData);
      return;
    }
    this.selection.clear();
    this.selection.select(...this.table.dataSource.data);
    this.selection.selected.forEach((item, index) => {
      const elementData = item;
      const cell: AtlpRichClassicTableEmitElInfoTable = {
        col: null,
        data: elementData,
        htmlEl: null, //$event?.target?.closest('.mat-cell') || null,
        event: null, //$event,
        index: index,
        isSelected: true,
      };
      multipleData.push(cell);
    });
    this.onMasterToggle.emit('select-all');
    this.onClickedInfoSelection.emit(multipleData);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.uniqueRowId + 1
    }`;
  }
}
