import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessagesComponent } from './response-messages.component';

describe('ResponseMessagesComponent', () => {
  let component: ResponseMessagesComponent;
  let fixture: ComponentFixture<ResponseMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
