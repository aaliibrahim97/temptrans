import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'atlp-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {
  public form: FormGroup;
  @Input() className: string = 'text-danger font-14';
  @Input() field: string;
  @Input() theForm: FormGroup;
  selectedLanguage: any = 'en';

  constructor(
    private fb: FormBuilder,
    private _iconsService: IconsService,
    private atlpTranslationService: AtlpTranslationService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit() {
    this.form = this.theForm;
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }
  private get icons(): Array<string> {
    return ['warning-circle-fill'];
  }
}
