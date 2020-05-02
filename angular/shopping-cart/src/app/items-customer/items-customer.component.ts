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
    //Assume customer id is 1
    this.cartService.getCart(1).subscribe(
      cart => {
        console.log(cart);
        this.cartLength = cart.cartDetails.length
      },
      error => console.log(error));
  }

}
