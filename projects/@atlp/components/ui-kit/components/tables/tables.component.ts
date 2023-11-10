import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  number: string;
  numberOne: string;
  name: string;
  port: string;
  terminal: string;
  rotation: number;
  eta: string;
  etd: string;
  agent: string;
  selected: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { number: 'FPOD-TXP-0000', numberOne: '22222 2222', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
  { number: 'FPOD-TXP-1232', numberOne: '2', name: 'Basle Express', port: 'Khalifa Port', terminal: 'Khalifa terminal', rotation: 367983031, eta: '05/02/2021', etd: '05/02/2021', agent: 'Sonail Peter', selected: false,},
];

/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'number', 'name', 'port', 'terminal', 'rotation', 'eta', 'etd', 'agent'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
  }
}
