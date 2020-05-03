import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCustomerComponent } from './items-customer.component';

describe('ItemsCustomerComponent', () => {
  let component: ItemsCustomerComponent;
  let fixture: ComponentFixture<ItemsCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
