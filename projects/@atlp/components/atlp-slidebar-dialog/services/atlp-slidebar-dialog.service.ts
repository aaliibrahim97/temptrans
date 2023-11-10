import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
} from '@angular/core';
import { AtlpSlideBarDialogComponent } from '../components/atlp-slidebar-dialog/atlp-slidebar-dialog.component';
import { AtlpSlideBarDialogConfig } from '../atlp-slidebar-dialog-configs/atlp-slidebar-dialog.config';
import { AtlpDialogInjector } from '../injectors/atlp-dialog-injector';
import { AtlpDialogRef } from '../injectors/atlp-dialog-ref';
import { AtlpSidebarV2Service } from '../../@v2/atlp-sidebar/atlp-sidebar.service';

@Injectable({
  providedIn: 'root',
})
export class AtlpSlideBarDialogService {
  dialogComponentRef: ComponentRef<AtlpSlideBarDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    public atplSidebarService: AtlpSidebarV2Service
  ) {}

  public open(
    componentType: Type<any>,
    config: AtlpSlideBarDialogConfig
  ): AtlpDialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(
    config: AtlpSlideBarDialogConfig
  ): AtlpDialogRef {
    const map = new WeakMap();
    map.set(AtlpSlideBarDialogConfig, config);

    const dialogRef = new AtlpDialogRef();
    map.set(AtlpDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      this.removeDialogComponentFromBody(config);
      sub.unsubscribe();
    });

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        AtlpSlideBarDialogComponent
      );
    const componentRef = componentFactory.create(
      new AtlpDialogInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody(config);
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody(
    config: AtlpSlideBarDialogConfig
  ): void {
    this.atplSidebarService.getSidebar(config.keyToCloseSlider).toggleOpen();
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
