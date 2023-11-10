# ATLP Rich Classic Table Module

**[Home](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/wikis/home)**

---

<!-- vscode-markdown-toc -->

- 1. [Introduction](#Introduction)
- 2. [How To Use](#HowToUse)
  - 2.1. [ATLP Rich Classic view example](#ATLPRichClassicviewexample)
  - 2.2. [ATLP Rich Classic Header example view](#ATLPRichClassicHeaderexampleview)
- 3. [ATLP Table Module Input Parameters](#ATLPTableModuleInputParameters)
- 4. [ATLP Table Module Output Parameters](#ATLPTableModuleOutputParameters)
- 5. [ATLP Rich Classic Pagination](#ATLPRichClassicPagination)
  - 5.1. [Usage](#Usage)
  - 5.2. [Output Parameters](#OutputParameters)
  - 5.3. [As shown in below Pagination view appears](#AsshowninbelowPaginationviewappears)
- 6. [Sample Column Defenition](#SampleColumnDefenition)
- 7. [ATLP Mile Stone](#ATLPMileStone)
  - 7.1. [Graph Single Selection](#GraphSingleSelection)
  - 7.2. [What is Graph Selection](#WhatisGraphSelection)
  - 7.3. [HTML usage](#HTMLusage)
  - 7.4. [Class Definition](#ClassDefinition)
  - 7.5. [HTML Sections](#HTMLSections)
- 8. [ATLP Filter](#ATLPFilter)
  - 8.1. [How to use](#Howtouse)
  - 8.2. [Input Parameters](#InputParameters)
  - 8.3. [Output Parameters](#OutputParameters-1)
- 9. [Auto Generate ATLP Table With All Above Mentioned Features](#AutoGenerateATLPTableWithAllAboveMentionedFeatures)
  - 9.1. [What is @mg_core/atlp-module-generator](#Whatismg_coreatlp-module-generator)
    - 9.1.1. [Installation](#Installation)
    - 9.1.2. [Usage](#Usage-1)
    - 9.1.3. [Output Files Example](#OutputFilesExample)
    - 9.1.4. [Output Code](#OutputCode)
- 10. [Important Note](#ImportantNote)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## 1. <a name='Introduction'></a>Introduction

ATLP Rich Classic Table Module is used to list the transactions in different Listing modes such as Rich, Classic Rolled and classic Collapsed:

- Rich View.
- Classic Rolled View.
- Classic Collapsed View.
- ATLP Common Sub Header (where controls of each listing will be placed)
- ATLP Pagination used to display client-side and server-side pagination

## 2. <a name='HowToUse'></a>How To Use

Include in your html

1. ATLP Rich classic component

### 2.1. <a name='ATLPRichClassicviewexample'></a>ATLP Rich Classic view example

As shown in below Rich view appears
![atlp-rich-view](uploads/ab261db7c29466fac41e9dbceec1dbd5/atlp-rich-view.png)

As shown in below Classic view appears
![atlp-classic-view](uploads/cb76e3fc49088a57491389bd5ce38d31/atlp-classic-view.png)

```html
<ng-template #tableContentTemplate>
  <atlp-rich-classic-table
    #atlpRichClassicTableRef
    [table]="table"
    [atlpTableConfig]="atlpDemoSampleServiceTableConfig"
    [clickedRow]="true"
    [source]="_atlpDemoSampleServiceRichTableMileStoneService"
    [tablePaginator]="tablePaginator"
    (onClickedRow)="clickedRow($event)"
    (onClickedCell)="clickedCell($event)"
    (onPageChange)="onPageChange($event)"
    (onClickedInfo)="onClickedInfo($event)"
    (onClickedInfoSelection)="onClickedInfoSelection($event)"
  >
  </atlp-rich-classic-table>
</ng-template>
```

2. ATLP Pagination for Rich & classic(No need to explicitly include will be included in the part of ATLP table Module, It's just for reference)

```html
<div class="col-auto table-pagination-holder">
  <ng-container *ngIf="(table.dataSource$ | async)?.data?.length > 0">
    <atlp-pagination
      (changePage)="pageChange($event)"
      [atlpInputPaginator]="tablePaginatorOptions"
    ></atlp-pagination>
  </ng-container>
</div>
```

3. ATLP Common sub header(It's the ATLP common subheader where all your listing page buttons and global search bar will be placed)

### 2.2. <a name='ATLPRichClassicHeaderexampleview'></a>ATLP Rich Classic Header example view

As shown below Rich classic Header view appears
![atlp-common-header](uploads/47747d6579bc4a6baba421a3bbd319f5/atlp-common-header.png)

```html
<div
  class="wrapper inheritSize overlay-blur"
  [class.blur]="_atplSidebarService.allOpenedSuperimposedSidebar.length > 0"
  (click)="
    _atplSidebarService.allOpenedSuperimposedSidebar.length > 0
      ? $event.stopPropagation()
      : null
  "
  fxFlex="none"
  fxLayout="column"
  fxLayoutAlign="start none"
>
  <atlp-sub-header
    [subModules]="subModules"
    [tableContentTemplate]="tableContentTemplate"
    [filterTemplate]="sampleServiceFilterTemplate"
    [atlpCommonButtonSection]="atlpCommonButtonSection"
    [atlpTableSwitchHeaderSection]="atlpTableSwitchHeaderSection"
  >
    <ng-template #atlpCommonButtonSection>
      <nav class="atlp-common-action-btn-wrap d-flex">
        <section class="col">
          <atlp-search-bar
            (keyup)="search($event.target.value)"
          ></atlp-search-bar>
        </section>

        <section class="col-auto">
          <button
            mat-button
            color="basic"
            [matMenuTriggerFor]="menuQuickView"
            #menuTriggerQuickView="matMenuTrigger"
            type="button"
          >
            <mat-icon iconPositionEnd svgIcon="icon-quick-view"> </mat-icon>
            <span>{{ "QUICK_VIEW" | translate }}</span>
            <mat-icon
              class="actionIcon"
              iconPositionEnd
              svgIcon="{{
                menuTriggerQuickView.menuOpen
                  ? 'up-arrow-dropdown'
                  : 'down-arrow-dropdown'
              }}"
            >
            </mat-icon>

            <!-- <mat-icon class="actionIcon" >
            arrow_drop_down
          </mat-icon> -->
          </button>
          <mat-menu #menuQuickView="matMenu">
            <div style="padding: 5px">
              <button mat-menu-item color="basic">
                <span>{{ "SHOW_ONLY_IN_PROGRESS" | translate }}</span>
              </button>

              <button mat-menu-item color="basic">
                <span>{{ "SHOW_ONLY_GATEPASS" | translate }}</span>
              </button>

              <button mat-menu-item color="basic">
                <span>{{ "HIDE_ALL_PERMITS" | translate }}</span>
              </button>
            </div>
            <mat-divider></mat-divider>
            <div style="padding: 5px">
              <ng-container *ngIf="typeViewBasic">
                <button
                  mat-menu-item
                  color="basic"
                  *ngIf="classicToggleBtn"
                  (click)="onValChange('rolled')"
                >
                  <span>{{ "DEFAULT_VIEW" | translate }}</span>
                </button>
                <button
                  *ngIf="!classicToggleBtn"
                  mat-menu-item
                  color="basic"
                  (click)="onValChange('collapse')"
                >
                  <span>{{ "EXPANDED_VIEW" | translate }}</span>
                </button>
              </ng-container>
              <button
                mat-menu-item
                color="basic"
                (click)="table.toggleModeCustomize()"
              >
                {{ "CUSTOMIZE_VIEW" | translate }}
              </button>
            </div>
          </mat-menu>
        </section>

        <section class="col-auto">
          <button
            mat-button
            color="basic"
            type="button"
            (click)="toggleSidebarOpen(sidebarName.filtersSidebar)"
          >
            <mat-icon svgIcon="filter-icon" aria-hidden="false"></mat-icon>
            <span> {{ "FILTER" | translate }}</span>
          </button>
        </section>

        <section class="col-auto">
          <button
            mat-button
            color="basic"
            [matMenuTriggerFor]="menuAction"
            #menuTriggerAction="matMenuTrigger"
            type="button"
          >
            <span>{{ "ACTIONS" | translate }}</span>
            <mat-icon
              class="actionIcon"
              svgIcon="{{
                menuTriggerAction.menuOpen
                  ? 'up-arrow-dropdown'
                  : 'down-arrow-dropdown'
              }}"
            >
            </mat-icon>
          </button>

          <mat-menu #menuAction="matMenu" xPosition="before">
            <button
              mat-menu-item
              color="basic"
              (click)="createNewDraft(sidebarName.sampleServiceAddOrEdit)"
            >
              <span>{{ "CREATE_NEW" | translate }}</span>
            </button>

            <button mat-menu-item color="basic">
              <span>{{ "NEW_LICENSE" | translate }}</span>
            </button>

            <ng-container *ngIf="showActionButtons()">
              <sample-service-actions
                [isRichViewMilstoneButtonVisible]="
                  isRichViewMilstoneButtonVisible
                "
              ></sample-service-actions>
            </ng-container>
          </mat-menu>
        </section>

        <!--SWITCH TABLE BTN-->
        <section class="col-auto">
          <mat-button-toggle-group #tableViewGroup="matButtonToggleGroup">
            <mat-button-toggle
              checked="true"
              value="rich"
              (change)="onSwitchView($event.value)"
            >
              {{ "RICH" | translate }}</mat-button-toggle
            >
            <mat-button-toggle
              value="classic"
              (change)="onSwitchView($event.value)"
            >
              {{ "CLASSIC" | translate }}</mat-button-toggle
            >
          </mat-button-toggle-group>
        </section>
      </nav>
    </ng-template>

    <ng-template #atlpTableSwitchHeaderSection> </ng-template>
  </atlp-sub-header>
</div>
```

## 3. <a name='ATLPTableModuleInputParameters'></a>ATLP Table Module Input Parameters

```

  [table]="table"
  [atlpTableConfig]="atlpDemoSampleServiceTableConfig"
  [clickedRow]="true" [source]="_atlpDemoSampleServiceRichTableMileStoneService"
  [tablePaginator]="tablePaginator"

```

Fields inside object <b>paymentReceiveModel</b>

- <b>table</b>: All table parameters with column defenition

  ```ts
  table: AtlpRichClassicTableModeSelectionDrag<any> =
    atlpRichClassicTableCreateTableModeSelectionDrag<any>(
      new MatTableDataSource([]), // initial data source or assign later from API call
      DemopSampleServiceTableColumnDefs, //column definition
      AtlpRichClassicTableMode.rich // default view
    );
  ```

- <b>atlpTableConfig</b>: unique name for atlp table parent, using this class name you can customize the style if required

  ```ts
  atlpDemoSampleServiceTableConfig: AtlpTableConfig = {
    name: "atlpDemoSampleServiceTable",
    className: "atlpDemoSampleServiceTable",
  };
  ```

- <b>clickedRow</b>: Wheather row click enabled

- <b>source</b>: ATLP table milestone service.

  ```ts
      @Injectable({
      providedIn: "root",
      })
      export class AtlpDemoSampleServiceRichTableMileStoneService
      implements IAtlpRichTableMileStoneService
      {
      constructor(
          private datePipe: DatePipe,
          private _httpClient: HttpClient,
          public _sampleServiceApiConfig: AtlpDemoSampleServiceApiConfig
      ) {}

      getGraphData(
          payload: any,
          selectedLanguage: string
      ): Observable<AtlpGraphResponseModel> {
          return this.dispatchGraphDataCall(
          payload,
          selectedLanguage,
          "DEMO_SAMPLE_SERVICE",
          this.getGraphStepIcons
          );
      }

      dispatchGraphDataCall(
          payload: any,
          selectedLanguage: string,
          transctionAnimationtypes: string,
          getGraphStepIconsCallBack: Function
      ): Observable<AtlpGraphResponseModel> {
          return this._httpClient
            .post<BaseResponse<AtlpGraphData>>(
              this._sampleServiceApiConfig.SAL_GRAPH_DATA(),
              { DraftId: payload.transactionsCardData.DRAFT_ID.statusText }
            )
            .pipe(
              map((graphData) => {
                return this.getMappedGraphData(
                  graphData,
                  selectedLanguage,
                  getGraphStepIconsCallBack
                );
              })
            );
      }

      private getMappedGraphData(
          graphResponseData: BaseResponse<AtlpGraphData>,
          selectedLanguage: string,
          getGraphStepIconsCallBack: Function
      ): AtlpGraphResponseModel {
          let graphList: GraphData[] = [];
          let percentageComplete = 0;
          if (graphResponseData?.data?.GraphData?.length > 0) {
          percentageComplete = graphResponseData.data.PercentageComplete;
          graphList =
              graphResponseData.data.GraphData.map((grapItem) => {
              return {
                  stepTitle:
                  selectedLanguage.toLocaleLowerCase() === "en"
                      ? grapItem.StepTitle
                      : grapItem.StepTitleArb,
                  stepIcon: this.getGraphStepIcons(grapItem.StepIcon),getGraphStepIconsCallBack(grapItem.StepIcon),
                  description:
                  selectedLanguage.toLocaleLowerCase() === "en"
                      ? grapItem.Description
                      : grapItem.DescriptionArb,
                  metaData: grapItem.MetaData,
                  eventDate: grapItem.EventDate
                  ? this.datePipe.transform(
                      grapItem.EventDate,
                      "dd/MM/yyyy hh:mm a"
                      )
                  : "",
                  isCompleted: grapItem.CompletedStatus.toUpperCase() === "COMPLETED",
              };
              }) || [];
          }
          return {
          graph: {
              graphTitle: graphResponseData?.data?.GraphTitle,
              data: graphList,
          },
          percentageComplete: percentageComplete,
          };
      }

      private getGraphStepIcons(stepIcon): string {
          switch (stepIcon?.toLowerCase()) {
          case "arrivaldate": {
              return "approval-icon";
          }
          case "submission_status": {
              return "approval-icon";
          }
          case "paymentstatus": {
              return "graph-payment-icon";
          }
          case "submitteddate": {
              return "schedule-icon";
          }
          case "paymentdate": {
              return "schedule-icon";
          }
          default: {
              return "schedule-icon";
          }
          }
      }
      }
  ```

- <b>tablePaginator</b>: ATLP table common pagination service

  ```
    tablePaginator: IAtlpInputPaginator = {
    ...atlpDefaultPaginatorData,
    };
  ```

## 4. <a name='ATLPTableModuleOutputParameters'></a>ATLP Table Module Output Parameters

- postPaymentStatus: Output function to pass the message event after payment is finished.
- closePaymentProcess: Output function to get event when payment summary information screen is closed.

```

(onClickedRow)="clickedRow($event)"
(onClickedCell)="clickedCell($event)"
(onPageChange)="onPageChange($event)"
(onClickedInfo)="onClickedInfo($event)"
(onClickedInfoSelection)="onClickedInfoSelection($event)"

```

- <b>onClickedRow</b>: Row click call back with data
- <b>onClickedCell</b>: Spcific column click call back with data
- <b>onPageChange</b>: When ATLP Table pagination change with page data
- <b>onClickedInfo</b>: Rich view info column click call back with row data
- <b>onClickedInfoSelection</b>: Rich view info checkbox click call back with row data

## 5. <a name='ATLPRichClassicPagination'></a>ATLP Rich Classic Pagination

### 5.1. <a name='Usage'></a>Usage

Simple example:

```ts
atlpInputPaginatorData: IAtlpInputPaginator = {
  currentPage: 1,
  pageSize: 10,
  totalCount: 1000,
};
```

```html
<ng-container *ngIf="dataSource.data?.length > 0">
  <atlp-pagination
    (changePage)="pageChange($event)"
    [atlpInputPaginator]="atlpInputPaginatorData"
  ></atlp-pagination>
</ng-container>
```

### 5.2. <a name='OutputParameters'></a>Output Parameters

- page change event: output function to receive the page current index

```html
<atlp-pagination
  (changePage)="pageChange($event)"
  [atlpInputPaginator]="atlpInputPaginatorData"
></atlp-pagination>
```

```ts

  pageChange(paginationResult: IAtlpPageResponseModel) {
    console.log(paginationResult.currentPage);
    // do your logic based on current page index
    );
  }

```

### 5.3. <a name='AsshowninbelowPaginationviewappears'></a>As shown in below Pagination view appears

![atlp-pagination](uploads/dc09fc3ebea54c647045d598909e040c/atlp-pagination.png)

## 6. <a name='SampleColumnDefenition'></a>Sample Column Defenition

```ts
export const DemopSampleServiceTableColumnDefs: AtlpRichClassicTableColumnModeDefinition<ISampleServiceData>[] =
  [
    {
      columnDef: "info",
      header: "Info",
      cellRich: (element) => element.info,
      columnTemplate: AtlpRichClassicTableColumnTemplate.info,
      cellTemplate: AtlpRichClassicTableCellTemplate.infoRichClassic,
      columnShowInMode: AtlpRichClassicTableMode.rich,
      dragDisabled: true,
    },
    {
      columnDef: "rotation",
      header: "Rotation",
      cellRich: (element) => element.rotation,
      columnTemplate: AtlpRichClassicTableColumnTemplate.richCard,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: AtlpRichClassicTableMode.rich,
      cellClicked: false,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "customs",
      header: "Voyage Customs",
      cellRich: (element) => element.customs,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "terminal",
      header: "Voyage Terminal",
      cellRich: (element) => element.terminal,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "callRequest",
      header: "Call Request",
      cellRich: (element) => element.callRequest,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "manifest",
      header: "Manifest",
      cellRich: (element) => element.manifest,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "discharge",
      header: "Discharge List",
      cellRich: (element) => element.discharge,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "loading",
      header: "Loading List",
      cellRich: (element) => element.loading,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      rowNavigation: true,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "select",
      header: "select",
      cell: (element) => element,
      columnTemplate: AtlpRichClassicTableColumnTemplate.select,
      cellTemplate: AtlpRichClassicTableCellTemplate.select,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "number",
      header: "Voyage Number",
      cell: (element) => element.info.id,
      columnTemplate: AtlpRichClassicTableColumnTemplate.link,
      cellTemplate: AtlpRichClassicTableCellTemplate.link,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      cellClicked: true,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "name",
      header: "Vessel Name",
      cell: (element) => element.info.title,
      columnTemplate: AtlpRichClassicTableColumnTemplate.link,
      cellTemplate: AtlpRichClassicTableCellTemplate.link,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      cellClicked: true,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "port",
      header: "Port",
      cell: (element) => element.info.port,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "terminalName",
      header: "Terminal",
      cell: (element) => element.info.terminal,
      //you can impliment your custom component that render inside the classic table cell
      // columnTemplate: AtlpRichClassicTableColumnTemplate.dynamicComponent,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "rotationId",
      header: "Rotation",
      //don't remove its an inner HTML example
      // columnTemplate: AtlpRichClassicTableColumnTemplate.innerHtml,
      // innerHtmlProps: {
      //   templateId: 'rotationId',
      //   data: {
      //     getColData: (element) => element.rotation,
      //   },
      // },
      cell: (element) => element.rotation.id,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "eta",
      header: "ETA/ATA",
      cell: (element) => element.info.date,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "etd",
      header: "VT/ETD",
      cell: (element) => element.info.date,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: "agent",
      header: "Vessel Agent",
      cell: (element) => element.info.name,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
  ];
```

## 7. <a name='ATLPMileStone'></a>ATLP Mile Stone

### 7.1. <a name='GraphSingleSelection'></a>Graph Single Selection

This is a component, we are using in the selection in the rich view mode, No need to implement its part of ATLP Table Module

### 7.2. <a name='WhatisGraphSelection'></a>What is Graph Selection

As shown in the below example the graph selection is the component that appear when you select a record
![atlp-rich-view-milestone](uploads/50989cb44b4c63de6e93bdae8c36433f/3-Rich-view-milestone.png)

### 7.3. <a name='HTMLusage'></a>HTML usage

```html
<div graph-selection [graphData]="data"></div>
```

### 7.4. <a name='ClassDefinition'></a>Class Definition

the type of data is Graph,

```javascript
export interface Graph {
  graphTitle?: string;
  data: GraphData[];
}

export interface GraphData {
  stepTitle?: string;
  stepIcon?: string;
  description?: string;
  metaData?: string;
  eventDate?: string;
}
```

### 7.5. <a name='HTMLSections'></a>HTML Sections

<p></p>
<b>Title</b><div>It is the area where you want to place the title in case its required.</div>
<b>Events Rendered Area</b><div>It is a list of events list contains multi property, <i>step title, step icon, description, meta data, event date</i>.</div>

```html
<li
  class="graph-step"
  *ngFor="let item of graphData?.data;let i = index"
  [class.major]="majorSteps.includes(i)"
>
  <div class="graph-step-title">{{item?.stepTitle}}</div>
  <div class="graph-description">
    <mat-icon [svgIcon]="item?.stepIcon" aria-hidden="false"></mat-icon>
    <span class="graph-step-label"
      >{{item?.eventDate | date:'yyyy-MM-dd h:mm'}}</span
    >
  </div>
</li>
```

<b>First Actions Container</b><div>The actions which located on the left side of the panel, in the arabic should be located in right.</div>
<b>Last Actions Container</b><div>The Actions which located on the right of the panel, in the Arabic will locate in the left of the panel.</div>
The left actions and the right action will be in place holders inside the component as the below:

<p></p>

```html
<div graph-selection [graphData]="graphData | async">
  <div class="graph-actions-first">
    <button mat-raised-button color="basic" class="icon">
      <mat-icon svgIcon="copy-black" aria-hidden="false"></mat-icon>
      Action Left
    </button>
  </div>
  <div class="graph-actions-last">
    <button mat-raised-button color="basic" class="icon">
      <mat-icon svgIcon="print-black" aria-hidden="false"></mat-icon>
      Action Right
    </button>
  </div>
</div>
```

## 8. <a name='ATLPFilter'></a>ATLP Filter

ATLP filter is a component can be used cross all ATLP streems, this components contains many features such as:

- Apply Filter.
- Get saved filters.
- Recent Filters.
- Clear Filters.
- Delete Saved Filter.
- Apply Saved Filter.

### 8.1. <a name='Howtouse'></a>How to use

Include in your html component:

```html
<atlp-filters-v2
  [dataType]="'service'"
  title="{{ 'FILTER' | translate }}"
  [service]="atlpFilterService"
  [key]="atlpDemoFilterKey"
  [isTwoColumnLayout]="false"
>
  <sample-service-filter-content
    [source]="_atlpDemoSampleServiceTableDataService"
    class="filter-body"
    (onCloseSelection)="closeSelection()"
  ></sample-service-filter-content>
</atlp-filters-v2>
```

### 8.2. <a name='InputParameters'></a>Input Parameters

- <b>Title</b>:
  input tag is <b>title</b> , it can be used as static value or parameter value as following:

- <b>Title</b>:
  input tag is <b>title</b> , it can be used as static value or parameter value as following:

- <b>savedFiltersData</b>: the list of data provided by user for saved filters list, the interface type provided below

```javascript

const savedFiltersData = AtlpSavedFilter[];

export interface AtlpFilterModel {
  filterBy: string;
  displayName?: string;
  filterType: string; //equal, contains, greater than, less than,
  value: any;
  originalVal?: any;
}

export interface AtlpSavedFilter {
  id?: string;
  filterName: string;
  filterTypeName: string;
  searchDate?: string;
  filters: AtlpFilterModel[];
}

```

- <b>source</b>: the angular service for atlp filter

### 8.3. <a name='OutputParameters-1'></a>Output Parameters

- onSearch: output parameter to perform custom action on search click

- onSaveSearch: action to be performed on click of save search button

- onSelectFilter: action to be performed on filter selection

- onResetFilter: action to be performed on filter reset

## 9. <a name='AutoGenerateATLPTableWithAllAboveMentionedFeatures'></a>Auto Generate ATLP Table With All Above Mentioned Features

### 9.1. <a name='Whatismg_coreatlp-module-generator'></a>What is @mg_core/atlp-module-generator

It is a custom schematic, which allows you to generate a scaffolded bunch of code, to reduce the efforts and time in development.
So it will generate the below:

- Entity Module
- Entity Routes Module
- Service for the entity contains the table methods
- Configs class for the entity API's links

#### 9.1.1. <a name='Installation'></a>Installation

To install the component

```
 npm install @mg_core/atlp-module-generator -s
 npm install ../@mg_core/atlp-module-generator-0.0.0.tgz
```

#### 9.1.2. <a name='Usage-1'></a>Usage

```
npm run generate:module
```

or

```
 ng g @mg_core/atlp-module-generator:atlpModuleGenerator module-name
 ng g @mg_core/atlp-module-generator:@mg_core/atlp-module-generator module-name
```

#### 9.1.3. <a name='OutputFilesExample'></a>Output Files Example

Suppose we want to create new module called user-registration, you can run the command using the following

```
$ npm run generate:module

> atlp@1.0.0 generate:module
> cd @atlp-project-batch-commands/ && atlp-project-module-generator.bat

Creating the new module under the specified project.
Please wait...! Initial module generation phase.
Please provide the required info for module generation...!
? What is the module name(eg: balance-sheet): balance-sheet
? Project name where you want to generate the module(eg: atlp-demo-ui): atlp-demo-ui
? Path of the module you want to generate(eg: modules): modules
    Adding routing Module to the app...!
    routing file path: =>, projects\atlp-demo-ui\src\modules\atlp-demo-main-routing.module.ts
    RouterModule Import does not exist in path=> projects\atlp-demo-ui\src\app\app.module.ts
    So adding RouterModule Module to the app...
    Routing Module was added successfully
    Required packages has been added to package.json
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/balance-sheet-routing.module.ts (474 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/balance-sheet.module.ts (2433 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/sidebar/balance-sheet-sidebar.component.html (6893 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/sidebar/balance-sheet-sidebar.component.scss (3203 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/sidebar/balance-sheet-sidebar.component.ts (11337 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/balance-sheet-table.module.ts (2041 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/components/balance-sheet-table.component.html (5027 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/components/balance-sheet-table.component.scss (1469 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/components/balance-sheet-table.component.ts (13682 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/services/balance-sheet-rich-table-milestone.service.ts (1153 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table/services/balance-sheet-table-data.service.ts (2431 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/balance-sheet-table-section.module.ts (2200 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/index.ts (136 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-actions/balance-sheet-actions.module.ts (843 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-actions/components/balance-sheet-actions.component.html (812 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-actions/components/balance-sheet-actions.component.scss (521 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-actions/components/balance-sheet-actions.component.ts (2312 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-card/balance-sheet-card.component.html (11722 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-card/balance-sheet-card.component.scss (107 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-card/balance-sheet-card.component.ts (1908 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-info/balance-sheet-info.component.html (2097 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-info/balance-sheet-info.component.scss (566 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/components/balance-sheet-table-section/components/balance-sheet-info/balance-sheet-info.component.ts (2278 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/configs/balance-sheet-api.config.ts (374 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/balance-sheet-filter.module.ts (1462 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/components/balance-sheet-filter-content.component.html (6751 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/components/balance-sheet-filter-content.component.scss (343 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/components/balance-sheet-filter-content.component.ts (6962 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/models/balance-sheet-application-status-list.ts (1348 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/filter/models/balance-sheet-table-filter.Interface.ts (110 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/i18n/ae.ts (187 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/i18n/en.ts (183 bytes)
CREATE projects/atlp-demo-ui/src/modules/balance-sheet/services/balance-sheet.service.ts (583 bytes)
UPDATE projects/atlp-demo-ui/src/modules/atlp-demo-main-routing.module.ts (2512 bytes)
module generated successfully...!

Done
Press any key to continue . . .
```

#### 9.1.4. <a name='OutputCode'></a>Output Code

##### Entity Module

```javascript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRegistrationRoutingModule } from "./student-registration-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, StudentRegistrationRoutingModule],
  exports: [],
  providers: [],
})
export class StudentRegistrationModule {}
```

##### Entity Routing Module

```javascript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtlpDemoBalanceSheetTableComponent } from "./components/balance-sheet-table/components/balance-sheet-table.component";

const routes = [
  {
    path: "",
    component: AtlpDemoBalanceSheetTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtlpDemoBalanceSheetRoutingModule {}
```

##### Entity API's Configs

```javascript
import { Injectable } from "@angular/core";
import { AtlpDemoEnvService } from "projects/atlp-demo-ui/src/environments/env.service";

@Injectable({
  providedIn: "root",
})
export class AtlpDemoBalanceSheetApiConfig {
  constructor(private _atlpDemoEnvService: AtlpDemoEnvService) {}

  GET_API_BASEURL = (): string => `${this._atlpDemoEnvService.baseApiUrl}`;

  GET_RICH_TABLE_DATA_LIST = (): string => `${this.GET_API_BASEURL()}tableData`;

  SAL_GRAPH_DATA = (): string =>
    `${this.GET_API_BASEURL()}/GetGraphData`;
}
```

##### Entity Module

```javascript
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AtlpDemoBalanceSheetRoutingModule } from "./balance-sheet-routing.module";
import { PortalModule } from "@angular/cdk/portal";
import { TranslateModule } from "@ngx-translate/core";
import { AtlpSharedModule } from "projects/@atlp/atlp-shared.module";
import { AtlpPaginationModule } from "projects/@atlp/components/atlp-pagination/atlp-pagination.module";
import { AtlpCoreSharedModule } from "projects/@atlp/lib/shared/core-shared.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MdePopoverModule } from "@material-extended/mde";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { AtlpSearchBarModule } from "projects/@atlp/components";
import { AtlpPaymentModule } from "projects/@atlp/components/atlp-payment/atlp-payment.module";
import { AtlpDemoBalanceSheetRichTableMileStoneService } from "./components/balance-sheet-table/services/balance-sheet-rich-table-milestone.service";
import { AtlpTransAnimationModule } from "projects/@atlp/components/@v2/atlp-transaction-milestone/atlp-transaction-milestone.module";
import { AtlpSubHeaderModule } from "projects/@atlp/components/@v2/atlp-sub-header/atlp-sub-header.module";
import { AtlpFiltersV2Module } from "projects/@atlp/components/@v2/atlp-filters/atlp-filters.module";
import { AtlpDemoSharedModule } from "../@shared/atlp-demo-shared.module";
import { AtlpDemoBalanceSheetTableModule } from "./components/balance-sheet-table/balance-sheet-table.module";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { AtlpEmptyTableModule } from "projects/@atlp/components/@v2/atlp-empty-table/atlp-empty-table.module";
import { AtlpMatPaginationModule } from "projects/@atlp/components/@v2/atlp-pagination-components/atlp-mat-pagination/atlp-mat-pagination.module";
import { AtlpslidebarDialogModule } from "projects/@atlp/components/atlp-slidebar-dialog/atlp-slidebar.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AtlpDemoBalanceSheetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    AtlpSearchBarModule,
    AtlpPaymentModule,
    NgxMaterialTimepickerModule,
    AtlpFiltersV2Module,
    TranslateModule,
    AtlpPaginationModule,
    AtlpSubHeaderModule,
    AtlpTransAnimationModule,
    MdePopoverModule,
    DragDropModule,
    PortalModule,
    AtlpDemoSharedModule,
    AtlpDemoBalanceSheetTableModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatTooltipModule,
    AtlpMatPaginationModule,
    AtlpEmptyTableModule,
    AtlpslidebarDialogModule,
  ],
  exports: [],
  providers: [AtlpDemoBalanceSheetRichTableMileStoneService],
})
export class AtlpDemoBalanceSheetModule {}
```

## 10. <a name='ImportantNote'></a>Important Note

The documentation provided above is not final and developed based on the best assumptions, feel free to contact Linoy Pappachan Malakkaran or ATLP Core Shared Team for any suggestions to make it better or fix any issues
