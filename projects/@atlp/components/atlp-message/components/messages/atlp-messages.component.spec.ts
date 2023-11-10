import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlpCommonMessagesComponent } from './atlp-messages.component';

describe('MessagesComponent', () => {
  let component: AtlpCommonMessagesComponent;
  let fixture: ComponentFixture<AtlpCommonMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtlpCommonMessagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlpCommonMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
