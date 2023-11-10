import {
  Component,
  ComponentRef,
  Directive,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  StaticProvider,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  AtlpDynamicComponentInjector,
  AtlpDynamicComponentInjectorToken,
} from './component-injector';

@Component({
  selector: 'atlp-dynamic-field-instance-creator',
  template: '',
  providers: [
    {
      provide: AtlpDynamicComponentInjectorToken,
      useExisting: AtlpDynamicFieldInstanceCreator,
    },
  ],
})
export class AtlpDynamicFieldInstanceCreator<C = any>
  implements OnChanges, AtlpDynamicComponentInjector
{
  private static UpdateOnInputs: (keyof AtlpDynamicFieldInstanceCreator)[] = [
    'atlpDynamicComponent',
    'atlpDynamicInjector',
    'atlpDynamicProviders',
    'atlpDynamicContent',
  ];

  @Input()
  atlpDynamicComponent?: Type<C> | null;
  @Input()
  atlpDynamicInjector?: Injector | null;
  @Input()
  atlpDynamicProviders?: StaticProvider[] | null;
  @Input()
  atlpDynamicContent?: any[][] | null;
  @Output()
  atlpDynamicCreated: EventEmitter<ComponentRef<C>> = new EventEmitter();

  componentRef: ComponentRef<C> | null = null;

  constructor(private vcr: ViewContainerRef, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      AtlpDynamicFieldInstanceCreator.UpdateOnInputs.some((input) =>
        changes.hasOwnProperty(input)
      )
    ) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this.vcr.clear();
    this.componentRef = null;

    if (this.atlpDynamicComponent) {
      this.componentRef = this.vcr.createComponent(this.atlpDynamicComponent, {
        index: 0,
        injector: this._resolveInjector(),
        projectableNodes: this.atlpDynamicContent,
      });

      this.atlpDynamicCreated.emit(this.componentRef);
    }
  }

  private _resolveInjector(): Injector {
    let injector = this.atlpDynamicInjector || this.vcr.injector;

    if (this.atlpDynamicProviders) {
      injector = Injector.create({
        providers: this.atlpDynamicProviders,
        parent: injector,
      });
    }

    return injector;
  }
}
