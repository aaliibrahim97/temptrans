import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ITabWidgetConfig } from '../../../../models/dynamic-layout.models';
import { WidgetSelectorFactory } from '../../../services/widget-selector.factory.service';
import { WidgetSelectorTerminatorService } from '../../../services/widget-terminator.service';

@Component({
  selector: 'tab-widget',
  templateUrl: './tab-widget.component.html',
  styleUrls: ['./tab-widget.component.scss'],
})
export class DynamicTabWidgetComponent implements OnChanges, OnInit {
  @Input() widgetInfo: ITabWidgetConfig;

  @Output() widgetInstanciated = new EventEmitter<any>();

  @ViewChild('target', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  private widgetInstance: any;
  private ref: ComponentRef<any>;
  private subs: Subscription;

  constructor(
    private widgetFactory: WidgetSelectorFactory = null,
    private cdr: ChangeDetectorRef,
    private terminator: WidgetSelectorTerminatorService
  ) {}

  ngOnInit() {
    this.subs = this.terminator.onDestroy.subscribe((destroy) => {
      if (destroy) {
        this.ref.destroy();
      }
    });
  }

  ngOnChanges() {
    this.ref = this.widgetFactory.createWidget(this.container, 'tab');
    this.widgetInstanciated.emit(this.ref.instance);
    this.widgetInstance = this.ref.instance;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
