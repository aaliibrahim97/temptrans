import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { AtlpPerfectScrollbarDirective } from 'projects/@atlp/directives/atlp-perfect-scrollbar/atlp-perfect-scrollbar.directive';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicAccordionConfig } from '../../../../models/dynamic-layout.models';
import { DynamicErrorHandlerService } from '../../../services/dynaic-error-handler.service';
import { WidgetSelectorTerminatorService } from '../../../services/widget-terminator.service';
import { DynamicFormAccordionComponent } from './dynamic-form-accordion/dynamic-form-accordion.component';
import { WidgetChooserDataMapper } from '../../widget-chooser/utils/widget-chooser-data-mapper';
import { DynamicWidgetChooserConfig } from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-widget-chooser-config';
import {
  IDynamicExpansionSliderConfig,
  IDynamicFieldActions,
} from 'projects/@atlp/components/atlp-dynamic-form-builder/models/dynamic-page-wizard.interface';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';
import { ProgressBarCalc } from 'projects/@atlp/utils/progress-bar-calc';
import { locale as navigationEnglish } from '../../../i18n/en';
import { locale as navigationArabic } from '../../../i18n/ae';

@Component({
  selector: 'expansion-panel-chooser',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class DynamicExpansionPanelComponent implements OnInit, AfterViewInit {
  @Input() widgetInfo: DynamicWidgetChooserConfig;
  @Input() parentcomponentRef: ComponentRef<any>;

  @Output() widgetInstanciated = new EventEmitter<any>();
  widgetData: any;

  private ref: ComponentRef<any>;
  private subs: Subscription;
  accordionConfigCollection: DynamicAccordionConfig[] = [];
  private _unsubscribeAll$ = new Subject<any>();
  subscriptions: Subscription[] = [];
  form: FormGroup = this.fb.group({});
  errors = [];
  listErrors = [];
  percentageValue: number = 0;
  isSubmited: boolean = false;
  currentErrorControl: number = 0;
  currentInvalidListNum: number = 0;
  @ViewChildren(DynamicFormAccordionComponent)
  dynamicFormAccordionsComponentChild!: QueryList<DynamicFormAccordionComponent>;
  topLevelProgress: number = 0;
  @ViewChild(AtlpPerfectScrollbarDirective)
  directiveRef?: AtlpPerfectScrollbarDirective;
  @ViewChild('sideBarAccordion') accordion: MatAccordion;
  selectedLanguage: string = 'en';
  dynamicExpansionSliderConfig: IDynamicExpansionSliderConfig;
  noOfExpansionPanelsCreated: number = 0;
  @Output() afterAllInstanceCreated: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  dynamicFieldActions: IDynamicFieldActions = null;

  constructor(
    private terminator: WidgetSelectorTerminatorService,
    public atplSidebarService: AtlpSidebarV2Service,
    public elementRef: ElementRef,
    private atlpTranslationService: AtlpTranslationService,
    private fb: FormBuilder,
    private dynamicErrorHandlerService: DynamicErrorHandlerService
  ) {}

  ngOnInit() {
    //just override error calculation servie from it's parent if you need the error calculation seperatily for your forms
    if (this.parentcomponentRef['dynamicErrorHandlerService']) {
      this.dynamicErrorHandlerService =
        this.parentcomponentRef['dynamicErrorHandlerService'];
    }
    this.dynamicExpansionSliderConfig = this.widgetInfo.expansionSliderConfig;
    this.accordionConfigCollection =
      WidgetChooserDataMapper.mapExpansionPanelAccordionConfig(
        this.widgetInfo.expansionSliderConfig.pageConfig
      );
    this.dynamicFieldActions =
      this.widgetInfo.expansionSliderConfig.dynamicFieldActions;
    this.atlpTranslationService
      .getCurrentLanguage()
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((lang) => {
        this.selectedLanguage = lang;
        this.atlpTranslationService.setDefaultLanguageSettings(
          this.selectedLanguage,
          navigationEnglish,
          navigationArabic
        );
      });
    this.subs = this.terminator.onDestroy.subscribe((destroy) => {
      if (destroy) {
        this.ref.destroy();
      }
    });
    this.widgetData = {
      widgetInfo: this.widgetInfo,
    };
  }

  ngAfterViewInit() {
    this.initiateChildForms();
  }

  afterAllInstanceCreatedEvent($event: boolean) {
    if ($event) {
      this.noOfExpansionPanelsCreated++;
    }
    if (
      this.noOfExpansionPanelsCreated == this.accordionConfigCollection.length
    ) {
      this.afterAllInstanceCreated.emit(true);
      this.changesForm();
    }
  }

  initiateChildForms(): void {
    const accordionForms = {};
    if (this.dynamicFormAccordionsComponentChild) {
      this.dynamicFormAccordionsComponentChild.forEach(
        (accordion: DynamicFormAccordionComponent) => {
          if (accordion?.form) {
            accordionForms[accordion.uniqueDynamicFormComponentId] =
              accordion.form;
          }
        }
      );
      this.form = new FormGroup(accordionForms);
    }
  }

  private changesForm(): void {
    this.form.valueChanges.subscribe((value) => {
      this.progressBarCalulation();
    });
  }

  progressBarCalulation() {
    if (this.dynamicFormAccordionsComponentChild) {
      this.dynamicFormAccordionsComponentChild.forEach(
        (accordion: DynamicFormAccordionComponent) => {
          let progressPercentage: number = accordion.form.valid
            ? 100
            : Math.round(ProgressBarCalc.getCalculation(accordion.form));
          this.accordionConfigCollection.forEach(
            (accordionConfig: DynamicAccordionConfig) => {
              if (
                accordionConfig.uniqueAccordionName ==
                accordion.uniqueDynamicFormComponentId
              ) {
                accordionConfig.progressPercentage = progressPercentage;
              }
            }
          );
        }
      );
    }
    let totalProgress = 0;

    this.accordionConfigCollection.forEach(
      (accordionConfig: DynamicAccordionConfig) => {
        totalProgress += accordionConfig.progressPercentage;
      }
    );
    this.topLevelProgress = Math.round(
      totalProgress / this.accordionConfigCollection.length
    );
  }

  scrollToInvalidControl(dir: 'prev' | 'next' = null): void {
    this.dynamicErrorHandlerService.scrollToInvalidControl(this, dir);
  }

  saveForms(): FormGroup {
    this.isSubmited = true;
    this.errors = [];
    this.currentErrorControl = 0;
    this.validateForms();
    if (this.form) {
      if (this.form.invalid) {
        this.dynamicErrorHandlerService.scrollToInvalidControl(this);
        this.dynamicFormAccordionsComponentChild.forEach(
          (accordion: DynamicFormAccordionComponent) => {
            this.dynamicErrorHandlerService.calculateErrors(
              this,
              accordion.form
            );
          }
        );
      }
    }
    return this.form;
  }

  getFormdata() {
    return this.form;
  }

  validateForms() {
    this.dynamicFormAccordionsComponentChild.forEach(
      (accordion: DynamicFormAccordionComponent) => {
        accordion.dynamicFormInstance.onSubmit(null);
      }
    );
    this.accordion.openAll();
  }

  getParentInstance() {
    return this;
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
