import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AtlpRichClassicTransTablePortalTemplateType } from '../models/atlp-rich-classic-table.types';

@Injectable({
  providedIn: 'root',
})
export class AtlpRichClassicTransTablePortalBridgeService {
  private atlpRichTableInfoPortal = new BehaviorSubject<
    AtlpRichClassicTransTablePortalTemplateType[]
  >([]);

  readonly atlpRichTableInfoPortal$ =
    this.atlpRichTableInfoPortal.asObservable();

  private atlpRichTableCardPortal = new BehaviorSubject<
    AtlpRichClassicTransTablePortalTemplateType[]
  >([]);

  readonly atlpRichTableCardPortal$ =
  this.atlpRichTableCardPortal.asObservable();

  private portalActionContentPortal =
    new BehaviorSubject<AtlpRichClassicTransTablePortalTemplateType>(null);

  readonly portalActionContentPortal$ =
    this.portalActionContentPortal.asObservable();

  constructor() {}

  setAtlpRichInfoTemplate(
    atlpRichInfoCardPortal: AtlpRichClassicTransTablePortalTemplateType[]
  ) {
    this.atlpRichTableInfoPortal.next(atlpRichInfoCardPortal);
  }

  setAtlpRichCardTemplate(
    atlpRichTableCardPortal: AtlpRichClassicTransTablePortalTemplateType[]
  ) {
    this.atlpRichTableCardPortal.next(atlpRichTableCardPortal);
  }

  setAtlpRichClassicActionPortal(
    portalActionContent: AtlpRichClassicTransTablePortalTemplateType
  ) {
    this.portalActionContentPortal.next(portalActionContent);
  }
}
