import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;

  constructor(private basketService: BasketService) { }

  addItemToBasket(){
    
    if(this.product)
    {
      this.basketService.addItemToBasket(this.product);
    }     
  }

  ngOnInit(): void {
  }
}
