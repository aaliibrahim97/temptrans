import { Component, OnInit, Input } from '@angular/core';
import { SidebarName } from 'projects/@atlp/core/enums/sidebar-name.enum';
import { AtlpTranslationService } from 'projects/@atlp/services/app-translation.service';
import { DocumentMgmtService } from 'projects/@atlp/services/document-management.service';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { UserManualService } from 'projects/@atlp/services/user-manual.service';
import { AtlpSidebarV2Service } from '../@v2/atlp-sidebar/atlp-sidebar.service';

@Component({
  selector: 'user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.scss'],
})
export class UserManualComponent implements OnInit {
  @Input() publicPage: boolean = false;
  SidebarName = SidebarName;
  displayedColumns: string[] = ['name', 'downloadURL'];
  userManuals: any;
  selectedLanguage: string;

  constructor(
    private _atplSidebarService: AtlpSidebarV2Service,
    private _iconsService: IconsService,
    private _userManualService: UserManualService,
    private _atlpTranslationService: AtlpTranslationService,
    private _docMgmtService: DocumentMgmtService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this._atlpTranslationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLanguage = lang;
    });

    this._userManualService.userManual$.subscribe(
      (res: any) => {
        if (res) {
          if (this.selectedLanguage == 'ar' || this.selectedLanguage == 'ae') {
            const arabicManuals = res.map((item) => ({
              userManualName: item.userManualNameAr,
              userManualUrl: item.userManualUrlAr,
            }));
            this.userManuals = arabicManuals;
          } else {
            this.userManuals = res;
          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  toggleSidebarOpen(key): void {
    this._atplSidebarService.getSidebar(key).toggleOpen();
  }

  downloadUserManual(url) {
    var windowReference = window.open();
    this._docMgmtService.downloadTemplatebyURL(url).subscribe(
      (response) => {
        let blob = new Blob([response], { type: response?.type });
        const fileURL = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.setAttribute('href', fileURL);
        // a.setAttribute('target', '_blank');
        // a.click();
        // window.open(fileURL, '_blank');
        windowReference.location = fileURL;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private get icons(): Array<string> {
    return ['icon-user-manual', 'icon-view-white'];
  }
}
