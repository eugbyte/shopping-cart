import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../models/Order';
import * as lodash from "lodash";
import { StringStorage } from 'src/StringStorage';
import { PageEvent } from '@angular/material/paginator';
import { FilterService } from '../../services/filter.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  private orderService: OrderService;
  private filterService: FilterService;
  private fb: FormBuilder;

  private ORDERS: IOrder[];
  private filteredOrders: IOrder[];
  ordersToDisplay: IOrder[];

  pageSize = 5;
  pageLength = 100;

  searchForm: FormGroup;

  readonly TABLE_CSS: string  = StringStorage.TABLE_CSS;  

  constructor(orderService: OrderService, filterService: FilterService, fb: FormBuilder) {
    this.orderService = orderService;
    this.filterService = filterService;
    this.fb = fb;
   }

  ngOnInit(): void {
    let customerId: number = 1;
    this.orderService.getOrders(customerId).subscribe(
      orders => {
        this.ORDERS = lodash.cloneDeep(orders);
        this.filteredOrders = lodash.cloneDeep(orders);
        this.ordersToDisplay = lodash.cloneDeep(orders);
        this.pageLength = orders.length;
      } ,
      error => console.log(error),
      () => this.setPage() );
    
      this.searchForm = this.fb.group({
        searchText: []
      });

      this.onChanges();
  }

  get searchText(): FormControl { return this.searchForm.get("searchText") as FormControl; }

  setPage(event: PageEvent = null) {
    this.pageLength = this.filteredOrders.length;
    this.ordersToDisplay = this.filterService.filterElementsToDisplayPerPage(this.filteredOrders, this.pageSize, event);
  }

  onChanges(): void {
    this.searchText.valueChanges.subscribe(value => {
      this.filteredOrders = this.filterService.filterOrdersBySearchText(this.ORDERS, this.searchText.value);
      this.setPage();
    });
  }

}
