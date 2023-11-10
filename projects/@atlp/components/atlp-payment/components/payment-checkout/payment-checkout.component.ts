import { Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
// import { AtlpSidebarService } from 'projects/@atlp/components/sidebar/sidebar.service';
import { AtlpSidebarV2Service } from 'projects/@atlp/components/@v2/atlp-sidebar/atlp-sidebar.service';

@UntilDestroy()
@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.scss'],
})
export class PaymentCheckoutComponent {
  @Input() sourceUrl;
  constructor(private atplSidebarService: AtlpSidebarV2Service) {}

  ngOnInit(): void {}

  toggleSidebarOpen(key): void {
    this.atplSidebarService.getSidebar(key).toggleOpen();
  }
}
