import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashConfirmationDialogComponent } from './cash-confirmation-dialog.component';

describe('CashConfirmationDialogComponent', () => {
  let component: CashConfirmationDialogComponent;
  let fixture: ComponentFixture<CashConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
