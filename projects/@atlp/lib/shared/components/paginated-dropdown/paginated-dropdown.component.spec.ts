import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedDropdownComponent } from './paginated-dropdown.component';

describe('PaginatedDropdownComponent', () => {
  let component: PaginatedDropdownComponent;
  let fixture: ComponentFixture<PaginatedDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatedDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
