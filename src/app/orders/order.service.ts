import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  orderCache = new Map<number,Order>();

  constructor(private http:HttpClient) { }

  GetOrderById(id :number){

    if(this.orderCache.size > 0)
    {
      if(this.orderCache.has(id))
      {
        return  of(this.orderCache.get(id));
      }        
    }
  
    return this.http.get<Order>(this.baseUrl + "orders/" + id).pipe(
      map((response) =>{
        this.orderCache.set(id, response);
        return response;
      })
    );
  }

  GetAllOrders(){

    if(this.orderCache.size > 0)
      return of([...this.orderCache.values()])

    return this.http.get<Order[]>(this.baseUrl + "orders").pipe(
      map(response =>{
        this.SetOrders(response);
        return response;
      })
    );
  }

  SetOrders(orders: Order[]){
    orders.forEach(element => {
      this.orderCache.set(element.id,element);   
    });
  }
}
