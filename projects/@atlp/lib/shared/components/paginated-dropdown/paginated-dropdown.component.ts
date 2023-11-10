import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@UntilDestroy()
@Component({
  selector: 'mg-paginated-dropdown',
  templateUrl: './paginated-dropdown.component.html',
  styleUrls: ['./paginated-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PaginatedDropdownComponent),
    },
  ],
})
export class PaginatedDropdownComponent
  implements ControlValueAccessor, OnDestroy
{
  @ViewChild('selectElem') selectElem: MatSelect;
  @ViewChild('search', { static: false }) searchElement: ElementRef;

  @Output() onScrollEnd = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();

  @Input() items: IItem[] = [];

  @Input() set selectedValues(values: []) {
    this.populateList(values);
  }
  @Input() disableSelect: boolean = false;

  value: any = '';
  selected = [];

  searchValue = '';
  timeBeforeEmit: number = 2;
  selectedLanguage: any = 'en';

  constructor(private atlpTranslationService: AtlpTranslationService) {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onInputChange();
  }

  ngOnDestroy(): void {}

  onInputChange() {
    fromEvent(this.searchElement.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500)) // checking if user stopped typing
      .pipe(distinctUntilChanged())
      .subscribe((data) => this.onSearch.emit(data));
  }

  registerPanelScrollEvent() {
    const panel = this.selectElem.panel.nativeElement;
    panel.addEventListener('scroll', (event) => this.loadAllOnScroll(event));
  }

  emitScrollEnd() {
    // just preventing multiple emit at the same time
    if (this.timeBeforeEmit >= 2) {
      this.timeBeforeEmit = 0;
      this.onScrollEnd.emit(this.searchValue);
      this.runTimer();
    } else {
      return;
    }
  }

  runTimer() {
    var interval = setInterval(() => {
      this.timeBeforeEmit++;
      if (this.timeBeforeEmit >= 2) {
        clearInterval(interval);
      }
    }, 1000);
  }

  onOpenedChange(event: any) {
    if (!this.items?.length) {
      this.searchValue = '';
      this.onSearch.emit('');
    }
    if (event) {
      this.selectElem.panel.nativeElement.addEventListener(
        'scroll',
        (event: any) => {
          if (
            this.selectElem.panel.nativeElement.scrollTop >=
            this.selectElem.panel.nativeElement.scrollHeight -
              this.selectElem.panel.nativeElement.offsetHeight
          ) {
            this.emitScrollEnd();
          }
        }
      );
    } else {
      this.selectElem?.panel?.nativeElement?.removeEventListener('scroll');
    }

    if (this.selectElem) {
      this.adjustMatSelectOverlay(this.selectElem);
    }
  }

  loadAllOnScroll(event) {
    if (event.target.scrollTop >= event.target.scrollHeight) {
      this.emitScrollEnd();
    }
  }

  populateList(selected) {
    this.selected = selected;
  }

  onSelectionChange(matSelect) {
    this.onChange(matSelect.value);
    this.value = matSelect.value;
  }

  onKeyDown(event) {
    event.stopImmediatePropagation();
  }

  public onChange: (value) => void;

  writeValue(value) {
    if (
      this.selected &&
      Array.isArray(this.selected) &&
      this.selected.length > 0 &&
      value &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      // prettier-ignore
      const alreadySelected = this.value.filter(r => this.selected.includes(r.value));
      // prettier-ignore
      const filterRecordsAlreadySelected = value.filter(r => !alreadySelected.includes(r.value))

      this.value = [...alreadySelected, ...filterRecordsAlreadySelected];
    } else {
      this.value = value;
    }
  }

  onTouched() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  adjustMatSelectOverlay(element): void {
    element?.overlayDir?._overlayRef?.addPanelClass('custom-overlay');
  }
}

export interface IItem {
  label: any;
  value: any;
}
