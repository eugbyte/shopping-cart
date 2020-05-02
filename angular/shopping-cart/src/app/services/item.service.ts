import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../models/Item';
import { StringStorage } from 'src/StringStorage';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type':  'application/json' });
  private http: HttpClient;
  private readonly itemUrl = StringStorage.apiUrl + "items";
  
  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllItems(): Observable<IItem[]> {
    let items$ = this.http.get<IItem[]>(this.itemUrl, { headers: this.HEADERS });
    return items$;
  }

  getItem(itemId: number): Observable<IItem> {
    let url: string = this.itemUrl + "/" + itemId;
    let item$ = this.http.get<IItem>(url, { headers: this.HEADERS });
    return item$;
  }

  createItem(item: IItem): Observable<HttpResponse<IItem>> {
    let res$ = this.http.post<IItem>(this.itemUrl, item, { headers: this.HEADERS, observe: "response" });
    return res$;
  }

  updateItem(item: IItem): Observable<HttpResponse<IItem>> {
    let res$ = this.http.put<IItem>(this.itemUrl, item, { headers: this.HEADERS, observe: "response" });
    return res$;
  }

  deleteItem(itemId: number): Observable<HttpResponse<IItem>> {
    let url = this.itemUrl + "/" + itemId;
    let res$ = this.http.delete<IItem>(url, { headers: this.HEADERS, observe: "response" });
    return res$;
  }



}
