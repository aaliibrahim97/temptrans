import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatAccordion } from '@angular/material/expansion';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { AtlpProgressBarService } from 'projects/@atlp/components/progress-bar/service/progress-bar.service';

@Component({
  selector: 'expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private _atlpProgressBarService: AtlpProgressBarService
  ) {
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

}
