import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsShopOwnerComponent } from './items-shop-owner.component';

describe('ItemsShopOwnerComponent', () => {
  let component: ItemsShopOwnerComponent;
  let fixture: ComponentFixture<ItemsShopOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsShopOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsShopOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
