import { IOrderDetail } from './OrderDetail';
import { ICustomer } from './Customer';

export interface IOrder {
    id: number;
    orderDate: Date;
    orderDetails: IOrderDetail[];
    customer: ICustomer;
    txnId: any;
}

export class Order implements IOrder {
    id: number = 0;
    orderDate: Date;
    orderDetails: IOrderDetail[];
    customer: ICustomer;
    txnId: any;
}