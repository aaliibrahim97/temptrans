import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'josoor-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() selectedLanguage: string;

  constructor() {}

  ngOnInit(): void {}
}
