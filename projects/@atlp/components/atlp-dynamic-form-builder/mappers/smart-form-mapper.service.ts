import { Injectable } from '@angular/core';
import { AtlpMultiInheritanceMixin } from '../ts-multiple-inheritance';
import { SmartFormControlsCommonMapper } from './common/smart-form-controls-common-mapper';
import { SmartformExpansionPanelcommonMapper } from './common/smart-form-expansion-panel-common-mapper';
import {
  ISmartFormInputMapper,
  ISmartFormTextAreaMapper,
} from './field-control-mappers';
import {
  dynamicColumn,
  dynamicColumnProps,
  dynamicLayout,
  dynamicLayoutList,
  dynamicRow,
} from '../models/dynamic-layout.interface';
import {
  DynamicPreDefinedFormInputType,
  FieldConfig,
} from '../models/dynamic-form-field.interface';
import { IDynamicPageWizard } from '../models/dynamic-page-wizard.interface';
import {
  FormRootObject,
  InternalComponent,
} from './Interfaces/smart-form.interface';
import _ from 'lodash';
import { WizardRootObject } from './Interfaces/wizard-form.interface';
import {
  ISmartFormButtonMapper,
  SmartFormButtonMapper,
} from './field-control-mappers/smart-button-mapper';
import {
  ISmartFormCheckboxMapper,
  SmartFormCheckboxMapper,
} from './field-control-mappers/smart-checkbox-mapper';
import {
  ISmartFormCurrencyMapper,
  SmartFormCurrencyMapper,
} from './field-control-mappers/smart-currency-mapper';
import {
  ISmartFormDateTimeMapper,
  SmartFormDateTimeMapper,
} from './field-control-mappers/smart-datetime-mapper';
import {
  ISmartFormEmailMapper,
  SmartFormEmailMapper,
} from './field-control-mappers/smart-email-mapper';
import {
  ISmartFormPhoneNumberMapper,
  SmartFormPhoneNumberMapper,
} from './field-control-mappers/smart-phonenumber-mapper';
import {
  ISmartFormUrlMapper,
  SmartFormUrlMapper,
} from './field-control-mappers/smart-url-mapper';
import {
  ISmartFormRadioButtonMapper,
  SmartFormRadioButtonMapper,
} from './field-control-mappers/smart-radiobutton-mapper';
import {
  ISmartFormNumberMapper,
  SmartFormNumberMapper,
} from './field-control-mappers/smart-number-mapper';
import {
  ISmartFormTimeMapper,
  SmartFormTimeMapper,
} from './field-control-mappers/smart-time-mapper';
import {
  ISmartFormPasswordMapper,
  SmartFormPasswordMapper,
} from './field-control-mappers/smart-password-mapper';
import {
  ISmartFormSelectMapper,
  SmartFormSelectMapper,
} from './field-control-mappers/smart-select-mapper';
import { SmartFormService } from './services/smart-form.service';
import { JsonValidators } from '../utils/json.validators';
import { unformattedData } from './data-provider/unformatted-sample-data';
import { SmartFormInputMapper } from './field-control-mappers/smart-input-mapper';
import { SmartFormTextAreaMapper } from './field-control-mappers/smart-text-area-mapper';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ISmartFormLookUpMapper,
  SmartFormLookUpMapper,
} from './field-control-mappers/smart-lookup-mapper';
import {
  ISmartAutcompleteMapper,
  SmartAutcompleteMapper,
} from './field-control-mappers/smart-autocomplete-mapper';
import {
  ISmartRegCompMapper,
  SmartRegCompMapper,
} from './field-control-mappers/smart-regcomp-mapper';

@Injectable({
  providedIn: 'root',
})
export class SmartFormMapperService extends AtlpMultiInheritanceMixin(
  SmartFormControlsCommonMapper,
  SmartformExpansionPanelcommonMapper
) {
  dynamicFormdataOne: any;
  dynamicFormdataTwo: any;
  hardcodedJSON: any;
  JSONFromService: any;
  jsonFromAPI: any = null;
  unformattedData = unformattedData;
  mappedFormData: any;
  private _onMappedFormDataChanged$: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  constructor(
    private smartFormService: SmartFormService,
    private dynamicFormId: string,
    readonly smartFormInputMapper: ISmartFormInputMapper = new SmartFormInputMapper(),
    readonly smartFormTextAreaMapper: ISmartFormTextAreaMapper = new SmartFormTextAreaMapper(),
    readonly smartFormButtonMapper: ISmartFormButtonMapper = new SmartFormButtonMapper(),
    readonly smartFormCheckboxMapper: ISmartFormCheckboxMapper = new SmartFormCheckboxMapper(),
    readonly smartFormCurrencyMapper: ISmartFormCurrencyMapper = new SmartFormCurrencyMapper(),
    readonly smartFormDateTimeMapper: ISmartFormDateTimeMapper = new SmartFormDateTimeMapper(),
    readonly smartFormEmailMapper: ISmartFormEmailMapper = new SmartFormEmailMapper(),
    readonly smartFormNumberMapper: ISmartFormNumberMapper = new SmartFormNumberMapper(),
    readonly smartFormPasswordMapper: ISmartFormPasswordMapper = new SmartFormPasswordMapper(),
    readonly smartFormPhoneNumberMapper: ISmartFormPhoneNumberMapper = new SmartFormPhoneNumberMapper(),
    readonly smartFormRadioButtonMapper: ISmartFormRadioButtonMapper = new SmartFormRadioButtonMapper(),
    readonly smartFormTimeMapper: ISmartFormTimeMapper = new SmartFormTimeMapper(),
    readonly smartFormUrlMapper: ISmartFormUrlMapper = new SmartFormUrlMapper(),
    readonly smartFormSelectMapper: ISmartFormSelectMapper = new SmartFormSelectMapper(),
    readonly smartFormLookUpMapper: ISmartFormLookUpMapper = new SmartFormLookUpMapper(),
    readonly smartAutcompleteMapper: ISmartAutcompleteMapper = new SmartAutcompleteMapper(),
    readonly smartRegCompMapper: ISmartRegCompMapper = new SmartRegCompMapper(),
    readonly jsonValidators: any = JsonValidators // pass "JsonValidators" or your own validator that inherite "JsonValidators"
  ) {
    super();
    this.jsonValidators = jsonValidators;
    this.getFormReponse();
  }

  get onMappedFormDataChange(): Observable<string> {
    return this._onMappedFormDataChanged$.asObservable();
  }

  public processJSON(): string {
    if (this.jsonFromAPI) {
      let entryForm = this.jsonFromAPI?.data?.entryForm;
      let smartformJSONfromAPI = JSON.parse(JSON.stringify(entryForm));
      this.hardcodedJSON = JSON.parse(smartformJSONfromAPI);
      console.log('sssss');
      console.log(JSON.stringify(this.hardcodedJSON));
      return this.processFormData();
    }
    //this is only hardcoded data
    else {
      let entryForm = this.unformattedData.data.entryForm;
      //let entryForm = null;
      let smartformJSONfromAPI = JSON.parse(JSON.stringify(entryForm));
      this.hardcodedJSON = JSON.parse(smartformJSONfromAPI);
      console.log('sssss');
      console.log(JSON.stringify(this.hardcodedJSON));
      return this.processFormData();
    }
  }

  getFormReponse() {
    this.smartFormService.get(this.dynamicFormId).subscribe((resp) => {
      if (resp) {
        this.jsonFromAPI = resp;
        const mappedData = this.processJSON();
        this._onMappedFormDataChanged$.next(mappedData);
      }
    });
  }

  processFormData(): any {
    this.dynamicFormdataOne = [];
    this.dynamicFormdataTwo = [];
    let dll = {} as dynamicLayoutList;
    let dl: dynamicLayout = [];
    let dwpw: IDynamicPageWizard[] = [];
    if (this.hardcodedJSON.display == 'wizard') {
      let root = this.hardcodedJSON as unknown as WizardRootObject;
      root.components.forEach((_comp: any) => {
        let dwl = {} as IDynamicPageWizard;
        dwl.pageConfig = {};
        (dwl.pageConfig = {
          isDisabled: _comp.disabled,
          accordion: {
            expanded: true,
            panelTitle: _comp.title,
            panelInfo: _comp.title,
            uniqueAccordionName: _comp.title,
            dynamicLayout: _.cloneDeep(this.processWizardform(_comp)),
          },
        }),
          (dwl.pageName = _comp.title);
        dwpw.push(dwl);
      });
      console.log('>>>>>dwpw-wizard<<<<');
      console.log(JSON.stringify(dwpw));
      return dwpw;
    } else if (this.hardcodedJSON.display == 'form') {
      let root = this.hardcodedJSON as unknown as FormRootObject;
      root.components.forEach((eachComp) => {
        let dr = {} as dynamicRow;
        dr.columns = [];
        eachComp?.columns.forEach((eachcol) => {
          let dc = {} as dynamicColumn;
          let fieldconfigarray: FieldConfig[] = [];
          let dpc = {} as dynamicColumnProps;
          dpc.classList = [];
          dpc.classList.push('col-' + eachcol.size + '-' + eachcol.width + '');
          eachcol.components.forEach((eachcompincol) => {
            fieldconfigarray.push(this.mapAtlpToSmartForm(eachcompincol));
          });
          dc = {
            components: fieldconfigarray,
            props: {
              classList: dpc.classList,
            },
          };
          dr.columns.push(dc);
        });
        dll = {
          row: dr,
        };
        dl.push(dll);
      });
      console.log('>>dl>>form>>' + JSON.stringify(dl));
      return dl;
    }
  }

  processWizardform(_comp) {
    let dll = {} as dynamicLayoutList;
    let dl: dynamicLayout = [];
    _comp?.components?.forEach((eachComp) => {
      let dr = {} as dynamicRow;
      dr.columns = [];
      eachComp?.columns?.forEach((eachcol) => {
        let dc = {} as dynamicColumn;
        let fieldconfigarray: FieldConfig[] = [];
        let dpc = {} as dynamicColumnProps;
        dpc.classList = [];
        dpc.classList.push('col-' + eachcol.size + '-' + eachcol.width + '');
        eachcol?.components?.forEach((eachcompincol) => {
          fieldconfigarray.push(this.mapAtlpToSmartForm(eachcompincol));
        });
        dc = {
          components: fieldconfigarray,
          props: {
            classList: dpc.classList,
          },
        };
        dr.columns.push(dc);
      });
      dll = {
        row: dr,
      };
      dl.push(dll);
    });
    return dl;
  }

  mapAtlpToSmartForm(smartcontrol: any) {
    smartcontrol = smartcontrol as InternalComponent;
    let formcontrol = {} as FieldConfig;
    this.smartFormControlsCommonMapper(
      smartcontrol,
      formcontrol,
      this.jsonValidators
    );
    this.smartExpansionPanelMapper();
    if (smartcontrol.type === 'input') {
      this.smartFormInputMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol.type === 'textArea') {
      this.smartFormTextAreaMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol.type === 'button') {
      this.smartFormButtonMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.type == 'radio') {
      this.smartFormRadioButtonMapper.map(smartcontrol, formcontrol);
    } else if (
      smartcontrol?.type == 'number' ||
      smartcontrol.type == 'currency'
    ) {
      this.smartFormNumberMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.type == 'email') {
      this.smartFormEmailMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.type == 'url') {
      this.smartFormUrlMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.type == 'phoneNumber') {
      this.smartFormPhoneNumberMapper.map(smartcontrol, formcontrol);
    } else if (
      smartcontrol?.type == 'datetime' ||
      smartcontrol?.inputType == 'datetime'
    ) {
      this.smartFormDateTimeMapper.map(smartcontrol, formcontrol);
    } else if (
      smartcontrol?.type == 'time' ||
      smartcontrol?.inputType == 'time'
    ) {
      this.smartFormTimeMapper.map(smartcontrol, formcontrol);
    } else if (
      smartcontrol?.type == 'select' ||
      smartcontrol?.inputType == 'select'
    ) {
      this.smartFormSelectMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.key == 'atlpLookupComponent1') {
      this.smartFormLookUpMapper.map(smartcontrol, formcontrol);
    } else if (
      //disable in UI un admin portal
      smartcontrol?.key == 'atlpRegistredComponent1'
    ) {
      this.smartRegCompMapper.map(smartcontrol, formcontrol);
    } else if (smartcontrol?.key == 'atlpAutocompleteComponent1') {
      this.smartAutcompleteMapper.map(smartcontrol, formcontrol);
    } else {
      formcontrol.type = smartcontrol?.widget
        ?.type as DynamicPreDefinedFormInputType;
      formcontrol.inputType = smartcontrol?.inputType;
    }
    return formcontrol;
  }
}
