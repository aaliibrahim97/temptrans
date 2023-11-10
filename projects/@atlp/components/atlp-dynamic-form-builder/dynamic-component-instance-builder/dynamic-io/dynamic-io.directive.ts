import {
  Directive,
  DoCheck,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';

import {
  AtlpDynamicComponentInjector,
  AtlpDynamicComponentInjectorToken,
} from '../component-injector';
import { InputsType, IoService, OutputsType } from '../io';

/* eslint-disable @angular-eslint/no-conflicting-lifecycle */

@Directive({
  selector:
    '[atlpDynamicInputs],[atlpDynamicOutputs],[ngComponentOutletatlpDynamicInputs],[ngComponentOutletatlpDynamicOutputs]',
  providers: [IoService],
})
export class DynamicIoDirective implements OnChanges, DoCheck {
  @Input()
  atlpDynamicInputs: InputsType;
  @Input()
  ngComponentOutletatlpDynamicInputs: InputsType;
  @Input()
  atlpDynamicOutputs: OutputsType;
  @Input()
  ngComponentOutletatlpDynamicOutputs: OutputsType;

  private get inputs() {
    return this.atlpDynamicInputs || this.ngComponentOutletatlpDynamicInputs;
  }

  private get outputs() {
    return this.atlpDynamicOutputs || this.ngComponentOutletatlpDynamicOutputs;
  }

  constructor(
    private ioService: IoService,
    @Inject(AtlpDynamicComponentInjectorToken)
    @Optional()
    private componentInjector?: AtlpDynamicComponentInjector
  ) {
    this.ioService.init(this.componentInjector);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ioService.update(
      this.inputs,
      this.outputs,
      this.inputsChanged(changes),
      this.outputsChanged(changes)
    );
  }

  ngDoCheck() {
    this.ioService.maybeUpdate();
  }

  private inputsChanged(changes: SimpleChanges): boolean {
    return (
      'ngComponentOutletatlpDynamicInputs' in changes ||
      'atlpDynamicInputs' in changes
    );
  }

  private outputsChanged(changes: SimpleChanges): boolean {
    return (
      'ngComponentOutletatlpDynamicOutputs' in changes ||
      'atlpDynamicOutputs' in changes
    );
  }
}
