import { IItem } from './Item';
import { IOrder } from './Order';

export interface IOrderDetail {
    id: number;
    quantity: number;
    item: IItem;
    order: IOrder;
}

export class Order {
    id: number = 0;
    quantity: number;
    item: IItem;
    order: IOrder;
}