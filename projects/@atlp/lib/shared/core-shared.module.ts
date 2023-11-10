import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsService } from 'projects/@atlp/services/icons.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { AtlpProgressBarModule, StepperModule } from 'projects/@atlp/components';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IMaskModule } from 'angular-imask';
import { AtlpDirectivesModule } from 'projects/@atlp/directives/directives';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MdePopoverModule } from '@material-extended/mde';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#373068',
  bgsOpacity: 0.5,
  bgsSize: 60,
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#373068',
  fgsPosition: 'center-center',
  fgsSize: 60,
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#373068',
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  bgsPosition: POSITION.bottomCenter,
};

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatToolbarModule,
    //  AtlpProgressBarModule,
    //  StepperModule,
    FilePickerModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    IMaskModule,
    AtlpDirectivesModule,
    ScrollingModule,
    MatMenuModule,
    MatDialogModule,
    MdePopoverModule,
    MatProgressBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatToolbarModule,
    //AtlpProgressBarModule,
    //StepperModule,
    FilePickerModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    IMaskModule,
    AtlpDirectivesModule,
    ScrollingModule,
    MenuComponent,
    MatMenuModule,
    MatDialogModule,
    MdePopoverModule,
    NgxUiLoaderModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [IconsService],
})
export class AtlpCoreSharedModule {}
