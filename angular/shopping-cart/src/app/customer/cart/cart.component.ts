import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../models/Cart';
import * as lodash from 'lodash';
import { StringStorage } from 'src/StringStorage';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartService: CartService;
  private orderService: OrderService;
  private router: Router;

  private CART: ICart;
  public cartToDisplay: ICart;

  responseMessages: string[] = [];

  paymentForm: FormGroup;
  private fb: FormBuilder;

  totalQuantity = 0;
  totalCost = 0;

  TABLE_CSS: string = StringStorage.TABLE_CSS;

  constructor(cartService: CartService, orderService: OrderService, router: Router, fb: FormBuilder) {
    this.cartService = cartService;
    this.orderService = orderService;
    this.router = router;
    this.fb = fb;    
  }

  ngOnInit(): void {
    this.setCart();
    this.paymentForm = this.fb.group({
      cardNumber: [, Validators.compose([Validators.required, Validators.minLength(1)])]
    })
  }

  get cardNumber(): FormControl { return this.paymentForm.get("cardNumber") as FormControl; }

  setCart(): void {
    //assume customerId is 1
    let customerId: number = 1;
    this.cartService.getCart(customerId).subscribe(
      cart => {
        console.log(cart);
        this.CART = cart;
        this.cartToDisplay = lodash.cloneDeep(cart);
      },
      error => console.log(error),
      () => this.calculateCartSummary() );
  }

  calculateCartSummary() {
    if (this.CART.cartDetails.length < 1)
      return;
    this.totalQuantity = this.CART.cartDetails
      .reduce( (accumulator, element) => accumulator + element.quantity, 0);
    this.totalCost = this.CART.cartDetails
      .map(cd => cd.item.price * cd.quantity)
      .reduce( (accumulator, element) => accumulator + element);
  }
  
  onCartUpdateEvent(isCartUpdated: boolean): void {
    console.log(isCartUpdated);
    this.responseMessages.push("cart updated");
    this.setCart();
  }

  onDelete(cartDetailId: number): void {
    this.cartService.deleteCartDetail(cartDetailId).subscribe(
      res => this.responseMessages.push("item deleted"),
      error => console.log(error),
      () => this.setCart() );
  }

  onOrder(): void {
    console.log(this.CART);

    let customerId: number = 1; //Assume for now
    this.orderService.makeOrder(customerId, this.cardNumber.value).subscribe(
      order => console.log(order),
      error => console.log(error),
      () => this.router.navigate(["orders"]) );
  }

}
