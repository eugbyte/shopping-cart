import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IItem } from '../models/Item';
import { IOrderDetail } from '../models/OrderDetail';
import { IOrder } from '../models/Order';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private transformService: TransformService;

  constructor(transformService: TransformService) {
    this.transformService = transformService;
  }

  filterItemsBySearchText(items: IItem[], searchText: string): IItem[] {
    if (!searchText)
      return items;

    //Remove all white spaces
    searchText = searchText.toLowerCase().replace(/\s/g,'');
    let resultItems: IItem[] = items.filter(item => {
      let { name, price } = item;     
      let fullDescription: string = (name + price).toString().toLowerCase();
      fullDescription = fullDescription.replace(/\s/g,'');
      return (fullDescription.includes(searchText));
          
    });
    return resultItems;
  }

  filterOrdersBySearchText(orders: IOrder[], searchText: string): IOrder[] {
    if (!searchText)
      return orders;
    //Remove all white spaces
    searchText = searchText.toLowerCase().replace(/\s/g,'');
    let resultOrders: IOrder[] = orders.filter(order => {
      let orderDetails: IOrderDetail[] = order.orderDetails;
      let fullDescription = this.transformService.transformOrderDetailsToText(orderDetails);

      let dateDescription = this.transformService.transformDateToText(order.orderDate);
      fullDescription += dateDescription;
      
      fullDescription = fullDescription.toString().toLowerCase();
      fullDescription = fullDescription.replace(/\s/g,'');
      return (fullDescription.includes(searchText));          
    });
    return resultOrders;
  }

  filterElementsToDisplayPerPage(elements: any[], pageSize: number, event?: PageEvent): any[] {

    //On the page initialization when the user has yet to click on the paginator, start filtering anyway
    if (event == undefined || event == null) {
      let resultElements: any[] = elements.slice(0, pageSize);
      return resultElements;
    }

    let currentPageIndex: number = event.pageIndex;

    let startIndex: number = currentPageIndex * pageSize;
    let endIndex: number = startIndex + pageSize;

    console.log(startIndex, endIndex);

    //if the user presses the backbutton
    if (startIndex > endIndex) {
      [startIndex, endIndex] = [endIndex, startIndex];
      if (startIndex - pageSize >= 0)
        [startIndex, endIndex] = [startIndex - pageSize, endIndex - pageSize];
    }
    let resultElements: any[] = elements.slice(startIndex, endIndex);

    console.log(resultElements);
    return resultElements;

  }
}
