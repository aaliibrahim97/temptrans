import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselItemDirective } from 'projects/@atlp/directives/atlp-carousel/carousel-item.directive';

import { CarouselItemElementDirective } from 'projects/@atlp/directives/atlp-carousel/carousel-item-element.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective)
  items: QueryList<CarouselItemDirective>;

  @ViewChildren(CarouselItemElementDirective, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  hidePrev: boolean = false;
  hideNext: boolean = true;

  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls: boolean;
  @Input() lang: string;
  private player: AnimationPlayer;
  // private itemWidth: number = 591.35;
  private itemWidth: number;
  public currentSlide = 0;
  carouselWrapperStyle = {};

  constructor(private builder: AnimationBuilder) {}

  private buildAnimation(offset, time: any) {
    if (this.lang == 'en') {
      offset = -Math.abs(offset);
    }
    return this.builder.build([
      animate(
        time == null ? this.timing : 0,
        style({ transform: `translateX(${offset}px)` })
      ),
    ]);
  }

  /**
   * Progresses the carousel forward by 1 slide.
   */
  next() {
    if (this.currentSlide + 2 == this.items.length) {
      this.hideNext = false;
      this.hidePrev = true;
    } else {
      this.hideNext = true;
      this.hidePrev = true;
    }
    if (this.currentSlide + 1 == this.items.length) {
      // this.hideNext = false;
      // this.hidePrev = true;
      // let arr = this.items.toArray();
      // let first = arr.shift();
      // arr = arr.concat([first]);
      // this.items.reset(arr);
      // this.currentSlide--;
      // this.transitionCarousel(0);
    } else {
      this.currentSlide = (this.currentSlide + 1) % this.items.length;
      this.transitionCarousel(null);
    }
  }

  /**
   * Regresses the carousel backwards by 1 slide.
   */
  prev() {
    if (this.currentSlide == 1) {
      this.hidePrev = false;
      this.hideNext = true;
    } else {
      this.hidePrev = true;
      this.hideNext = true;
    }
    if (this.currentSlide == 0) {
      // let arr = this.items.toArray();
      // let last = arr.pop();
      // arr = [last].concat(arr);
      // this.items.reset(arr);
      // this.currentSlide++;
      // this.transitionCarousel(0);
    } else {
      this.currentSlide =
        (this.currentSlide - 1 + this.items.length) % this.items.length;

      this.transitionCarousel(null);
    }
  }

  ngAfterViewInit() {
    this.reSizeCarousel();
  }

  /**
   * Listens for changes to the viewport size and triggers a re-sizing of the carousel.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reSizeCarousel();
  }

  /**
   * Re-sizes the carousel container and triggers `this.transitionCarousel()` to reset the childrens' positions.
   *
   * For use on initial load, and when changing viewport size.
   */
  reSizeCarousel(): void {
    // re-size the container
    if (this.itemsElements && this.itemsElements.length > 0) {
      this.itemWidth =
        this.itemsElements?.first?.nativeElement.getBoundingClientRect()
          .width != 0
          ? this.itemsElements.first.nativeElement.getBoundingClientRect().width
          : this.itemWidth;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`,
      };
    } else {
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`,
      };
    }
    // trigger a fresh transition to the current slide to reset the position of the children
    this.transitionCarousel(null);
  }

  /**
   * Animates the carousel to the currently selected slide.
   *
   * **You must set `this.currentSlide` before calling this method, or it will have no effect.**
   */
  transitionCarousel(time: any) {
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset, time);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
}
