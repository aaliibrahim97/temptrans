import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtlpNotInRoleComponent } from './not-in-role.component';

describe('UnauthorizedComponent', () => {
  let component: AtlpNotInRoleComponent;
  let fixture: ComponentFixture<AtlpNotInRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtlpNotInRoleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlpNotInRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
