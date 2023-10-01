import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createPaymentIntent(){
    this.basketService.createPaymentIntent().subscribe({
      next: () => this.toastr.success('Payment intent created'),
      error: error => this.toastr.error(error.message)
      

    })
  }

}
