import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

//sorting
export class ShopComponent implements OnInit {
  @ViewChild("search") searchTerm?: ElementRef 
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  sortOptions= [
    {name: "Alphabetical", value:"name"},
    {name: "Price: low to high", value:"priceAsc"},
    {name: "Price: High to low", value:"priceDesc"}
  ];

  totalCount = 0;
  shopParams: ShopParams

  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
   }

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }

  getProducts(){
    this.shopService.getProductsFromAPI().subscribe({
      next: response => {
        this.products = response.data;
        this.totalCount = response.count;
      }, 
      error: error => console.log(error)
    })  
  }
  getBrands(){
    this.shopService.getBrandsFromAPI().subscribe({
      next: response => this.brands = [{id:0, name: "All"}, ...response],
      error: error => console.log(error)
    })  
  }
  getTypes(){
    this.shopService.getTypesFromAPI().subscribe({
      next: response => this.types = [{id:0, name: "All"}, ...response],
      error: error => console.log(error)
    })  
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber =1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber =1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortOrderSelected(event:any){
    const params = this.shopService.getShopParams();
    params.sortOrder = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event:any){
    const params = this.shopService.getShopParams();
    //if the pagenumber is not equal the event page we are updating the page
    if(params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber =1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }
  onReset(){
    if(this.searchTerm)
      this.searchTerm.nativeElement.value="";   
      this.shopParams = new ShopParams();
      this.shopService.setShopParams(this.shopParams);
      this.getProducts();
  }
}
