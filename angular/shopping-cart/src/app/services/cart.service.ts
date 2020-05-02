import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StringStorage } from 'src/StringStorage';
import { Observable } from 'rxjs';
import { ICart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type':  'application/json' });
  private http: HttpClient;
  private readonly cartUrl = StringStorage.apiUrl + "carts";
  
  constructor(http: HttpClient) {
    this.http = http;
  }

  getCart(customerId: number): Observable<ICart> {
    let url = this.cartUrl + "/" + customerId;
    let cart$ = this.http.get<ICart>(url, { headers: this.HEADERS });    
    return cart$;
  }
}
