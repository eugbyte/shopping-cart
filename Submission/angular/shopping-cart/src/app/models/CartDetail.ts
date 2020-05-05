import { ICart } from './Cart';
import { Item, IItem } from './Item';

export interface ICartDetail {
    id: number;
    quantity: number;
    dateModified: number;
    cart: ICart;
    item: IItem;
}

export class CartDetail implements ICartDetail {
    id: number = 0;
    quantity: number;
    dateModified: number;
    cart: ICart;
    item: IItem;
}