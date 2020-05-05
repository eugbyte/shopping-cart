import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { IItem } from 'src/app/models/Item';
import * as lodash from 'lodash';
import { StringStorage } from 'src/StringStorage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { AddToCartViewModel } from 'src/app/models/AddToCartViewModel';
import { CartService } from 'src/app/services/cart.service';
import { PageEvent } from '@angular/material/paginator';
import { FilterService } from 'src/app/services/filter.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  private filterService: FilterService;

  searchForm: FormGroup;

  @Input() role?: string;
  @Output() addedToCart = new EventEmitter<number>();

  id: number;
  quantity: number;

  TABLE_CSS = StringStorage.TABLE_CSS;

  pageSize = 5;
  pageLength = 100;

  constructor(itemService: ItemService, router: Router, fb: FormBuilder, filterService: FilterService) {
    this.itemService = itemService;
    this.router = router;
    this.role = this.role ?? StringStorage.ROLE_CUSTOMER;
    this.fb = fb;
    this.filterService = filterService;
   }

  ngOnInit(): void {
    this.setItems();
    this.searchForm = this.fb.group({
      searchText: []
    });
    this.onChanges();
  }

  errorMessages: string[] = [];

  get searchText(): FormControl { return this.searchForm.get("searchText") as FormControl; }

  setItems(): void {
    this.itemService.getAllItems().subscribe(
      items => {
        this.ITEMS = items;
        this.filteredItems = lodash.cloneDeep(items);
        this.itemsToDisplay = lodash.cloneDeep(items);
        this.pageLength = this.ITEMS.length;
      },
      error => console.log(error),
      () => this.setPage());    
  }

  onUpdate(itemId: number): void {
    this.router.navigate(['shopOwner', 'manage', itemId]);
  }

  onDelete(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(
      response => console.log(response),
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errorMessages.push(error.error["message"]);
      } ,
      () => this.setItems() );
  }

  onAddedToCart(quantity: number) {
    console.log(quantity + " in item-list");
    this.addedToCart.emit(quantity);
  }

  setPage(event: PageEvent = null) {
    this.pageLength = this.filteredItems.length;
    this.itemsToDisplay = this.filterService.filterElementsToDisplayPerPage(this.filteredItems, this.pageSize, event);
  }

  onChanges(): void {
    this.searchText.valueChanges.subscribe(value => {
      this.filteredItems = this.filterService.filterItemsBySearchText(this.ITEMS, this.searchText.value);
      this.setPage();
    });
  }





}
