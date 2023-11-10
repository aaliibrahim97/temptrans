import { Component, OnInit } from '@angular/core';
import { AtlpProgressBarService } from 'projects/@atlp/components/progress-bar/service/progress-bar.service';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  nav_position: string = 'end';

  /**
   * Constructor
   * @param {IconsService} _iconsService
   * @param {AtlpProgressBarService} _atlpProgressBarService
   */
  constructor(
    private _iconsService: IconsService,
    private _atlpProgressBarService: AtlpProgressBarService
  ) {
    this._iconsService.registerIcons(this.icons);
    // Show the progress bar
    this._atlpProgressBarService.show();

    // Hide the progress bar
   //  this._atlpProgressBarService.hide();

    // Set the mode
    // mode: 'determinate' | 'indeterminate' | 'buffer' | 'query'
    this._atlpProgressBarService.setMode('determinate');

    // Set the value
    // value: number
    this._atlpProgressBarService.setValue(50);

    // Set the buffer value
    // bufferValue: number
    this._atlpProgressBarService.setBufferValue(40);
  }

  ngOnInit(): void {
  }

  onTogglePosition(position: string) {
    this.nav_position = position === 'start' ? 'end' : 'start';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return ['close-white-icon'];
  }
}
