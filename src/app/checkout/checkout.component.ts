import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../accout/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
     private basketService: BasketService) { }
  ngOnInit(): void {

    this.getAddressFormValues();
    this.getDeliveryMethodValue();
    
  }

  checkoutForm = this.formBuilder.group({
    addressForm: this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipcode:['',Validators.required]
    }),

    deliveryForm: this.formBuilder.group({
      deliveryMethod: ['',Validators.required]
    }),

    paymentForm: this.formBuilder.group({
      nameOnCard: ['', Validators.required]
    })
  })


  getAddressFormValues(){
    this.accountService.getAppUser().subscribe({
      next:address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address)
      }
    })
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();

    if( basket && basket.deliveryMethodId){
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket.deliveryMethodId.toString())
    }
  }
  
}
