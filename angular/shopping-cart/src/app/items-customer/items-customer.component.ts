import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-customer',
  templateUrl: './items-customer.component.html',
  styleUrls: ['./items-customer.component.css']
})
export class ItemsCustomerComponent implements OnInit {

  cartLength: number = 0;

  private cartService: CartService;
  private router: Router;

  constructor(cartService: CartService, router: Router) { 
    this.cartService = cartService;
    this.router = router;
  }

  ngOnInit(): void {
    this.setCartLength();
  }

  setCartLength(): void {
    //Assume customer id is 1
    this.cartService.getCart(1).subscribe(
      cart => {
        console.log("setting cart length");
        console.log(cart);        
        this.cartLength = cart.cartDetails.reduce((accumulator, element) => accumulator + element.quantity, 0);

      },
      error => console.log(error));
  }

  onAddedToCart(quantity: number): void {
    console.log("in customer page", quantity);
    this.setCartLength();
  }

  onCartClick(): void {
    this.router.navigate(["cart"]);
  }

}
