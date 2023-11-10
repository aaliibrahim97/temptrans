import { Component, Inject } from '@angular/core';
import { ATLP_PORTAL_CELL_DATA } from 'projects/atlp-table/src/lib/injectors/atlp-table-portal.injector';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'atlp-table-example-dynamic-cell-status-cell.component',
  templateUrl: './atlp-table-example-dynamic-cell-status-cell.component.html',
  styleUrls: ['./atlp-table-example-dynamic-cell-status-cell.component.scss'],
})
export class AtlpDynamicExampleTableCellComponent {
  cardData: any;
  status: string;

  constructor(@Inject(ATLP_PORTAL_CELL_DATA) public data) {
    this.cardData = data.cellData.element.status;
    this.status = data.cellData.col.cell(data.cellData.element);
  }

  getRefreshStatus() {
    alert('Please impliment your custom logic here...');
  }
}
