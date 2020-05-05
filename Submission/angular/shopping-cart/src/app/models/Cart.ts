import { ICartDetail } from './CartDetail';

export interface ICart {
    id: number;
    customer: any;
    cartDetails: ICartDetail[];
}

export class Cart {
    id: number = 0;
    customer: any;
    cartDetails: ICartDetail[];
}