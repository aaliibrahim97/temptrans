import { Component, OnInit } from '@angular/core';
import { AtlpEnvService } from 'projects/@atlp/environments/env.service';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';

@Component({
  selector: 'atlp-faq',
  templateUrl: './atlp-faq.component.html',
  styleUrls: ['./atlp-faq.component.scss'],
})
export class AtlpFAQComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
