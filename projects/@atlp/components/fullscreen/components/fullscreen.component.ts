import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'atlp-fullscreen',
  templateUrl: './fullscreen.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'atlpFullscreen',
})
export class AtlpFullscreenComponent implements OnInit {
  @Input() iconTpl: TemplateRef<any>;
  @Input() tooltip: string;
  private _atlpDoc: ATLPDocument;
  private _atlpDocEl: ATLPDocumentElement;
  private _isFullscreen: boolean = false;

  /**
   * Constructor
   */
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this._atlpDoc = _document as unknown as ATLPDocument;
  }

  ngOnInit(): void {
    this._atlpDocEl = document.documentElement as ATLPDocumentElement;
  }

  toggleFullscreen(): void {
    // Check if the fullscreen is open
    this._isFullscreen = this._getBrowserFullscreenElement() !== null;

    // Toggle the fullscreen
    if (this._isFullscreen) {
      this._closeFullscreen();
    } else {
      this._openFullscreen();
    }
  }

  private _getBrowserFullscreenElement(): Element {
    if (typeof this._atlpDoc.fullscreenElement !== 'undefined') {
      return this._atlpDoc.fullscreenElement;
    }

    if (typeof this._atlpDoc.mozFullScreenElement !== 'undefined') {
      return this._atlpDoc.mozFullScreenElement;
    }

    if (typeof this._atlpDoc.msFullscreenElement !== 'undefined') {
      return this._atlpDoc.msFullscreenElement;
    }

    if (typeof this._atlpDoc.webkitFullscreenElement !== 'undefined') {
      return this._atlpDoc.webkitFullscreenElement;
    }

    throw new Error('Fullscreen mode is not supported by this browser');
  }

  private _openFullscreen(): void {
    if (this._atlpDocEl.requestFullscreen) {
      this._atlpDocEl.requestFullscreen();
      return;
    }

    // Firefox
    if (this._atlpDocEl.mozRequestFullScreen) {
      this._atlpDocEl.mozRequestFullScreen();
      return;
    }

    // Chrome, Safari and Opera
    if (this._atlpDocEl.webkitRequestFullscreen) {
      this._atlpDocEl.webkitRequestFullscreen();
      return;
    }

    // IE/Edge
    if (this._atlpDocEl.msRequestFullscreen) {
      this._atlpDocEl.msRequestFullscreen();
      return;
    }
  }

  private _closeFullscreen(): void {
    if (this._atlpDoc.exitFullscreen) {
      this._atlpDoc.exitFullscreen();
      return;
    }

    // Firefox
    if (this._atlpDoc.mozCancelFullScreen) {
      this._atlpDoc.mozCancelFullScreen();
      return;
    }

    // Chrome, Safari and Opera
    if (this._atlpDoc.webkitExitFullscreen) {
      this._atlpDoc.webkitExitFullscreen();
      return;
    }

    // IE/Edge
    else if (this._atlpDoc.msExitFullscreen) {
      this._atlpDoc.msExitFullscreen();
      return;
    }
  }
}
