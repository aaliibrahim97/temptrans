import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconsService } from 'projects/@atlp/services/icons.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

  // Public
  public inputNumberForm: FormGroup;
  
  /**
   * Constructor
   * @param {IconsService} _iconsService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _iconsService: IconsService,
    private _formBuilder: FormBuilder
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    // initialInputNumberForm
    this.initialInputNumberForm()
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Change current value input  
   * @param formControlName 
   * @param operation 
   */
  public changesInputNumber(formControlName: string, operation: string){
    let value = +this.inputNumberForm.controls[formControlName].value;
    
    if(operation === 'decrement' && value === 0 || value == null) return;

    if(operation === 'increment'){
      value += 1;
    } else if(operation === 'decrement'){
      value -= 1;
    }
    
    this.inputNumberForm.controls[formControlName].setValue(value);
  }
 
  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Register icon for current component
   */
  private get icons(): Array<string> {
    return ['time-icon', 'piker-icon', 'error-icon', 'data-icon'];
  }
  /**
   * Initial number input form
   */
  private initialInputNumberForm() {
    this.inputNumberForm = this._formBuilder.group({
      "numberInput": ["", []],
    });
  }
}
