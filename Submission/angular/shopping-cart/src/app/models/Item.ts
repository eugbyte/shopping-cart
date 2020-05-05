import { ICartDetail } from './CartDetail';
import { IOrderDetail } from './OrderDetail';

export interface IItem {
    id: number,
    name: string,
    price: number,
    orderDetails: IOrderDetail[],
    cartDetails: ICartDetail[]
}

export class Item implements IItem {
    id: number = 0;
    name: string;
    price: number;
    orderDetails: IOrderDetail[];
    cartDetails: ICartDetail[];
}