import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import { HeaderModule } from 'projects/@atlp/lib/atlp-layout/components/header/header.module';
import { AtlpCoreSharedModule } from 'projects/@atlp/lib/shared/core-shared.module';
import { AtlpLookUpModule } from '../atlp-lookup.module';
import { AtlpLookupExampleComponent } from './components/atlp-lookup-example.component';
import { AtlpExampleInputLookUpSidebarComponent } from './components/sidebar/atlp-example-sidebar.component';
import { AtlpInputLookupExampleRoutingModule } from './atlp-lookup-example-route.module';
import { AtlpSidebarV2Module } from '../../atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [
    AtlpLookupExampleComponent,
    AtlpExampleInputLookUpSidebarComponent,
  ],
  imports: [
    AtlpSidebarV2Module,
    AtlpLookUpModule,
    AtlpInputLookupExampleRoutingModule,
    AtlpSharedModule,
    AtlpCoreSharedModule,
    HeaderModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [],
  providers: [],
})
export class AtlpInputLookupExampleModule {}
