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
  shopParams = new ShopParams();

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }

  getProducts(){
    this.shopService.getProductsFromAPI(this.shopParams).subscribe({
      next: response => {
        this.products =response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onSortOrderSelected(event:any){
    this.shopParams.sortOrder = event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any){
    //if the pagenumber is not equal the event page we are updating the page
    if(this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();

  }
  onReset(){
    if(this.searchTerm)
      this.searchTerm.nativeElement.value="";   
      this.shopParams = new ShopParams();
      this.getProducts();
  }





}
