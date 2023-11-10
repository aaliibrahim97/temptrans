import {
  ChangeDetectorRef,
  Component,
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
import { IFieldSetWidgetConfig } from '../../../../models/dynamic-layout.models';
import { WidgetSelectorFactory } from '../../../services/widget-selector.factory.service';
import { WidgetSelectorTerminatorService } from '../../../services/widget-terminator.service';

@Component({
  selector: 'fieldset-widget',
  templateUrl: './fieldset-widget.component.html',
  styleUrls: ['./fieldset-widget.component.scss'],
})
export class DynamicFieldsetWidgetComponent implements OnChanges, OnInit {
  @Input() fieldSetConfig: IFieldSetWidgetConfig;
  @Input() widgetInfo: any;

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
    this.ref = this.widgetFactory.createWidget(this.container, 'fieldset');
    this.widgetInstanciated.emit(this.ref.instance);
    this.widgetInstance = this.ref.instance;
    this.cdr.detectChanges();
  }

  toggleExpanded() {
    if (this.fieldSetConfig.expandable) {
      this.fieldSetConfig.expanded = !this.fieldSetConfig.expanded;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
