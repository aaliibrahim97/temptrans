import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlpCommonDialogComponent } from './atlp-common-dialog.component';

describe('atlpCommonDialogComponent', () => {
  let component: AtlpCommonDialogComponent;
  let fixture: ComponentFixture<AtlpCommonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlpCommonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlpCommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
