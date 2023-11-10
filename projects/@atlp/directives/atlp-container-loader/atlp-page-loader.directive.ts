import {
  OnInit,
  OnChanges,
  Directive,
  Input,
  HostBinding,
  Renderer2,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { AtlpPortalBridgeService } from 'projects/@atlp/services/atlp-portal-bridge.service';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/*************  Usage HTML ******************
<div class="container-1" [appLoading]="isLoading">
  Content goes here...
</div>

/********** need to add below style in your sty.scss ****************
.altp-loader-container {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.altp-loader-container div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: altp-loader-container 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.altp-loader-container div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.altp-loader-container div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.altp-loader-container div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes altp-loader-container {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
************************   end style  ******************/

@Directive({
  selector: '[pageLoading]',
})
export class AtlpPageLoaderDirective implements OnInit, OnChanges {
  @HostBinding('style.position')
  hostPosition: string = 'relative';
  pageContent = null;

  @Input() pageLoading: boolean = false;

  uid: string;

  constructor(
    private targetEl: ElementRef,
    private renderer: Renderer2,
    private atlpPortalBridge: AtlpPortalBridgeService
  ) {
    this.atlpPortalBridge.pageLoaderPortal$.subscribe((content) => {
      this.pageContent = content;
      console.log('DOM CONTENT = >', this.pageContent);
    });
  }

  ngOnInit() {
    this.uid = 'loading-container-' + uuidv4();

    const loadingContainer = this.renderer.createElement('div');
    // this.renderer.setStyle(
    //   loadingContainer,
    //   'display',
    //   this.pageLoading ? 'flex' : 'none'
    // );
    // this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    // this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    // this.renderer.addClass(loadingContainer, this.uid);
    // this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    // this.renderer.setStyle(loadingContainer, 'top', '0');
    // this.renderer.setStyle(loadingContainer, 'background', '#e4e4e4');
    // this.renderer.setStyle(loadingContainer, 'width', '100%');
    // this.renderer.setStyle(loadingContainer, 'height', '100%');

    // // custom spinner -- start
    // const spinnerContainer = this.renderer.createElement('div');
    // this.renderer.addClass(spinnerContainer, 'altp-loader-container');
    // const spinnerInnerDiv1 = this.renderer.createElement('div');
    // const spinnerInnerDiv2 = this.renderer.createElement('div');
    // const spinnerInnerDiv3 = this.renderer.createElement('div');

    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);

    this.renderer.appendChild(loadingContainer, this.pageContent);
    // custom spinner -- end

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.pageLoading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);
      if (div) {
        this.renderer.setStyle(
          div,
          'display',
          this.pageLoading ? 'flex' : 'none'
        );
      }
    }
  }
}
