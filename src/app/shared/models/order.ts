import { AppUser } from "./user";


export interface OrderToCreate{
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: AppUser;
}

export interface OrderItem {
    productId: number;
    productName: string;
    photoUrl : string;
    price: number;
    quantity: number;
}

export interface Order{
    id:number;
    buyerEmail: string;
    orderDate:string;
    shipToAddress: AppUser;
    deliveryMethod:string;
    shippingPrice:number;
    orderItems: OrderItem[];
    subtotal: number;   
    status:string;

}