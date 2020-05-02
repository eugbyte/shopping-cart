import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICart } from '../models/Cart';
import * as lodash from 'lodash';
import { StringStorage } from 'src/StringStorage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartService: CartService;
  private CART: ICart;
  public cartToDisplay: ICart;

  responseMessages: string[] = [];

  totalQuantity = 0;
  totalCost = 0;

  TABLE_CSS: string = StringStorage.TABLE_CSS;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  ngOnInit(): void {
    this.setCart();
  }

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
  }

}
