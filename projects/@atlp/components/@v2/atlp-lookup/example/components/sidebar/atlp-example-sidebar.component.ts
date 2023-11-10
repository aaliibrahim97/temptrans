import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AtlpProgressBarService } from 'projects/@atlp/components/progress-bar/service/progress-bar.service';
import { ToastrService } from 'ngx-toastr';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtlpGenericLookup } from '../../../constants/atlp-lookup-constants';
import { InputLookupMockService } from '../../service/atlp-Input-lookup-mock.service';
import { AtlpLookupId } from '../../../models/atlp-lookup-enum.model';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';

@Component({
  selector: 'atlp-example-sidebar',
  templateUrl: './atlp-example-sidebar.component.html',
  styleUrls: ['./atlp-example-sidebar.component.scss'],
})
export class AtlpExampleInputLookUpSidebarComponent implements OnInit {
  SidebarNameAtlp = SidebarName;
  lookupForm: FormGroup;
  modelServerSide: any;
  modelClientSide: any;
  @ViewChild('itemTemplate') linkTemplate: TemplateRef<any>;
  public genericColorLookupClientSide = {
    ...AtlpGenericLookup.genericColorLookup,
  };
  public genericColorLookupServerSide = {
    ...AtlpGenericLookup.genericColorLookup,
  };

  items = [
    { code: '0', name: 'Red' },
    { code: '1', name: 'Blue' },
    { code: '2', name: 'Green' },
    { code: '3', name: 'Yellow' },
    { code: '4', name: 'Black' },
    { code: '5', name: 'Purple' },
    { code: '6', name: 'White' },
    { code: '7', name: 'Grey' },
    { code: '8', name: 'Orange' },
  ];

  displayItem = (x: any) =>
    'code: 0' + x.code + ' || name: ' + x.name.toUpperCase();

  displayItemFn = (item) => {
    return item;
  };

  constructor(
    private _atplSidebarService: AtlpSidebarV2Service,
    private _atlpProgressBarService: AtlpProgressBarService,
    private _translateService: TranslateService,
    private _atlpTranslationService: AtlpTranslationService,
    private _ngxUiLoaderService: NgxUiLoaderService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _iconsService: IconsService,
    public inputLookupMockService: InputLookupMockService
  ) {
    this.genericColorLookupServerSide.isServerSidePaginationEnabled = true;
    this.genericColorLookupServerSide.dynamicFieldsProperty = {
      isDynamicFields: true,
      keyField: 'code',
      fieldsToDispalyInUI: ['code', 'nameEn', 'nameAr'],
      fieldsToExcludeInPopUp: [],
    };
    this.genericColorLookupServerSide.lookupId =
      AtlpLookupId.genericColorLookupServerSide;
    this.genericColorLookupServerSide.sliderId =
      SidebarName.genericColorLookupServerSide;

    this._atlpProgressBarService.show();
    this._atlpProgressBarService.setMode('determinate');
    this._atlpProgressBarService.setValue(10);
    this._atlpProgressBarService.setBufferValue(10);
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.createLookUpForm();
  }

  public showSelected() {
    console.log('Current model: ', this.modelClientSide);
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  createLookUpForm() {
    this.lookupForm = this._formBuilder.group({
      lookupfield: [
        { value: '', disabled: false },
        [Validators.required, Validators.maxLength(11)],
      ],
    });
  }

  private get icons(): Array<string> {
    return ['close-white-icon', 'soc-icon', 'mob-open-menu', 'plus-white'];
  }
}
