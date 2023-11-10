import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAuthServiceInterface } from 'projects/@atlp/auth/interfaces';
import { AtlpUnauthorizedDialogComponent } from '../dialog/unauthorized-dialog.component';

@Component({
  selector: 'app-not-in-role',
  templateUrl: './not-in-role.component.html',
  styleUrls: ['./not-in-role.component.scss'],
})
export class AtlpNotInRoleComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject('IAuthServiceInterface') private authService: IAuthServiceInterface
  ) {}

  ngOnInit(): void {
    this.openUnAuthorizedDialog();
  }

  openUnAuthorizedDialog(): void {
    const dialogRef = this.dialog.open(AtlpUnauthorizedDialogComponent, {
      width: '100%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (action === 'OK') {
        //redirect to sso page
        this.authService.redirectToSsoDashbord();
      } else if (action === 'LOGOUT') {
        //redirect to sso page
        this.authService.logout();
      }
    });
  }
}
