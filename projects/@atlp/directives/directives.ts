import { NgModule } from '@angular/core';
import { AtlpIfOnDomDirective } from 'projects/@atlp/directives/atlp-if-on-dom/atlp-if-on-dom.directive';
import { AtlpInnerScrollDirective } from 'projects/@atlp/directives/atlp-inner-scroll/atlp-inner-scroll.directive';
import { AtlpPerfectScrollbarDirective } from 'projects/@atlp/directives/atlp-perfect-scrollbar/atlp-perfect-scrollbar.directive';
import {
  AtlpMatSidenavHelperDirective,
  AtlpMatSidenavTogglerDirective,
} from 'projects/@atlp/directives/atlp-mat-sidenav/atlp-mat-sidenav.directive';
import { AtlpFileDragDropDirective } from './atlp-file-drag-drop/atlp-file-drag-drop.directive';
import { AtlpPageLoaderDirective } from './atlp-container-loader/atlp-page-loader.directive';

@NgModule({
  declarations: [
    AtlpIfOnDomDirective,
    AtlpInnerScrollDirective,
    AtlpMatSidenavHelperDirective,
    AtlpMatSidenavTogglerDirective,
    AtlpPerfectScrollbarDirective,
    AtlpFileDragDropDirective,
    AtlpPageLoaderDirective,
  ],
  imports: [],
  exports: [
    AtlpIfOnDomDirective,
    AtlpInnerScrollDirective,
    AtlpMatSidenavHelperDirective,
    AtlpMatSidenavTogglerDirective,
    AtlpPerfectScrollbarDirective,
    AtlpFileDragDropDirective,
    AtlpPageLoaderDirective,
  ],
})
export class AtlpDirectivesModule {}
