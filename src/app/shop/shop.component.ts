import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  sortOptions= [
    {name: "Alphabetical", value:"name"},
    {name: "Price: low to high", value:"priceAsc"},
    {name: "Price: High to low", value:"priceDesc"}
  ];
  sortOrderSelected:string ="name";
  brandIdSelected = 0;
  typeIdSelected = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }

  getProducts(){
    this.shopService.getProductsFromAPI(this.brandIdSelected,this.typeIdSelected,this.sortOrderSelected).subscribe({
      next: response => this.products = response.data,
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
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortOrderSelected(event:any){
    this.sortOrderSelected = event.target.value;
    this.getProducts();
  }






}
