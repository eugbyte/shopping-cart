import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFormComponent } from './cart-form.component';

describe('CartFormComponent', () => {
  let component: CartFormComponent;
  let fixture: ComponentFixture<CartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
