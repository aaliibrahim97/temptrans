import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlpFiltersComponent } from './atlp-filters.component';

describe('AtlpFiltersComponent', () => {
  let component: AtlpFiltersComponent;
  let fixture: ComponentFixture<AtlpFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlpFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlpFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
