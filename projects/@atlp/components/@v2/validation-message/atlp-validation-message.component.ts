import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IconsService } from "projects/@atlp/services/icons.service";

@Component({
  selector: "atlp-validation-message",
  templateUrl: "./atlp-validation-message.component.html",
  styleUrls: ["./atlp-validation-message.component.scss"],
})
export class AtlpValidationMessageComponent implements OnInit {
  public form: FormGroup;
  @Input() className: string = "text-danger font-14";
  @Input() fieldName: string;
  @Input() theForm: FormGroup;
  isSubmited = false;
  @Input() set isSubmit(val) {
    this.isSubmited = val;
  }

  constructor(private _iconsService: IconsService) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit() {
    this.form = this.theForm;
  }

  private get icons(): Array<string> {
    return ["warning-circle-fill"];
  }
}
