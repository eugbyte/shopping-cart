import { Pipe, PipeTransform } from '@angular/core';
import { IOrderDetail } from '../models/OrderDetail';

@Pipe({
  name: 'orderDetails'
})
export class OrderDetailsPipe implements PipeTransform {

  transform(orderDetails: IOrderDetail[]): string {
    if (orderDetails.length < 1)
      return "";
    let description: string = orderDetails.map(od => od.quantity + " " + od.item.name + " $" + `(${od.item.price})`)
      .reduce((accumulator, element) => accumulator + ", " + element);
    let totalCost: number = orderDetails.map(od => od.item.price * od.quantity)
      .reduce((accumulator, element) => accumulator + element);
    description += " = $" + totalCost; 
    return description;
  }

}
