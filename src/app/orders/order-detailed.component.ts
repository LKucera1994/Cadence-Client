import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.css']
})
export class OrderDetailedComponent implements OnInit {
  order?: Order ;
  
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute,private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.set('@orderDetailed', " ");
   }

  ngOnInit(): void {
    this.GetOrderById()
  }

  GetOrderById() {
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    if(id)
    {
      this.orderService.GetOrderById(+id).subscribe({
        next: result => {
          this.order = result;
          this.breadcrumbService.set('@orderDetailed', `Order# ${this.order.id} - ${this.order.status}`);
        }
      });
    }    
  }
}
