import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { AddToCartViewModel } from 'src/app/models/AddToCartViewModel';
import { CartService } from 'src/app/services/cart.service';
import { IItem } from 'src/app/models/Item';
import { StringStorage } from 'src/StringStorage';
import { CartDetail, ICartDetail } from 'src/app/models/CartDetail';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent implements OnInit {
  //Shared by item-list-component and cart-component

  @Input() item?: IItem;
  @Input() action?: String;
  @Input() cartDetail?: ICartDetail;
  @Output() addedToCart = new EventEmitter<number>();
  @Output() updatedCart = new EventEmitter<boolean>();

  private cartService: CartService;
  private fb: FormBuilder;

  cartForm: FormGroup;

  constructor(cartService: CartService, fb: FormBuilder) {
    this.cartService = cartService;
    this.fb = fb;
    this.action = this.action ?? StringStorage.ACTION_CREATE;
   }


  ngOnInit(): void {
    if (this.cartDetail && this.item == null) {
      this.item = this.cartDetail.item;
    }

    this.cartForm = this.fb.group({
      id: [this.item.id],
      price: [this.item.price],
      quantity: [this.cartDetail?.quantity, Validators.compose([Validators.required, Validators.min(1)]) ]
    });
   }

   get id(): FormControl { return this.cartForm.get("id") as FormControl; }
   get price(): FormControl { return this.cartForm.get("price") as FormControl; }
   get quantity(): FormControl { return this.cartForm.get("quantity") as FormControl; }

  onAddToCart(): void {
    let vm: AddToCartViewModel = new AddToCartViewModel();
    vm.customerId = 1; //assume for now
    vm.itemId = this.item.id;
    vm.quantity = this.quantity.value;
    console.log(vm);      

    if (vm.quantity < 1)
      return;
        
    this.cartService.addToCart(vm).subscribe(
      cart => console.log(cart),
      error => console.log(error),
      () => this.addedToCart.emit(vm.quantity));    
  }

  onUpdateCart(): void {
    let cartDetail: ICartDetail = new CartDetail();
    cartDetail.id = this.cartDetail.id;
    cartDetail.item = this.cartDetail.item;
    cartDetail.quantity = this.quantity.value;
    console.log(cartDetail);

    this.cartService.updateCartDetail(cartDetail).subscribe( 
      res => console.log(res),
      error => console.log(error),
      () => this.updatedCart.emit(true) );


  }

  

}
