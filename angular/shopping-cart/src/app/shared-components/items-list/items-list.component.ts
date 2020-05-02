import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { IItem } from 'src/app/models/Item';
import * as lodash from 'lodash';
import { StringStorage } from 'src/StringStorage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { AddToCartViewModel } from 'src/app/models/AddToCartViewModel';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  private ITEMS: IItem[] = [];
  private filteredItems: IItem[] = [];
  public itemsToDisplay: IItem[] = [];
  public itemsRange: number[] = [];

  private itemService: ItemService;
  private router: Router;
  private fb: FormBuilder;

  cartForms: FormGroup;

  @Input() role?: string;
  @Output() addedToCart = new EventEmitter<number>();

  id: number;
  quantity: number;

  TABLE_CSS = StringStorage.TABLE_CSS;

  constructor(itemService: ItemService, router: Router, fb: FormBuilder, private cartService: CartService) {
    this.itemService = itemService;
    this.router = router;
    this.role = this.role ?? StringStorage.ROLE_CUSTOMER;
    this.fb = fb;
   }

  ngOnInit(): void {
    this.setItems();
  }

  setItems(): void {
    this.itemService.getAllItems().subscribe(
      items => {
        this.ITEMS = items;
        this.filteredItems = lodash.cloneDeep(items);
        this.itemsToDisplay = lodash.cloneDeep(items);
        
      },
      error => console.log(error));    
  }

  onUpdate(itemId: number): void {
    this.router.navigate(['shopOwner', 'manage', itemId]);
  }

  onDelete(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(
      response => console.log(response),
      error => console.log(error),
      () => this.setItems() );
  }

  onAddedToCart(quantity: number) {
    console.log(quantity + " in item-list");
    this.addedToCart.emit(quantity);
  }





}
