import {
  AtlpRichClassicTableCellTemplate,
  AtlpRichClassicTableColumnTemplate,
  AtlpRichClassicTableMode,
} from 'projects/atlp-table/src/lib/models/atlp-rich-classic-table-enum';
import { AtlpRichClassicTableColumnModeDefinition } from '../models/atlp-table-constructor/atlp-rich-classic-table-column-custom-definitions';
import { ITestVoyageData } from './ITestVoyage';
import { TestVoyageCardStatus } from './ITestVoyageCardData';

export const AtlpTestTableColumnDefs: AtlpRichClassicTableColumnModeDefinition<ITestVoyageData>[] =
  [
    {
      columnDef: 'info',
      header: 'Info',
      cellRich: (element) => element.info,
      columnTemplate: AtlpRichClassicTableColumnTemplate.info,
      cellTemplate: AtlpRichClassicTableCellTemplate.infoRichClassic,
      columnShowInMode: AtlpRichClassicTableMode.rich,
      dragDisabled: true,
    },
    {
      columnDef: 'rotation',
      header: 'Rotation',
      cellRich: (element) => element.rotation,
      columnTemplate: AtlpRichClassicTableColumnTemplate.richCard,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: AtlpRichClassicTableMode.rich,
      cellClicked: false,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'customs',
      header: 'Voyage Customs',
      cellRich: (element) => element.customs,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'terminal',
      header: 'Voyage Terminal',
      cellRich: (element) => element.terminal,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'callRequest',
      header: 'Call Request',
      cellRich: (element) => element.callRequest,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'manifest',
      header: 'Manifest',
      cellRich: (element) => element.manifest,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'discharge',
      header: 'Discharge List',
      cellRich: (element) => element.discharge,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'loading',
      header: 'Loading List',
      cellRich: (element) => element.loading,
      columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      cellTemplate: AtlpRichClassicTableCellTemplate.statusRichClassic,
      columnShowInMode: [AtlpRichClassicTableMode.rich],
      rowNavigation: true,
      dragDisabled: false,
      matSortHeader: true,
    },
    {
      columnDef: 'select',
      header: 'select',
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
      columnDef: 'number',
      header: 'Voyage Number',
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
      columnDef: 'name',
      header: 'Vessel Name',
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
      columnDef: 'port',
      header: 'Port',
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
      columnDef: 'terminalName',
      header: 'Terminal',
      cell: (element) => element.info.terminal,
      columnTemplate: AtlpRichClassicTableColumnTemplate.dynamicComponent,
      // columnTemplate: AtlpRichClassicTableColumnTemplate.text,
      // cellTemplate: AtlpRichClassicTableCellTemplate.text,
      columnShowInMode: [
        AtlpRichClassicTableMode.collapse,
        AtlpRichClassicTableMode.rolled,
      ],
      dragDisabled: false,
      matSortHeader: true,
    },
    // {
    //   columnDef: 'rotationId',
    //   header: 'Rotation',
    //   //don't remove its an inner HTML example
    //   columnTemplate: AtlpRichClassicTableColumnTemplate.innerHtml,
    //   innerHtmlProps: {
    //     templateId: 'rotationId',
    //     data: {
    //       getColData: (element) => element.rotation,
    //     },
    //   },
    //   cell: (element) => element.rotation.id,
    //   // columnTemplate: AtlpRichClassicTableColumnTemplate.text,
    //   cellTemplate: AtlpRichClassicTableCellTemplate.text,
    //   columnShowInMode: [
    //     AtlpRichClassicTableMode.collapse,
    //     AtlpRichClassicTableMode.rolled,
    //   ],
    //   dragDisabled: false,
    //   matSortHeader: true,
    // },
    {
      columnDef: 'eta',
      header: 'ETA/ATA',
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
      columnDef: 'etd',
      header: 'VT/ETD',
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
      columnDef: 'agent',
      header: 'Vessel Agent',
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

// export const TEST_VOYAGE_DATA: ITestVoyageData[] =
// [
//   {
//     id: 1,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 1",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 15020039,
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.rejected,
//       statusText: "Rejected",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.pending,
//       statusText: "Pending",
//       time: "21:25",
//       date: "17/06/2021",
//       textInfo: "SENT",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       time: "21:25",
//       date: "17/06/2021",
//       textInfo: "Submit before",
//       duration: 37800,
//     },
//   },
//   {
//     id: 2,
//     info: {
//       countMessage: 2,
//       status: "warning",
//       title: "VALERIE SCHULTE 2",
//       id: "MG0676381811",
//       name: "Rais Hassan Saadi…",
//       iconCompany: "rais",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: TestVoyageCardStatus.na,
//       statusText: "N/A",
//       id: null,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.addCr,
//       statusText: "Add CR",
//       time: "21:25",
//       date: "17/06/2021",
//       textInfo: "Submit before",
//       duration: 37800,
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       time: "21:25",
//       date: "17/06/2021",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       time: "",
//       date: "",
//       textInfo: "",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 3,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 3",
//       id: "MG0676381811",
//       name: "MEDITERRANEAN…",
//       iconCompany: "queen_mary",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal",
//       time: "05:00 PM",
//       date: "01/19/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 1901004218,
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     customs: {
//       status: TestVoyageCardStatus.blocked,
//       statusText: "Blocked",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.blocked,
//       statusText: "Blocked",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//       update: "Last update",
//       addition: "SR",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.blocked,
//       statusText: "Blocked",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.blocked,
//       statusText: "Blocked",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     loading: {
//       status: TestVoyageCardStatus.blocked,
//       statusText: "Blocked",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//   },
//   {
//     id: 4,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 4",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 1901005397,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//       update: "Last update",
//       addition: "SR",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//       update: "Last update",
//       addition: "SR",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//       update: "Last update",
//       addition: "SR",
//     },
//     loading: {
//       status: TestVoyageCardStatus.added,
//       statusText: "Added",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//   },
//   {
//     id: 5,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 5",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 6,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 6",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 7,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 7",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 8,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 8",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 9,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 9",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 10,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 10",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 11,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 11",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 12,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 12",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 13,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 13",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 14,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 14",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 15,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 15",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 16,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 16",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
//   {
//     id: 17,
//     info: {
//       countMessage: 0,
//       status: "",
//       title: "VALERIE SCHULTE 17",
//       id: "073VSR",
//       name: "CMA CGM SHIPPI",
//       iconCompany: "cma_cgm",
//       port: "🇦🇪Khalifa Port",
//       terminal: "Khalifa terminal (ADT)",
//       time: "10:00 AM",
//       date: "02/10/2021",
//     },
//     rotation: {
//       status: null,
//       statusText: "",
//       id: 200200617,
//     },
//     customs: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     terminal: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     callRequest: {
//       status: TestVoyageCardStatus.approved,
//       statusText: "Approved",
//       time: "21:25",
//       date: "17/06/2021",
//     },
//     manifest: {
//       status: TestVoyageCardStatus.addMf,
//       statusText: "Add MF",
//       textDescr: "No Manifest Added",
//     },
//     discharge: {
//       status: TestVoyageCardStatus.addDl,
//       statusText: "Add D.L.",
//       textDescr: "No Discharge List Added",
//     },
//     loading: {
//       status: TestVoyageCardStatus.addLl,
//       statusText: "Add L.L.",
//       textDescr: "No Loading List Added",
//     },
//   },
// ];

function getDynamicData(): ITestVoyageData[] {
  const data: ITestVoyageData[] = [];
  for (let i = 0; i < 50; i++) {
    const obj: ITestVoyageData = {
      id: 1,
      info: {
        countMessage: 0,
        status: '',
        title: 'VALERIE SCHULTE 1',
        id: '073VSR',
        name: 'CMA CGM SHIPPI',
        iconCompany: 'cma_cgm',
        port: '🇦🇪Khalifa Port',
        terminal: 'Khalifa terminal (ADT)',
        time: '10:00 AM',
        date: '02/10/2021',
      },
      rotation: {
        status: null,
        statusText: '',
        id: 15020039,
        time: '21:25',
        date: '17/06/2021',
      },
      customs: {
        status: TestVoyageCardStatus.approved,
        statusText: 'Approved',
        time: '21:25',
        date: '17/06/2021',
      },
      terminal: {
        status: TestVoyageCardStatus.rejected,
        statusText: 'Rejected',
        time: '21:25',
        date: '17/06/2021',
      },
      callRequest: {
        status: TestVoyageCardStatus.pending,
        statusText: 'Pending',
        time: '21:25',
        date: '17/06/2021',
        textInfo: 'SENT',
      },
      manifest: {
        status: TestVoyageCardStatus.approved,
        statusText: 'Approved',
        time: '21:25',
        date: '17/06/2021',
      },
      discharge: {
        status: TestVoyageCardStatus.addDl,
        statusText: 'Add D.L.',
        textDescr: 'No Discharge List Added',
      },
      loading: {
        status: TestVoyageCardStatus.addLl,
        statusText: 'Add L.L.',
        time: '21:25',
        date: '17/06/2021',
        textInfo: 'Submit before',
        duration: 37800,
      },
    };
    data.push(obj);
  }
  return data;
}
export const TEST_VOYAGE_DATA: ITestVoyageData[] = getDynamicData();
