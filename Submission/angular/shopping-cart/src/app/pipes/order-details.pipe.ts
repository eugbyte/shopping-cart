import { Pipe, PipeTransform } from '@angular/core';
import { IOrderDetail } from '../models/OrderDetail';
import { FilterService } from '../services/filter.service';
import { TransformService } from '../services/transform.service';

@Pipe({
  name: 'orderDetails'
})
export class OrderDetailsPipe implements PipeTransform {
  private transformService: TransformService;

  constructor(transformService: TransformService) {
    this.transformService = transformService;
  }

  transform(orderDetails: IOrderDetail[]): string {
    let description: string = this.transformService.transformOrderDetailsToText(orderDetails); 
    return description;
  }

}
