import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type AOA = any[][];

@Injectable({
  providedIn: 'root',
})
export class AtlpExcelService {
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  constructor() {}

  /*------------- Example --------------*/
  // data: any = [{
  //   case_worked: "abc",
  //   note: "Test",
  //   id: "1234"
  // },
  // {
  //   case_worked: "def",
  //   note: "test 1",
  //   id: "1234"
  // },
  // {
  //   case_worked: "def",
  //   note: "Test 2",
  //   id: "3456"
  // }];
  // exportAsXLSX():void {
  //   this.excelService.exportAsExcelFile(this.data, 'export-to-excel');
  // }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  /*------------- Example --------------*/
  // <input type="file" (change)="onFileChange($event)" multiple="false" /> //pass "$event" to thi function will give you json
  // How to render in UI
  // <table>
  //   <tbody>
  //     <tr *ngFor="let row of data">
  //     <td *ngFor="let val of row">
  //       {{val}}
  //     </td>
  //   </tr>
  //   </tbody>
  // </table>
  readExcel(evt: any, callBack: (AOA) => void) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      callBack(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /*------------- Example --------------*/
  // [
  //   [
  //       "REPORT CODE",
  //       "REPORT TITLE AR",
  //       "REPORT TITLE EN",
  //       "REPORT HELP AR",
  //       "REPORT HELP EN",
  //       "REPORT CATEGORY",
  //       "APPROVAL REQUIRED",
  //       "PAYMENT REQUIRED",
  //       "REPORT PUBLISHED DATE",
  //       "REPORT CREATION DATE",
  //       "REPORT COMMENTS AR",
  //       "REPORT COMMENTS EN",
  //       "REPORT FORMAT",
  //       "REPORT VERSION"
  //   ],
  //   [
  //       "FAC_CLR_AGNT_ACT_EXL",
  //       "تقرير إكسل نشاط المخلص الجمركي",
  //       "Clearing Agent Activity Excel Report",
  //       "تقرير اكسل عن نشاط المخلص الجمركي",
  //       "Clearing Agent Activity Excel Report",
  //       "A",
  //       "N",
  //       "N",
  //       "05/12/2022 10:13:43",
  //       "05/12/2022 10:13:45",
  //       "تقرير اكسل عن نشاط المخلص الجمركي",
  //       "Clearing Agent Activity Excel Report",
  //       "X",
  //       1
  //   ],
  // ]
  export(data: AOA, fileName: string, sheetName?: string): void {
    let sheetNameVal = sheetName || 'Sheet1';
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetNameVal);

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
}
