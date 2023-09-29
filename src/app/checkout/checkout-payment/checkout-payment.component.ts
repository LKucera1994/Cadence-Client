import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { AppUser } from 'src/app/shared/models/user';
import { OrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent{
 
  @Input() checkoutForm?: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toastr:ToastrService)
  {

  }

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    console.log(basket?.id);
    if(!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);
    console.log(orderToCreate);

    if(!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        this.toastr.success('Order created successfully');
        console.log(order);
      }
    })
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as AppUser;

    if(!deliveryMethodId || !shipToAddress) return;
    console.log(deliveryMethodId);
    console.log(shipToAddress);
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }

  

}
