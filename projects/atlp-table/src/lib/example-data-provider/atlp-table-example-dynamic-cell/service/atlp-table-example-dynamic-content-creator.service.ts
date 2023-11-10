import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { IAtlpRichTableCellCreatorService } from 'projects/atlp-table/src/lib/component/atlp-rich-table-milestone/models/atlp-rich-table-milestone-service.interface';
import { ATLP_PORTAL_CELL_DATA } from 'projects/atlp-table/src/lib/injectors/atlp-table-portal.injector';
import { AtlpDynamicExampleTableCellComponent } from '../components/atlp-table-example-dynamic-cell-status-cell.component';

@Injectable({
  providedIn: 'root',
})
export class AtlpExampleTableDynamicContentCreatorService
  implements IAtlpRichTableCellCreatorService
{
  constructor() {}

  service_code;

  attachCellPortal(col: any, element: any, $event: any): ComponentPortal<any> {
    const cellData = {
      col,
      element,
      $event,
    };
    let componentPortal = null;
    if (col.columnDef.toUpperCase() == 'STATUS') {
      componentPortal = new ComponentPortal(
        AtlpDynamicExampleTableCellComponent,
        null,
        this.createInjector({ cellData: cellData })
      );
    }

    return componentPortal;
  }

  private createInjector(data: any): Injector {
    return Injector.create({
      providers: [{ provide: ATLP_PORTAL_CELL_DATA, useValue: data }],
    });
  }
}
