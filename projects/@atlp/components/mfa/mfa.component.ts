import { Component, OnInit } from '@angular/core';
import { SidebarName } from "projects/@atlp/core/enums/sidebar-name.enum";

@Component({
  selector: 'atlp-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {
  Sidebar = SidebarName;

  constructor() { }

  ngOnInit(): void {
  }

}
