import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IDynamicFieldComponent } from '../../models/dynamic-field-component.interface';
import { FormControlName, FormGroup } from '@angular/forms';
import { IDynamicControlsInputModel } from '../../models/dynamic-controls-io-models';
import {
  FieldConfig,
  FieldMetaData,
} from '../../models/dynamic-form-field.interface';
import { DynamicSnakbarFeedbackComponent } from './helpers/dynamic-snakbar-feedback.component';
import { DynamicCarouselComponent } from './helpers/dynamic-carousel/dynamic-carousel.component';
import { DynamicHappinessIndexEnum } from './helpers/dynamic-hapiness-index-enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dynamic-hapiness-field',
  templateUrl: './dynamic-hapiness-field.component.html',
  styleUrls: ['./dynamic-hapiness-field.component.scss'],
})
export class DynamicHapinessFieldComponent
  implements AfterViewChecked, IDynamicFieldComponent
{
  field: FieldConfig;
  group: FormGroup;
  isSubmited: boolean;
  fieldMetaData: FieldMetaData;
  isDisable: boolean;
  parentSliderInstance: ComponentRef<any>;
  @ViewChild('inputRef') elementRef: ElementRef;
  @Input() inputs: IDynamicControlsInputModel;

  emojis: Array<any>;
  servicesList: Array<any>;
  @Output() ratingCount = new EventEmitter<any>();
  @ViewChild(DynamicCarouselComponent)
  carouselComponent: DynamicCarouselComponent;
  ratingEnum = DynamicHappinessIndexEnum;
  checked: boolean;
  clicked: boolean;
  selectedEmoji: number;
  selectedLanguage: string;
  emojiText: string = '';
  isHidden: boolean = false;
  isVisible: boolean = true;

  constructor(
    private atlpTranslationService: AtlpTranslationService,
    private _iconsService: IconsService,
    private _snackBar: MatSnackBar
  ) {
    this._iconsService.registerIcons(this.icons);
    this.selectedEmoji = 0;
    this.checked = false;
    this.checked = false;
    this.emojis = [
      {
        id: this.ratingEnum.VerySad,
        icon: 'emoji-happiness-1',
        value: 'icon1',
        text: 'Angry',
      },
      {
        id: this.ratingEnum.Sad,
        icon: 'emoji-happiness-2',
        value: 'icon2',
        text: 'Sad',
      },
      // { id: this.ratingEnum.Neutral, icon: "emoji-happiness-3", value: "icon3", text: "Neutral" },
      {
        id: this.ratingEnum.Happy,
        icon: 'emoji-happiness-4',
        value: 'icon4',
        text: 'Happy',
      },
      {
        id: this.ratingEnum.VeryHappy,
        icon: 'emoji-happiness-5',
        value: 'icon5',
        text: 'Very_Happy',
      },
    ];
  }

  ngAfterViewChecked(): void {
    if (this.carouselComponent) {
      this.carouselComponent.reSizeCarousel();
    }
  }

  get isValid() {
    return this.group.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.group.controls[this.field.name].dirty;
  }

  get formValidator() {
    return this.group.get(this.field.name);
  }

  getLanguage() {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  public setIsClicked(data: any, index): void {
    this.servicesList[index].rate = data.id;
    this.emojiText = data.text;
    this.servicesList[index].isFeedback = true;
    if ((data.id == 4 || data.id == 5) && !this.servicesList[index].feedback) {
      this.servicesList[index].disabled = true;
    } else if (
      this.servicesList[index].feedback &&
      this.servicesList[index].feedback.length < 10
    ) {
      this.servicesList[index].disabled = true;
    } else {
      this.servicesList[index].disabled = false;
    }
  }

  validateFeedback(index: any, ele: FormControlName) {
    let controls = ele.control;
    if (
      (this.servicesList[index].rate == 4 ||
        this.servicesList[index].rate == 5) &&
      !this.servicesList[index].feedback
    ) {
      this.servicesList[index].disabled = true;
    } else if (controls?.errors?.minlength) {
      this.servicesList[index].disabled = true;
    } else {
      this.servicesList[index].disabled = false;
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DynamicSnakbarFeedbackComponent, {
      duration: 5000,
    });
  }

  private get icons(): Array<string> {
    return [
      'emoji-happiness-1',
      'emoji-happiness-2',
      'emoji-happiness-3',
      'emoji-happiness-4',
      'emoji-happiness-5',
      'emoji-happiness-1-active',
      'emoji-happiness-2-active',
      'emoji-happiness-3-active',
      'emoji-happiness-4-active',
      'emoji-happiness-5-active',
      'suggestion',
      'success-icon',
    ];
  }
}
