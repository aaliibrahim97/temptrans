import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { RouterModule } from '@angular/router';
import { AtlpSharedModule } from 'projects/@atlp/atlp-shared.module';
import {
  AtlpSearchBarModule,
  KeyValueColumnModule,
  StepperModule,
} from '../../../@atlp/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeedbackComponent, SidebarComponent } from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule,
} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './components/sidebar/carousel/carousel.component';
import { CarouselItemElementDirective } from 'projects/@atlp/directives/atlp-carousel/carousel-item-element.directive';
import { CarouselItemDirective } from 'projects/@atlp/directives/atlp-carousel/carousel-item.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HappinessIndexService } from 'projects/@atlp/services/happiness-index.service';
// import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { AtlpSidebarV2Module } from '../@v2/atlp-sidebar/atlp-sidebar.module';

@NgModule({
  declarations: [
    RatingComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElementDirective,
    FeedbackComponent,
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
    CarouselComponent,
    RatingComponent,
    FeedbackComponent,
    CarouselItemDirective,
    CarouselItemElementDirective,
  ],
  imports: [
    CommonModule,
    AtlpSharedModule,
    AtlpSearchBarModule,
    StepperModule,
    KeyValueColumnModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    // MatRadioGroup,
    MatRadioModule,
    MatTooltipModule,
    FormsModule,
    // HttpClientModule,
    MatBadgeModule,
    AtlpSidebarV2Module,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HappinessIndexService],
})
export class RatingModule {}
