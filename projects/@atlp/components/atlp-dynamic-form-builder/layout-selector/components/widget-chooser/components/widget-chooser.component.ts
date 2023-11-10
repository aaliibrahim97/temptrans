import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicWidgetChooserConfig } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-widget-chooser-config';
import { Subscription } from 'rxjs';
import { WidgetSelectorFactory } from '../../../services/widget-selector.factory.service';
import { WidgetSelectorTerminatorService } from '../../../services/widget-terminator.service';
import { DynamicExpansionPanelComponent } from '../../expansion-panel-widget/components/expansion-panel.component';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { AtlpMultiInheritanceMixin } from 'projects/@atlp/components/atlp-dynamic-form-builder/ts-multiple-inheritance';
import { DynamicFormExternalLoaders } from 'projects/@atlp/components/atlp-dynamic-form-builder/dynamic-core/dynamic-form-base-utils/dynamic-form-external-loaders';
import { DynamicWidgetLibraryService } from 'projects/@atlp/components/atlp-dynamic-form-builder/services/dynamic-widget-library.service';

@Component({
  selector: 'dynamic-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.scss'],
  providers: [WidgetSelectorFactory],
})
export class DynamicWidgetChooserComponent
  extends AtlpMultiInheritanceMixin(DynamicFormExternalLoaders)
  implements OnChanges, OnInit, OnDestroy
{
  @Input() widgetInfo: DynamicWidgetChooserConfig;
  @Input() parentcomponentRef: ComponentRef<any>;

  @Output() widgetInstanciated = new EventEmitter<any>();
  @Output() afterAllInstanceCreated = new EventEmitter<any>();

  @ViewChild('target', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  form: FormGroup = this.fb.group({});

  private widgetInstance: any;
  private ref: ComponentRef<any>;
  private subs: Subscription;
  inlineStyles: SafeHtml;

  constructor(
    private widgetFactory: WidgetSelectorFactory = null,
    private cdr: ChangeDetectorRef,
    private terminator: WidgetSelectorTerminatorService,
    private fb: FormBuilder,
    protected dynamicWidgetLibraryService: DynamicWidgetLibraryService,
    protected _sanitizer: DomSanitizer
  ) {
    super(dynamicWidgetLibraryService, _sanitizer);
  }

  ngOnInit() {
    this.inlineStyles = this.loadInlineStyles(this.widgetInfo.inlineStyles);
    this.subs = this.terminator.onDestroy.subscribe((destroy) => {
      if (destroy) {
        this.ref.destroy();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { widgetInfo } = changes;

    if (widgetInfo) {
      const _widgetInfo = widgetInfo.currentValue ?? widgetInfo;
      if (_widgetInfo) {
        this.createWidget();
      }
    }
  }

  createWidget() {
    this.ref = this.widgetFactory.createWidget(
      this.container,
      this.widgetInfo.widgetType
    );
    this.widgetInstance = this.ref.instance;
    this.setWidgetProperties();
    this.widgetInstanciated.emit(this.widgetInstance);
    this.cdr.detectChanges();
  }

  setWidgetProperties() {
    switch (this.widgetInfo.widgetType) {
      case 'expansion-panel': {
        let instance: DynamicExpansionPanelComponent = this
          .widgetInstance as DynamicExpansionPanelComponent;
        instance.widgetInfo = this.widgetInfo;
        instance.parentcomponentRef = this.parentcomponentRef;
        instance.widgetInstanciated.subscribe((widgetInstance) => {
          this.widgetInstanciated.emit(widgetInstance);
        });
        instance.afterAllInstanceCreated.subscribe(
          (afterAllInstanceCreated) => {
            if (afterAllInstanceCreated) {
              this.afterAllInstanceCreated.emit(afterAllInstanceCreated);
            }
          }
        );
        break;
      }
      case 'section': {
        break;
      }
      case 'fieldset': {
        break;
      }
      case 'array': {
        break;
      }
      case 'card': {
        break;
      }
      case 'tab': {
        break;
      }
      case 'stepper': {
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnDestroy() {
    this.terminator.destroy();
    this.subs.unsubscribe();
  }
}
