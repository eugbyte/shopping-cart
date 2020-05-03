import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { IOrder } from '../models/Order';
import * as lodash from "lodash";
import { StringStorage } from 'src/StringStorage';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  private orderService: OrderService;

  private orders: IOrder[];
  private filteredOrders: IOrder[];
  ordersToDisplay: IOrder[];

  readonly TABLE_CSS: string  = StringStorage.TABLE_CSS;
  

  constructor(orderService: OrderService) {
    this.orderService = orderService;
   }

  ngOnInit(): void {
    let customerId: number = 1;
    this.orderService.getOrders(customerId).subscribe(
      orders => {
        this.orders = lodash.cloneDeep(orders);
        this.filteredOrders = lodash.cloneDeep(orders);
        this.ordersToDisplay = lodash.cloneDeep(orders);
      } ,
      error => console.log(error) );

  }

}
