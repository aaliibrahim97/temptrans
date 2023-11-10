import { Component, Input, OnInit } from "@angular/core";
import { AtlpTranslationService } from "projects/@atlp/services/app-translation.service";
import { locale as navigationEnglish } from "../i18n/en";
import { locale as navigationArabic } from "../i18n/ae";

@Component({
  selector: "atlp-empty-table",
  templateUrl: "./atlp-empty-table.component.html",
  styleUrls: ["./atlp-empty-table.component.scss"],
})
export class AtlpEmptyTableComponent implements OnInit {
  @Input() invert: boolean;
  @Input() colHeader: any[];
  selectedLanguage: string;
  constructor(private atlpTranslationService: AtlpTranslationService) {}

  ngOnInit(): void {
    this.atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
      this.atlpTranslationService.setDefaultLanguageSettings(
        this.selectedLanguage,
        navigationEnglish,
        navigationArabic
      );
    });
  }
}
