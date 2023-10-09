import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/accout/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent{
  @Input() checkoutForm?: FormGroup
  
  constructor(private accountService:AccountService, private toastr: ToastrService){}
  
  saveAppUser(){
    this.accountService.updateAppUser(this.checkoutForm?.get("addressForm")?.value).subscribe({
      next:() => {
        this.toastr.success("Address saved");
        //reseting when nothing was changed
        this.checkoutForm?.get("addressForm")?.reset(this.checkoutForm?.get("addressForm")?.value);
    }
    })
  }
}
