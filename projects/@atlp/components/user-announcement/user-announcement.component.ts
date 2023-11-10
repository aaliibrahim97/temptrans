import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { IconsService } from 'projects/@atlp/services/icons.service';
import { IAnnouncementModel } from './user-announcement';
import { ContactsService } from 'projects/@atlp/services/contacts.service';

@Component({
  selector: 'app-user-announcement',
  templateUrl: './user-announcement.component.html',
  styleUrls: ['./user-announcement.component.scss'],
})
export class UserAnnouncementComponent implements OnInit {
  content: SafeHtml | SafeResourceUrl | TemplateRef<any>;
  component: any;
  seconds = 240;
  interval: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAnnouncementModel,
    public dialogRef: MatDialogRef<UserAnnouncementComponent>,
    private sanitizer: DomSanitizer,
    private _iconsService: IconsService,
    private changeDetect: ChangeDetectorRef,
    private contactService: ContactsService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.component = this.data?.template;
    let data = this.data?.message;
    if (this.data?.isDocViewer) {
      this.content = data;
    } else {
      this.content = this.sanitizer.bypassSecurityTrustHtml(data);
    }
    if (this.data?.showTimer) {
      this.setupInterval();
    }
  }

  private get icons(): Array<string> {
    return [this.data?.icon, 'close-white-icon'];
  }

  onAction(data: string) {
    if (this.data?.pageName == 'theme-preference') {
      let obj = {
        pageName: this.data.pageName,
        data: data,
        selectedTheme: this.contactService.selectedTheme,
      };
      this.dialogRef.close(obj);
    } else {
      this.dialogRef.close(data);
    }
  }

  setupInterval() {
    this.seconds = 240;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(this.interval);
      }
      this.changeDetect.detectChanges();
    }, 1000);
  }

  displayTimer(value: number) {
    const sec_num = value;
    let hours: any = Math.floor(sec_num / 3600);
    let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    let seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds;
  }
}
