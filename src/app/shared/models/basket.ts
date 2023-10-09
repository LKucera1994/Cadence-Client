import * as cuid from "cuid"

export interface Basket {
    id: string
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice: number; 
  }
  
  export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    photoUrl: string;
    brand: string;
    type: string;  
  }

  export class Basket implements Basket{
    id = cuid();
    items: BasketItem[]=[];
    shippingPrice: number =0;
  }

  export interface BasketTotals{
    shippingCost:number;
    subtotal:number;
    total:number;
  }