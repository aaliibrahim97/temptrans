import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { CardStatus } from 'projects/@atlp/components/voyage/enums/card-status.enum';
import { IVoyageData } from 'projects/@atlp/components/voyage/interfaces/IVoyage';
import { VOYAGE_DATA } from './voyage-data';

@Component({
  selector: 'voyage-table',
  templateUrl: './voyage-table.component.html',
  styleUrls: ['./voyage-table.component.scss']
})

export class VoyageTableComponent implements OnInit, AfterViewInit {
  CardStatus = CardStatus;
  /**
   * Constructor
   * 
   * @param {IconsService} _iconsService
   */
  constructor(
    private _iconsService: IconsService
  ) {
    // mat icon
    this._iconsService.registerIcons(this.icons);
  }

  // table
  displayedColumns: string[] = ['flow', 'type', 'book', 'container', 'iso', 'line', 'info', 'expiry'];
  dataSource = new MatTableDataSource(VOYAGE_DATA);
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {

  }

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
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.flow + 1}`;
  }

  deselect(row): void {
    this.selection.toggle(row);
  }

  /**
   * Getter src company icon 
   * @name - type string
   */
  public srcCompany(name: string): string {
    return `assets/images/${name}.png`;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return ['plus-dark', 'voyage-icon-one', 'message-active-icon', 'voyage-icon-two', 'x-fill-purple-dark', 'print-black', 'smock-icon', 'copy-black', 'plus-white'];
  }
}

