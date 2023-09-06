import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
import { AccountService } from './accout/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cadence';
  

  constructor(private basketService: BasketService, private accountService: AccountService){}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    
    
}

loadCurrentUser(){
  const token = localStorage.getItem("token");
  if(token) 
    this.accountService.loadCurrentUser(token).subscribe();

}

loadBasket(){
    const basketId = localStorage.getItem("basket_id");
    if(basketId)
        this.basketService.getBasket(basketId);

}
}



