import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerIdViewModel } from '../models/CustomerIdViewModel';
import { IOrder } from '../models/Order';
import { StringStorage } from 'src/StringStorage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type':  'application/json' });
  private http: HttpClient;
  private readonly orderUrl = StringStorage.apiUrl + "orders";

  constructor(http: HttpClient) {
    this.http = http;
  }

  makeOrder(customerId: number): Observable<IOrder> {
    let vm: CustomerIdViewModel = new CustomerIdViewModel();
    vm.customerId = customerId;
    let order$ = this.http.post<IOrder>(this.orderUrl, vm, { headers: this.HEADERS });
    return order$;
  }

  getOrders(customerId: number): Observable<IOrder[]> {
    let url = this.orderUrl + "/" + customerId;
    let orders$ = this.http.get<IOrder[]>(url, { headers: this.HEADERS });
    return orders$;
  }


}
