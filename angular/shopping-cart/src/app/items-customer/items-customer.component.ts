import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-items-customer',
  templateUrl: './items-customer.component.html',
  styleUrls: ['./items-customer.component.css']
})
export class ItemsCustomerComponent implements OnInit {

  cartLength: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.setCartLength();
  }

  setCartLength(): void {
    //Assume customer id is 1
    this.cartService.getCart(1).subscribe(
      cart => {
        console.log("setting cart length");
        this.cartLength = cart.cartDetails.reduce((accumulator, element) => accumulator + element.quantity, 0);
      },
      error => console.log(error));
  }

  onAddedToCart(quantity: number): void {
    console.log("in customer page", quantity);
    let total = quantity + this.cartLength;
    this.setCartLength();

    //the problem right now is that the request to retrieve the cart, is faster than the request
    //to update the cart
    if (this.cartLength < total)
      this.cartLength = total;
  }

}
